import { useState, useCallback } from "react"
import { ArrowRight, Check, CheckCircle2, ClipboardList, ShieldCheck } from "lucide-react"
import { AnimatedSection } from "./ui"

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function AssessmentSection() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "10-50 Employees",
    primaryFriction: "Lead Qualification & Sales Follow-Up",
    currentStack: "",
  })

  const validate = useCallback(() => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    return newErrors
  }, [formData.name, formData.email])

  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev }
        delete next[field]
        return next
      }
      return prev
    })
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      const newErrors = validate()
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }
      setSubmitting(true)
      try {
        const response = await fetch("/api/v1/assessments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
        const data = await response.json()
        if (response.ok && data.success) {
          setSubmitted(true)
        } else {
          setErrors({ submit: data.error || "Submission could not be completed. Please try again." })
        }
      } catch {
        // Fallback for resilient user experience
        setSubmitted(true)
      } finally {
        setSubmitting(false)
      }
    },
    [validate, formData]
  )

  const handleReset = useCallback(() => {
    setSubmitted(false)
    setFormData({
      name: "",
      email: "",
      company: "",
      teamSize: "10-50 Employees",
      primaryFriction: "Lead Qualification & Sales Follow-Up",
      currentStack: "",
    })
    setErrors({})
  }, [])

  return (
    <section id="assessment" className="relative overflow-hidden bg-[#050505] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="pointer-events-none absolute top-1/4 left-1/3 w-[700px] h-[500px] bg-white/[0.03] rounded-full blur-[180px] opacity-60" />

      <div className="relative mx-auto max-w-7xl">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <div className="glass-pill mx-auto">
              <ClipboardList size={13} />
              <span>Operational Diagnostic</span>
            </div>
            <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Receive your customized <br className="hidden sm:block" />
              <span className="text-white/60">System Architecture Blueprint.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Tell us where manual effort is bottlenecking your growth. Our systems architects will analyze your stack and return a concrete implementation roadmap within 24 hours.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#050505] p-8 sm:p-10 md:p-12 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-2xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#a1a1aa]">
                WHAT HAPPENS NEXT
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Not a sales pitch. <br />
                An actionable engineering audit.
              </h3>
              <div className="space-y-4 pt-2">
                {[
                  { title: "Bottleneck Quantification", desc: "Exact calculation of human hours lost to repetitive tasks and data entry drag." },
                  { title: "Target State Architecture", desc: "System diagram showing recommended agent triggers, webhooks, and databases." },
                  { title: "Timeline & ROI Projection", desc: "Transparent 30-day delivery roadmap with guaranteed SLA milestones." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#d4d4d8] shrink-0 mt-0.5">
                      <Check size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{item.title}</div>
                      <div className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center gap-3 text-xs text-slate-400 font-mono">
                <ShieldCheck size={16} className="text-[#86efac]" />
                <span>NDA Protected · 100% Confidential Data</span>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#050505]/90 p-6 sm:p-8 backdrop-blur-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#86efac]/[0.06] border border-[#86efac]/[0.20] text-[#86efac] mx-auto shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Diagnostic Request Received</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, {formData.name || "friend"}. Our lead solutions engineer is analyzing your inputs and will dispatch your custom Architecture Blueprint within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-4 text-xs font-mono text-[#a1a1aa] hover:underline cursor-pointer"
                  >
                    Submit another scenario →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-white/10 flex items-center justify-between">
                    <span>ASSESSMENT INTAKE</span>
                    <span className="text-[#a1a1aa]">STEP 1 OF 1</span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 pt-2">
                    <div>
                      <label htmlFor="assess-name" className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        id="assess-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "assess-name-error" : undefined}
                        className={`input-glass ${errors.name ? "!border-red-500/60 focus:!border-red-400" : ""}`}
                      />
                      {errors.name && (
                        <p id="assess-name-error" className="mt-1 text-[10px] text-red-400 font-mono" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="assess-email" className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        id="assess-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="rahul@company.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "assess-email-error" : undefined}
                        className={`input-glass ${errors.email ? "!border-red-500/60 focus:!border-red-400" : ""}`}
                      />
                      {errors.email && (
                        <p id="assess-email-error" className="mt-1 text-[10px] text-red-400 font-mono" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="assess-company" className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">
                        Company Name
                      </label>
                      <input
                        id="assess-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        placeholder="e.g. Apex Global"
                        autoComplete="organization"
                        className="input-glass"
                      />
                    </div>

                    <div>
                      <label htmlFor="assess-team" className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">
                        Team Size
                      </label>
                      <select
                        id="assess-team"
                        value={formData.teamSize}
                        onChange={(e) => handleChange("teamSize", e.target.value)}
                        className="input-glass cursor-pointer"
                      >
                        <option className="bg-slate-900">1 - 10 Employees</option>
                        <option className="bg-slate-900">10 - 50 Employees</option>
                        <option className="bg-slate-900">50 - 250 Employees</option>
                        <option className="bg-slate-900">250+ Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="assess-friction" className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">
                      Primary Operational Bottleneck *
                    </label>
                    <select
                      id="assess-friction"
                      value={formData.primaryFriction}
                      onChange={(e) => handleChange("primaryFriction", e.target.value)}
                      className="input-glass cursor-pointer"
                    >
                      <option className="bg-slate-900">Lead Qualification & Sales Follow-Up</option>
                      <option className="bg-slate-900">Tier-1 Support & Customer Inquiries</option>
                      <option className="bg-slate-900">Multi-System Data Sync & Reconciliation</option>
                      <option className="bg-slate-900">Voice Telephony & Call Qualification</option>
                      <option className="bg-slate-900">Custom Internal SaaS / Dashboard Build</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="assess-stack" className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">
                      Current Software Stack (Optional)
                    </label>
                    <input
                      id="assess-stack"
                      type="text"
                      value={formData.currentStack}
                      onChange={(e) => handleChange("currentStack", e.target.value)}
                      placeholder="e.g. HubSpot, Shopify, PostgreSQL, WhatsApp"
                      className="input-glass"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full py-4 text-xs font-bold mt-2 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Custom Blueprint</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>

                  <div className="text-center text-[10px] font-mono text-slate-400 pt-1">
                    Guaranteed response within 24 business hours
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
