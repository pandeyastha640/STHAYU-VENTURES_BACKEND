import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { AnimatedSection, SectionHeading } from "./ui"
import { CheckCircle2, ChevronRight, Workflow, Zap } from "lucide-react"

const lifecycleSteps = [
  {
    stage: "01",
    phase: "Week 1",
    title: "Discovery & Bottleneck Audit",
    headline: "Deconstruct your operations down to the exact manual friction points.",
    description: "We analyze your current software tools, data pathways, and manual administrative handoffs. We calculate exact time/revenue losses and map the ideal autonomous target state.",
    deliverables: [
      "Process Bottleneck & Cost-Drag Audit",
      "Data Entity & API Integration Map",
      "Measurable ROI & Latency Reduction Targets",
      "Executive Architectural Blueprint"
    ],
    highlight: "Zero disruption to your ongoing operations",
    metric: "100% stack visibility in 5 days",
  },
  {
    stage: "02",
    phase: "Week 2",
    title: "System Design & Agent Modeling",
    headline: "Engineer the cognitive agent prompts, safety guardrails & API routes.",
    description: "We architect the technical blueprint: database schema alignments, webhook routing logic, agent reasoning trees, and deterministic fallbacks to guarantee 0% hallucination risk.",
    deliverables: [
      "Custom Agent Context & Decision Trees",
      "Bidirectional Webhook & ERP Connector Schemas",
      "Security, Privacy & RBAC Protocol Definitions",
      "Interactive High-Fidelity UI/UX Prototypes"
    ],
    highlight: "Deterministic guardrail specifications",
    metric: "Architectural alignment sealed",
  },
  {
    stage: "03",
    phase: "Week 3-4",
    title: "Agent Build & Integration Fabric",
    headline: "Construct high-throughput pipelines and fine-tune domain intelligence.",
    description: "Our engineers build the microservices, index vector knowledge bases, connect your CRM/ERP endpoints, and train agents on real historical conversation transcripts.",
    deliverables: [
      "Vector Embeddings & Private Knowledge Index",
      "Multi-System Event Sync Engine (PostgreSQL/HubSpot/Stripe)",
      "Omnichannel Ingestion (WhatsApp, Web, Telephony)",
      "Complete Staging Environment Deployment"
    ],
    highlight: "Sub-45ms webhook processing performance",
    metric: "All core integrations live in staging",
  },
  {
    stage: "04",
    phase: "Week 5",
    title: "Sandbox Simulation & Guardrail QA",
    headline: "Simulate edge cases, stress-test high throughput & verify compliance.",
    description: "We run thousands of simulated edge-case conversations and high-load traffic bursts to verify that every decision matches human-level accuracy and strict company policies.",
    deliverables: [
      "Automated Edge-Case Stress Testing Suite",
      "Human-in-the-Loop Escalation Verification",
      "SOC2 / Data Privacy Compliance Validation",
      "Team Hand-off & Live Training Sessions"
    ],
    highlight: "Over 2,500 automated verification passes",
    metric: "99.8% deterministic accuracy score",
  },
  {
    stage: "05",
    phase: "Week 6+",
    title: "Live Production & Continuous Optimization",
    headline: "Deploy to live traffic with 24/7 telemetry and ongoing agent tuning.",
    description: "The autonomous operating system is switched on. We monitor real-time throughput, track CSAT and lead conversion rates, and continuously optimize agents as your business scales.",
    deliverables: [
      "Zero-Downtime Production Cutover",
      "Real-Time Telemetry & Anomaly Alerting",
      "Weekly Performance & ROI Impact Briefings",
      "Dedicated Engineering SLA & Continuous Upgrades"
    ],
    highlight: "Backed by 99.98% uptime engineering SLA",
    metric: "Continuous autonomous scaling",
  },
]

export default function HowItWorks() {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = lifecycleSteps[activeIdx]
  const tabsRef = useRef(null)
  const tabRefs = useRef([])

  const getTabCenter = (idx) => {
    const container = tabsRef.current
    const tab = tabRefs.current[idx]
    if (!container || !tab) return { left: 0, width: 0 }
    const containerRect = container.getBoundingClientRect()
    const tabRect = tab.getBoundingClientRect()
    return {
      left: tabRect.left - containerRect.left + tabRect.width / 2,
      width: tabRect.width,
    }
  }

  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const measure = () => {
      const pos = getTabCenter(activeIdx)
      setIndicator({ left: pos.left - pos.width / 2, width: pos.width })
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [activeIdx])

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#050505] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 right-1/4 w-[700px] h-[500px] bg-white/[0.03] rounded-full blur-[180px] opacity-60" />

      <div className="relative mx-auto max-w-7xl">
        
        <AnimatedSection>
          <SectionHeading
            pill={{ icon: Workflow, text: "Operational Lifecycle" }}
            title={<>From fragmented operations <br className="hidden sm:block" /><span className="text-white/60">to a deployed autonomous system.</span></>}
            description="A battle-tested 5-phase engineering methodology designed to deliver tangible operational ROI in under 30 business days without disrupting your team."
          />
        </AnimatedSection>

        {/* 5-Step Horizontal Tab Navigator with progress line */}
        <AnimatedSection delay={0.15} className="mt-16">
          <div ref={tabsRef} className="relative flex items-stretch gap-2 overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
            {/* Background track line */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/[0.06] -translate-y-1/2 pointer-events-none" />
            
            {/* Active progress indicator */}
            <motion.div
              className="absolute top-1/2 h-[2px] bg-white/[0.25] -translate-y-1/2 rounded-full pointer-events-none"
              animate={{ left: indicator.left, width: indicator.width }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {lifecycleSteps.map((step, idx) => {
              const isActive = activeIdx === idx
              return (
                <button
                  key={step.stage}
                  type="button"
                  ref={(el) => (tabRefs.current[idx] = el)}
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative z-10 flex min-w-[170px] sm:min-w-[200px] flex-1 flex-col rounded-2xl border p-3 sm:p-4 text-left transition-all duration-300 cursor-pointer snap-start shrink-0 ${
                    isActive
                      ? "border-white/[0.10] bg-gradient-to-b from-[#0a0a0a] to-[#080808]"
                      : "border-white/10 bg-[#050505] hover:border-white/20 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs font-bold ${isActive ? "text-[#d4d4d8]" : "text-slate-500"}`}>
                      PHASE {step.stage}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                      {step.phase}
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-bold text-white group-hover:text-[#d4d4d8] transition-colors truncate">
                    {step.title}
                  </div>
                </button>
              )
            })}
          </div>
        </AnimatedSection>

        {/* Active Stage Deep-Dive Card with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
            className="mt-8 rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#050505] p-8 sm:p-10 md:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          >
            
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              
              {/* Left Column: Stage Details */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.10] font-mono text-xs font-bold text-[#d4d4d8] shadow-md">
                    {current.stage}
                  </span>
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#a1a1aa]">
                      {current.phase} · {current.title}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{current.highlight}</div>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  {current.headline}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {current.description}
                </p>

                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-2 text-xs font-mono font-bold text-[#d4d4d8]">
                    <Zap size={14} className="text-[#a1a1aa]" />
                    <span>Key Result: {current.metric}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Concrete Deliverables Checklist */}
              <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#080808]/80 p-6 sm:p-8 backdrop-blur-xl">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 pb-4 border-b border-white/10 flex items-center justify-between">
                  <span>PHASE {current.stage} DELIVERABLES</span>
                  <span className="text-[#86efac] font-bold">● GUARANTEED</span>
                </div>

                <div className="mt-5 space-y-3.5">
                  {current.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <CheckCircle2 size={16} className="text-[#a1a1aa] shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-[#d4d4d8]">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Next milestone:</span>
                  <button
                    type="button"
                    onClick={() => setActiveIdx((prev) => (prev + 1) % lifecycleSteps.length)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4d4d8] hover:text-[#d4d4d8] cursor-pointer"
                  >
                    <span>Advance Stage</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
