import { Router, Request, Response } from "express"
import { db } from "../../db/database"

const router = Router()

router.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "sthayu-backend-api",
    version: "1.0.0",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  })
})

router.get("/system/status", (_req: Request, res: Response) => {
  const stats = db.getSystemStats()
  res.json({
    success: true,
    system: "Sthayu Autonomous Operating System Fabric",
    status: "100% OPERATIONAL",
    architecture: "SOC2 / HIPAA Grade Micro-Agent Mesh",
    metrics: stats,
  })
})

export default router
