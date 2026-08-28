import { db, ContactEnquiry, Lead } from "../db/database"
import { NotificationService } from "./notificationService"

export interface CreateContactInput {
  name: string
  email: string
  company?: string
  subject: string
  message: string
  enquiryType?: "architecture_audit" | "enterprise_quote" | "partnership" | "general"
  ipAddress?: string
}

export class ContactService {
  public static async processContact(input: CreateContactInput): Promise<{
    contact: ContactEnquiry
    lead: Lead
  }> {
    const lead = db.createOrUpdateLead({
      name: input.name,
      email: input.email,
      company: input.company || "Individual / Direct",
      source: "contact",
      status: "new",
      score: 70,
      notes: `Enquiry Subject: ${input.subject} | Type: ${input.enquiryType || "general"}`,
    })

    const contact = db.createContact({
      leadId: lead.id,
      name: input.name,
      email: input.email,
      company: input.company || "",
      subject: input.subject,
      message: input.message,
      enquiryType: input.enquiryType || "general",
      status: "unread",
      ipAddress: input.ipAddress,
    })

    db.logAudit({
      action: "CONTACT_ENQUIRY_CREATED",
      resource: `contact:${contact.id}`,
      details: {
        leadId: lead.id,
        email: contact.email,
        subject: contact.subject,
      },
      ipAddress: input.ipAddress,
    })

    NotificationService.notifyNewContact({
      name: contact.name,
      email: contact.email,
      company: contact.company,
      subject: contact.subject,
      enquiryType: contact.enquiryType,
      message: contact.message,
    }).catch((err) => console.error("Async contact notification error:", err))

    return { contact, lead }
  }
}
