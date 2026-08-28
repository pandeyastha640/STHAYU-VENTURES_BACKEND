import { ArrowRight, CheckCircle2, Search, XCircle, Zap } from "lucide-react"
import { AnimatedSection, SectionHeading } from "./ui"

const frictionPoints = [
  {
    title: "The Lead Decay Bottleneck",
    problem: "Inbound leads wait hours for human response, dropping qualification rates by up to 70%.",
    solution: "Sub-3-second AI conversational qualification on WhatsApp, Web, and Voice.",
    metric: "3.8x faster conversion",
  },
  {
    title: "Manual Data & Spreadsheet Chaos",
    problem: "Staff spend 15+ hours weekly copy-pasting customer records, reconciling invoices, and compiling reports.",
    solution: "Automated multi-system synchronization across ERP, CRM, and Stripe in real time.",
    metric: "85% admin time saved",
  },
  {
    title: "Siloed Software Ecosystem",
    problem: "10+ disconnected SaaS tools that don't speak to each other, creating blind spots and lost context.",
    solution: "Single event-driven integration layer connecting websites, databases, and internal workflows.",
    metric: "100% unified source of truth",
  },
  {
    title: "Reactive Customer Support",
    problem: "Repetitive Tier-1 support tickets overwhelm human teams, driving up wait times and churn.",
    solution: "Context-aware AI support agents with instant resolution and seamless human handoffs.",
    metric: "90% autonomous resolution",
  },
]

export default function ProblemDiscovery() {
  return (
    <section id="problem-discovery" className="relative overflow-hidden bg-[#050505] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-white/[0.03] rounded-full blur-[160px] opacity-60" />

      <div className="relative mx-auto max-w-7xl">

        <AnimatedSection>
          <SectionHeading
            pill={{ icon: Search, text: "Root Cause Analysis" }}
            title={
              <>
                Your business does not need more software. <br className="hidden sm:block" />
                <span className="text-white/60">It needs systems that work together.</span>
              </>
            }
            description={'Most organizations don\'t suffer from a lack of effort. They suffer from the "fragmentation tax" — work scattered across disparate tools, manual coordination, and delayed decisions.'}
          />
        </AnimatedSection>

        {/* 2-Column Comparison Architecture */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">

          {/* Column 1: The Fragmentation Tax (Before) */}
          <AnimatedSection delay={0.1}>
            <div className="rounded-[2.5rem] border border-red-500/[0.12] bg-gradient-to-b from-[#140608]/70 via-[#0d0406]/50 to-[#050505] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-6 border-b border-red-500/[0.10]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/[0.06] border border-red-500/[0.12] text-[#fca5a5]">
                    <XCircle size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">The Fragmented Enterprise</h3>
                    <p className="text-xs text-[#fca5a5] font-mono">STATUS: HIGH FRICTION & BOTTLENECKS</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-500/[0.06] text-[#fca5a5] text-[10px] font-bold uppercase tracking-wider border border-red-500/[0.12]">
                  Legacy Reality
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  { title: "Manual Data Entry & Duplicate Work", desc: "Teams manually copying info between forms, CRM, spreadsheets, and emails." },
                  { title: "Leads Stalling in Queues", desc: "Prospects wait hours for outreach while competitors convert in seconds." },
                  { title: "Opaque Operational Visibility", desc: "Leaders make decisions using stale, week-old static reports." },
                  { title: "Disjointed SaaS Sprawl", desc: "Paying for dozens of isolated tools that require human babysitting." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-red-500/[0.10]">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/[0.08]">
                      <XCircle size={12} className="text-[#fca5a5]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-red-500/[0.10] flex items-center justify-between text-xs font-mono text-[#fca5a5]">
                <span>Avg operational loss:</span>
                <span className="font-bold">28+ hrs/employee/month</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Column 2: The Sthayu Connected System (After) */}
          <AnimatedSection delay={0.2}>
            <div className="rounded-[2.5rem] border border-white/[0.10] bg-gradient-to-b from-[#0a0a0a]/80 via-[#080808]/60 to-[#050505] p-6 sm:p-8 md:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl relative">
              <div className="absolute -top-3 right-8 px-3.5 py-1 rounded-full bg-white/[0.08] text-[#fafafa] border border-white/[0.12] font-sans text-[10px] font-extrabold uppercase tracking-wider shadow-lg">
                Sthayu Transformation
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.10] text-[#d4d4d8]">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">The Sthayu Intelligent System</h3>
                    <p className="text-xs text-[#d4d4d8] font-mono">STATUS: AUTONOMOUS & INTEGRATED</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/[0.03] text-[#d4d4d8] text-[10px] font-bold uppercase tracking-wider border border-white/[0.08]">
                  Connected Future
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  { title: "Autonomous Workflows & Sync", desc: "Data transforms and syncs instantly across tools with zero manual intervention." },
                  { title: "Instant AI Response & Calendar Routing", desc: "Autonomous sales agents qualify leads in < 3s and book qualified executive meetings." },
                  { title: "Live Real-Time Operational Intelligence", desc: "Dynamic dashboards and proactive anomaly alerts right in Slack or email." },
                  { title: "Unified Enterprise Architecture", desc: "One clean operating layer that amplifies your team's output without tool bloat." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.04]">
                      <CheckCircle2 size={12} className="text-[#d4d4d8]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-300 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#d4d4d8]">
                <span>Operational uplift:</span>
                <span className="font-bold text-[#86efac]">+74% faster execution speed</span>
              </div>
            </div>
          </AnimatedSection>

        </div>

        {/* Detailed Friction-to-Flow Matrix Cards */}
        <div className="mt-16">
          <AnimatedSection>
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Specific Operational Transformations</h3>
              <p className="text-sm text-slate-400 mt-1">How we replace friction with high-performance digital infrastructure.</p>
            </div>
          </AnimatedSection>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {frictionPoints.map((item, idx) => (
              <AnimatedSection key={item.title} delay={idx * 0.1}>
                <div
                  className="glass-card p-6 flex flex-col justify-between group hover:border-white/[0.08] transition"
                >
                  <div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#d4d4d8] mb-4">
                      <Zap size={16} />
                    </div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">{item.problem}</p>
                    <p className="text-xs text-[#d4d4d8] mt-2 font-medium">{item.solution}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#86efac] font-bold">{item.metric}</span>
                    <ArrowRight size={13} className="text-[#a1a1aa] opacity-60 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
