import { useState } from "react"
import { ArrowUpRight, Layers } from "lucide-react"
import { AnimatedSection } from "./ui"

import imgRevenueHub from "../assets/images/portfolio_revenue_hub_1787841972420.jpg"
import imgIntelligenceConsole from "../assets/images/portfolio_intelligence_console_1787841987404.jpg"
import imgWebhookEngine from "../assets/images/portfolio_webhook_engine_1787842003320.jpg"
import imgDigitalFlagship from "../assets/images/portfolio_digital_flagship_1787842021339.jpg"
import imgVectorRag from "../assets/images/portfolio_vector_rag_1787842039189.jpg"
import imgInventoryOrchestrator from "../assets/images/portfolio_inventory_orchestrator_1787842054281.jpg"

const filterCategories = ["All Architectures", "AI Agents", "Workflow Engines", "Custom SaaS", "Web Platforms"]

const galleryDeployments = [
  {
    title: "Autonomous Revenue Operations Hub",
    category: "AI Agents",
    tag: "Sales SDR · Multi-Agent",
    image: imgRevenueHub,
    description: "Multi-turn WhatsApp and Web intake system connected to CRM with real-time intent scoring.",
    metrics: "1.4s response · 4.8x pipeline lift",
  },
  {
    title: "Executive Operational Intelligence Console",
    category: "Custom SaaS",
    tag: "Next.js · Go Microservices",
    image: imgIntelligenceConsole,
    description: "Bespoke internal leadership portal unifying Stripe financial records, team capacity, and SLA tracking.",
    metrics: "Zero latency · SOC2 compliant",
  },
  {
    title: "High-Throughput Webhook Synchronization Engine",
    category: "Workflow Engines",
    tag: "PostgreSQL · Redis · Webhooks",
    image: imgWebhookEngine,
    description: "Event-driven asynchronous middleware processing over 250,000 daily order reconciliation events.",
    metrics: "100% deterministic · 0% drift",
  },
  {
    title: "High-Converting AI-Powered Digital Flagship",
    category: "Web Platforms",
    tag: "WebGL · Three.js · Edge CDN",
    image: imgDigitalFlagship,
    description: "Cinematic modern web presence built with sub-second TTFB and native lead qualification widgets.",
    metrics: "100/100 Lighthouse score",
  },
  {
    title: "Proprietary Vector RAG Knowledge Assistant",
    category: "AI Agents",
    tag: "Pinecone · OpenAI · Hybrid RAG",
    image: imgVectorRag,
    description: "Internal AI research assistant indexing 10,000+ corporate PDFs, contracts, and Zendesk tickets.",
    metrics: "Instant citations · 0% hallucination",
  },
  {
    title: "Cross-Platform Inventory & Billing Orchestrator",
    category: "Workflow Engines",
    tag: "SAP ERP · Shopify · Stripe",
    image: imgInventoryOrchestrator,
    description: "Automated warehouse threshold monitor with instant purchase order generation and ledger alignment.",
    metrics: "18+ hrs saved weekly",
  },
]

export default function PremiumPortfolioGallery() {
  const [selectedFilter, setSelectedFilter] = useState("All Architectures")
  const [failedImages, setFailedImages] = useState({})

  const filteredItems = selectedFilter === "All Architectures"
    ? galleryDeployments
    : galleryDeployments.filter((item) => item.category === selectedFilter)

  const handleImageError = (imageSrc) => {
    setFailedImages((prev) => ({ ...prev, [imageSrc]: true }))
  }

  return (
    <section id="portfolio" className="relative overflow-hidden bg-[#050505] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/[0.03] rounded-full blur-[180px] opacity-60" />

      <div className="relative mx-auto max-w-7xl">
        
        <AnimatedSection>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="glass-pill mx-auto">
              <Layers size={13} />
              <span>Deployment Gallery</span>
            </div>

            <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Proven architectures <br className="hidden sm:block" />
              <span className="text-white/60">engineered for production.</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Explore a curated selection of live autonomous workflows, bespoke SaaS platforms, and enterprise AI engines designed by Sthayu.
            </p>
          </div>
        </AnimatedSection>

        {/* Filter Pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {filterCategories.map((cat) => {
            const isActive = selectedFilter === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? "bg-white/[0.04] border border-white/[0.10] text-[#d4d4d8] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Deployment Gallery Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.title}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0a0a0a]/80 to-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[0.10] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-xl"
            >
              <div>
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-[#0a0a0a]">
                  {failedImages[item.image] ? (
                    <div className="h-full w-full bg-gradient-to-br from-white/[0.03] to-white/[0.01] flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl opacity-20">🔧</div>
                        <div className="mt-2 text-[10px] font-mono text-white/20 uppercase tracking-widest">{item.tag}</div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                      onError={() => handleImageError(item.image)}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  
                  {/* Category Pill Over Image */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#050505]/80 border border-white/10 backdrop-blur-md text-[10px] font-mono text-[#d4d4d8] font-bold">
                    {item.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 uppercase">
                    <span>{item.category}</span>
                    <span className="text-[#86efac]">● VERIFIED LIVE</span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-white group-hover:text-[#d4d4d8] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-white/5 mt-auto">
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#d4d4d8] font-bold">{item.metrics}</span>
                  <a
                    href="#assessment"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-300 border border-white/10 group-hover:bg-white group-hover:text-[#050505] group-hover:border-white transition-all cursor-pointer"
                  >
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-14 flex justify-center">
          <a
            href="#contact"
            className="btn-primary py-3.5 px-8 text-xs font-bold"
          >
            <span>Request System Demonstration</span>
            <ArrowUpRight size={15} />
          </a>
        </div>

      </div>
    </section>
  )
}

