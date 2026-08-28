import { useState, useCallback } from "react"
import { ModalContext } from "./modalContextInstance"

export function ModalProvider({ children }) {
  const [bookingState, setBookingState] = useState({
    isOpen: false,
    initialData: { name: "", email: "", company: "", notes: "", requestedDate: "", timeSlot: "14:00 - 14:30 IST" },
  })

  const [contactState, setContactState] = useState({
    isOpen: false,
    initialData: { name: "", email: "", company: "", subject: "", message: "", enquiryType: "architecture_audit" },
  })

  const [isAdminOpen, setIsAdminOpen] = useState(false)

  const openBooking = useCallback((data = {}) => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dateStr = tomorrow.toISOString().split("T")[0]

    setBookingState({
      isOpen: true,
      initialData: {
        name: data.name || "",
        email: data.email || "",
        company: data.company || "",
        notes: data.notes || "",
        requestedDate: data.requestedDate || dateStr,
        timeSlot: data.timeSlot || "14:00 - 14:30 IST",
      },
    })
  }, [])

  const closeBooking = useCallback(() => {
    setBookingState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const openContact = useCallback((data = {}) => {
    setContactState({
      isOpen: true,
      initialData: {
        name: data.name || "",
        email: data.email || "",
        company: data.company || "",
        subject: data.subject || "Enterprise System Architecture Inquiry",
        message: data.message || "",
        enquiryType: data.enquiryType || "architecture_audit",
      },
    })
  }, [])

  const closeContact = useCallback(() => {
    setContactState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const openAdmin = useCallback(() => setIsAdminOpen(true), [])
  const closeAdmin = useCallback(() => setIsAdminOpen(false), [])

  return (
    <ModalContext.Provider
      value={{
        bookingState,
        openBooking,
        closeBooking,
        contactState,
        openContact,
        closeContact,
        isAdminOpen,
        openAdmin,
        closeAdmin,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
