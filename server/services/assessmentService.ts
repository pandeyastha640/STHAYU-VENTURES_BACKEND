import { db, Assessment, Lead } from "../db/database"
import { NotificationService } from "./notificationService"

export interface CreateAssessmentInput {
  name: string
  email: string
  company?: string
  teamSize?: string
  primaryFriction: string
  currentStack?: string
  ipAddress?: string
}

export class AssessmentService {
  public static calculateBottleneckAndBlueprint(friction: string, teamSize = "10-50 Employees") {
    let bottleneckScore = 75
    let targetRoiMultiplier = "3.8x"
    let recommendedAgents = ["STH-SDR-01"]
    let recommendedWorkflows = ["WF-LEAD-QUAL-01"]
    let estimatedHoursSavedPerWeek = 28
    let targetImplementationDays = 14

    switch (friction) {
      case "Lead Qualification & Sales Follow-Up":
        bottleneckScore = 88
        targetRoiMultiplier = "4.5x"
        recommendedAgents = ["STH-SDR-01", "STH-VOX-04"]
        recommendedWorkflows = ["WF-LEAD-QUAL-01", "WF-DATA-SYNC-02"]
        estimatedHoursSavedPerWeek = 35
        targetImplementationDays = 14
        break
      case "Tier-1 Support & Customer Inquiries":
        bottleneckScore = 82
        targetRoiMultiplier = "4.2x"
        recommendedAgents = ["STH-SUP-02"]
        recommendedWorkflows = ["WF-GUARD-03"]
        estimatedHoursSavedPerWeek = 40
        targetImplementationDays = 14
        break
      case "Multi-System Data Sync & Reconciliation":
        bottleneckScore = 91
        targetRoiMultiplier = "5.0x"
        recommendedAgents = ["STH-OPS-03"]
        recommendedWorkflows = ["WF-DATA-SYNC-02", "WF-GUARD-03"]
        estimatedHoursSavedPerWeek = 45
        targetImplementationDays = 21
        break
      case "Voice Telephony & Call Qualification":
        bottleneckScore = 85
        targetRoiMultiplier = "3.9x"
        recommendedAgents = ["STH-VOX-04", "STH-SDR-01"]
        recommendedWorkflows = ["WF-LEAD-QUAL-01"]
        estimatedHoursSavedPerWeek = 30
        targetImplementationDays = 18
        break
      default:
        bottleneckScore = 78
        targetRoiMultiplier = "3.5x"
        recommendedAgents = ["STH-SDR-01", "STH-OPS-03"]
        recommendedWorkflows = ["WF-DATA-SYNC-02"]
        estimatedHoursSavedPerWeek = 25
        targetImplementationDays = 21
        break
    }

    if (teamSize.includes("250+")) {
      bottleneckScore = Math.min(99, bottleneckScore + 6)
      estimatedHoursSavedPerWeek *= 2.5
    }

    const blueprintSummary = {
      frictionAnalysis: `High manual drag identified in "${friction}". Existing multi-step human handoffs can be replaced with autonomous event orchestration.`,
      recommendedAgents,
      recommendedWorkflows,
      estimatedHoursSavedPerWeek,
      targetImplementationDays,
    }

    return { bottleneckScore, targetRoiMultiplier, blueprintSummary }
  }

  public static async processAssessment(input: CreateAssessmentInput): Promise<{
    assessment: Assessment
    lead: Lead
  }> {
    // 1. Calculate Architecture Blueprint analysis
    const { bottleneckScore, targetRoiMultiplier, blueprintSummary } = this.calculateBottleneckAndBlueprint(
      input.primaryFriction,
      input.teamSize
    )

    // 2. Create or sync Lead
    const lead = db.createOrUpdateLead({
      name: input.name,
      email: input.email,
      company: input.company || "Direct Individual",
      teamSize: input.teamSize || "10-50 Employees",
      source: "assessment",
      status: "qualified",
      score: bottleneckScore,
      notes: `Diagnostic: ${input.primaryFriction} | Stack: ${input.currentStack || "Unspecified"}`,
    })

    // 3. Store Assessment
    const assessment = db.createAssessment({
      leadId: lead.id,
      name: input.name,
      email: input.email,
      company: input.company || "",
      teamSize: input.teamSize || "10-50 Employees",
      primaryFriction: input.primaryFriction,
      currentStack: input.currentStack || "",
      bottleneckScore,
      targetRoiMultiplier,
      blueprintSummary,
      status: "blueprint_dispatched",
      ipAddress: input.ipAddress,
    })

    // 4. Audit Log
    db.logAudit({
      action: "ASSESSMENT_SUBMITTED",
      resource: `assessment:${assessment.id}`,
      details: {
        leadId: lead.id,
        email: assessment.email,
        primaryFriction: assessment.primaryFriction,
        score: bottleneckScore,
      },
      ipAddress: input.ipAddress,
    })

    // 5. Trigger notification asynchronously
    NotificationService.notifyNewAssessment({
      name: assessment.name,
      email: assessment.email,
      company: assessment.company,
      primaryFriction: assessment.primaryFriction,
      bottleneckScore,
      targetRoiMultiplier,
    }).catch((err) => console.error("Async notification error:", err))

    return { assessment, lead }
  }
}
