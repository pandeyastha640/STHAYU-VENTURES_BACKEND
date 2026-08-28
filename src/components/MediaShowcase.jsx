import { useState } from "react"
import { CheckCircle2, Terminal, Workflow, ArrowRight } from "lucide-react"
import { AnimatedSection, SectionHeading } from "./ui"

const scenarios = [
  {
    id: "lead",
    title: "Omnichannel Lead Qualification & Dispatch",
    tag: "Sales & Growth",
    description: "Inbound inquiry on WhatsApp or Web is parsed by the Sthayu Sales Agent, matched with CRM records, enriched via data providers, and dispatched to executive calendars.",
    latency: "1.4s",
    accuracy: "99.8%",
    steps: [
      { name: "Inbound Capture", detail: "WhatsApp / Webform payload received", status: "complete" },
      { name: "Context Enrichment", detail: "Company revenue, stack, role matched", status: "complete" },
      { name: "Cognitive Scoring", detail: "Intent score: 94/100 (Enterprise Tier)", status: "complete" },
      { name: "Calendar & CRM Dispatch", detail: "Meeting scheduled + HubSpot deal created", status: "complete" },
    ],
    payload: {
      event: "lead.enterprise_qualification",
      source: "whatsapp_business_api",
      intent: "ai_infrastructure_deployment",
      ai_agent: "Sthayu-SDR-Alpha",
      action_taken: "hubspot_deal_created_and_rep_assigned",
      execution_time: "1.42s",
    }
  },
  {
    id: "support",
    title: "Autonomous Tier-1 Customer Resolution",
    tag: "Customer Operations",
    description: "Customer service request triaged, authenticated against internal knowledge base and ERP databases, and resolved with human-grade empathy and precise technical instructions.",
    latency: "820ms",
    accuracy: "99.4%",
    steps: [
      { name: "Intent Analysis", detail: "API key rate limit inquiry identified", status: "complete" },
      { name: "Knowledge Search", detail: "Vector DB queried for custom tenant policy", status: "complete" },
      { name: "Solution Generation", detail: "Actionable fix + temporary tier boost applied", status: "complete" },
      { name: "Ticket Resolution", detail: "Zendesk ticket closed with 5-star CSAT", status: "complete" },
    ],
    payload: {
      event: "support.ticket_auto_resolution",
      ticket_id: "STH-8942",
      sentiment: "neutral_to_delighted",
      vector_search_score: 0.984,
      escalation_needed: false,
      execution_time: "0.82s",
    }
  },
  {
    id: "ops",
    title: "Real-Time Multi-System Data Reconciliation",
    tag: "Enterprise ERP",
    description: "Cross-platform data discrepancy detected between warehouse logistics, billing software, and customer invoices. Auto-corrected and verified without human data entry.",
    latency: "2.1s",
    accuracy: "100%",
    steps: [
      { name: "Discrepancy Trigger", detail: "Invoice #4102 mismatch detected", status: "complete" },
      { name: "Cross-Database Audit", detail: "PostgreSQL & Stripe ledgers reconciled", status: "complete" },
      { name: "Adjustment Execution", detail: "Credit note drafted & ERP synced", status: "complete" },
      { name: "Audit Trail Logged", detail: "SOC2 compliance cryptographic log sealed", status: "complete" },
    ],
    payload: {
      event: "ops.ledger_reconciliation",
      entities: ["PostgreSQL_Cluster", "Stripe_Billing", "SAP_ERP"],
      discrepancy_resolved: "₹1,42,000 variance aligned",
      human_intervention: "0 hours",
      execution_time: "2.14s",
    }
  }
]

export default function MediaShowcase() {
  const [activeScenario, setActiveScenario] = useState(scenarios[0])
  const [activeTab, setActiveTab] = useState("pipeline")

  return (
    <section id="media-showcase" className="relative overflow-hidden bg-[#050505] py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      {/* Background radial atmosphere */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/[0.03] rounded-full blur-[160px] opacity-70" />

      <div className="relative mx-auto max-w-7xl">

        <AnimatedSection>
          <SectionHeading
            pill={{ icon: Workflow, text: "Interactive Workflow Engine" }}
            title={
              <>
                See autonomous execution <br className="hidden sm:block" />
                <span className="text-white/60">in live real-time motion.</span>
              </>
            }
            description="Sthayu eliminates manual coordination by running end-to-end cognitive pipelines that ingest, decide, and execute across your enterprise software stack."
          />
        </AnimatedSection>

        {/* Scenario Selectors */}
        <AnimatedSection delay={0.1}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {scenarios.map((sc) => {
              const isSelected = activeScenario.id === sc.id
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setActiveScenario(sc)}
                  className={`flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "border border-white/[0.12] bg-white/[0.04] text-[#d4d4d8] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_20px_rgba(255,255,255,0.03)]"
                      : "border border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#d4d4d8] animate-pulse" : "bg-slate-500"}`} />
                  <span>{sc.tag}</span>
                </button>
              )
            })}
          </div>
        </AnimatedSection>

        {/* Interactive Engine Window */}
        <AnimatedSection delay={0.2}>
          <div className="mt-8 rounded-[2.5rem] border border-white/[0.06] bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#050505] shadow-[0_40px_120px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden backdrop-blur-2xl">

            {/* Engine Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.10] text-[#d4d4d8]">
                  <Workflow size={17} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    {activeScenario.title}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">STATUS: EXECUTING PIPELINE</div>
                </div>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-black/40 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("pipeline")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "pipeline" ? "bg-white/[0.04] text-[#d4d4d8] border border-white/[0.08] shadow-[0_0_12px_rgba(255,255,255,0.03)]" : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  Visual Pipeline
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("telemetry")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "telemetry" ? "bg-white/[0.04] text-[#d4d4d8] border border-white/[0.08] shadow-[0_0_12px_rgba(255,255,255,0.03)]" : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <Terminal size={12} />
                  JSON Payload
                </button>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-6 sm:p-8 lg:p-10">
              {activeTab === "pipeline" ? (
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">

                  {/* Left side: Scenario Description and Stats */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#a1a1aa]">
                        Execution Scenario
                      </span>
                      <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white">
                        {activeScenario.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {activeScenario.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                        <div className="text-[10px] uppercase tracking-wider font-mono text-slate-400">Execution Speed</div>
                        <div className="mt-1 text-2xl font-extrabold text-[#d4d4d8] font-mono">{activeScenario.latency}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">End-to-end processing</div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                        <div className="text-[10px] uppercase tracking-wider font-mono text-slate-400">Deterministic Accuracy</div>
                        <div className="mt-1 text-2xl font-extrabold text-[#86efac] font-mono">{activeScenario.accuracy}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Verified outputs</div>
                      </div>
                    </div>

                    <a
                      href="#assessment"
                      className="btn-primary w-fit text-xs py-2.5 px-5"
                    >
                      <span>Build This Workflow</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>

                  {/* Right side: Step Execution Nodes */}
                  <div className="lg:col-span-7 space-y-3">
                    {activeScenario.steps.map((step, idx) => (
                      <AnimatedSection key={step.name} delay={0.3 + idx * 0.08}>
                        <div
                          className="group relative flex items-center justify-between rounded-2xl border border-white/10 bg-[#0a0a0a]/80 p-4 transition-all duration-300 hover:border-white/[0.10] hover:bg-[#0e0e0e]"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.10] text-[#d4d4d8] font-mono text-xs font-bold">
                              0{idx + 1}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white flex items-center gap-2">
                                {step.name}
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#86efac]/[0.06] text-[#86efac] border border-[#86efac]/[0.12]">
                                  PASS
                                </span>
                              </div>
                              <div className="text-xs text-slate-300 mt-0.5">{step.detail}</div>
                            </div>
                          </div>

                          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#86efac]">
                            <CheckCircle2 size={16} />
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>

                </div>
              ) : (
                /* JSON Telemetry Payload Inspector */
                <div className="rounded-2xl border border-white/[0.06] bg-[#080808] p-5 font-mono text-xs text-[#d4d4d8] overflow-x-auto shadow-inner">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-slate-400 text-[10px]">
                    <span>EVENT_STREAM_INSPECTOR // TLSv1.3 Encrypted</span>
                    <span className="text-[#86efac]">● LIVE_STREAM</span>
                  </div>
                  <pre className="text-slate-300 leading-relaxed">
                    {JSON.stringify(activeScenario.payload, null, 2)}
                  </pre>
                </div>
              )}
            </div>

          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
