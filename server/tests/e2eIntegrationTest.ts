import http from "http"

interface TestResult {
  name: string
  passed: boolean
  status?: number
  error?: string
  responseSnippet?: string
}

const BASE_URL = "http://localhost:3000"

async function request(
  path: string,
  options: {
    method?: string
    headers?: Record<string, string>
    body?: any
  } = {}
): Promise<{ status: number; data: any; headers: any }> {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL)
    const payload = options.body ? JSON.stringify(options.body) : null

    const req = http.request(
      url,
      {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...(payload ? { "Content-Length": Buffer.byteLength(payload).toString() } : {}),
          ...(options.headers || {}),
        },
      },
      (res) => {
        let raw = ""
        res.on("data", (chunk) => (raw += chunk))
        res.on("end", () => {
          let parsed: any = null
          try {
            parsed = JSON.parse(raw)
          } catch {
            parsed = raw
          }
          resolve({ status: res.statusCode || 500, data: parsed, headers: res.headers })
        })
      }
    )

    req.on("error", (err) => reject(err))
    if (payload) {
      req.write(payload)
    }
    req.end()
  })
}

async function runE2ETests() {
  console.log("================================================================================")
  console.log("  STARTING FULL END-TO-END HTTP INTEGRATION TEST ON LIVE PORT 3000")
  console.log("================================================================================")

  const results: TestResult[] = []

  // 1. Health & Detailed Status
  try {
    const res = await request("/api/health")
    const passed = res.status === 200 && res.data.status === "ok"
    results.push({
      name: "1.1 Health Check (GET /api/health)",
      passed,
      status: res.status,
      responseSnippet: JSON.stringify(res.data),
    })
  } catch (err: any) {
    results.push({ name: "1.1 Health Check (GET /api/health)", passed: false, error: err.message })
  }

  try {
    const res = await request("/api/v1/system/status")
    const passed = res.status === 200 && res.data.success === true && res.data.status === "100% OPERATIONAL"
    results.push({
      name: "1.2 Detailed System Status (GET /api/v1/system/status)",
      passed,
      status: res.status,
      responseSnippet: JSON.stringify(res.data),
    })
  } catch (err: any) {
    results.push({ name: "1.2 Detailed System Status (GET /api/v1/system/status)", passed: false, error: err.message })
  }

  // 2. Assessment Submission Flow (Valid)
  let createdAssessmentId = ""
  try {
    const res = await request("/api/v1/assessments", {
      method: "POST",
      body: {
        name: "Devika Sen",
        email: "devika@growthscale.co",
        company: "GrowthScale Inc",
        teamSize: "10-50 Employees",
        primaryFriction: "Lead Qualification & Sales Follow-Up",
        currentStack: "HubSpot, Slack, Zapier",
      },
    })
    const passed = res.status === 201 && res.data.success === true && !!res.data.data.blueprintSummary
    if (passed) createdAssessmentId = res.data.data.assessmentId
    results.push({
      name: "2.1 Assessment Submission (POST /api/v1/assessments - Valid)",
      passed,
      status: res.status,
      responseSnippet: `Assessment ID: ${createdAssessmentId}, Score: ${res.data?.data?.bottleneckScore}`,
    })
  } catch (err: any) {
    results.push({ name: "2.1 Assessment Submission - Valid", passed: false, error: err.message })
  }

  // 2.2 Assessment Submission (Invalid Email / Schema Validation)
  try {
    const res = await request("/api/v1/assessments", {
      method: "POST",
      body: {
        name: "",
        email: "not-an-email",
      },
    })
    const passed = res.status === 400 && res.data.success === false
    results.push({
      name: "2.2 Assessment Validation Error Handling (POST /api/v1/assessments - Invalid)",
      passed,
      status: res.status,
      responseSnippet: res.data.error || JSON.stringify(res.data.errors),
    })
  } catch (err: any) {
    results.push({ name: "2.2 Assessment Validation Error Handling", passed: false, error: err.message })
  }

  // 3. Strategy Consultation Booking Flow
  let createdBookingId = ""
  try {
    const res = await request("/api/v1/bookings", {
      method: "POST",
      body: {
        name: "Rahul Verma",
        email: "rahul@vermatech.io",
        company: "Verma Technologies",
        requestedDate: "2026-09-15",
        timeSlot: "14:00 - 14:30 IST",
        notes: "Discuss autonomous SDR deployment",
      },
    })
    const passed = res.status === 201 && res.data.success === true && !!res.data.bookingId
    if (passed) createdBookingId = res.data.bookingId
    results.push({
      name: "3.1 Booking Reservation Flow (POST /api/v1/bookings - Valid)",
      passed,
      status: res.status,
      responseSnippet: `Booking ID: ${createdBookingId}`,
    })
  } catch (err: any) {
    results.push({ name: "3.1 Booking Reservation Flow", passed: false, error: err.message })
  }

  // 3.2 Booking Flow Validation
  try {
    const res = await request("/api/v1/bookings", {
      method: "POST",
      body: {
        name: "Rahul",
        email: "invalid-email",
      },
    })
    const passed = res.status === 400 && res.data.success === false
    results.push({
      name: "3.2 Booking Error Handling (POST /api/v1/bookings - Invalid)",
      passed,
      status: res.status,
      responseSnippet: res.data.error,
    })
  } catch (err: any) {
    results.push({ name: "3.2 Booking Error Handling", passed: false, error: err.message })
  }

  // 4. Contact / Enterprise RFP Inquiry
  try {
    const res = await request("/api/v1/contacts", {
      method: "POST",
      body: {
        name: "Karan Johar",
        email: "karan@dharmaenterprise.com",
        company: "Dharma Enterprise",
        subject: "Enterprise LLM On-Premise Audit",
        message: "We need private cluster VPC deployment for sensitive document analysis.",
        enquiryType: "enterprise_quote",
      },
    })
    const passed = res.status === 201 && res.data.success === true && !!res.data.contactId
    results.push({
      name: "4.1 Enterprise Contact Inquiry (POST /api/v1/contacts - Valid)",
      passed,
      status: res.status,
      responseSnippet: `Contact ID: ${res.data.contactId}`,
    })
  } catch (err: any) {
    results.push({ name: "4.1 Enterprise Contact Inquiry", passed: false, error: err.message })
  }

  // 5. AI Agent Live Sandbox Execution (All 4 Flagship Agents)
  const agentCodes = ["STH-SDR-01", "STH-SUP-02", "STH-OPS-03", "STH-VOX-04"]
  for (const code of agentCodes) {
    try {
      const res = await request("/api/v1/agents/execute", {
        method: "POST",
        body: {
          agentCode: code,
          inputPayload: { query: "E2E Test Execution", targetMode: "sandbox" },
        },
      })
      const passed = res.status === 200 && res.data.success === true && res.data.data.status === "success"
      results.push({
        name: `5. Agent Execution (${code})`,
        passed,
        status: res.status,
        responseSnippet: `Latency: ${res.data?.data?.latencyMs}ms, Output: ${JSON.stringify(res.data?.data?.outputPayload || {})}`,
      })
    } catch (err: any) {
      results.push({ name: `5. Agent Execution (${code})`, passed: false, error: err.message })
    }
  }

  // 6. Authentication Flows
  let adminToken = ""
  try {
    const res = await request("/api/v1/auth/login", {
      method: "POST",
      body: {
        email: "admin@sthayuventures.com",
        password: "SthayuAdmin2026!",
      },
    })
    const passed = res.status === 200 && res.data.success === true && !!res.data.token
    if (passed) adminToken = res.data.token
    results.push({
      name: "6.1 Admin Login (POST /api/v1/auth/login - Valid)",
      passed,
      status: res.status,
      responseSnippet: `User: ${res.data?.user?.email}, Role: ${res.data?.user?.role}`,
    })
  } catch (err: any) {
    results.push({ name: "6.1 Admin Login", passed: false, error: err.message })
  }

  // 6.2 Authentication Invalid Password
  try {
    const res = await request("/api/v1/auth/login", {
      method: "POST",
      body: {
        email: "admin@sthayuventures.com",
        password: "WrongPassword123!",
      },
    })
    const passed = res.status === 401 && res.data.success === false
    results.push({
      name: "6.2 Admin Login Rejection (POST /api/v1/auth/login - Invalid Password)",
      passed,
      status: res.status,
      responseSnippet: res.data.error,
    })
  } catch (err: any) {
    results.push({ name: "6.2 Admin Login Rejection", passed: false, error: err.message })
  }

  // 6.3 Authentication Session /me with Bearer Token
  try {
    const res = await request("/api/v1/auth/me", {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    const passed = res.status === 200 && res.data.success === true && res.data.user.email === "admin@sthayuventures.com"
    results.push({
      name: "6.3 Authenticated Session Verification (GET /api/v1/auth/me)",
      passed,
      status: res.status,
      responseSnippet: `Session active for: ${res.data?.user?.name}`,
    })
  } catch (err: any) {
    results.push({ name: "6.3 Authenticated Session Verification", passed: false, error: err.message })
  }

  // 7. Admin Dashboard & Restricted Routes
  try {
    const res = await request("/api/v1/admin/stats", {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    const passed = res.status === 200 && res.data.success === true && typeof res.data.data.totalLeads === "number"
    results.push({
      name: "7.1 Admin Protected System Stats (GET /api/v1/admin/stats)",
      passed,
      status: res.status,
      responseSnippet: `Leads: ${res.data?.data?.totalLeads}, Bookings: ${res.data?.data?.totalBookings}, Assessments: ${res.data?.data?.totalAssessments}`,
    })
  } catch (err: any) {
    results.push({ name: "7.1 Admin Protected System Stats", passed: false, error: err.message })
  }

  // 7.2 Admin Unauthorized Rejection
  try {
    const res = await request("/api/v1/admin/stats")
    const passed = res.status === 401 && res.data.success === false
    results.push({
      name: "7.2 Admin Security Barrier (GET /api/v1/admin/stats without Token)",
      passed,
      status: res.status,
      responseSnippet: res.data.error,
    })
  } catch (err: any) {
    results.push({ name: "7.2 Admin Security Barrier", passed: false, error: err.message })
  }

  // 7.3 Admin Leads Retrieval
  try {
    const res = await request("/api/v1/admin/leads", {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    const passed = res.status === 200 && res.data.success === true && Array.isArray(res.data.data)
    results.push({
      name: "7.3 Admin Leads Listing (GET /api/v1/admin/leads)",
      passed,
      status: res.status,
      responseSnippet: `Returned ${res.data?.data?.length} leads`,
    })
  } catch (err: any) {
    results.push({ name: "7.3 Admin Leads Listing", passed: false, error: err.message })
  }

  // Summary Report
  console.log("\n--------------------------------------------------------------------------------")
  console.log("  END-TO-END INTEGRATION TEST RESULTS")
  console.log("--------------------------------------------------------------------------------")
  let passedCount = 0
  let failedCount = 0
  for (const r of results) {
    if (r.passed) {
      console.log(`✅ [PASS] ${r.name} (HTTP ${r.status})`)
      if (r.responseSnippet) console.log(`   └─ Response: ${r.responseSnippet}`)
      passedCount++
    } else {
      console.log(`❌ [FAIL] ${r.name} (HTTP ${r.status || "ERR"})`)
      if (r.error) console.log(`   └─ Error: ${r.error}`)
      if (r.responseSnippet) console.log(`   └─ Response: ${r.responseSnippet}`)
      failedCount++
    }
  }

  console.log("================================================================================")
  console.log(`  TOTAL: ${results.length} | PASSED: ${passedCount} | FAILED: ${failedCount}`)
  console.log("================================================================================")

  if (failedCount > 0) {
    process.exit(1)
  }
}

runE2ETests().catch((err) => {
  console.error("Test runner failed:", err)
  process.exit(1)
})
