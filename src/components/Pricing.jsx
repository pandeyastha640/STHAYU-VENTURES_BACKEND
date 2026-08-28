import { ArrowRight, Check, Crown, Layers3, Rocket, ShieldCheck, Sparkles } from "lucide-react"
import { AnimatedSection } from "./ui"
import { useModals } from "../context/useModals"

const plans = [
  {
    name: "Starter Velocity",
    eyebrow: "Early-stage & growing teams",
    description: "Automate high-friction daily operational bottlenecks and launch your first autonomous AI agent.",
    price: "₹9,999",
    period: "/ month",
    icon: Sparkles,
    featured: false,
    cta: "Deploy Starter",
    features: [
      "Up to 3 automated core workflows",
      "1 specialized autonomous AI agent (SDR or Support)",
      "Standard CRM & Webhook integrations",
      "Sub-2s automated response SLA",
      "Weekly execution performance digest",
      "Standard business-hours support"
    ],
  },
  {
    name: "Growth Engine",
    eyebrow: "Scaling organizations",
    description: "A complete autonomous operational fabric across sales, support, data reconciliation, and reporting.",
    price: "₹24,999",
    period: "/ month",
    icon: Rocket,
    featured: true,
    badge: "MOST POPULAR",
    cta: "Scale with Growth",
    features: [
      "Up to 10 automated workflow pipelines",
      "4 multi-channel autonomous AI agents",
      "Bidirectional CRM, ERP & SQL database sync",
      "Sub-800ms event processing engine",
      "Custom vector knowledge base embeddings",
      "Dedicated solutions engineer & 99.9% SLA",
      "Bi-weekly optimization & ROI reviews"
    ],
  },
  {
    name: "Autonomous Enterprise",
    eyebrow: "High-volume operations",
    description: "Unlimited orchestration, dedicated custom SaaS dashboards, and proprietary fine-tuned AI models.",
    price: "₹49,999",
    period: "/ month",
    icon: Crown,
    featured: false,
    cta: "Deploy Enterprise",
    features: [
      "Unlimited automated workflows & pipelines",
      "Full autonomous AI agent workforce roster",
      "Custom internal SaaS command center portal",
      "On-premise / private VPC deployment options",
      "Zero data retention & SOC2/HIPAA compliance",
      "24/7 dedicated solutions architect SLA",
      "Continuous prompt & pipeline engineering"
    ],
  },
]

const capabilityComparison = [
  { feature: "Autonomous AI Agents Included", starter: "1 Agent", growth: "4 Agents", enterprise: "Unlimited Workforce" },
  { feature: "Workflow Execution Pipelines", starter: "3 Pipelines", growth: "10 Pipelines", enterprise: "Unlimited Full-Stack" },
  { feature: "Data & ERP Integrations", starter: "Standard (HubSpot, Stripe)", growth: "Advanced (SAP, SQL, CRM)", enterprise: "Custom & Legacy Systems" },
  { feature: "Knowledge Base Vector Indexing", starter: "Standard Docs", growth: "Full Notion/Zendesk RAG", enterprise: "Continuous Multi-Source RAG" },
  { feature: "Execution Speed & Latency", starter: "< 2.0s", growth: "< 800ms", enterprise: "Sub-500ms Dedicated P99" },
  { feature: "Engineering Support & SLA", starter: "Email Support", growth: "Dedicated Slack Channel", enterprise: "24/7 Solutions Architect SLA" },
]

export default function Pricing() {
  const { openBooking } = useModals()

  const handlePlanSelect = (plan) => {
    openBooking({
      notes: `Deployment Inquiry for Tier: ${plan.name} (${plan.price}${plan.period})`,
    })
  }

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#050505] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 w-[700px] h-[500px] bg-white/[0.03] rounded-full blur-[180px] opacity-60" />

      <div className="relative mx-auto max-w-7xl">
        
        <AnimatedSection>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="glass-pill mx-auto">
              <Layers3 size={13} />
              <span>Transparent Investment</span>
            </div>

            <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Predictable pricing. <br className="hidden sm:block" />
              <span className="text-white/60">Exponential operational ROI.</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Choose the operational tier that matches your current momentum. Scale seamlessly into full autonomous capability as your data flows mature.
            </p>
          </div>
        </AnimatedSection>

        {/* 3 Tier Pricing Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon
            const isFeatured = plan.featured
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-[2.5rem] border p-8 transition-all duration-300 ${
                  isFeatured
                    ? "border-white/[0.12] bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#050505] shadow-[0_0_0_1px_rgba(255,255,255,0.08)] -translate-y-2"
                    : "border-white/[0.06] bg-[#0a0a0a]/70 hover:border-white/[0.10]"
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#d4d4d8] to-[#a1a1aa] px-4 py-1 text-[10px] font-mono font-bold tracking-widest text-slate-950 shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.08] text-[#d4d4d8] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {plan.eyebrow}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed min-h-[48px]">
                    {plan.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1.5 pb-6 border-b border-white/10">
                    <span className="font-mono text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-xs text-slate-400 font-mono">{plan.period}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePlanSelect(plan)}
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 px-6 text-xs font-bold transition-all cursor-pointer ${
                      isFeatured
                        ? "btn-primary shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                        : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight size={14} />
                  </button>

                  {/* Included features */}
                  <div className="mt-8 space-y-3">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Included Capabilities:
                    </div>
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check size={14} className="text-[#a1a1aa] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 text-[10px] font-mono text-slate-400 text-center">
                  Cancel or adjust anytime · Zero lock-in
                </div>
              </div>
            )
          })}
        </div>

        {/* Capability Comparison Matrix Table */}
        <div className="mt-20 rounded-[2.5rem] border border-white/10 bg-[#050505]/80 p-8 sm:p-10 backdrop-blur-xl">
          <div className="max-w-2xl mb-8">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#a1a1aa]">
              Detailed Feature Matrix
            </div>
            <h3 className="mt-1 text-2xl font-bold text-white">Compare system tier capabilities.</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-mono font-bold text-slate-400 uppercase">
                  <th className="py-4 pr-4">Operational Dimension</th>
                  <th className="py-4 px-4">Starter Velocity</th>
                  <th className="py-4 px-4 text-[#d4d4d8]">Growth Engine</th>
                  <th className="py-4 pl-4">Autonomous Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {capabilityComparison.map((row) => (
                  <tr key={row.feature} className="hover:bg-white/[0.02]">
                    <td className="py-4 pr-4 font-medium text-slate-200">{row.feature}</td>
                    <td className="py-4 px-4 text-slate-400">{row.starter}</td>
                    <td className="py-4 px-4 font-bold text-[#d4d4d8]">{row.growth}</td>
                    <td className="py-4 pl-4 text-slate-200">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom Advisory Enterprise Banner */}
        <div className="mt-12 rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-r from-[#0a0a0a] via-[#080808] to-[#0a0a0a] p-8 sm:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] border border-white/[0.06] px-3 py-1 text-[10px] font-mono text-[#d4d4d8]">
                <ShieldCheck size={13} />
                <span>Custom Architecture & Private Deployments</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Have bespoke legacy systems or strict security mandates?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We engineer private VPC deployments, custom fine-tuned on-prem LLMs, and air-gapped data pipelines for financial institutions and health networks.
              </p>
            </div>

            <a
              href="#assessment"
              className="btn-primary py-3.5 px-8 text-xs font-bold shrink-0"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

