import { Router } from "express"
import authRoutes from "./authRoutes"
import assessmentRoutes from "./assessmentRoutes"
import contactRoutes from "./contactRoutes"
import bookingRoutes from "./bookingRoutes"
import agentRoutes from "./agentRoutes"
import workflowRoutes from "./workflowRoutes"
import adminRoutes from "./adminRoutes"
import healthRoutes from "./healthRoutes"

const router = Router()

router.use("/auth", authRoutes)
router.use("/assessments", assessmentRoutes)
router.use("/contacts", contactRoutes)
router.use("/bookings", bookingRoutes)
router.use("/agents", agentRoutes)
router.use("/workflows", workflowRoutes)
router.use("/admin", adminRoutes)
router.use("/", healthRoutes)

export default router
