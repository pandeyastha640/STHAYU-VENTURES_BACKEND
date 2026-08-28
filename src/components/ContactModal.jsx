import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { CheckCircle2, X, MessageSquare, ShieldCheck, Mail, Building, User } from "lucide-react"
import { useModals } from "../context/useModals"

function ContactFormContent({ initialData, closeContact }) {
  const [formData, setFormData] = useState(() => ({
    name: initialData.name || "",
    email: initialData.email || "",
    company: initialData.company || "",
    subject: initialData.subject || "Strategic Architecture Inquiry",
    message: initialData.message || "",
    enquiryType: initialData.enquiryType || "architecture_audit",
    honeypot: "",
  }))

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = useCallback(() => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Full name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid work email"
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }
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
      const response = await fetch("/api/v1/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (response.ok && data.success) {
        setSubmitted(true)
      } else {
        setErrors({ submit: data.error || "Submission failed. Please try again." })
      }
    } catch {
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-8 text-center space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#86efac]/10 border border-[#86efac]/30 text-[#86efac] mx-auto shadow-[0_0_25px_rgba(134,239,172,0.2)]">
          <CheckCircle2 size={36} />
        </div>
        <h3 id="contact-modal-title" className="text-2xl font-bold text-white">
          Inquiry Dispatched to Engineering Team
        </h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          Thank you, <strong className="text-white">{formData.name}</strong>. Our systems architecture group has received your requirements and will respond within 4 business hours.
        </p>
        <button
          type="button"
          onClick={closeContact}
          className="mt-4 btn-primary py-3 px-8 text-xs font-bold"
        >
          Close
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#a1a1aa] uppercase tracking-wider mb-2">
        <MessageSquare size={13} />
        <span>DIRECT FOUNDER & ARCHITECT CONTACT</span>
      </div>
      <h3 id="contact-modal-title" className="text-2xl font-extrabold text-white tracking-tight">
        Submit Enterprise Requirement
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-slate-400">
        Direct channel for custom LLM deployments, on-prem VPC integrations, or enterprise RFPs.
      </p>

      {errors.submit && (
        <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-3.5">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={(e) => handleChange("honeypot", e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="ct-name" className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <input
                id="ct-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Meera Patel"
                className={`input-glass pl-9 ${errors.name ? "!border-red-500/60" : ""}`}
              />
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>
            {errors.name && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="ct-email" className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
              Work Email *
            </label>
            <div className="relative">
              <input
                id="ct-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="meera@techcorp.com"
                className={`input-glass pl-9 ${errors.email ? "!border-red-500/60" : ""}`}
              />
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>
            {errors.email && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.email}</p>}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="ct-company" className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
              Company
            </label>
            <div className="relative">
              <input
                id="ct-company"
                type="text"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                placeholder="TechCorp Global"
                className="input-glass pl-9"
              />
              <Building size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>
          </div>

          <div>
            <label htmlFor="ct-type" className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
              Inquiry Category
            </label>
            <select
              id="ct-type"
              value={formData.enquiryType}
              onChange={(e) => handleChange("enquiryType", e.target.value)}
              className="input-glass cursor-pointer"
            >
              <option className="bg-[#0f172a]" value="architecture_audit">System Architecture Audit</option>
              <option className="bg-[#0f172a]" value="enterprise_quote">Enterprise Deployment & RFP</option>
              <option className="bg-[#0f172a]" value="partnership">Technology Partnership</option>
              <option className="bg-[#0f172a]" value="general">General Advisory</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="ct-subject" className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
            Subject *
          </label>
          <input
            id="ct-subject"
            type="text"
            required
            value={formData.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            className={`input-glass ${errors.subject ? "!border-red-500/60" : ""}`}
          />
          {errors.subject && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.subject}</p>}
        </div>

        <div>
          <label htmlFor="ct-message" className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
            Requirements & System Context *
          </label>
          <textarea
            id="ct-message"
            rows={3}
            required
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder="Briefly describe your stack, volume, and target automation outcomes..."
            className={`input-glass resize-none text-xs ${errors.message ? "!border-red-500/60" : ""}`}
          />
          {errors.message && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.message}</p>}
        </div>

        <div className="pt-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
            <ShieldCheck size={14} className="text-[#86efac]" />
            <span>Confidential</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary py-3 px-6 text-xs font-bold cursor-pointer disabled:opacity-50"
          >
            {submitting ? "Sending..." : "Send Enterprise Inquiry"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function ContactModal() {
  const { contactState, closeContact } = useModals()
  const { isOpen, initialData } = contactState

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeContact()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, closeContact])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeContact}
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
          aria-labelledby="contact-modal-title"
        >
          <button
            type="button"
            onClick={closeContact}
            className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>

          <ContactFormContent
            key={initialData.name + initialData.email + initialData.subject}
            initialData={initialData}
            closeContact={closeContact}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
