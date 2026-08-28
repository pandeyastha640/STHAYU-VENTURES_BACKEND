import { Router, Request, Response } from "express"
import { z } from "zod"
import { BookingService } from "../../services/bookingService"
import { validateBody } from "../../middleware/validator"
import { createRateLimiter } from "../../middleware/rateLimiter"

const router = Router()

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("A valid email address is required"),
  company: z.string().optional().default(""),
  requestedDate: z.string().min(4, "Requested date is required"),
  timeSlot: z.string().optional(),
  notes: z.string().optional(),
  honeypot: z.string().optional(),
})

router.post(
  "/",
  createRateLimiter({ maxRequests: 10, windowMs: 60000 }),
  validateBody(bookingSchema),
  async (req: Request, res: Response, next) => {
    try {
      if (req.body.honeypot) {
        return res.json({ success: true, message: "Booking requested" })
      }

      const result = await BookingService.processBooking({
        name: req.body.name,
        email: req.body.email,
        company: req.body.company,
        requestedDate: req.body.requestedDate,
        timeSlot: req.body.timeSlot,
        notes: req.body.notes,
      })

      res.status(201).json({
        success: true,
        message: "Discovery session requested successfully.",
        bookingId: result.booking.id,
      })
    } catch (err) {
      next(err)
    }
  }
)

export default router
