import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { AnimatedSection, SectionHeading } from "./ui"
import { Bot, CheckCircle2, Database, MessageSquare, Phone, Terminal, UserCheck, ArrowRight } from "lucide-react"

import imgAgentSdr from "../assets/images/agent_sdr_core_1787842135533.jpg"
import imgAgentSupport from "../assets/images/agent_support_core_1787842151764.jpg"
import imgAgentOps from "../assets/images/agent_ops_core_1787842167663.jpg"
import imgAgentVoice from "../assets/images/agent_voice_core_1787842182078.jpg"

const agents = [
  {
    id: "sdr",
    code: "STH-SDR-01",
    name: "Autonomous Revenue & SDR Agent",
    role: "Sales & Inbound Lead Conversion",
    channel: "WhatsApp · Web · Email · Voice",
    status: "ACTIVE · 98.4% Conv",
    latency: "1.4s",
    icon: UserCheck,
    imageCore: imgAgentSdr,
    description: "Engages prospects instantly upon form submission or WhatsApp ping, qualifies budget & timeline against your ICP, and books qualified meetings directly to your executive calendar.",
    capabilities: [
      "Dynamic multi-turn qualification conversation",
      "Live calendar lookup & booking via Cal.com/Calendly",
      "Automatic lead enrichment & CRM deal creation",
      "Human escalation protocol with full context briefing"
    ],
    telemetry: {
      active_conversations: 42,
      meetings_booked_today: 14,
      avg_qualification_time: "84 seconds",
      escalation_rate: "4.2%"
    }
  },
  {
    id: "support",
    code: "STH-SUP-02",
    name: "Autonomous Tier-1 Support Specialist",
    role: "Customer Success & Rapid Resolution",
    channel: "Omnichannel · 95+ Languages",
    status: "ACTIVE · 99.1% CSAT",
    latency: "850ms",
    icon: MessageSquare,
    imageCore: imgAgentSupport,
    description: "Resolves repetitive product inquiries, handles account verification, processes refunds, and provides technical troubleshooting using your vector-indexed documentation.",
    capabilities: [
      "Vector search across Notion, Zendesk & API docs",
      "Live order status & invoice lookups via ERP APIs",
      "Automated password reset & tier upgrades",
      "Tone-matched empathetic conversational style"
    ],
    telemetry: {
      tickets_resolved_24h: 318,
      first_contact_resolution: "91.8%",
      avg_csat_score: "4.92 / 5.0",
      human_handoffs: "8.2%"
    }
  },
  {
    id: "ops",
    code: "STH-OPS-03",
    name: "Operations & Data Reconciliation Operator",
    role: "Back-Office Ledger & Workflow Sync",
    channel: "Event Webhooks · SQL · ERP",
    status: "ACTIVE · 100% Deterministic",
    latency: "420ms",
    icon: Database,
    imageCore: imgAgentOps,
    description: "Monitors transaction pipelines, detects inventory or invoice discrepancies across multiple platforms, and executes automated data transformations without human double-entry.",
    capabilities: [
      "Real-time ledger audit across Stripe, SAP & PostgreSQL",
      "Automated PDF invoice parsing & vendor dispatch",
      "Inventory threshold alerts & PO draft creation",
      "Cryptographic audit log generation for compliance"
    ],
    telemetry: {
      records_synced_today: "14,820",
      discrepancies_corrected: 23,
      manual_hours_saved: "18.5 hrs",
      error_rate: "0.00%"
    }
  },
  {
    id: "voice",
    code: "STH-VOX-04",
    name: "Ultra-Low-Latency Voice Agent",
    role: "Inbound & Outbound Telephony",
    channel: "SIP Telephony · Twilio · WebRTC",
    status: "ACTIVE · Sub-500ms Audio",
    latency: "480ms",
    icon: Phone,
    imageCore: imgAgentVoice,
    description: "Speaks with natural human cadence, handles interruptions gracefully, collects caller information, and transfers hot leads to available representatives in real time.",
    capabilities: [
      "Human-grade acoustic intonation & interruptibility",
      "Custom voice cloning & multi-accent comprehension",
      "Automated post-call summary & action items generation",
      "Seamless warm transfer to mobile or VoIP phones"
    ],
    telemetry: {
      calls_handled_today: 184,
      avg_call_duration: "2m 14s",
      sentiment_score: "+0.84 (Positive)",
      latency_p95: "490ms"
    }
  }
]

export default function AIAgents() {
  const [selectedAgent, setSelectedAgent] = useState(agents[0])

  return (
    <section id="ai-agents" className="relative overflow-hidden bg-[#050505] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="pointer-events-none absolute top-1/2 right-10 w-[700px] h-[500px] bg-white/[0.03] rounded-full blur-[180px] opacity-60" />

      <div className="relative mx-auto max-w-7xl">
        
        <AnimatedSection>
          <SectionHeading
            pill={{ icon: Bot, text: "Autonomous AI Workforce" }}
            title={<>Meet your custom-trained <br className="hidden sm:block" /><span className="text-white/60">enterprise AI agents.</span></>}
            description="Specialized autonomous workers designed to execute mission-critical tasks across sales, support, operations, and voice with sub-second execution speed."
          />
        </AnimatedSection>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent, idx) => {
            const isSelected = selectedAgent.id === agent.id
            return (
              <AnimatedSection key={agent.id} delay={idx * 0.1}>
                <div
                  onClick={() => setSelectedAgent(agent)}
                  className={`group relative flex flex-col justify-between rounded-[2rem] border p-6 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-white/[0.12] border-l-2 border-l-[#fafafa]/30 bg-gradient-to-b from-[#0a0a0a] to-[#080808] shadow-[0_0_0_1px_rgba(255,255,255,0.08)] -translate-y-1"
                      : "border-white/10 bg-[#0a0a0a]/70 hover:border-white/20 hover:bg-[#0a0a0a]/90"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <span className="text-[10px] font-mono font-bold text-[#a1a1aa]">{agent.code}</span>
                      <span className="flex items-center gap-1.5 text-[9px] font-mono font-semibold text-[#86efac]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#86efac] animate-pulse" />
                        LIVE
                      </span>
                    </div>

                    <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.10] text-[#d4d4d8] overflow-hidden relative">
                      <img
                        src={agent.imageCore}
                        alt={agent.name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <h3 className="mt-4 text-base font-bold text-white group-hover:text-[#d4d4d8] transition-colors">
                      {agent.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">{agent.role}</p>

                    <div className="mt-4 pt-3 border-t border-white/5">
                      <div className="text-[10px] uppercase font-mono text-slate-400">Channels:</div>
                      <div className="text-xs text-[#d4d4d8] font-medium mt-0.5">{agent.channel}</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">Latency: {agent.latency}</span>
                    <span className={`text-xs font-bold ${isSelected ? "text-[#d4d4d8]" : "text-slate-500 group-hover:text-slate-300"}`}>
                      Inspect →
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAgent.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
            className="mt-12 rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#050505] p-6 sm:p-8 md:p-10 backdrop-blur-2xl"
          >
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.10] text-[#d4d4d8] overflow-hidden relative">
                  <img
                    src={selectedAgent.imageCore}
                    alt={selectedAgent.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white">{selectedAgent.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.03] text-[#d4d4d8] border border-white/[0.08]">
                      {selectedAgent.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedAgent.description}</p>
                </div>
              </div>

              <a
                href="#assessment"
                className="btn-primary text-xs py-2.5 px-5"
              >
                <span>Deploy {selectedAgent.code}</span>
                <ArrowRight size={13} />
              </a>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              
              <div className="lg:col-span-7 space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Autonomous Execution Capabilities:
                </div>
                {selectedAgent.capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                    <CheckCircle2 size={16} className="text-[#a1a1aa] shrink-0" />
                    <span className="text-xs font-medium text-slate-200">{cap}</span>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#080808]/80 p-5 font-mono">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Terminal size={12} className="text-[#a1a1aa]" />
                    AGENT TELEMETRY (LIVE)
                  </span>
                  <span className="text-[#86efac]">● 99.98% HEALTH</span>
                </div>

                <div className="mt-4 space-y-3">
                  {Object.entries(selectedAgent.telemetry).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 capitalize">{key.replace(/_/g, " ")}:</span>
                      <span className="font-bold text-[#d4d4d8]">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Model Engine: GPT-4o / Claude 3.5 Sonnet</span>
                  <span className="text-[#a1a1aa]">Deterministic Mode</span>
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
