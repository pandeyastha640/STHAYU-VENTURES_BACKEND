import { useEffect, useRef } from "react"

export default function AnimatedVisualization() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    updateCanvasSize()

    // Animated network visualization
    const nodes = []
    const nodeCount = 8

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 3 + 2,
      })
    }

    let rafId = 0
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(5, 7, 10, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach((node) => {
        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        node.x += node.vx
        node.y += node.vy

        // Draw connections
        nodes.forEach((other) => {
          const dx = other.x - node.x
          const dy = other.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.strokeStyle = `rgba(103, 232, 249, ${0.2 * (1 - distance / 150)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        })

        // Draw node
        ctx.fillStyle = "rgba(103, 232, 249, 0.8)"
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fill()

        // Glow effect
        ctx.strokeStyle = "rgba(103, 232, 249, 0.3)"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size + 3, 0, Math.PI * 2)
        ctx.stroke()
      })

      rafId = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener("resize", updateCanvasSize)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      // Stop the animation loop when the component unmounts.
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-80 rounded-[30px] border border-white/10 bg-[#0a0a0a]/60 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.3)]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Overlay info */}
      <div className="absolute top-6 left-6 z-10 text-[11px] uppercase tracking-[0.16em] text-slate-300">
        <p>Network Analysis</p>
        <p className="mt-1 text-[#d4d4d8] font-semibold">Real-time data flow</p>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex gap-2">
        <div className="rounded-lg border border-white/10 bg-[#0a0a0a]/80 px-3 py-1.5 text-[10px] text-slate-300">Connected</div>
        <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-[10px] text-emerald-300">Stable</div>
      </div>
    </div>
  )
}
