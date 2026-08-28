import { db, Booking, Lead } from "../db/database"
import { NotificationService } from "./notificationService"

export interface CreateBookingInput {
  name: string
  email: string
  company?: string
  requestedDate: string
  timeSlot?: string
  notes?: string
}

export class BookingService {
  public static async processBooking(input: CreateBookingInput): Promise<{
    booking: Booking
    lead: Lead
  }> {
    const lead = db.createOrUpdateLead({
      name: input.name,
      email: input.email,
      company: input.company || "Direct Booking",
      source: "booking",
      status: "qualified",
      score: 85,
      notes: `Strategy Call booked for: ${input.requestedDate} (${input.timeSlot || "Flexible"})`,
    })

    const booking = db.createBooking({
      leadId: lead.id,
      name: input.name,
      email: input.email,
      company: input.company || "",
      requestedDate: input.requestedDate,
      timeSlot: input.timeSlot,
      notes: input.notes,
      status: "pending",
    })

    db.logAudit({
      action: "BOOKING_CREATED",
      resource: `booking:${booking.id}`,
      details: {
        leadId: lead.id,
        email: booking.email,
        date: booking.requestedDate,
      },
    })

    NotificationService.notifyNewBooking({
      name: booking.name,
      email: booking.email,
      company: booking.company,
      requestedDate: booking.requestedDate,
    }).catch((err) => console.error("Async booking notification error:", err))

    return { booking, lead }
  }
}
