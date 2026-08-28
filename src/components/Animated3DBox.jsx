import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Animated3DBox() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const rotateX = ((y - rect.height / 2) / rect.height) * 10
      const rotateY = ((x - rect.width / 2) / rect.width) * 10

      gsap.to(container, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.4,
        transformOrigin: "center center",
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(container, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      })
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    // Auto-rotate when not hovering
    const autoRotate = gsap.to(container, {
      rotationY: 360,
      duration: 12,
      repeat: -1,
      ease: "none",
      paused: false,
    })

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
      autoRotate.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-80 rounded-[30px] border border-white/[0.08] bg-[#0a0a0a]/60 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/5 via-transparent to-white/[0.02]" />

      {/* 3D-like nested frames */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64">
          {/* Outer frame */}
          <div className="absolute inset-0 border-2 border-white/[0.10] rounded-3xl" />

          {/* Middle frame */}
          <div className="absolute inset-4 border border-white/[0.08] rounded-2xl" />

          {/* Inner frame with content */}
          <div className="absolute inset-8 border border-white/[0.12]/10 rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                3D
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#d4d4d8]">Intelligence</p>
            </div>
          </div>

          {/* Animated corner elements */}
          {[
            { top: "-8px", left: "-8px" },
            { top: "-8px", right: "-8px" },
            { bottom: "-8px", left: "-8px" },
            { bottom: "-8px", right: "-8px" },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 border border-white/[0.12] rounded"
              style={{
                ...pos,
                animation: `pulse 2s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Info overlay */}
      <div className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.16em] text-slate-400">
        <p>Advanced System Visualization</p>
      </div>

      <div className="absolute bottom-6 right-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#d4d4d8]">
        <span className="w-2 h-2 bg-[#86efac] rounded-full animate-pulse" />
        Interactive
      </div>
    </div>
  )
}
