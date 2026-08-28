import { lazy, Suspense } from "react"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Cinematic3DBackground from "./components/Cinematic3DBackground"
import { ModalProvider } from "./context/ModalContext"
import BookingModal from "./components/BookingModal"
import ContactModal from "./components/ContactModal"
import AdminModal from "./components/AdminModal"

const MediaShowcase = lazy(() => import("./components/MediaShowcase"))
const ProblemDiscovery = lazy(() => import("./components/ProblemDiscovery"))
const WhySthayu = lazy(() => import("./components/WhySthayu"))
const Services = lazy(() => import("./components/Services"))
const AIAgents = lazy(() => import("./components/AIAgents"))
const SystemStack = lazy(() => import("./components/SystemStack"))
const HowItWorks = lazy(() => import("./components/HowItWorks"))
const Showcase = lazy(() => import("./components/Showcase"))
const CaseStudies = lazy(() => import("./components/CaseStudies"))
const InteractiveShowcase = lazy(() => import("./components/InteractiveShowcase"))
const PremiumPortfolioGallery = lazy(() => import("./components/PremiumPortfolioGallery"))
const Pricing = lazy(() => import("./components/Pricing"))
const AssessmentSection = lazy(() => import("./components/AssessmentSection"))
const FinalCTA = lazy(() => import("./components/FinalCTA"))
const Footer = lazy(() => import("./components/Footer"))

import "./premium-restyle.css"

function SectionDivider() {
  return (
    <div className="relative w-full h-px mx-auto max-w-5xl" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  )
}

function App() {
  return (
    <ModalProvider>
      <div className="page-shell sv-v2 relative min-h-screen overflow-x-hidden text-white antialiased">
        <Cinematic3DBackground />

        <div
          className="persistent-3d-environment pointer-events-none fixed inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="ambient-depth" />
          <div className="ambient-grid" />
          <div className="ambient-grid-glow" />
          <div className="ambient-orb ambient-orb--one" />
          <div className="ambient-orb ambient-orb--two" />
          <div className="ambient-orb ambient-orb--three" />
          <div className="ambient-orb ambient-orb--four" />
          <div className="ambient-light ambient-light--one" />
          <div className="ambient-light ambient-light--two" />
          <div className="ambient-light ambient-light--three" />
          <div className="ambient-ring ambient-ring--one" />
          <div className="ambient-ring ambient-ring--two" />
          <div className="ambient-ring ambient-ring--three" />
          <div className="ambient-node ambient-node--one" />
          <div className="ambient-node ambient-node--two" />
          <div className="ambient-node ambient-node--three" />
          <div className="ambient-node ambient-node--four" />
          <div className="ambient-node ambient-node--five" />
          <div className="ambient-node ambient-node--six" />
          <div className="ambient-node ambient-node--seven" />
          <div className="ambient-node ambient-node--eight" />
          <div className="ambient-rail ambient-rail--one" />
          <div className="ambient-rail ambient-rail--two" />
          <div className="ambient-rail ambient-rail--three" />
          <div className="ambient-rail ambient-rail--four" />
          <div className="ambient-beam ambient-beam--one" />
          <div className="ambient-beam ambient-beam--two" />
          <div className="ambient-particles">
            {Array.from({ length: 20 }, (_, index) => <span key={index} />)}
          </div>
          <div className="ambient-vignette" />
        </div>

        <div className="relative z-10">
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <Suspense fallback={null}>
              <MediaShowcase />
              <SectionDivider />
              <ProblemDiscovery />
              <SectionDivider />
              <WhySthayu />
              <SectionDivider />
              <Services />
              <SectionDivider />
              <AIAgents />
              <SectionDivider />
              <SystemStack />
              <SectionDivider />
              <HowItWorks />
              <SectionDivider />
              <Showcase />
              <SectionDivider />
              <CaseStudies />
              <SectionDivider />
              <InteractiveShowcase />
              <SectionDivider />
              <PremiumPortfolioGallery />
              <SectionDivider />
              <Pricing />
              <SectionDivider />
              <AssessmentSection />
              <FinalCTA />
            </Suspense>
          </main>
          <Footer />
        </div>

        {/* Global Action Modals */}
        <BookingModal />
        <ContactModal />
        <AdminModal />
      </div>
    </ModalProvider>
  )
}

export default App
