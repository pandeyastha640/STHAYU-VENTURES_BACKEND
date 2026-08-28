import { db } from "../db/database"
import { AssessmentService } from "../services/assessmentService"
import { ContactService } from "../services/contactService"
import { BookingService } from "../services/bookingService"
import { AgentService } from "../services/agentService"
import { WorkflowService } from "../services/workflowService"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { config } from "../config"

async function runTestSuite() {
  console.log("==================================================")
  console.log("  RUNNING STHAYU VENTURES BACKEND TEST SUITE")
  console.log("==================================================")

  let passed = 0
  let failed = 0

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`)
      passed++
    } else {
      console.error(`  ❌ [FAIL] ${testName}`)
      failed++
    }
  }

  // 1. Database Initialization & Admin User
  const admin = db.findUserByEmail(config.adminEmail)
  assert(!!admin, "Admin user initialized in database")
  assert(admin?.role === "admin", "Admin user has 'admin' role privileges")
  assert(
    bcrypt.compareSync(config.adminInitialPassword, admin!.passwordHash),
    "Admin password hashes and verifies correctly"
  )

  // 2. JWT Authentication Token Issuance & Verification
  const token = jwt.sign({ userId: admin!.id, role: admin!.role }, config.jwtSecret, { expiresIn: "1h" })
  const decoded = jwt.verify(token, config.jwtSecret) as { userId: string; role: string }
  assert(decoded.userId === admin!.id, "JWT generation and signature verification succeeds")

  // 3. Assessment & Lead Ingestion Pipeline
  const assessmentResult = await AssessmentService.processAssessment({
    name: "Aarav Sharma",
    email: "aarav@enterprise-scale.io",
    company: "Scale Systems Ltd",
    teamSize: "50-250 Employees",
    primaryFriction: "Lead Qualification & Sales Follow-Up",
    currentStack: "HubSpot, Slack, PostgreSQL",
  })
  assert(!!assessmentResult.assessment.id, "Assessment successfully generated and stored")
  assert(assessmentResult.assessment.bottleneckScore >= 80, "Bottleneck algorithm computes correct high-friction score")
  assert(assessmentResult.lead.email === "aarav@enterprise-scale.io", "Associated lead created and indexed")
  assert(assessmentResult.assessment.blueprintSummary.recommendedAgents.includes("STH-SDR-01"), "Correct AI Agent recommended in blueprint")

  // 4. Contact Enquiry Intake
  const contactResult = await ContactService.processContact({
    name: "Meera Patel",
    email: "meera@techcorp.in",
    company: "TechCorp Global",
    subject: "Autonomous Support Integration RFP",
    message: "We need Tier-1 deflection integrated with our Zendesk instance.",
    enquiryType: "enterprise_quote",
  })
  assert(!!contactResult.contact.id, "Contact inquiry recorded")
  assert(contactResult.lead.email === "meera@techcorp.in", "Contact automatically synced to Lead Pipeline")

  // 5. Booking Service
  const bookingResult = await BookingService.processBooking({
    name: "Vikram Mehta",
    email: "vikram@fintech.co",
    company: "FinTech Ops",
    requestedDate: "2026-09-02",
    timeSlot: "14:00 IST",
    notes: "Review data reconciliation pipeline",
  })
  assert(!!bookingResult.booking.id, "Strategy session booking created")

  // 6. AI Agent Registry & Execution Pipeline
  const agents = AgentService.listAgents()
  assert(agents.length >= 4, "All 4 flagship Sthayu AI Agents loaded in Registry")

  const sdrExecution = await AgentService.executeAgent({
    agentCode: "STH-SDR-01",
    inputPayload: { leadEmail: "newlead@growth.com", intentScore: 0.94 },
    triggerSource: "test_suite",
  })
  assert(sdrExecution.status === "success", "Autonomous SDR agent executes successfully")
  assert(sdrExecution.latencyMs > 0, "Agent execution tracks deterministic latency")

  const opsExecution = await AgentService.executeAgent({
    agentCode: "STH-OPS-03",
    inputPayload: { tableA: "orders", tableB: "invoices" },
  })
  assert(opsExecution.status === "success", "Operations & Data Reconciliation Agent executes successfully")

  // 7. Workflow Engine Pipeline
  const workflows = WorkflowService.listWorkflows()
  assert(workflows.length >= 3, "Flagship workflow definitions active")

  const wfExecution = await WorkflowService.triggerWorkflow("wf_lead_ingest_01", {
    test: true,
    source: "unit_test",
  })
  assert(wfExecution.status === "completed", "Workflow pipeline completes 4-step execution")
  assert(wfExecution.stepResults.length === 4, "All workflow steps validated and logged")

  // 8. Audit Logging & System Metrics
  const auditLogs = db.getAuditLogs()
  assert(auditLogs.length > 0, "Audit logs actively recording security and business events")

  const stats = db.getSystemStats()
  assert(stats.totalLeads >= 2, "System stats reflect real-time database state")
  assert(stats.systemStatus === "100% OPERATIONAL", "System status reports 100% operational")

  console.log("==================================================")
  console.log(`  TEST RESULTS: ${passed} PASSED, ${failed} FAILED`)
  console.log("==================================================")

  if (failed > 0) {
    process.exit(1)
  }
}

runTestSuite().catch((err) => {
  console.error("Test execution encountered an error:", err)
  process.exit(1)
})
