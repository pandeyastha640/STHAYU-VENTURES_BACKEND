# STHAYU VENTURES
## Technical Requirements Document (TRD)

**Version:** 1.0  
**Date:** 18 August 2026  
**Repository:** `pandeyastha640/STHAYU-VENTURES-WEBSITE`  
**Current stack:** React + Vite + Tailwind CSS + GSAP + Three.js ecosystem  
**Implementation boundary:** No existing repository file is modified by this document.

---

# 1. Technical Objective

The technical architecture should evolve the current Sthayu marketing application into a modular platform capable of supporting:

- Marketing
- Lead generation
- Assessments
- CRM integration
- AI agents
- Workflow automation
- Analytics
- Customer accounts
- Subscriptions
- SaaS products

The architecture should **not** introduce backend complexity before it is needed.

---

# 2. Current Repository Architecture

The current application is a Vite React application.

### Current package stack

- React 19
- React DOM 19
- Vite 8
- Tailwind CSS 4
- `@tailwindcss/vite`
- GSAP
- Three.js
- `@react-three/fiber`
- `@react-three/drei`
- Lucide React

The repository currently has no application backend dependency, database client, authentication system, payment SDK, or API client layer.

Therefore, the current website is fundamentally a **frontend marketing experience**.

---

# 3. Current Entry Architecture

The current application flow is:

```text
main.jsx
   ↓
index.css
   ↓
App.jsx
   ↓
Navbar
   ↓
Hero
   ↓
MediaShowcase
   ↓
ProblemDiscovery
   ↓
WhySthayu
   ↓
Services
   ↓
AIAgents
   ↓
SystemStack
   ↓
HowItWorks
   ↓
Showcase
   ↓
CaseStudies
   ↓
InteractiveShowcase
   ↓
PremiumPortfolioGallery
   ↓
Pricing
   ↓
AssessmentSection
   ↓
FinalCTA
   ↓
Footer
```

---

# 4. Current Visual Architecture

The current visual system uses:

- Manrope typography
- dark navy background
- cyan / blue accent language
- glassmorphism
- radial gradients
- grid overlays
- animated particles
- orbital rings
- ambient nodes
- animated rails
- 3D/3D-like visualizations
- GSAP scroll animations
- mouse tilt
- Three.js neural-network visualization

There are multiple CSS layers controlling this visual system.

---

# 5. Current 3D / Animation Architecture

## Three.js / React Three Fiber

The Hero's AI visual uses:

- React Three Fiber Canvas
- Drei Float
- Drei Line
- Drei OrbitControls
- Three.js vectors
- neural nodes
- neural connections
- emissive core
- wireframe shell
- energy rings
- 700-particle field

## GSAP

GSAP is used for:

- scroll-triggered reveals
- portfolio item entrances
- metric animations
- media entrance
- animated visualizations
- 3D box motion
- SVG architecture motion

---

# 6. Frontend Requirements

The frontend must remain component-based.

Recommended conceptual separation:

```text
src/
├── components/
├── pages/
├── services/
├── hooks/
├── state/
├── utils/
├── assets/
└── styles/
```

However, this is a **future architecture recommendation**. The current folder structure must not be refactored merely because this TRD exists.

---

# 7. Current Component Responsibilities

| Component | Responsibility |
|---|---|
| Navbar | Navigation and section scrolling |
| Hero | Core proposition, CTAs, metrics, AI visual |
| MediaShowcase | Cinematic AI/automation narrative |
| ProblemDiscovery | Business pain points and problem-to-solution mapping |
| WhySthayu | Sthayu differentiation and transformation |
| Services | Service catalogue |
| AIAgents | AI workforce / agent catalogue |
| SystemStack | Industry-specific system stacks |
| HowItWorks | Discover → Design → Automate → Integrate → Optimize |
| Showcase | Conceptual Sthayu Command Center |
| CaseStudies | Illustrative business outcomes |
| InteractiveShowcase | 3D and animated visual system |
| PremiumPortfolioGallery | Visual solution portfolio |
| Pricing | Starter / Growth / Scale / Enterprise |
| AssessmentSection | Discovery intake |
| FinalCTA | Conversion CTA |
| Footer | Navigation, contact and brand information |

---

# 8. Backend Requirement

A backend should be introduced only when the website needs persistent data or authenticated workflows.

Initial backend responsibilities:

```text
API
 ├── Leads
 ├── Assessments
 ├── Bookings
 ├── Users
 ├── Organizations
 ├── Subscriptions
 ├── Workflows
 ├── AI Agents
 └── Analytics
```

---

# 9. Recommended Future Architecture

```text
                 STHAYU WEB APP
                      │
          ┌───────────┴───────────┐
          │                       │
      Marketing               Customer App
          │                       │
          └───────────┬───────────┘
                      │
                   API Layer
                      │
       ┌──────────────┼──────────────┐
       │              │              │
   Business       AI Service     Automation
     Logic           Layer          Engine
       │              │              │
       └──────────────┼──────────────┘
                      │
                   Database
                      │
       ┌──────────────┼──────────────┐
       │              │              │
      CRM          Payments       Analytics
```

---

# 10. Database

A relational database is recommended for core platform data.

Potential entities:

```text
User
Organization
Role
Lead
Assessment
AssessmentResponse
Product
Service
Plan
Subscription
Invoice
Payment
Workflow
WorkflowStep
WorkflowExecution
AIAgent
AIAgentExecution
Integration
Notification
SupportTicket
AuditLog
AnalyticsEvent
```

---

# 11. Multi-Tenant Architecture

Once Sthayu becomes SaaS, customer organizations should be isolated logically.

Conceptually:

```text
Organization
   ├── Users
   ├── Agents
   ├── Workflows
   ├── Integrations
   ├── Data
   ├── Subscriptions
   └── Usage
```

Every customer-owned resource should be associated with an organization identifier.

---

# 12. Authentication

Future SaaS authentication should support:

- Email/password
- Email verification
- Password reset
- Secure sessions
- Role-based access
- Optional OAuth
- Optional MFA

Passwords must never be stored in plaintext.

---

# 13. Authorization

Role model:

```text
Visitor
   ↓
User
   ↓
Customer
   ↓
Organization Admin
   ↓
Sthayu Admin
```

Permissions should be capability-based rather than relying only on frontend visibility.

---

# 14. API Layer

Recommended API groups:

```text
/auth
/users
/organizations
/leads
/assessments
/bookings
/services
/products
/plans
/subscriptions
/payments
/workflows
/workflow-executions
/ai-agents
/ai-executions
/integrations
/analytics
/support
```

The frontend must never contain private API secrets.

---

# 15. Lead Architecture

Lead lifecycle:

```text
Website visitor
   ↓
Lead captured
   ↓
Lead enriched
   ↓
Lead scored
   ↓
Lead qualified
   ↓
Sales contacted
   ↓
Proposal
   ↓
Customer
```

Lead fields should eventually include:

- Name
- Email
- Phone
- Organization
- Business type
- Challenge
- Tools
- Team size
- Requested solution
- Source
- Campaign
- Lead score
- Status
- Owner
- Created date

---

# 16. Assessment Architecture

The current assessment is frontend-only.

Future flow:

```text
Assessment Form
      ↓
Validation
      ↓
POST /assessments
      ↓
Database
      ↓
Lead Creation
      ↓
Qualification Engine
      ↓
Recommendation
      ↓
CRM
      ↓
Notification
```

Future recommendation logic can classify:

- Website/app opportunity
- AI-agent opportunity
- Automation opportunity
- CRM opportunity
- Analytics opportunity
- Custom system opportunity

---

# 17. AI Service Layer

AI calls should be made through the backend/service layer.

```text
Frontend
   ↓
Backend
   ↓
AI Service Abstraction
   ↓
AI Provider
```

This prevents the frontend from being tied directly to one AI provider.

Potential AI capabilities:

- Chat
- Classification
- Summarization
- Document extraction
- Lead scoring
- Recommendation
- Business analysis
- Content generation
- Knowledge retrieval

---

# 18. AI Agent Architecture

Each agent should conceptually contain:

```text
Agent
├── Identity
├── Purpose
├── Instructions
├── Knowledge
├── Tools
├── Triggers
├── Rules
├── Actions
├── Escalation
└── Logs
```

Agent execution should be auditable.

---

# 19. Automation Engine

Recommended model:

```text
Trigger
   ↓
Condition
   ↓
Action
   ↓
Action
   ↓
Result
```

Example:

```text
New lead
   ↓
AI qualification
   ↓
Lead score
   ↓
CRM update
   ↓
Email / WhatsApp
   ↓
Appointment
   ↓
Sales notification
```

Long-running workflows should use background jobs/queues rather than blocking HTTP requests.

---

# 20. Integrations

Future integrations may include:

- CRM
- Email
- WhatsApp
- Calendar
- Payment gateway
- Analytics
- Cloud storage
- Business databases
- Communication tools

Integrations should be implemented through adapters rather than hardcoding provider-specific logic into UI components.

---

# 21. SaaS Product Architecture

The marketing website should not become the entire SaaS application.

Recommended:

```text
Sthayu Platform
├── Marketing Site
├── Auth
├── Customer Dashboard
├── Billing
├── AI Platform
├── Automation Engine
├── Analytics
└── Vertical SaaS Modules
```

This allows Sthayu to add new SaaS products without rebuilding the marketing layer.

---

# 22. Subscription Architecture

Current website pricing:

| Plan | Current displayed price |
|---|---:|
| Starter | ₹9,999/month |
| Growth | ₹24,999/month |
| Scale | ₹49,999/month |
| Enterprise | Custom |

Future billing must support:

- Monthly
- Annual
- Upgrade
- Downgrade
- Cancellation
- Renewal
- Feature entitlements
- Usage limits
- Invoice history

---

# 23. Payment Security

The application should never store raw card information.

Recommended lifecycle:

```text
Checkout
 ↓
Payment Provider
 ↓
Payment Success
 ↓
Verified Webhook
 ↓
Backend
 ↓
Subscription Activation
```

Webhook signatures must be verified.

---

# 24. Analytics Architecture

Track marketing events:

- Page view
- CTA click
- Pricing view
- Assessment start
- Assessment completion
- Discovery click

Future product events:

- Signup
- Login
- Agent created
- Workflow created
- Workflow executed
- AI request
- Subscription
- Upgrade
- Cancellation

---

# 25. SEO

Marketing pages should support:

- Title
- Description
- Open Graph
- Canonical URL
- Sitemap
- Robots
- Structured data where relevant
- Semantic HTML

The current project already has a dedicated `index.html`; future SEO metadata should be managed deliberately there or through a suitable React SEO layer if routing expands.

---

# 26. Performance

Requirements:

- Optimize remote images
- Lazy-load non-critical media
- Avoid unnecessary 3D rendering
- Use responsive image sizes
- Code split where justified
- Minimize third-party scripts
- Respect reduced-motion preferences
- Avoid long-running animation leaks
- Clean up GSAP/ScrollTrigger instances
- Clean up requestAnimationFrame loops

The current project uses several continuous animation systems, so performance monitoring is especially important.

---

# 27. Accessibility

Must support:

- Semantic HTML
- Keyboard navigation
- Focus states
- Accessible labels
- Sufficient contrast
- Reduced motion
- Mobile usability
- Form error messaging

Interactive 3D must never be the only way to understand information.

---

# 28. Security

Minimum production requirements:

- HTTPS
- Secure authentication
- Authorization checks
- Input validation
- Output sanitization
- Rate limiting
- CSRF protection where applicable
- CORS policy
- Secret management
- Audit logging
- Dependency monitoring
- Backup strategy

---

# 29. Environments

Recommended:

```text
Development
   ↓
Staging
   ↓
Production
```

Environment variables should hold secrets and deployment-specific configuration.

Never commit secrets to GitHub.

---

# 30. Testing

## Unit

- Business rules
- Lead scoring
- Pricing logic
- Workflow logic

## Component

- Forms
- Cards
- Navigation
- Assessment

## Integration

- Form → API
- API → database
- Payment → subscription
- AI → workflow

## End-to-End

Critical journeys:

1. Visitor → Assessment
2. Assessment → Lead
3. Lead → CRM
4. Signup → Dashboard
5. Plan → Checkout
6. Payment → Subscription
7. Workflow → Execution

---

# 31. Observability

Production monitoring should cover:

- Frontend errors
- API errors
- Database failures
- AI failures
- Workflow failures
- Payment failures
- Performance
- Uptime

---

# 32. Current Functional Gaps Identified From the Repository

The existing site is primarily a presentation layer. Several UI elements are currently conceptual rather than connected to production systems.

Examples:

- Assessment inputs are rendered but do not submit to a backend.
- Pricing actions are rendered as buttons without subscription/payment integration.
- “Explore workflow/platform” controls are largely presentation-level.
- Social links currently point to generic social destinations rather than Sthayu-specific profiles.
- The Command Center is a conceptual interface, not an authenticated dashboard.
- Case-study metrics are explicitly presented as illustrative metrics.
- Portfolio/gallery items are presentation cards rather than connected project records.
- There is no current user authentication layer.
- There is no current database layer.
- There is no current API layer.
- There is no current payment system.
- There is no current CRM integration.

These are **product-development opportunities**, not instructions to alter the current code now.

---

# 33. Technical Debt / Risk Areas to Monitor

1. Multiple visual CSS layers can create specificity conflicts.
2. Several components contain inline CSS/animation definitions.
3. Continuous Three.js/canvas/GSAP animations need lifecycle discipline.
4. Remote Unsplash images create third-party dependency and performance considerations.
5. Illustrative metrics must not accidentally become production claims.
6. A future SaaS dashboard should not be implemented by overloading the marketing components.
7. API/AI/payment secrets must never be exposed through Vite client-side environment variables unless explicitly public.
8. Accessibility and reduced-motion behavior should be added before production SaaS launch.

---

# 34. Deployment Evolution

## Current

```text
GitHub
  ↓
Vite build
  ↓
Static frontend deployment
```

## Future

```text
GitHub
  ↓
CI/CD
  ↓
Tests
  ↓
Build
  ↓
Staging
  ↓
Production
     ├── Web App
     ├── API
     ├── Database
     ├── Queue/Workers
     └── Monitoring
```

---

# 35. Scalability

The system should be capable of progressing from:

```text
Marketing website
      ↓
Lead platform
      ↓
Customer platform
      ↓
Multi-tenant SaaS
      ↓
AI + Automation platform
```

Scaling priorities:

1. Database indexes
2. API performance
3. Caching
4. Background jobs
5. Queue processing
6. Horizontal scaling

---

# 36. Technical Acceptance Criteria

The future implementation should:

- Keep marketing and SaaS concerns modular.
- Support secure authentication.
- Persist assessment/lead data.
- Support CRM integration.
- Support AI through a service abstraction.
- Support workflow execution.
- Support subscription entitlements.
- Support analytics.
- Be testable.
- Be observable.
- Be scalable.
- Protect customer data.
- Preserve the premium interactive brand experience without making it a technical dependency for core business functionality.

---

# 37. Implementation Principle

**Do not rebuild the current website just because the architecture is evolving.**

Use the current site as the presentation baseline.

Build new capabilities around it in controlled phases:

**Frontend → API → Data → AI → Automation → Customer Platform → SaaS**

The technical architecture should grow only when a real product requirement demands it.
