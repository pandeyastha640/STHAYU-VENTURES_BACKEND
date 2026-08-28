import { Router, Request, Response } from "express"
import { z } from "zod"
import { AgentService } from "../../services/agentService"
import { validateBody } from "../../middleware/validator"
import { authenticateToken, requireRole } from "../../middleware/auth"

const router = Router()

// Public listing of AI agent capabilities and architecture
router.get("/", (_req: Request, res: Response) => {
  const agents = AgentService.listAgents()
  res.json({
    success: true,
    data: agents,
  })
})

const executeSchema = z.object({
  agentCode: z.string().min(2),
  inputPayload: z.record(z.unknown()).default({}),
  triggerSource: z.string().optional().default("api_direct"),
})

// Protected execution endpoint
router.post("/execute", validateBody(executeSchema), async (req: Request, res: Response, next) => {
  try {
    const execution = await AgentService.executeAgent({
      agentCode: req.body.agentCode,
      inputPayload: req.body.inputPayload,
      triggerSource: req.body.triggerSource,
    })

    res.json({
      success: true,
      data: execution,
    })
  } catch (err) {
    next(err)
  }
})

// Admin inspection endpoint
router.get("/executions", authenticateToken, requireRole(["admin", "team"]), (_req: Request, res: Response) => {
  const history = AgentService.getExecutionHistory()
  res.json({
    success: true,
    data: history,
  })
})

export default router
