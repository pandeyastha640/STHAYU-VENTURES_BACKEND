import { Router, Request, Response } from "express"
import { z } from "zod"
import { ContactService } from "../../services/contactService"
import { validateBody } from "../../middleware/validator"
import { createRateLimiter } from "../../middleware/rateLimiter"

const router = Router()

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("A valid email address is required"),
  company: z.string().optional().default(""),
  subject: z.string().min(3, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000),
  enquiryType: z.enum(["architecture_audit", "enterprise_quote", "partnership", "general"]).optional(),
  honeypot: z.string().optional(),
})

router.post(
  "/",
  createRateLimiter({ maxRequests: 10, windowMs: 60000 }),
  validateBody(contactSchema),
  async (req: Request, res: Response, next) => {
    try {
      if (req.body.honeypot) {
        return res.json({ success: true, message: "Enquiry received successfully" })
      }

      const ipAddress =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        "unknown"

      const result = await ContactService.processContact({
        name: req.body.name,
        email: req.body.email,
        company: req.body.company,
        subject: req.body.subject,
        message: req.body.message,
        enquiryType: req.body.enquiryType,
        ipAddress,
      })

      res.status(201).json({
        success: true,
        message: "Enquiry submitted successfully. A systems architect will respond shortly.",
        contactId: result.contact.id,
      })
    } catch (err) {
      next(err)
    }
  }
)

export default router
