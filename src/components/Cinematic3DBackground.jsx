import { useEffect, useRef, useState } from "react"
import bgPoster from "../assets/images/cinematic_3d_bg_1787842642405.jpg"

// Direct high-performance dark ambient 3D technology & neural data video loops
const VIDEO_SOURCES = [
  "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-lines-and-dots-loop-42861-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-digital-interface-31908-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphs-and-data-31913-large.mp4",
]

export default function Cinematic3DBackground() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Interactive 3D Depth Particle & Synapse Grid Layer (always active & 60fps)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    // 3D Particles with depth (Z axis)
    const particleCount = 55
    const particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 + 100,
        vz: -0.8 - Math.random() * 0.8,
        size: Math.random() * 2 + 1.2,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2
      const fov = 400

      // Render projected 3D nodes
      const projected = []

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.z += p.vz
        if (p.z <= 10) {
          p.z = 800
          p.x = (Math.random() - 0.5) * width * 1.5
          p.y = (Math.random() - 0.5) * height * 1.5
        }

        const scale = fov / (fov + p.z)
        const x2d = cx + p.x * scale
        const y2d = cy + p.y * scale
        const alpha = Math.min(1, Math.max(0, (1 - p.z / 800) * 0.65))

        projected.push({ x: x2d, y: y2d, scale, alpha, z: p.z })

        // Draw node
        ctx.beginPath()
        ctx.arc(x2d, y2d, p.size * scale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 212, 216, ${alpha * 0.8})`
        ctx.shadowColor = "rgba(255, 255, 255, 0.4)"
        ctx.shadowBlur = 4
        ctx.fill()
      }

      // Draw dimensional connecting lines between close nodes
      ctx.lineWidth = 0.75
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i]
          const p2 = projected[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const zDiff = Math.abs(p1.z - p2.z)

          if (dist < 130 && zDiff < 200) {
            const lineAlpha = (1 - dist / 130) * Math.min(p1.alpha, p2.alpha) * 0.35
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(200, 220, 240, ${lineAlpha})`
            ctx.shadowBlur = 0
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Video Autoplay handler
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playVideo = () => {
      video.play().then(() => {
        setVideoLoaded(true)
      }).catch(() => {
        // Retry on user interaction if browser policy requires it
        const onInteraction = () => {
          video.play().then(() => setVideoLoaded(true)).catch(() => {})
          window.removeEventListener("click", onInteraction)
          window.removeEventListener("touchstart", onInteraction)
        }
        window.addEventListener("click", onInteraction, { once: true })
        window.addEventListener("touchstart", onInteraction, { once: true })
      })
    }

    video.addEventListener("canplay", playVideo)
    playVideo()

    return () => {
      video.removeEventListener("canplay", playVideo)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      style={{ isolation: "isolate" }}
    >
      {/* Base deep background */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* 3D Poster / Atmospheric Depth Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${bgPoster})`,
          opacity: 0.4,
          filter: "brightness(0.6) contrast(1.2)",
        }}
      />

      {/* 3D Cinematic Motion Video Loop */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        poster={bgPoster}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? "opacity-45" : "opacity-25"
        }`}
        style={{
          filter: "saturate(0.4) brightness(0.55) contrast(1.3)",
          mixBlendMode: "screen",
        }}
      >
        <source src={VIDEO_SOURCES[0]} type="video/mp4" />
        <source src={VIDEO_SOURCES[1]} type="video/mp4" />
      </video>

      {/* Real-time 3D Interactive Dimensional Node Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-60"
        style={{ pointerEvents: "none" }}
      />

      {/* 3D Perspective Isometric Depth Grid */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 30%, transparent 80%)",
        }}
      />

      {/* Ambient 3D Volumetric Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-white/[0.02] blur-[160px]" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 h-[700px] w-[700px] rounded-full bg-cyan-500/[0.015] blur-[180px]" />

      {/* Readability Vignette — ensures typography remains 100% sharp and readable */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505]/70"
        style={{ pointerEvents: "none" }}
      />
    </div>
  )
}
