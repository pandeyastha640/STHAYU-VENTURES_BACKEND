import { Router, Request, Response } from "express"
import { z } from "zod"
import { AssessmentService } from "../../services/assessmentService"
import { validateBody } from "../../middleware/validator"
import { createRateLimiter } from "../../middleware/rateLimiter"

const router = Router()

const assessmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("A valid work email address is required"),
  company: z.string().optional().default(""),
  teamSize: z.string().optional().default("10-50 Employees"),
  primaryFriction: z.string().min(3, "Primary friction point is required"),
  currentStack: z.string().optional().default(""),
  honeypot: z.string().optional(), // Spam defense honeypot field
})

// Public endpoint with strict rate limiting
router.post(
  "/",
  createRateLimiter({ maxRequests: 10, windowMs: 60000 }),
  validateBody(assessmentSchema),
  async (req: Request, res: Response, next) => {
    try {
      // 1. Bot & Honeypot detection
      if (req.body.honeypot) {
        // Silently drop bot submissions without tipping off spam scripts
        return res.json({
          success: true,
          message: "Assessment received successfully",
        })
      }

      const ipAddress =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        "unknown"

      const result = await AssessmentService.processAssessment({
        name: req.body.name,
        email: req.body.email,
        company: req.body.company,
        teamSize: req.body.teamSize,
        primaryFriction: req.body.primaryFriction,
        currentStack: req.body.currentStack,
        ipAddress,
      })

      res.status(201).json({
        success: true,
        message: "Diagnostic assessment logged and Architecture Blueprint dispatched successfully",
        data: {
          assessmentId: result.assessment.id,
          bottleneckScore: result.assessment.bottleneckScore,
          targetRoiMultiplier: result.assessment.targetRoiMultiplier,
          blueprintSummary: result.assessment.blueprintSummary,
        },
      })
    } catch (err) {
      next(err)
    }
  }
)

export default router
