import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { ArrowRight, Menu, X } from "lucide-react"

const navLinks = [
  { label: "Solutions", id: "services" },
  { label: "AI Agents", id: "ai-agents" },
  { label: "Why Sthayu", id: "why-sthayu" },
  { label: "Process", id: "how-it-works" },
  { label: "Case Studies", id: "case-studies" },
  { label: "Pricing", id: "pricing" },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navLinks.map((link) => document.getElementById(link.id)).filter(Boolean)
      const scrollPosition = window.scrollY + 120
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const goTo = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
    setMenuOpen(false)
  }

  const goHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 sm:px-6 lg:px-8"
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border transition-all duration-700 px-4 py-2.5 sm:px-6 ${
            scrolled
              ? "border-white/[0.08] bg-[#050505]/80 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "border-transparent bg-transparent backdrop-blur-none"
          }`}
        >
          {/* Brand */}
          <button
            type="button"
            onClick={goHome}
            className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
            aria-label="Sthayu Ventures home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-white/[0.08] to-white/[0.04] border border-white/[0.08] text-sm font-semibold text-[#fafafa] transition-all duration-300 group-hover:from-white/[0.14] group-hover:to-white/[0.08]">
              S
            </div>
            <div className="leading-none">
              <div className="text-sm font-semibold tracking-tight text-[#fafafa] group-hover:text-white transition-colors">
                Sthayu
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#71717a]">
                Ventures
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden items-center justify-center gap-1 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => goTo(link.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`nav-link relative rounded-full px-3 py-1.5 text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-[#fafafa] bg-white/[0.06] border-b border-white/30"
                      : "text-[#a1a1aa] hover:text-[#fafafa] hover:bg-white/[0.03]"
                  }`}
                >
                  {link.label}
                </button>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => goTo("assessment")}
              className="text-[13px] font-medium text-[#a1a1aa] hover:text-[#fafafa] px-3 py-2 transition-colors cursor-pointer"
            >
              Assessment
            </button>
            <button
              type="button"
              onClick={() => goTo("contact")}
              className="btn-primary shimmer-on-hover text-[13px] py-2 px-5 cursor-pointer"
            >
              <span>Book a Call</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#a1a1aa] transition-colors hover:border-white/[0.12] hover:text-[#fafafa] lg:hidden cursor-pointer"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/[0.06] bg-[#050505]/95 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl lg:hidden"
          >
            <div className="grid gap-0.5">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * (i + 1), ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => goTo(link.id)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-medium text-[#d4d4d8] transition-colors hover:bg-white/[0.04] hover:text-[#fafafa] cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ArrowRight size={13} className="text-[#52525b]" />
                </motion.button>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-white/[0.06] flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => goTo("assessment")}
                className="btn-secondary w-full text-[13px] py-2.5 justify-center cursor-pointer"
              >
                Free Assessment
              </button>
              <button
                type="button"
                onClick={() => goTo("contact")}
                className="btn-primary w-full text-[13px] py-2.5 justify-center cursor-pointer"
              >
                Book a Call
              </button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      <style>{`
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 2px;
          left: 50%;
          width: 0;
          height: 1px;
          background: rgba(255, 255, 255, 0.4);
          transition: width 0.25s ease, left 0.25s ease;
          border-radius: 1px;
        }
        .nav-link:not([aria-current="true"]):hover::after {
          width: 60%;
          left: 20%;
        }
        .nav-link[aria-current="true"]::after {
          width: 40%;
          left: 30%;
        }
      `}</style>
    </>
  )
}
