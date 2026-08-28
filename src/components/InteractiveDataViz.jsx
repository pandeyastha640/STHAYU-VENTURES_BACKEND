import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function InteractiveDataViz() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create animated particles
    const createParticles = () => {
      const count = 12
      const tweens = []

      for (let i = 0; i < count; i++) {
        const particle = document.createElement("div")
        particle.className = "absolute w-1.5 h-1.5 rounded-full bg-white/50"
        particle.style.left = Math.random() * 100 + "%"
        particle.style.top = Math.random() * 100 + "%"
        particle.style.opacity = String(Math.random() * 0.7 + 0.3)

        container.appendChild(particle)

        const tl = gsap.timeline({ repeat: -1 })
        tl.to(particle, {
          x: (Math.random() - 0.5) * 300,
          y: (Math.random() - 0.5) * 300,
          opacity: Math.random() * 0.5,
          duration: Math.random() * 4 + 4,
          ease: "sine.inOut",
        }).to(
          particle,
          {
            x: 0,
            y: 0,
            opacity: Math.random() * 0.7 + 0.3,
            duration: Math.random() * 4 + 4,
            ease: "sine.inOut",
          },
          0,
        )
        tweens.push(tl)
      }

      return tweens
    }

    const tweens = createParticles()

    return () => {
      // Kill tweens and remove the dynamically added particles so the container
      // is left clean for re-mounts (HMR or route changes).
      tweens.forEach((t) => t.kill())
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 rounded-[30px] border border-white/10 bg-[#0a0a0a]/60 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.3)]"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Central nodes and connections */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="none">
        <defs>
          <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connecting lines */}
        <path d="M100 150 L300 100 M300 100 L500 150 M100 150 L300 200 M300 200 L500 150" stroke="rgba(103,232,249,0.2)" strokeWidth="1" fill="none" strokeDasharray="5,5" />

        {/* Central node */}
        <circle cx="300" cy="150" r="12" fill="url(#nodeGrad)" />
        <circle cx="300" cy="150" r="20" fill="none" stroke="rgba(103,232,249,0.3)" strokeWidth="1" />

        {/* Outer nodes */}
        {[100, 500].map((x) =>
          [100, 200].map((y) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="8" fill="rgba(103,232,249,0.6)" />
              <circle cx={x} cy={y} r="14" fill="none" stroke="rgba(103,232,249,0.2)" strokeWidth="1" />
            </g>
          ))
        )}
      </svg>

      {/* Info labels */}
      <div className="absolute top-6 left-6 z-10 text-[11px] uppercase tracking-[0.16em] text-slate-300">
        <p>Intelligence Network</p>
        <p className="mt-1 text-[#d4d4d8] font-semibold">Live connections: 42</p>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex gap-3">
        <div className="rounded-lg border border-white/10 bg-[#0a0a0a]/80 px-3 py-1.5 text-[10px] text-slate-300">AI Processing</div>
        <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-[10px] text-emerald-300">100% Active</div>
      </div>
    </div>
  )
}
