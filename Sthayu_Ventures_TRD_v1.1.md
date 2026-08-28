# STHAYU VENTURES
## Technical Requirements Document (TRD)

**Version:** 1.1 (Corrected)
**Date:** 18 August 2026
**Repository:** `pandeyastha640/STHAYU-VENTURES-WEBSITE`
**Implementation boundary:** This TRD defines the realistic production architecture required to turn Sthayu into a SaaS. No existing repository file is modified by this document.

---

## 1. Technical Objective

Build the technical platform that lets Sthayu Ventures operate as a real, paid, multi-tenant AI + Automation SaaS.

The architecture must support:

- Marketing site
- Lead capture and qualification
- Authentication and authorization
- Customer workspaces
- AI agent platform
- Workflow automation engine
- Integrations
- Analytics
- Subscription billing
- Customer support
- Admin operations
- Observability
- Scale, security and compliance

The architecture should grow only when a real product requirement demands it.

---

## 2. Current Repository Architecture (Honest Snapshot)

### 2.1 Stack (current)
- React 19 + Vite 8
- Tailwind CSS 4 (`@tailwindcss/vite`)
- GSAP 3 + ScrollTrigger
- Three.js + `@react-three/fiber` + `@react-three/drei`
- Lucide React
- ESLint (flat config)

### 2.2 What is NOT in the repo today
- No backend / API
- No database / ORM
- No authentication library
- No payment SDK
- No CMS
- No state management library
- No testing framework
- No CI/CD config
- No environment variable strategy
- No deployment config
- No analytics SDK
- No error tracking

### 2.3 Implication
The repository today is a **frontend-only marketing site**. Treating it as a SaaS would be misleading. The TRD below defines what must be added.

---

## 3. Current Entry Architecture

```text
main.jsx
  ├── gsap.registerPlugin(ScrollTrigger)
  └── <App />

App.jsx
  ├── persistent-3d-environment (fixed ambient layer)
  └── z-10 wrapper
       ├── Navbar
       ├── main
       │    ├── Hero (id="hero")
       │    ├── MediaShowcase (id="media-showcase")
       │    ├── ProblemDiscovery (id="problem-discovery")
       │    ├── WhySthayu (id="why-sthayu")
       │    ├── Services (id="services")
       │    ├── AIAgents (id="ai-agents")
       │    ├── SystemStack (id="system-stack")
       │    ├── HowItWorks (id="how-it-works")
       │    ├── Showcase (id="showcase")
       │    ├── CaseStudies (id="case-studies")
       │    ├── InteractiveShowcase
       │    ├── PremiumPortfolioGallery
       │    ├── Pricing (id="pricing")
       │    ├── AssessmentSection (id="assessment")
       │    └── FinalCTA (id="contact")
       └── Footer
```

All "navigation" is in-page anchor scrolling via `document.getElementById(id).scrollIntoView(...)`. There is no router.

---

## 4. Current Visual Architecture (preserve, do not break)

- Manrope typography (Google Fonts)
- Dark navy base (`#05070a`, `#071426`)
- Cyan/blue accent system (`#67e8f9`, `#22d3ee`, `#3b82f6`, `#60a5fa`)
- Glass panels, gradient borders, ambient orbs/rings
- Inline `<style>` tags in `Hero.jsx`, `WhySthayu.jsx`, etc.
- Multiple CSS layers (`index.css`, `global-theme.css`, `premium-restyle.css`, `hero-overlap-fix.css`, `hero-connected-system-fix.css`, `App.css`)
- GSAP scroll-triggered reveals
- Three.js orb in Hero

This visual system is part of the brand. Production work must not destroy it.

---

## 5. Target Production Architecture

### 5.1 High-Level

```text
                       ┌────────────────────────┐
                       │   Marketing Site       │
                       │   (existing Vite app)  │
                       └───────────┬────────────�
                                   │
                                   ▼
                          ┌──────────────────┐
                          │   CDN / Edge     │
                          └────────┬─────────┘
                                   │
                          ┌────────┴─────────┐
                          │   API Gateway    │
                          │   (REST/JSON)    │
                          └────────┬─────────┘
                                   │
        ┌─────────────┬────────────┼─────────────┬─────────────┐
        ▼             ▼            ▼             ▼             ▼
   Auth Service  Workspace   AI Service    Automation    Billing
                  Service     (provider-    Engine        Service
                              agnostic                   (Stripe/
                              abstraction)               Razorpay)
        │             │            │             │             │
        └─────────────┴────────────┼─────────────┴─────────────┘
                                   ▼
                          ┌──────────────────┐
                          │   PostgreSQL     │
                          │   (multi-tenant) │
                          └────────┬─────────┘
                                   ▼
                          ┌──────────────────┐
                          │   Object Storage │
                          │   (S3-compatible)│
                          └──────────────────┘

  Sidecar: Redis cache · Queue (BullMQ/SQS) · Secrets manager · APM · Logs · Audit
```

### 5.2 Workspace / Customer App

The customer workspace should be a **separate application** (e.g., `/app` route or subdomain `app.sthayuventures.com`) and must not be implemented by overloading the marketing components.

```text
app.sthayuventures.com
  ├── Sign in / Sign up
  ├── Onboarding wizard
  ├── Dashboard (Overview)
  ├── AI Agents
  ├── Workflows
  ├── Integrations
  ├── Data
  ├── Analytics
  ├── Billing
  ├── Team
  ├── Notifications
  ├── Support
  └── Settings
```

---

## 6. Frontend Architecture

### 6.1 Marketing Site (existing Vite app)

Recommendation (do NOT refactor existing files now):
- Keep `App.jsx` and components intact.
- Add an `<AppRouter>` only if/when `/app` routes are introduced (post-MVP).
- Add a small `api/` client folder for backend calls.
- Add an env-var strategy (`import.meta.env.VITE_*`).

### 6.2 Customer Workspace (new app)

Recommended:
- **Next.js (App Router)** OR **Remix** for SSR + auth + routing, OR
- **Vite + React Router + TanStack Query** if SSR is not required.
- TypeScript strongly recommended.
- Component library: keep existing custom design tokens; optionally add Radix UI primitives for accessible dialogs/menus.
- Forms: React Hook Form + Zod.
- Charts: Recharts (already ecosystem-standard) or Visx.
- State: server state via TanStack Query; client state minimal (Zustand if needed).
- Auth: handle session cookies; OAuth redirect flows.

### 6.3 Code Splitting / Bundle
- Code split per route.
- Lazy load heavy visuals (Three.js orb, particles).
- Keep the marketing site visually rich without making it technically heavy on every page.

---

## 7. Backend Architecture

### 7.1 Choice (recommended)
- **Node.js + TypeScript + Fastify (or Express, or NestJS for structure)** OR
- **Python (FastAPI)** if AI/ML heavy operations dominate.

Pick ONE primary stack for v1 to avoid split-brain maintenance.

### 7.2 Responsibilities
- Auth, sessions, RBAC
- Customer / workspace / member CRUD
- Plan / subscription management
- Assessment & lead capture
- AI agent config + execution coordination
- Workflow engine (delegated to workers)
- Integration connector orchestration
- Webhooks (in & out)
- Notifications dispatch
- Audit log
- Analytics event ingestion

### 7.3 Architecture Style
- Service-oriented, but pragmatic (avoid premature microservices)
- Clear module boundaries
- Server-enforced authorization at every endpoint

---

## 8. Database

### 8.1 Choice
- **PostgreSQL** (managed) as system of record.
- Migrations via Prisma, Drizzle, or raw SQL migrations.
- Row-Level Security (RLS) OR explicit `organization_id` filtering in every query.

### 8.2 Entities (v1)

```text
User
Organization
OrganizationMember (user ↔ org + role)
Plan
Subscription
Invoice
Payment
Credit / Coupon (later)
Lead
Assessment
AssessmentResponse
Agent
AgentVersion
AgentExecution
Workflow
WorkflowVersion
WorkflowExecution
WorkflowStepExecution
Integration
IntegrationCredential (encrypted)
IntegrationConnection
KnowledgeSource
KnowledgeDocument
Notification
NotificationPreference
SupportTicket
SupportMessage
AuditLog
AnalyticsEvent
ApiKey
Webhook
WebhookDelivery
UsageMeter
UsageRecord
FeatureFlag
```

### 8.3 Multi-Tenant Isolation
- Every tenant-owned row carries `organization_id`.
- Every query is filtered by organization unless explicitly admin.
- Indexes on `organization_id` for hot tables.
- Optional per-tenant encryption keys for sensitive columns (later).

---

## 9. AI Architecture

### 9.1 Service Abstraction

```text
Frontend
   ↓
Backend (AI Service)
   ↓
Provider Adapter (Claude / OpenAI / OSS / Local)
   ↓
Provider
```

The backend must be the only component holding AI provider credentials.

### 9.2 Capabilities (v1)
- Chat / completion
- Function calling / tool use
- Embeddings for retrieval
- Structured output (JSON schema)
- Streaming to UI (SSE or WebSocket)

### 9.3 Agent Runtime
- Per-agent config: instructions, tools, knowledge, policies, escalation.
- Per-execution context: tenant, plan limits, conversation history, retrieved knowledge.
- Logging: prompt, completion, tool calls, tokens, latency, cost estimate, errors.
- Guardrails: input/output validation, PII redaction (later), content policy.

### 9.4 RAG
- Document ingestion (PDF/DOCX/CSV/text).
- Chunking, embedding, indexing per tenant.
- Vector store: pgvector (good enough for v1) OR a dedicated vector DB (later).

### 9.5 Cost Control
- Per-plan quotas.
- Per-organization usage meter.
- Per-agent execution budget (soft and hard limits).
- Model tier selection (small vs large) based on need.

---

## 10. Automation Engine

### 10.1 Model
```text
Trigger  (event / schedule / webhook / manual)
   ↓
Conditions (filters, branching)
   ↓
Actions (API call / AI call / integration / internal)
   ↓
Result + Logs
```

### 10.2 Implementation
- Workflow definitions stored as JSON (versioned).
- Worker pool executes jobs via a queue (BullMQ / SQS / Cloud Tasks).
- Each step logged with input, output, latency, error.
- Retries with exponential backoff.
- Human-approval steps supported (pause for X hours / until approval).

### 10.3 Triggers
- Webhook (per organization)
- Schedule (cron-style)
- Event (e.g., "lead.created", "invoice.paid")
- Manual (button)

---

## 11. Integrations

### 11.1 Pattern
Every integration implemented as an adapter with a stable interface:
```text
{
  id, name, auth: { type: 'oauth' | 'api_key' | 'custom' },
  actions: [{ id, name, inputs, outputs }],
  triggers: [{ id, name, schema }]
}
```

### 11.2 V1 Targets
- WhatsApp Cloud API
- Email (SMTP / SendGrid / Resend)
- Google Calendar
- Razorpay / Stripe (for billing; also a customer integration if needed)
- HubSpot OR Zoho OR an internal CRM module

### 11.3 Credentials
- Stored encrypted at rest (envelope encryption with KMS).
- Never logged.
- Refresh tokens rotated automatically.

---

## 12. Authentication & Authorization

### 12.1 Auth
- Email + password (Argon2id hashing)
- Email verification required
- Password reset via email token
- Session cookies (HttpOnly, Secure, SameSite=Lax) OR short-lived access + refresh tokens
- Optional: Google OAuth, Microsoft OAuth
- Optional: TOTP MFA

### 12.2 Authorization Model (RBAC)
- Roles: `owner`, `admin`, `manager`, `member`, `viewer`
- Capability checks server-side (not frontend-only)
- API tokens scoped per organization
- Audit log on sensitive actions (member added, key created, billing change, etc.)

---

## 13. Billing & Subscription

### 13.1 Plan Model
- Plan entity: code, name, price (monthly + annual currency), features, limits
- Subscription: plan, status (trialing / active / past_due / canceled), current_period_end, customer_id

### 13.2 Payment Provider
- Razorpay (India primary)
- Stripe (international)
- Customer chooses provider based on currency / region

### 13.3 Lifecycle
```text
Checkout (provider-hosted) → Success URL
   ↓
Verified webhook (signature checked)
   ↓
Backend updates subscription
   ↓
Entitlements granted
```

### 13.4 Requirements
- Never store raw card data.
- Verify webhook signatures.
- Handle idempotency for webhook events.
- Dunning: notify, retry, pause.
- Invoices generated by provider; mirrored in DB for fast queries.
- Tax: GST handled (India), VAT/sales tax via Stripe Tax (international).

### 13.5 Usage-Based Component
- Meter AI calls, workflows, integrations.
- Aggregate per period.
- Hard-cap or soft-cap per plan.

---

## 14. API Layer

### 14.1 Style
- REST + JSON (primary)
- Webhooks (out)
- Server-Sent Events OR WebSockets (streaming AI responses)
- Versioned (`/v1/...`)

### 14.2 Endpoint Groups

```text
/v1/auth
/v1/users
/v1/organizations
/v1/members
/v1/leads
/v1/assessments
/v1/agents
/v1/agent-executions
/v1/workflows
/v1/workflow-executions
/v1/integrations
/v1/integrations/{id}/connections
/v1/knowledge
/v1/analytics
/v1/notifications
/v1/support
/v1/billing/plans
/v1/billing/subscriptions
/v1/billing/invoices
/v1/billing/checkout
/v1/billing/webhooks
/v1/admin (internal)
/v1/public (for marketing site)
/v1/webhooks/in/{provider} (Razorpay, Stripe, WhatsApp, etc.)
```

### 14.3 Security
- Bearer token OR cookie session
- Per-tenant authorization
- Rate limit per IP and per user
- Idempotency keys for mutating endpoints

---

## 15. File / Storage Architecture

- Object storage (S3-compatible) for:
  - Uploaded documents (RAG)
  - Generated artifacts
  - Customer exports
- CDN in front of public assets
- Signed URLs for private assets
- Encryption at rest
- Lifecycle rules for cost control

---

## 16. Security

### 16.1 Baseline
- HTTPS (TLS 1.2+)
- HSTS
- Secure cookies
- CSRF protection where cookie sessions are used
- CORS allowlist (marketing site, app, integrations)
- Input validation (Zod / JSON Schema)
- Output encoding (framework default + manual where needed)
- Parameterized DB queries (ORM / prepared statements)
- Secrets via environment / secret manager
- Principle of least privilege for service accounts
- Dependency scanning (Dependabot / Snyk)
- Container image scanning (Trivy)

### 16.2 Authorization
- Every endpoint checks session + organization membership + role + capability.

### 16.3 Encryption
- At rest: KMS / managed disk encryption
- In transit: TLS
- Per-secret: envelope encryption with KMS
- Passwords: Argon2id

### 16.4 Rate Limiting
- Per IP for unauthenticated endpoints
- Per user for authenticated endpoints
- Per organization for expensive operations (AI calls, workflows)

### 16.5 Audit Log
- Member changes
- Billing changes
- API key creation/revocation
- Workflow enable/disable
- Agent enable/disable
- Data export / deletion

---

## 17. Logging, Monitoring, Analytics

### 17.1 Logs
- Structured JSON logs
- Centralized (CloudWatch / Loki / Datadog)
- Correlation IDs across services
- PII redaction in logs

### 17.2 Metrics
- Request latency (p50, p95, p99)
- Error rate
- Queue depth
- AI call latency & cost
- Workflow success rate
- Payment failure rate

### 17.3 Tracing
- OpenTelemetry
- Spans across HTTP, queue, AI, DB

### 17.4 Error Tracking
- Sentry-class SDK in frontend and backend
- Source maps uploaded

### 17.5 Product Analytics
- PostHog OR Mixpanel OR Amplitude
- Server-side events for accuracy

### 17.6 Marketing Analytics
- GA4 OR Plausible (privacy-respecting)
- Server-side events where possible

### 17.7 Status Page
- status.sthayuventures.com (e.g., Better Uptime / Statuspage)

---

## 18. Testing

### 18.1 Unit
- Pricing logic, lead scoring, RBAC checks, workflow execution

### 18.2 Component
- Forms, dashboards, cards, navigation

### 18.3 Integration
- API → DB
- Webhook → DB
- Payment → subscription
- AI → workflow

### 18.4 End-to-End
- Visitor → Assessment → Lead
- Sign up → Workspace → First workflow
- Plan → Checkout → Subscription active
- AI agent run → logs visible

Tools: Vitest, Testing Library, Playwright.

### 18.5 Load
- k6 / Locust for key endpoints before launch.

---

## 19. CI/CD

### 19.1 Marketing Site
- PR → build → preview URL
- Merge → production build → CDN deploy

### 19.2 Backend / Workspace
- PR → tests → build → container image
- Merge → staging deploy
- Tag/release → production deploy (manual approval)

### 19.3 Migrations
- DB migrations applied automatically in CI for staging
- Production migrations gated + reversible

---

## 20. Deployment

### 20.1 Environments
- Development (local)
- Staging (mirrors production)
- Production

### 20.2 Topology
- Web (marketing): static on CDN
- Web (workspace app): SSR/CSR hosted on managed platform (Vercel-class for app, OR container on Fly/Render/ECS)
- API: container on managed compute (ECS/Fly/Render)
- Workers: container on managed compute OR Fargate / Cloud Run
- DB: managed PostgreSQL
- Cache: managed Redis
- Queue: managed (SQS / Cloud Tasks / BullMQ on Redis)
- Storage: managed S3

### 20.3 Secrets
- Secret manager (AWS Secrets Manager / Doppler / Vault)
- Never in client bundle
- Only public values via `VITE_*` (e.g., public Sentry DSN)

---

## 21. Environment Variables

### 21.1 Marketing site (client)
- `VITE_PUBLIC_API_URL`
- `VITE_PUBLIC_ANALYTICS_KEY`
- `VITE_PUBLIC_SENTRY_DSN`
- `VITE_PUBLIC_SUPPORT_EMAIL`

### 21.2 Backend / Workspace
- Database URL
- Redis URL
- Queue URL
- Object storage credentials
- AI provider keys
- Payment provider keys (Razorpay / Stripe webhooks secrets)
- WhatsApp Cloud API credentials
- Email provider credentials
- OAuth client secrets
- JWT/session secret
- Encryption key (KMS-wrapped)
- Webhook signing secrets

### 21.3 Rule
- Never commit secrets to GitHub.
- `.env.example` checked in.
- `.env` in `.gitignore`.

---

## 22. Backup & Recovery

- Daily automated DB backups, retained 30 days
- Point-in-time recovery enabled
- Object storage versioning
- Recovery RPO ≤ 1 hour, RTO ≤ 4 hours (target)
- Quarterly restore drill

---

## 23. Performance

- Optimize remote images (next-gen formats, lazy load)
- Code split per route
- Avoid unnecessary 3D rendering on mobile / low-power
- Respect `prefers-reduced-motion`
- Clean up GSAP/ScrollTrigger/Three.js instances on unmount
- Backend: connection pooling, query optimization, indexes
- Cache hot reads (Redis)
- Edge cache for marketing pages

---

## 24. SEO (Marketing Site)

- Title, description per page
- Open Graph + Twitter Card
- Canonical URLs
- `sitemap.xml`
- `robots.txt`
- Structured data (Organization, Product, FAQ where relevant)
- Semantic HTML
- Performance budget (LCP < 2.5s)

---

## 25. Accessibility

- WCAG 2.1 AA target
- Semantic HTML
- Keyboard navigation
- Focus states
- ARIA where necessary
- Contrast checks
- Form labels and error messaging
- Reduced motion honored

---

## 26. Responsive Architecture

- Mobile-first CSS
- Breakpoints: 640 / 768 / 1024 / 1280 / 1536
- Customer workspace must work on tablet (mobile later)
- Marketing site already has responsive CSS layers

---

## 27. Technical Debt / Risks Today

- Multiple CSS layers can produce specificity conflicts.
- Inline `<style>` blocks in components make theming hard.
- Three.js / GSAP continuous animations need lifecycle discipline.
- Hardcoded content prevents non-engineer updates.
- No environment variable strategy.
- No backend → no SaaS capability.
- No router → no deep linking.
- No tests → regression risk.
- No CI/CD → manual deploy risk.
- Illustrative metrics must never become public claims.

---

## 28. Technical Acceptance Criteria (Future)

The production system must:
- Keep marketing and SaaS concerns modular.
- Support secure authentication and RBAC.
- Persist assessment, lead, agent, workflow and billing data.
- Support AI through a service abstraction.
- Support workflow execution via background workers.
- Support subscription entitlements with verified webhooks.
- Support analytics and observability.
- Be testable and CI/CD automated.
- Protect customer data with encryption + access control.
- Preserve the premium brand experience without making it a technical dependency for core business functionality.
- Scale from 10 to 10,000 customers without re-architecture.

---

## 29. Implementation Principle

> **Do not rebuild the current website just because the architecture is evolving.**

Build new capabilities around it in controlled phases:

**Frontend (marketing) → API → Database → Auth → Billing → AI service → Automation engine → Customer platform → Scale**

Each phase must be independently shippable and testable.

---

## 30. TRD Change Log

- **v1.0** — Baseline TRD reflecting marketing-site reality.
- **v1.1** — Corrected into a production SaaS blueprint: real backend, real database, real auth, real billing, real AI service, real automation engine, real integrations, real observability, real security.
