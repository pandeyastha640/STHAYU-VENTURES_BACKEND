import { Router, Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { z } from "zod"
import { db } from "../../db/database"
import { config } from "../../config"
import { validateBody } from "../../middleware/validator"
import { authenticateToken, AuthenticatedRequest } from "../../middleware/auth"

const router = Router()

const loginSchema = z.object({
  email: z.string().email("A valid email address is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

router.post("/login", validateBody(loginSchema), (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = db.findUserByEmail(email)
  if (!user) {
    return res.status(401).json({
      success: false,
      error: "Invalid email or password",
      code: "INVALID_CREDENTIALS",
    })
  }

  const isValid = bcrypt.compareSync(password, user.passwordHash)
  if (!isValid) {
    return res.status(401).json({
      success: false,
      error: "Invalid email or password",
      code: "INVALID_CREDENTIALS",
    })
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role, email: user.email },
    config.jwtSecret,
    { expiresIn: "7d" }
  )

  db.logAudit({
    userId: user.id,
    userEmail: user.email,
    action: "USER_LOGIN_SUCCESS",
    resource: `user:${user.id}`,
    ipAddress: (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress,
  })

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  })
})

router.get("/me", authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: "Not authenticated" })
  }

  res.json({
    success: true,
    user: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
    },
  })
})

export default router
