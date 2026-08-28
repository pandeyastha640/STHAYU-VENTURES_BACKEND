import { db, AIAgent, AgentExecution } from "../db/database"

export interface ExecuteAgentRequest {
  agentCode: string
  inputPayload: Record<string, unknown>
  triggerSource?: string
}

export class AgentService {
  public static listAgents(): AIAgent[] {
    return db.getAgents()
  }

  public static getAgent(code: string): AIAgent | undefined {
    return db.findAgentByCode(code)
  }

  public static async executeAgent(request: ExecuteAgentRequest): Promise<AgentExecution> {
    const startTime = Date.now()
    const agent = db.findAgentByCode(request.agentCode)

    if (!agent) {
      throw new Error(`AI Agent with code ${request.agentCode} not found in registry`)
    }

    if (agent.status !== "active") {
      throw new Error(`AI Agent ${agent.code} is currently in ${agent.status} mode`)
    }

    const latencyMs = Math.floor(Math.random() * 150) + (agent.avgLatencyMs - 50)
    const tokensUsed = Math.floor(Math.random() * 300) + 180

    let outputPayload: Record<string, unknown> = {}
    const status: "success" | "running" | "failed" | "escalated" = "success"

    switch (agent.code) {
      case "STH-SDR-01":
        outputPayload = {
          intent: "HIGH_QUALIFIED_INBOUND",
          confidenceScore: 0.96,
          actionTaken: "CALENDAR_ROUTED_AND_CRM_ENRICHED",
          extractedFields: {
            leadScore: 92,
            recommendedTier: "Growth Engine",
            nextStep: "Discovery Blueprint Call",
          },
        }
        break
      case "STH-SUP-02":
        outputPayload = {
          resolved: true,
          deflected: true,
          confidenceScore: 0.98,
          responseCategory: "ARCHITECTURE_FAQ",
          citationSources: ["Sthayu_Vector_RAG_v2.0"],
        }
        break
      case "STH-OPS-03":
        outputPayload = {
          reconciledRecords: 142,
          discrepanciesFound: 0,
          verifiedChecksum: "0x8f2a1b9e",
          syncedSystems: ["PostgreSQL", "HubSpot", "Stripe"],
        }
        break
      case "STH-VOX-04":
        outputPayload = {
          callStatus: "COMPLETED",
          latencyP95Ms: 188,
          transcriptionConfidence: 0.97,
          appointmentConfirmed: true,
        }
        break
      default:
        outputPayload = {
          processed: true,
          agent: agent.code,
          timestamp: new Date().toISOString(),
        }
        break
    }

    const execution = db.recordAgentExecution({
      agentId: agent.id,
      agentCode: agent.code,
      triggerSource: request.triggerSource || "api_direct",
      inputPayload: request.inputPayload,
      outputPayload,
      status,
      latencyMs: Math.max(12, Date.now() - startTime + latencyMs),
      tokensUsed,
    })

    db.logAudit({
      action: "AGENT_EXECUTION_COMPLETED",
      resource: `agent:${agent.code}`,
      details: {
        executionId: execution.id,
        status: execution.status,
        tokensUsed,
        latencyMs: execution.latencyMs,
      },
    })

    return execution
  }

  public static getExecutionHistory(limit = 50): AgentExecution[] {
    return db.getAgentExecutions(limit)
  }
}
