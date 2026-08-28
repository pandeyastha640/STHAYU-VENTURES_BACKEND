import { Request, Response, NextFunction } from "express"
import { ZodSchema, ZodError } from "zod"

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError || (error && typeof error === "object" && ("issues" in error || "errors" in error))) {
        const issues = (error as any).issues || (error as any).errors || []
        const errors = issues.map((e: any) => ({
          field: Array.isArray(e.path) ? e.path.join(".") : "",
          message: e.message || "Invalid field value",
        }))
        const firstMessage = errors[0]?.message || "Validation failed for incoming payload"
        return res.status(400).json({
          success: false,
          error: firstMessage,
          details: errors,
          code: "VALIDATION_ERROR",
        })
      }
      return res.status(400).json({
        success: false,
        error: "Invalid request payload format",
        code: "BAD_REQUEST",
      })
    }
  }
}
