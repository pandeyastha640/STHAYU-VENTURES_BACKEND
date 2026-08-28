import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Advanced3DVisualization() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const svg = container.querySelector("svg")
    if (!svg) return

    const ctx = gsap.context(() => {
      // Rotate the SVG continuously
      gsap.to(svg, {
        rotationZ: 360,
        rotationX: 20,
        rotationY: 30,
        duration: 20,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      })

      // Pulsing animation for circles
      const circles = svg.querySelectorAll("circle.pulse")
      circles.forEach((circle, i) => {
        gsap.to(circle, {
          attr: { r: parseFloat(circle.getAttribute("r")) * 1.3 },
          opacity: 0.2,
          duration: 2,
          repeat: -1,
          yoyo: true,
          delay: i * 0.3,
          ease: "sine.inOut",
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-80 rounded-[30px] border border-white/10 bg-[#0a0a0a]/60 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.3)] flex items-center justify-center"
      style={{
        perspective: "1200px",
      }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(103,232,249,0.05),transparent_70%)]" />

      {/* SVG 3D visualization */}
      <svg
        viewBox="0 0 300 300"
        className="w-48 h-48 relative z-10"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <defs>
          <linearGradient id="grad3d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow3d">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Central core */}
        <circle cx="150" cy="150" r="25" fill="url(#grad3d)" filter="url(#glow3d)" />

        {/* Orbital rings */}
        <circle cx="150" cy="150" r="60" fill="none" stroke="rgba(103,232,249,0.2)" strokeWidth="1" strokeDasharray="5,5" />
        <circle cx="150" cy="150" r="90" fill="none" stroke="rgba(103,232,249,0.15)" strokeWidth="1" strokeDasharray="8,8" />
        <circle cx="150" cy="150" r="120" fill="none" stroke="rgba(103,232,249,0.1)" strokeWidth="1" strokeDasharray="10,10" />

        {/* Orbital nodes - layer 1 */}
        <g className="pulse-group-1">
          {[0, 90, 180, 270].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            const x = 150 + 60 * Math.cos(rad)
            const y = 150 + 60 * Math.sin(rad)
            return (
              <g key={`layer1-${i}`}>
                <circle cx={x} cy={y} r="6" fill="rgba(103,232,249,0.8)" className="pulse" filter="url(#glow3d)" />
              </g>
            )
          })}
        </g>

        {/* Orbital nodes - layer 2 */}
        <g className="pulse-group-2">
          {[45, 135, 225, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            const x = 150 + 90 * Math.cos(rad)
            const y = 150 + 90 * Math.sin(rad)
            return (
              <g key={`layer2-${i}`}>
                <circle cx={x} cy={y} r="4" fill="rgba(59,130,246,0.6)" className="pulse" filter="url(#glow3d)" />
              </g>
            )
          })}
        </g>

        {/* Connecting paths */}
        {[0, 90, 180, 270].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x1 = 150 + 60 * Math.cos(rad)
          const y1 = 150 + 60 * Math.sin(rad)
          return (
            <line
              key={`line-${i}`}
              x1="150"
              y1="150"
              x2={x1}
              y2={y1}
              stroke="rgba(103,232,249,0.3)"
              strokeWidth="1"
            />
          )
        })}

        {/* Pulsing core glow */}
        <circle cx="150" cy="150" r="30" fill="none" stroke="rgba(103,232,249,0.4)" strokeWidth="2" className="pulse" filter="url(#glow3d)" />
      </svg>

      {/* Info overlay */}
      <div className="absolute bottom-6 left-6 z-20 text-[10px] uppercase tracking-[0.16em] text-slate-300">
        <p>3D System Architecture</p>
        <p className="mt-1 text-[#d4d4d8] font-semibold">Hierarchical model</p>
      </div>

      <div className="absolute bottom-6 right-6 z-20 flex gap-2">
        <div className="rounded-lg border border-white/10 bg-[#0a0a0a]/80 px-3 py-1.5 text-[10px] text-slate-300">Rotating</div>
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[10px] text-[#d4d4d8]">Interactive</div>
      </div>
    </div>
  )
}
