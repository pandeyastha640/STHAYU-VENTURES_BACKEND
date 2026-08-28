import { Request, Response, NextFunction } from "express"
import { config } from "../config"

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  console.error(`[SERVER ERROR] ${req.method} ${req.originalUrl}:`, err.message)

  const status = (err as unknown as { status?: number }).status || 500
  const message = config.isProduction ? "An unexpected system error occurred. Please contact Sthayu Systems Support." : err.message

  res.status(status).json({
    success: false,
    error: message,
    code: "INTERNAL_SERVER_ERROR",
    timestamp: new Date().toISOString(),
  })
}
