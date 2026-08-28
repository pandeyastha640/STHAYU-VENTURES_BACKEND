import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Zap, TrendingUp, BarChart3, Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function InteractiveMetricsCard() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        container,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        },
      )

      // Animate numbers — use snap:0.1 for non-integer targets so 98.7 doesn't
      // get rounded to 98 (and 0.7 doesn't display as 0).
      const numbers = container.querySelectorAll("[data-animate-number]")
      numbers.forEach((num) => {
        const target = parseFloat(num.getAttribute("data-animate-number"))
        const useFloat = !Number.isInteger(target)
        gsap.to(num, {
          textContent: target,
          duration: 2,
          snap: useFloat ? { textContent: 0.1 } : { textContent: 1 },
          ease: "power1.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        })
      })
    }, containerRef)

    return () => {
      // Only revert the triggers/tweens this component created, not other
      // components that share the global ScrollTrigger registry.
      ctx.revert()
    }
  }, [])

  const metrics = [
    { icon: Zap, label: "Processing Speed", value: 98.7, unit: "%", change: "+12.3%" },
    { icon: TrendingUp, label: "System Efficiency", value: 92.4, unit: "%", change: "+8.2%" },
    { icon: BarChart3, label: "Data Throughput", value: 156.2, unit: "GB/s", change: "+24.1%" },
    { icon: Sparkles, label: "AI Accuracy", value: 96.8, unit: "%", change: "+5.6%" },
  ]

  return (
    <div
      ref={containerRef}
      className="relative rounded-[34px] border border-white/10 bg-gradient-to-br from-[#081117] to-[#0a1217] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.4)] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 h-96 w-96 bg-white/[0.02] blur-[120px] rounded-full" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
            <Sparkles size={20} className="text-[#d4d4d8]" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Performance Metrics</p>
            <h3 className="text-[1.5rem] font-semibold text-white">System Dashboard</h3>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map(({ icon: Icon, label, value, unit, change }) => (
            <div
              key={label}
              className="group rounded-[20px] border border-white/10 bg-[#0a0a0a]/80 p-5 hover:border-white/[0.08] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon size={16} className="text-[#d4d4d8]" />
                <span className="text-[10px] text-emerald-300 font-semibold">{change}</span>
              </div>

              <div className="mb-3">
                <span
                  className="text-[2rem] font-extrabold text-white"
                  data-animate-number={value}
                >
                  {value}
                </span>
                <span className="text-[12px] text-slate-400 ml-1">{unit}</span>
              </div>

              <p className="text-[12px] text-slate-400 uppercase tracking-[0.1em]">{label}</p>

              {/* Mini bar chart */}
              <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-300/40 to-cyan-300" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Info footer */}
        <div className="mt-8 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Last updated</span>
          <span className="flex items-center gap-2 text-[11px] text-[#d4d4d8]">
            <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
            Real-time
          </span>
        </div>
      </div>
    </div>
  )
}
