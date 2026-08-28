import { Request, Response, NextFunction } from "express"
import { config } from "../config"

interface RateLimitRecord {
  count: number
  resetTime: number
}

const ipBuckets = new Map<string, RateLimitRecord>()

export function createRateLimiter(options?: { maxRequests?: number; windowMs?: number }) {
  const max = options?.maxRequests || config.rateLimitMaxRequests
  const windowMs = options?.windowMs || config.rateLimitWindowMs

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown"
    const now = Date.now()

    const record = ipBuckets.get(ip)

    if (!record || now > record.resetTime) {
      ipBuckets.set(ip, { count: 1, resetTime: now + windowMs })
      res.setHeader("X-RateLimit-Limit", max)
      res.setHeader("X-RateLimit-Remaining", max - 1)
      return next()
    }

    if (record.count >= max) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000)
      res.setHeader("Retry-After", retryAfterSeconds)
      return res.status(429).json({
        success: false,
        error: "Too many requests. Please slow down and try again later.",
        code: "RATE_LIMIT_EXCEEDED",
        retryAfter: retryAfterSeconds,
      })
    }

    record.count += 1
    res.setHeader("X-RateLimit-Limit", max)
    res.setHeader("X-RateLimit-Remaining", max - record.count)
    next()
  }
}
