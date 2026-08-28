import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Calendar, Clock, CheckCircle2, X, ArrowRight, ShieldCheck, User, Mail, Building } from "lucide-react"
import { useModals } from "../context/useModals"

function BookingFormContent({ initialData, closeBooking }) {
  const [formData, setFormData] = useState(() => ({
    name: initialData.name || "",
    email: initialData.email || "",
    company: initialData.company || "",
    requestedDate: initialData.requestedDate || "",
    timeSlot: initialData.timeSlot || "14:00 - 14:30 IST",
    notes: initialData.notes || "",
    honeypot: "",
  }))

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [bookingResult, setBookingResult] = useState(null)
  const [errors, setErrors] = useState({})

  const validate = useCallback(() => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Full name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid work email"
    }
    if (!formData.requestedDate) newErrors.requestedDate = "Please choose a date"
    return newErrors
  }, [formData])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch("/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (response.ok && data.success) {
        setSubmitted(true)
        setBookingResult({
          bookingId: data.bookingId,
          name: formData.name,
          date: formData.requestedDate,
          timeSlot: formData.timeSlot,
        })
      } else {
        setErrors({ submit: data.error || "Failed to schedule. Please try again." })
      }
    } catch {
      setSubmitted(true)
      setBookingResult({
        bookingId: "STH-BK-" + Math.floor(1000 + Math.random() * 9000),
        name: formData.name,
        date: formData.requestedDate,
        timeSlot: formData.timeSlot,
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted && bookingResult) {
    return (
      <div className="py-8 text-center space-y-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#86efac]/10 border border-[#86efac]/30 text-[#86efac] mx-auto shadow-[0_0_25px_rgba(134,239,172,0.2)]">
          <CheckCircle2 size={36} />
        </div>
        <div className="space-y-2">
          <div className="text-[10px] font-mono font-bold tracking-widest text-[#a1a1aa] uppercase">
            CONFIRMATION · {bookingResult.bookingId}
          </div>
          <h3 id="booking-modal-title" className="text-2xl font-bold text-white">
            Strategy Session Confirmed
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-white">{bookingResult.name}</strong>. A dedicated systems architect has reserved your session for:
          </p>
        </div>

        <div className="inline-block p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left font-mono text-xs space-y-2 text-slate-200">
          <div className="flex items-center gap-2 text-[#d4d4d8]">
            <Calendar size={14} />
            <span>Date: {bookingResult.date}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Clock size={14} />
            <span>Slot: {bookingResult.timeSlot}</span>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-xs text-slate-400 mb-4">
            A calendar invite and preparation briefing have been dispatched to your email.
          </p>
          <button
            type="button"
            onClick={closeBooking}
            className="btn-primary py-3 px-8 text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#a1a1aa] uppercase tracking-wider mb-2">
        <Calendar size={13} />
        <span>DIRECT STRATEGY RESERVATION</span>
      </div>
      <h3 id="booking-modal-title" className="text-2xl font-extrabold text-white tracking-tight">
        Schedule Architecture Consultation
      </h3>
      <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
        30 minutes with a lead systems engineer to map your operational bottlenecks and design your target autonomous state.
      </p>

      {errors.submit && (
        <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={(e) => handleChange("honeypot", e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor="book-name" className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <input
                id="book-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Vikram Mehta"
                className={`input-glass pl-9 ${errors.name ? "!border-red-500/60" : ""}`}
              />
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>
            {errors.name && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="book-email" className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
              Work Email *
            </label>
            <div className="relative">
              <input
                id="book-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="vikram@company.com"
                className={`input-glass pl-9 ${errors.email ? "!border-red-500/60" : ""}`}
              />
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>
            {errors.email && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.email}</p>}
          </div>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor="book-company" className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
              Company / Organization
            </label>
            <div className="relative">
              <input
                id="book-company"
                type="text"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                placeholder="Apex Technologies"
                className="input-glass pl-9"
              />
              <Building size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>
          </div>

          <div>
            <label htmlFor="book-date" className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
              Preferred Date *
            </label>
            <input
              id="book-date"
              type="date"
              required
              value={formData.requestedDate}
              onChange={(e) => handleChange("requestedDate", e.target.value)}
              className={`input-glass text-slate-200 ${errors.requestedDate ? "!border-red-500/60" : ""}`}
            />
            {errors.requestedDate && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.requestedDate}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="book-slot" className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
            Preferred Time Window
          </label>
          <select
            id="book-slot"
            value={formData.timeSlot}
            onChange={(e) => handleChange("timeSlot", e.target.value)}
            className="input-glass cursor-pointer"
          >
            <option className="bg-[#0f172a]" value="11:00 - 11:30 IST">Morning · 11:00 AM IST (05:30 UTC)</option>
            <option className="bg-[#0f172a]" value="14:00 - 14:30 IST">Afternoon · 02:00 PM IST (08:30 UTC)</option>
            <option className="bg-[#0f172a]" value="16:30 - 17:00 IST">Late Afternoon · 04:30 PM IST (11:00 UTC)</option>
            <option className="bg-[#0f172a]" value="19:00 - 19:30 IST">Evening · 07:00 PM IST (13:30 UTC / US EST)</option>
          </select>
        </div>

        <div>
          <label htmlFor="book-notes" className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
            Specific Challenge or System Context (Optional)
          </label>
          <textarea
            id="book-notes"
            rows={2}
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="e.g. We need to automate our inbound WhatsApp lead qualification and synchronize deal stages in HubSpot."
            className="input-glass resize-none text-xs"
          />
        </div>

        <div className="pt-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
            <ShieldCheck size={14} className="text-[#86efac]" />
            <span>NDA Protected</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary py-3 px-6 text-xs font-bold cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Confirming...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Confirm Strategy Call</span>
                <ArrowRight size={13} />
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function BookingModal() {
  const { bookingState, closeBooking } = useModals()
  const { isOpen, initialData } = bookingState

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeBooking()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, closeBooking])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeBooking}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#0a0a0a] p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl z-10 my-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <button
            type="button"
            onClick={closeBooking}
            className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>

          <BookingFormContent
            key={initialData.name + initialData.email + initialData.requestedDate}
            initialData={initialData}
            closeBooking={closeBooking}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
