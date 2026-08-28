import { Router, Request, Response } from "express"
import { db } from "../../db/database"
import { authenticateToken, requireRole } from "../../middleware/auth"

const router = Router()

// All admin routes strictly require valid authentication and admin/team privileges
router.use(authenticateToken, requireRole(["admin", "team"]))

router.get("/stats", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: db.getSystemStats(),
  })
})

router.get("/leads", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: db.getLeads(),
  })
})

router.get("/assessments", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: db.getAssessments(),
  })
})

router.get("/contacts", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: db.getContacts(),
  })
})

router.get("/bookings", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: db.getBookings(),
  })
})

router.get("/audit-logs", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: db.getAuditLogs(),
  })
})

export default router
