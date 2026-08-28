import { Router, Request, Response } from "express"
import { WorkflowService } from "../../services/workflowService"
import { authenticateToken, requireRole } from "../../middleware/auth"

const router = Router()

router.get("/", (_req: Request, res: Response) => {
  const workflows = WorkflowService.listWorkflows()
  res.json({
    success: true,
    data: workflows,
  })
})

router.post("/:id/trigger", authenticateToken, requireRole(["admin", "team"]), async (req: Request, res: Response, next) => {
  try {
    const execution = await WorkflowService.triggerWorkflow(req.params.id, req.body || {})
    res.json({
      success: true,
      data: execution,
    })
  } catch (err) {
    next(err)
  }
})

router.post("/webhooks/:webhookId", async (req: Request, res: Response, next) => {
  try {
    const webhookId = req.params.webhookId
    console.log(`[INCOMING WEBHOOK] ${webhookId}:`, req.body)

    const execution = await WorkflowService.triggerWorkflow("wf_lead_ingest_01", req.body || {})

    res.json({
      success: true,
      message: "Webhook processed and queued for autonomous pipeline",
      executionId: execution.id,
    })
  } catch (err) {
    next(err)
  }
})

export default router
