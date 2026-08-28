import { useState, useEffect, useRef } from "react"
import { BarChart3, Bot, Clock3, Database, Layers3, Sparkles, TrendingUp, Workflow, Zap, Activity, CheckCircle2 } from "lucide-react"
import { AnimatedSection } from "./ui"

const activityLog = [
  { time: "14:32:07", agent: "STH-SDR-01", action: "Lead qualified: Apex Corp → Cal.com booking sent", status: "success" },
  { time: "14:32:04", agent: "STH-OPS-03", action: "Invoice #4102 reconciled across Stripe + SAP ledger", status: "success" },
  { time: "14:31:58", agent: "STH-SUP-02", action: "Ticket #8942 resolved: vector search match 98.4%", status: "success" },
  { time: "14:31:51", agent: "STH-VOX-04", action: "Inbound call transferred to sales rep — warm handoff", status: "success" },
  { time: "14:31:44", agent: "STH-SDR-01", action: "WhatsApp inquiry parsed: intent score 91/100", status: "success" },
  { time: "14:31:38", agent: "STH-OPS-03", action: "ERP sync batch: 2,480 records aligned in 1.2s", status: "success" },
]

const metrics = [
  { icon: Zap, label: "Tasks Automated / Wk", value: "14,820", delta: "+34%" },
  { icon: Clock3, label: "Manual Hours Reclaimed", value: "640 hrs", delta: "+42%" },
  { icon: Bot, label: "Autonomous AI Actions", value: "9,140", delta: "+28%" },
  { icon: TrendingUp, label: "System Execution Health", value: "99.98%", delta: "Optimal" },
]

function LiveActivityFeed() {
  const [visibleCount, setVisibleCount] = useState(3)
  const feedRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount((prev) => (prev >= activityLog.length ? 3 : prev + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-2xl border border-white/10 bg-[#080808]/80 p-4 sm:p-5">
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-[#86efac]" />
          <span className="text-xs font-bold text-white">Live Agent Activity</span>
        </div>
        <span className="flex items-center gap-1.5 text-[9px] font-mono font-semibold text-[#86efac]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#86efac] animate-pulse" />
          STREAMING
        </span>
      </div>
      <div ref={feedRef} className="space-y-1.5 font-mono text-[11px]">
        {activityLog.slice(0, visibleCount).map((entry, idx) => (
          <div
            key={`${entry.time}-${idx}`}
            className="flex items-start gap-2 rounded-lg bg-white/[0.02] px-3 py-2 border border-white/[0.04] transition-all duration-500"
            style={{ opacity: idx === 0 ? 1 : Math.max(0.4, 1 - idx * 0.2) }}
          >
            <span className="text-slate-500 shrink-0 w-[56px]">{entry.time}</span>
            <span className="text-[#a1a1aa] shrink-0 w-[72px]">{entry.agent}</span>
            <span className="text-slate-300 truncate">{entry.action}</span>
            <CheckCircle2 size={12} className="text-[#86efac] shrink-0 mt-0.5" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Showcase() {
  const [activeMenu, setActiveMenu] = useState("Automations")

  return (
    <section id="showcase" className="relative overflow-hidden bg-[#050505] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 right-[10%] w-[600px] h-[500px] bg-white/[0.03] rounded-full blur-[180px] opacity-60" />

      <div className="relative mx-auto max-w-7xl">
        
        <AnimatedSection>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="glass-pill mx-auto">
              <Layers3 size={13} />
              <span>Executive Command Center</span>
            </div>

            <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              One intelligent cockpit <br className="hidden sm:block" />
              <span className="text-white/60">for your entire operation.</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Real-time operational telemetry, live agent queues, automated data flows, and predictive business insights unified in a single high-performance console.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
        {/* Command Center Dashboard Mockup */}
        <div className="mt-16 rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#050505] p-4 sm:p-6 md:p-8 shadow-[0_40px_120px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          
          {/* Top Window Chrome */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 px-2">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-[11px] font-mono text-slate-400 hidden sm:inline">
                https://command.sthayu.com/enterprise/orchestration
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-[#86efac] uppercase tracking-widest">
                SYSTEM HEALTH: 100%
              </span>
            </div>
          </div>

          {/* Main Dashboard Layout */}
          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            
            {/* Left Sidebar navigation */}
            <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-[#080808]/80 p-4 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                  Operating Modules
                </div>
                {[
                  { name: "Overview", icon: Sparkles },
                  { name: "Automations", icon: Workflow },
                  { name: "AI Workforce", icon: Bot },
                  { name: "Data Streams", icon: Database },
                  { name: "Analytics", icon: BarChart3 },
                ].map((item) => {
                  const Icon = item.icon
                  const isActive = activeMenu === item.name
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setActiveMenu(item.name)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "bg-white/[0.04] border border-white/[0.10] text-[#d4d4d8]"
                          : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <Icon size={15} />
                      <span>{item.name}</span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>LATENCY (P99)</span>
                  <span className="text-[#d4d4d8] font-bold">24ms</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-[94%] bg-gradient-to-r from-[#d4d4d8] to-[#a1a1aa] rounded-full" />
                </div>
              </div>
            </div>

            {/* Right Main Analytics Grid */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* 4 Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {metrics.map((m) => {
                  const Icon = m.icon
                  return (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-white/10 bg-[#080808]/80 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#d4d4d8]">
                          <Icon size={15} />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#86efac]">{m.delta}</span>
                      </div>
                      <div className="mt-3 font-mono text-xl sm:text-2xl font-extrabold text-white">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate">{m.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Central Telemetry Chart & Event Stream */}
              <div className="rounded-2xl border border-white/10 bg-[#080808]/80 p-5">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <div className="text-xs font-bold text-white">Live Execution Throughput (Events/Sec)</div>
                    <div className="text-[10px] text-slate-400 font-mono">Continuous webhook orchestration</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#86efac]/[0.06] text-[#86efac] border border-[#86efac]/[0.12]">
                    REAL-TIME STREAM
                  </span>
                </div>

                <div className="mt-4 h-32 w-full overflow-hidden">
                  <svg className="h-full w-full" viewBox="0 0 500 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="commandChartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="commandLine" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 100 C40 92 60 70 100 80 C140 90 160 55 200 65 C240 75 260 40 300 50 C340 60 380 20 420 30 C460 40 480 15 500 10 L500 120 L0 120 Z"
                      fill="url(#commandChartGlow)"
                    />
                    <path
                      d="M0 100 C40 92 60 70 100 80 C140 90 160 55 200 65 C240 75 260 40 300 50 C340 60 380 20 420 30 C460 40 480 15 500 10"
                      fill="none"
                      stroke="url(#commandLine)"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
              </div>

              {/* Live Agent Activity Feed */}
              <LiveActivityFeed />

            </div>

          </div>

        </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
