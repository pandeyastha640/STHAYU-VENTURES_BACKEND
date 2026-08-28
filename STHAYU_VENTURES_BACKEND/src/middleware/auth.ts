import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { config } from "../config"
import { db, User } from "../db/database"

export interface AuthenticatedRequest extends Request {
  user?: User
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Authentication required",
      code: "UNAUTHORIZED",
    })
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret) as { userId: string; role: string }
    const user = db.findUserById(payload.userId)

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found or session revoked",
        code: "USER_NOT_FOUND",
      })
    }

    req.user = user
    next()
  } catch (_err) {
    return res.status(403).json({
      success: false,
      error: "Invalid or expired authentication token",
      code: "TOKEN_INVALID",
    })
  }
}

export function requireRole(allowedRoles: Array<"admin" | "team" | "client">) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: "Insufficient permissions to access this administrative resource",
        code: "FORBIDDEN",
      })
    }
    next()
  }
}
