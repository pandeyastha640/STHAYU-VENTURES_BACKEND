import fs from "fs"
import path from "path"
import bcrypt from "bcryptjs"
import { config } from "../config"

export interface User {
  id: string
  email: string
  passwordHash: string
  name: string
  role: "admin" | "team" | "client"
  createdAt: string
  updatedAt: string
}

export interface Lead {
  id: string
  name: string
  email: string
  company?: string
  teamSize?: string
  source: string // "assessment" | "contact" | "booking" | "direct"
  status: "new" | "qualified" | "contacted" | "nurturing" | "converted" | "closed"
  score: number
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Assessment {
  id: string
  leadId: string
  name: string
  email: string
  company: string
  teamSize: string
  primaryFriction: string
  currentStack: string
  bottleneckScore: number
  targetRoiMultiplier: string
  blueprintSummary: {
    frictionAnalysis: string
    recommendedAgents: string[]
    recommendedWorkflows: string[]
    estimatedHoursSavedPerWeek: number
    targetImplementationDays: number
  }
  status: "pending_review" | "blueprint_dispatched" | "consultation_scheduled"
  ipAddress?: string
  createdAt: string
}

export interface ContactEnquiry {
  id: string
  leadId?: string
  name: string
  email: string
  company?: string
  subject: string
  message: string
  enquiryType: "architecture_audit" | "enterprise_quote" | "partnership" | "general"
  status: "unread" | "in_review" | "responded" | "archived"
  ipAddress?: string
  createdAt: string
}

export interface Booking {
  id: string
  leadId?: string
  name: string
  email: string
  company?: string
  requestedDate: string
  timeSlot?: string
  status: "pending" | "confirmed" | "completed" | "rescheduled" | "cancelled"
  notes?: string
  createdAt: string
}

export interface AIAgent {
  id: string
  code: string // e.g. "STH-SDR-01"
  name: string
  category: "revenue_growth" | "support_ops" | "data_reconciliation" | "voice_telephony"
  modelTier: string
  status: "active" | "standby" | "maintenance"
  description: string
  capabilities: string[]
  executionCount: number
  successRate: number
  avgLatencyMs: number
  createdAt: string
}

export interface AgentExecution {
  id: string
  agentId: string
  agentCode: string
  triggerSource: string
  inputPayload: Record<string, unknown>
  outputPayload?: Record<string, unknown>
  status: "success" | "running" | "failed" | "escalated"
  latencyMs: number
  tokensUsed: number
  errorMessage?: string
  createdAt: string
}

export interface Workflow {
  id: string
  code: string
  name: string
  triggerType: "webhook" | "cron" | "event" | "manual"
  webhookPath?: string
  active: boolean
  executionCount: number
  lastRunAt?: string
  description: string
  createdAt: string
}

export interface WorkflowExecution {
  id: string
  workflowId: string
  workflowCode: string
  status: "completed" | "processing" | "failed"
  triggerPayload: Record<string, unknown>
  stepResults: Array<{ stepName: string; status: string; durationMs: number }>
  latencyMs: number
  errorMessage?: string
  createdAt: string
}

export interface AuditLog {
  id: string
  userId?: string
  userEmail?: string
  action: string
  resource: string
  details?: Record<string, unknown>
  ipAddress?: string
  createdAt: string
}

export interface SystemMetric {
  id: string
  name: string
  value: number
  unit: string
  timestamp: string
}

interface DatabaseSchema {
  users: User[]
  leads: Lead[]
  assessments: Assessment[]
  contacts: ContactEnquiry[]
  bookings: Booking[]
  aiAgents: AIAgent[]
  agentExecutions: AgentExecution[]
  workflows: Workflow[]
  workflowExecutions: WorkflowExecution[]
  auditLogs: AuditLog[]
  systemMetrics: SystemMetric[]
}

class Database {
  private dbPath: string
  private data: DatabaseSchema

  constructor() {
    const dataDir = path.join(process.cwd(), "data")
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    this.dbPath = path.join(dataDir, "sthayu_db.json")
    this.data = this.loadDatabase()
    this.seedInitialData()
  }

  private loadDatabase(): DatabaseSchema {
    try {
      if (fs.existsSync(this.dbPath)) {
        const raw = fs.readFileSync(this.dbPath, "utf-8")
        return JSON.parse(raw)
      }
    } catch (e) {
      console.error("Failed to load existing database, initializing fresh:", e)
    }

    return {
      users: [],
      leads: [],
      assessments: [],
      contacts: [],
      bookings: [],
      aiAgents: [],
      agentExecutions: [],
      workflows: [],
      workflowExecutions: [],
      auditLogs: [],
      systemMetrics: [],
    }
  }

  private saveDatabase(): void {
    try {
      fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2), "utf-8")
    } catch (e) {
      console.error("Failed to persist database to disk:", e)
    }
  }

  private seedInitialData(): void {
    let modified = false

    // 1. Seed Admin User
    if (this.data.users.length === 0) {
      const passwordHash = bcrypt.hashSync(config.adminInitialPassword, 10)
      this.data.users.push({
        id: "usr_admin_01",
        email: config.adminEmail,
        passwordHash,
        name: "Sthayu Systems Administrator",
        role: "admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      modified = true
    }

    // 2. Seed Predefined Sthayu AI Agent Workforce Roster
    if (this.data.aiAgents.length === 0) {
      const defaultAgents: AIAgent[] = [
        {
          id: "agent_sdr_01",
          code: "STH-SDR-01",
          name: "Autonomous Revenue & SDR Agent",
          category: "revenue_growth",
          modelTier: "Enterprise Neural v4",
          status: "active",
          description: "Multi-channel lead qualification, intent parsing, calendar routing, and CRM pipeline sync.",
          capabilities: ["Inbound Intent Parsing", "ICP Scoring", "Automated Booking", "CRM Sync"],
          executionCount: 1420,
          successRate: 99.4,
          avgLatencyMs: 420,
          createdAt: new Date().toISOString(),
        },
        {
          id: "agent_sup_02",
          code: "STH-SUP-02",
          name: "Tier-1 Autonomous Support Engine",
          category: "support_ops",
          modelTier: "Zero-Latency Hybrid RAG",
          status: "active",
          description: "Instant resolution across documentation, knowledge bases, ticketing escalation, and live telemetry.",
          capabilities: ["RAG Knowledge Retrieval", "Ticket Triage", "Deflection Routing", "Human Escalation"],
          executionCount: 3840,
          successRate: 98.9,
          avgLatencyMs: 310,
          createdAt: new Date().toISOString(),
        },
        {
          id: "agent_ops_03",
          code: "STH-OPS-03",
          name: "Operations & Data Reconciliation Agent",
          category: "data_reconciliation",
          modelTier: "Deterministic SQL / ETL Core",
          status: "active",
          description: "Cross-platform data reconciliation, invoice OCR, inventory balancing, and automated webhook dispatch.",
          capabilities: ["SQL Cross-Join Verification", "Discrepancy Flagging", "Webhook Dispatch", "Ledger Sync"],
          executionCount: 9200,
          successRate: 99.9,
          avgLatencyMs: 180,
          createdAt: new Date().toISOString(),
        },
        {
          id: "agent_vox_04",
          code: "STH-VOX-04",
          name: "Sub-200ms Voice Telephony Agent",
          category: "voice_telephony",
          modelTier: "Ultra-Low Latency Audio",
          status: "active",
          description: "Real-time voice qualification, appointment confirmations, and structured call transcription.",
          capabilities: ["Full-Duplex Speech", "Noise Filtration", "Real-Time Telephony", "CRM Call Logging"],
          executionCount: 650,
          successRate: 97.8,
          avgLatencyMs: 195,
          createdAt: new Date().toISOString(),
        },
      ]

      this.data.aiAgents = defaultAgents
      modified = true
    }

    // 3. Seed Predefined Core Workflows
    if (this.data.workflows.length === 0) {
      this.data.workflows = [
        {
          id: "wf_lead_ingest_01",
          code: "WF-LEAD-QUAL-01",
          name: "Lead Ingestion & Diagnostic Pipeline",
          triggerType: "webhook",
          webhookPath: "/api/v1/workflows/webhooks/lead-ingest",
          active: true,
          executionCount: 340,
          lastRunAt: new Date().toISOString(),
          description: "Validates incoming diagnostic submissions, computes bottleneck scores, and sends architectural blueprint.",
          createdAt: new Date().toISOString(),
        },
        {
          id: "wf_data_sync_02",
          code: "WF-DATA-SYNC-02",
          name: "Bi-Directional CRM & ERP Event Sync",
          triggerType: "event",
          active: true,
          executionCount: 1890,
          lastRunAt: new Date().toISOString(),
          description: "Syncs deal stages and contact records between HubSpot, PostgreSQL, and internal databases.",
          createdAt: new Date().toISOString(),
        },
        {
          id: "wf_agent_guardrail_03",
          code: "WF-GUARD-03",
          name: "Agent Output Safety & Escalation Guardrail",
          triggerType: "event",
          active: true,
          executionCount: 5200,
          lastRunAt: new Date().toISOString(),
          description: "Filters output confidence, redacts sensitive tokens, and flags edge cases for human review.",
          createdAt: new Date().toISOString(),
        },
      ]
      modified = true
    }

    if (modified) {
      this.saveDatabase()
    }
  }

  // --- Users ---
  public findUserByEmail(email: string): User | undefined {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  }

  public findUserById(id: string): User | undefined {
    return this.data.users.find((u) => u.id === id)
  }

  // --- Leads ---
  public createOrUpdateLead(leadData: Omit<Lead, "id" | "createdAt" | "updatedAt">): Lead {
    const existing = this.data.leads.find((l) => l.email.toLowerCase() === leadData.email.toLowerCase())
    const now = new Date().toISOString()

    if (existing) {
      Object.assign(existing, {
        ...leadData,
        updatedAt: now,
        score: Math.max(existing.score, leadData.score),
      })
      this.saveDatabase()
      return existing
    }

    const newLead: Lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...leadData,
      createdAt: now,
      updatedAt: now,
    }

    this.data.leads.unshift(newLead)
    this.saveDatabase()
    return newLead
  }

  public getLeads(): Lead[] {
    return this.data.leads
  }

  // --- Assessments ---
  public createAssessment(assessmentData: Omit<Assessment, "id" | "createdAt">): Assessment {
    const assessment: Assessment = {
      id: `asm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...assessmentData,
      createdAt: new Date().toISOString(),
    }

    this.data.assessments.unshift(assessment)
    this.saveDatabase()
    return assessment
  }

  public getAssessments(): Assessment[] {
    return this.data.assessments
  }

  // --- Contacts ---
  public createContact(contactData: Omit<ContactEnquiry, "id" | "createdAt">): ContactEnquiry {
    const contact: ContactEnquiry = {
      id: `cnt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...contactData,
      createdAt: new Date().toISOString(),
    }

    this.data.contacts.unshift(contact)
    this.saveDatabase()
    return contact
  }

  public getContacts(): ContactEnquiry[] {
    return this.data.contacts
  }

  // --- Bookings ---
  public createBooking(bookingData: Omit<Booking, "id" | "createdAt">): Booking {
    const booking: Booking = {
      id: `bkg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...bookingData,
      createdAt: new Date().toISOString(),
    }

    this.data.bookings.unshift(booking)
    this.saveDatabase()
    return booking
  }

  public getBookings(): Booking[] {
    return this.data.bookings
  }

  // --- AI Agents ---
  public getAgents(): AIAgent[] {
    return this.data.aiAgents
  }

  public findAgentByCode(code: string): AIAgent | undefined {
    return this.data.aiAgents.find((a) => a.code === code || a.id === code)
  }

  public recordAgentExecution(execution: Omit<AgentExecution, "id" | "createdAt">): AgentExecution {
    const item: AgentExecution = {
      id: `exec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...execution,
      createdAt: new Date().toISOString(),
    }

    this.data.agentExecutions.unshift(item)

    // Update agent counter
    const agent = this.findAgentByCode(execution.agentCode)
    if (agent) {
      agent.executionCount += 1
    }

    this.saveDatabase()
    return item
  }

  public getAgentExecutions(limit = 50): AgentExecution[] {
    return this.data.agentExecutions.slice(0, limit)
  }

  // --- Workflows ---
  public getWorkflows(): Workflow[] {
    return this.data.workflows
  }

  public findWorkflowById(id: string): Workflow | undefined {
    return this.data.workflows.find((w) => w.id === id || w.code === id)
  }

  public recordWorkflowExecution(execution: Omit<WorkflowExecution, "id" | "createdAt">): WorkflowExecution {
    const item: WorkflowExecution = {
      id: `wfx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...execution,
      createdAt: new Date().toISOString(),
    }

    this.data.workflowExecutions.unshift(item)

    const wf = this.findWorkflowById(execution.workflowId)
    if (wf) {
      wf.executionCount += 1
      wf.lastRunAt = item.createdAt
    }

    this.saveDatabase()
    return item
  }

  public getWorkflowExecutions(limit = 50): WorkflowExecution[] {
    return this.data.workflowExecutions.slice(0, limit)
  }

  // --- Audit Logs ---
  public logAudit(log: Omit<AuditLog, "id" | "createdAt">): void {
    const item: AuditLog = {
      id: `aud_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...log,
      createdAt: new Date().toISOString(),
    }
    this.data.auditLogs.unshift(item)
    // Keep max 1000 audit logs
    if (this.data.auditLogs.length > 1000) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 1000)
    }
    this.saveDatabase()
  }

  public getAuditLogs(limit = 100): AuditLog[] {
    return this.data.auditLogs.slice(0, limit)
  }

  // --- Stats / Overview ---
  public getSystemStats() {
    return {
      totalLeads: this.data.leads.length,
      totalAssessments: this.data.assessments.length,
      totalContacts: this.data.contacts.length,
      totalBookings: this.data.bookings.length,
      activeAgents: this.data.aiAgents.filter((a) => a.status === "active").length,
      totalAgentExecutions: this.data.agentExecutions.length,
      activeWorkflows: this.data.workflows.filter((w) => w.active).length,
      totalWorkflowExecutions: this.data.workflowExecutions.length,
      systemStatus: "100% OPERATIONAL",
      uptimeSeconds: process.uptime(),
      timestamp: new Date().toISOString(),
    }
  }
}

export const db = new Database()
