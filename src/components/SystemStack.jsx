import { AnimatedSection, SectionHeading } from "./ui"
import { ArrowRight, Building2, Layers3, Workflow, ShoppingBag, Stethoscope, Factory, Laptop } from "lucide-react"

const industryBlueprints = [
  {
    industry: "Professional & Financial Services",
    icon: Building2,
    tagline: "Client intake, KYC document validation & CRM deal sync",
    stack: ["HubSpot Enterprise", "Stripe Billing", "AI Compliance Agent", "Secure Client Portal"],
    outcome: "78% faster client onboarding cycle",
  },
  {
    industry: "High-Growth SaaS & Tech",
    icon: Laptop,
    tagline: "Self-serve onboarding, churn warning alerts & telemetry",
    stack: ["Segment / Mixpanel", "PostgreSQL Cluster", "Tier-1 Support Agent", "Stripe Billing"],
    outcome: "3.4x faster resolution for developer inquiries",
  },
  {
    industry: "E-Commerce & Global Brands",
    icon: ShoppingBag,
    tagline: "Omnichannel WhatsApp cart recovery, returns & inventory sync",
    stack: ["Shopify Plus", "Klaviyo", "WhatsApp Business API", "ERP Warehouse Sync"],
    outcome: "+24% cart recovery & zero manual ticket handling",
  },
  {
    industry: "Real Estate & Commercial PropTech",
    icon: Workflow,
    tagline: "Instant sub-3s lead qualification, voice bookings & CRM updates",
    stack: ["Voice AI Telephony", "Salesforce CRM", "Google Calendar Sync", "SMS Nurture"],
    outcome: "92% connection rate on inbound inquiries",
  },
  {
    industry: "Healthcare & Wellness Operations",
    icon: Stethoscope,
    tagline: "Patient intake, automated appointment reminders & records",
    stack: ["HIPAA-Compliant DB", "Voice Dispatch", "Calendar Routing", "WhatsApp Reminders"],
    outcome: "40% reduction in clinic appointment no-shows",
  },
  {
    industry: "Manufacturing & Supply Chain",
    icon: Factory,
    tagline: "Purchase order OCR parsing, inventory thresholds & supplier alerts",
    stack: ["SAP / Oracle ERP", "Automated PDF Parser", "Slack Anomaly Bot", "SQL Ledger"],
    outcome: "100% automated invoice-to-inventory matching",
  },
]

const maturitySteps = [
  { stage: "01", name: "Manual Ops", desc: "Humans manually copy-pasting data across disjointed tools." },
  { stage: "02", name: "Basic Webhooks", desc: "Fragile Zapier recipes that break without monitoring." },
  { stage: "03", name: "Event Fabric", desc: "Deterministic microservice pipelines syncing databases in real-time." },
  { stage: "04", name: "Autonomous AI", desc: "Cognitive agents resolving customer inquiries and taking actions." },
  { stage: "05", name: "Proprietary SaaS", desc: "Your unique operations codified into custom scalable software." },
]

export default function SystemStack() {
  return (
    <section id="system-stack" className="relative overflow-hidden bg-[#050505] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 left-1/3 w-[700px] h-[500px] bg-white/[0.03] rounded-full blur-[180px] opacity-60" />

      <div className="relative mx-auto max-w-7xl">
        
        <AnimatedSection>
          <SectionHeading
            pill={{ icon: Layers3, text: "Industry Architecture Blueprints" }}
            title={<>Architected for the realities <br className="hidden sm:block" /><span className="text-white/60">of your specific industry.</span></>}
            description="We don't deploy cookie-cutter automation templates. We map the exact data dependencies, software APIs, and compliance standards of your vertical."
          />
        </AnimatedSection>

        {/* 6 Industry Blueprint Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industryBlueprints.map((item, idx) => {
            const Icon = item.icon
            return (
              <AnimatedSection key={item.industry} delay={idx * 0.1}>
                <div className="glass-card p-7 flex flex-col justify-between group h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.10] text-[#d4d4d8]">
                        <Icon size={22} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#86efac]">VERIFIED BLUEPRINT</span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-white group-hover:text-[#d4d4d8] transition-colors">
                      {item.industry}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                      {item.tagline}
                    </p>

                    {/* Connected Stack Pill List */}
                    <div className="mt-5 space-y-1.5 pt-4 border-t border-white/10">
                      <div className="text-[9px] uppercase font-mono text-slate-400">Integrated Stack:</div>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {item.stack.map((st) => (
                          <span key={st} className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-[#d4d4d8] border border-white/5">
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#86efac] font-bold">{item.outcome}</span>
                    <ArrowRight size={14} className="text-[#a1a1aa] opacity-60 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>

        {/* The Transformation Staircase: From Chaos to Proprietary SaaS */}
        <AnimatedSection className="mt-16">
          <div className="rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#050505] p-8 sm:p-10 backdrop-blur-2xl">
            <div className="max-w-3xl">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#a1a1aa]">
                The Sthayu Maturity Framework
              </div>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
                From manual operations to proprietary software IP.
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Every workflow Sthayu engineers turns your internal operational logic into an intangible asset — starting as connected pipelines, evolving into autonomous agents, and culminating in bespoke proprietary software.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {maturitySteps.map((s, idx) => (
                <div key={s.stage} className="relative">
                  <div className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/[0.10] hover:bg-white/[0.04] transition-all h-full">
                    <div>
                      <div className="font-mono text-xs font-bold text-[#a1a1aa]">{s.stage}</div>
                      <div className="mt-2 text-base font-bold text-white">{s.name}</div>
                      <p className="mt-2 text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Level {idx + 1}</span>
                      {idx === 4 && <span className="text-[#86efac] font-bold">★ GOAL</span>}
                    </div>
                  </div>

                  {/* Connecting line - hidden on last item, vertical on mobile */}
                  {idx < maturitySteps.length - 1 && (
                    <>
                      {/* Mobile: vertical line (grid-cols-1) */}
                      <div className="block sm:hidden absolute left-1/2 top-full w-[1px] h-4 bg-white/[0.06] -translate-x-1/2" />
                      {/* Desktop: horizontal line (lg:grid-cols-5) */}
                      <div className="hidden lg:block absolute top-1/2 left-full w-full h-[1px] bg-white/[0.06] -translate-y-1/2" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
