import { ArrowRight, Bot, CheckCircle2, Clock3, TrendingUp, Zap } from "lucide-react"
import { AnimatedSection } from "./ui"

import imgCaseFinScale from "../assets/images/case_study_finscale_1787842086671.jpg"
import imgCaseLogistics from "../assets/images/case_study_aura_logistics_1787842102750.jpg"
import imgCaseOmniGrowth from "../assets/images/case_study_omnigrowth_1787842118729.jpg"

const caseStudies = [
  {
    number: "01",
    client: "FinScale Capital",
    industry: "Financial & Asset Advisory",
    image: imgCaseFinScale,
    title: "Automated Investor Onboarding & Real-Time Portfolio Sync",
    problem: "Manual KYC verification and multi-broker portfolio reconciliation required 24 hours per client, causing a 35% drop-off during onboarding.",
    solution: "Engineered an autonomous document intake agent + bidirectional SQL ledger sync connecting custodians, Stripe, and customer portals in real time.",
    metric: "-82% Onboarding Time",
    subMetric: "4.8x faster capital deployment · Zero data errors",
    tags: ["KYC AI Agent", "PostgreSQL Sync", "Stripe Billing", "SOC2 Compliant"],
  },
  {
    number: "02",
    client: "Aura Logistics Global",
    industry: "Supply Chain & Fleet Operations",
    image: imgCaseLogistics,
    title: "Autonomous Dispatch & Vendor Invoice Auto-Correction",
    problem: "15,000+ monthly vendor invoices had discrepancy mismatches against warehouse delivery slips, requiring 6 full-time staff for manual audit.",
    solution: "Deployed Sthayu Operations Agent with OCR parser to automatically cross-reference ERP purchase orders, adjust ledger variances, and approve payments.",
    metric: "99.4% Auto-Resolution",
    subMetric: "120+ monthly hours saved · ₹45L prevented leakage",
    tags: ["OCR AI Engine", "SAP ERP Connector", "Ledger Audit", "Slack Alert Bot"],
  },
  {
    number: "03",
    client: "OmniGrowth Media",
    industry: "High-Volume B2B Lead Generation",
    image: imgCaseOmniGrowth,
    title: "Sub-3-Second Omnichannel Lead Qualification & Dispatch",
    problem: "Inbound leads across Web and WhatsApp waited an average of 4.5 hours for sales rep contact, leading to severe lead decay and lost revenue.",
    solution: "Trained and deployed Sthayu SDR Agent to engage prospects in real-time, qualify against ideal customer profiles, and book direct executive meetings.",
    metric: "+310% Meeting Volume",
    subMetric: "< 2.8s avg first response · 98.4% qualification accuracy",
    tags: ["Sales SDR Agent", "WhatsApp API", "HubSpot Deal Sync", "Cal.com Integration"],
  },
]

const outcomeHighlights = [
  { value: "74%", label: "Average latency reduction across client operations", icon: Zap },
  { value: "< 2.4s", label: "Autonomous response & routing speed", icon: Clock3 },
  { value: "99.98%", label: "Uptime SLA guaranteed across event pipelines", icon: TrendingUp },
  { value: "100%", label: "Deterministic accuracy on financial & CRM sync", icon: Bot },
]

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative overflow-hidden bg-[#050505] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 right-[5%] w-[600px] h-[500px] bg-white/[0.03] rounded-full blur-[180px] opacity-60" />

      <div className="relative mx-auto max-w-7xl">
        
        <AnimatedSection>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="glass-pill mx-auto">
              <TrendingUp size={13} />
              <span>Proven Business Impact</span>
            </div>

            <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Real systems. <br className="hidden sm:block" />
              <span className="text-white/60">Measurable enterprise outcomes.</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300">
              How forward-thinking companies partner with Sthayu to replace operational drag with high-velocity autonomous infrastructure.
            </p>
          </div>
        </AnimatedSection>

        {/* 3 Case Study Cards */}
        <div className="mt-16 space-y-8">
          {caseStudies.map((study) => (
            <div
              key={study.number}
              className="rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#050505] p-8 sm:p-10 md:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300 hover:border-white/[0.10]"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                
                {/* Left 7 Columns: Story & Solution */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#a1a1aa] px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
                      CASE {study.number}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{study.client} · {study.industry}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {study.title}
                  </h3>

                  <div className="space-y-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-red-500/[0.04] border border-red-500/15 text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-red-400 font-mono">THE CHALLENGE: </span>
                      {study.problem}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/[0.01] border border-white/[0.06] text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-[#a1a1aa] font-mono">THE STHAYU SYSTEM: </span>
                      {study.solution}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {study.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right 5 Columns: Big Metric Highlight */}
                <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#080808]/90 p-8 text-center lg:text-left overflow-hidden relative">
                  <div>
                    {study.image && (
                      <div className="relative h-28 mb-5 overflow-hidden rounded-xl border border-white/10 bg-[#050505]">
                        <img
                          src={study.image}
                          alt={study.title}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover opacity-75 hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                      </div>
                    )}
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#a1a1aa]">
                      VERIFIED OUTCOME
                    </div>
                    <div className="mt-3 font-mono text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fafafa] via-[#d4d4d8] to-[#a1a1aa]">
                      {study.metric}
                    </div>
                    <p className="mt-3 text-xs text-[#d4d4d8] leading-relaxed font-medium">
                      {study.subMetric}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#86efac] flex items-center gap-1.5">
                      <CheckCircle2 size={14} />
                      Production Deployed
                    </span>
                    <a
                      href="#assessment"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#d4d4d8] hover:text-[#d4d4d8]"
                    >
                      <span>Similar Scope</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Global Impact Summary Bar */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {outcomeHighlights.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="glass-card p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#d4d4d8]">
                    <Icon size={18} />
                  </div>
                  <span className="flex h-2 w-2 rounded-full bg-[#86efac]" />
                </div>
                <div className="mt-5 font-mono text-3xl font-extrabold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
