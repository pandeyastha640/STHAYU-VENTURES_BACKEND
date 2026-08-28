import { useRef } from "react"
import { motion, useInView } from "motion/react"

function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ pill, title, description, className = "" }) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {pill && (
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-[#a1a1aa] backdrop-blur-sm">
          {pill.icon && <pill.icon className="h-3.5 w-3.5" />}
          <span>{pill.text}</span>
        </div>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-[#a1a1aa] sm:text-lg">{description}</p>
      )}
    </div>
  )
}

function GlassCard({ children, className = "", hover = true, glow = false }) {
  return (
    <div
      className={`relative rounded-3xl border border-white/[0.06] bg-[#0a0a0a]/60 backdrop-blur-xl ${
        hover
          ? "transition-all duration-500 hover:border-white/[0.12] hover:-translate-y-0.5"
          : ""
      } ${glow ? "group" : ""} ${className}`}
    >
      {glow && (
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: "0 0 60px 12px rgba(255,255,255,0.04)" }} />
      )}
      {children}
    </div>
  )
}

function VideoCard({ src, poster, alt = "", className = "", aspect = "aspect-video" }) {
  const videoRef = useRef(null)

  return (
    <div
      className={`overflow-hidden rounded-2xl ${aspect} ${className}`}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => videoRef.current?.pause()}
    >
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          controls={false}
          className="h-full w-full object-cover"
        />
      ) : poster ? (
        <img src={poster} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      ) : null}
    </div>
  )
}

function MediaReveal({ children, className = "" }) {
  return (
    <AnimatedSection className={className}>
      <motion.div
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        viewport={{ once: true, amount: 0.15 }}
      >
        {children}
      </motion.div>
    </AnimatedSection>
  )
}

function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "border-white/[0.08] bg-white/[0.04] text-[#a1a1aa]",
    accent: "border-white/[0.12] bg-white/[0.06] text-[#fafafa]",
    success: "border-[#86efac]/20 bg-[#86efac]/10 text-[#86efac]",
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

function GradientText({ children, className = "" }) {
  return (
    <span className={`bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/60 ${className}`}>
      {children}
    </span>
  )
}

function Button({ variant = "primary", children, className = "", href, ...props }) {
  const variants = {
    primary: "bg-white text-[#050505] hover:bg-white/90 font-medium rounded-full",
    secondary: "border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08] rounded-full",
    ghost: "text-[#a1a1aa] hover:text-white",
  }

  const base = `inline-flex items-center gap-2 transition-all duration-300 px-6 py-3 text-sm ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={base} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={base} {...props}>
      {children}
    </button>
  )
}

function SectionDivider({ className = "" }) {
  return (
    <div className={`relative w-full py-4 ${className}`} aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  )
}

export {
  AnimatedSection,
  SectionHeading,
  GlassCard,
  VideoCard,
  MediaReveal,
  Badge,
  GradientText,
  Button,
  SectionDivider,
}

export default {
  AnimatedSection,
  SectionHeading,
  GlassCard,
  VideoCard,
  MediaReveal,
  Badge,
  GradientText,
  Button,
  SectionDivider,
}
