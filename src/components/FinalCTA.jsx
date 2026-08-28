import { ArrowRight, ArrowUpRight, Check, Sparkles, Zap, ShieldCheck } from "lucide-react"
import { AnimatedSection } from "./ui"

export default function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#050505] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-white/[0.03] rounded-full blur-[200px] opacity-70" />

      <div className="relative mx-auto max-w-7xl">
        <AnimatedSection>
        <div className="rounded-[2.5rem] border border-white/[0.10] bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#050505] p-8 sm:p-12 md:p-16 shadow-[0_40px_120px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden relative">
          
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-8 space-y-6">
              <div className="glass-pill">
                <Sparkles size={13} />
                <span>Ready When You Are</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Turn operational friction <br />
                <span className="text-white/60">into autonomous momentum.</span>
              </h2>

              <p className="max-w-xl text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Partner with Sthayu to build your intelligent operating system. Eliminate repetitive manual coordination, accelerate lead-to-action cycles, and scale without overhead.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="#assessment"
                  className="btn-primary py-4 px-8 text-xs font-bold shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                >
                  <span>Request System Architecture Audit</span>
                  <ArrowRight size={15} />
                </a>

                <a
                  href="mailto:hello@sthayuventures.com?subject=Strategic%20Inquiry%20-%20Sthayu%20Ventures"
                  className="btn-secondary py-4 px-7 text-xs font-bold"
                >
                  <span>Contact Founders Directly</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-[#86efac]">
                  <Check size={14} />
                  Zero Upfront Obligation
                </span>
                <span className="flex items-center gap-1.5 text-[#d4d4d8]">
                  <ShieldCheck size={14} />
                  NDA Protected
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Zap size={14} className="text-yellow-400" />
                  24-Hour Blueprint Delivery
                </span>
              </div>
            </div>

            {/* Right Column: Mini Live Console Visual */}
            <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#050505]/80 p-6 font-mono space-y-4 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] text-slate-400">
                <span>SYSTEM STATUS</span>
                <span className="text-[#86efac]">● 100% OPERATIONAL</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Architecture:</span>
                  <span className="text-[#d4d4d8] font-bold">Autonomous Fabric</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Security:</span>
                  <span className="text-[#86efac] font-bold">SOC2 / HIPAA Grade</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg Implementation:</span>
                  <span className="text-white font-bold">14 - 30 Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target ROI:</span>
                  <span className="text-[#d4d4d8] font-bold">4.2x Operational Lift</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 text-[10px] text-slate-400 text-center">
                ENGINEERED BY STHAYU VENTURES
              </div>
            </div>

          </div>

        </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

