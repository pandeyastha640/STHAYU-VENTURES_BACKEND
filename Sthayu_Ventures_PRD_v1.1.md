# STHAYU VENTURES
## Product Requirements Document (PRD)

**Version:** 1.1 (Corrected)
**Date:** 18 August 2026
**Status:** Realistic Production-SaaS Blueprint
**Repository:** `pandeyastha640/STHAYU-VENTURES-WEBSITE`
**Implementation boundary:** This document refines the PRD into a real production SaaS product specification. No existing repository file is modified by this document.

---

## 1. Purpose

This PRD defines Sthayu Ventures as a **production-grade, multi-tenant, AI + Automation SaaS platform** that:

1. Sells AI, automation, websites, apps and SaaS products to businesses.
2. Captures, qualifies and converts leads through a digital assessment engine.
3. Delivers authenticated customer workspaces (dashboards) where customers build, run, monitor and pay for AI agents, workflows, integrations and analytics.
4. Bills customers through a real subscription and usage-based payment system.
5. Operates as an intelligent operating layer that connects fragmented business processes into one coordinated system.

The current repository is treated as the **V1 marketing experience / public surface**. It is **not yet a SaaS product**.

---

## 2. Current Product Baseline (Honest Inventory)

The current React/Vite application implements:

- Single-page marketing experience
- Hero, Services, AI Agents, SystemStack, HowItWorks, Showcase, CaseStudies, Pricing, Assessment, FinalCTA, Footer
- Persistent ambient 3D-style visual layer
- Three.js neural orb
- GSAP/ScrollTrigger animations
- Tailwind CSS 4 + custom CSS layers
- Lucide icons
- Hardcoded content (no CMS)
- Frontend-only Assessment form (no submission)
- Mailto-based CTAs (no CRM integration)
- Hardcoded pricing tiers (no checkout)
- Hardcoded case study metrics (labelled illustrative)
- No authentication
- No backend
- No database
- No payment gateway
- No API client
- No analytics pipeline

This means the current implementation is a **marketing brochure site**, not a SaaS.

---

## 3. Product Vision

Sthayu Ventures should evolve into a **Business Technology Operating System** that combines:

- **Marketing site** (public surface)
- **Sales & lead engine** (assessment, qualification, CRM)
- **Customer workspace** (authenticated dashboard)
- **AI agent platform** (configurable, observable, auditable)
- **Automation engine** (trigger → condition → action → audit)
- **Integration hub** (CRM, WhatsApp, email, calendar, payments, storage)
- **Billing & subscription platform** (monthly/annual/usage/custom)
- **Admin & support** (tickets, telemetry, customer health)
- **Vertical SaaS modules** (Professional Services, D2C, Education, Real Estate, Healthcare Ops, Manufacturing/Logistics)

The differentiator must not be "AI". The differentiator is **AI connected to execution and outcomes inside a paid product**.

---

## 4. Business Objectives (from Master Business Plan v2)

1. Build a profitable AI + Automation + SaaS business.
2. Reach ₹10 Crores ARR within 5 years.
3. Acquire 100 paying SaaS customers by Year 1 end.
4. Reach 1,000 paying customers and 5,000 free-tier users by Year 3.
5. Operate an intelligent, low-overhead, AI-augmented delivery organization.
6. Expand into international markets (UAE, UK, US) from Year 2.
7. Build a productized, scalable service offering that does not depend on manual delivery alone.

---

## 5. Target Customers

### Primary Segments
- **Small & Medium Businesses (SMBs)** — need automation but lack internal tech teams.
- **Growing Startups** — need scalable systems with lean teams.
- **Service Businesses** — repetitive sales/support/reporting/operations.
- **Operations-Heavy Businesses** — need workflow visibility, integrations, automation.
- **Enterprise** — custom AI agents, private workflows, dedicated implementation.

### Customer Tiers (Multi-Tenant)
- **Visitor** — anonymous public visitor
- **Lead** — submitted assessment / contact
- **Trial User** — free SaaS tier
- **Paid Customer** — Starter / Growth / Scale
- **Enterprise Customer** — custom contract, custom SLAs
- **Sthayu Admin** — internal operator
- **Partner / Reseller** (future)

---

## 6. Personas

### 6.1 Founder / Business Owner (SMB)
- Cares about revenue, lead conversion, cost reduction
- Limited technical depth
- Buys outcomes, not technology
- Wants "done-for-you" or guided setup

### 6.2 Operations Manager
- Lives inside spreadsheets, WhatsApp, CRMs
- Wants visibility, automation, fewer handoffs
- Evaluates workflows and integrations

### 6.3 Sales / Marketing Lead
- Wants qualified leads, faster follow-up, conversion
- Cares about CRM, WhatsApp, AI Sales Agent, AI Calling Agent

### 6.4 CTO / Tech Lead (Enterprise)
- Wants APIs, webhooks, private deployments, RBAC
- Evaluates architecture, security, scalability

### 6.5 Internal Admin (Sthayu)
- Manages customers, subscriptions, support, incidents
- Operates billing, refunds, dunning

---

## 7. Problems We Solve

- Missed leads and weak follow-up
- Manual reporting
- Delayed decisions
- Slow customer responses
- Disconnected tools (CRM, ERP, marketing, support, WhatsApp)
- Duplicate administration
- Slow sales/service operations
- No coherent digital system behind growth
- Scattered and untrusted data
- Excessive operational handoffs
- Lack of an automation layer that compounds value

---

## 8. Value Proposition

> **Sthayu turns business problems into intelligent, executable digital systems — combining AI, automation, integrations and analytics into one paid platform that compounds as your business grows.**

The product must sell outcomes:
- Time saved
- Cost reduced
- Revenue increased
- Response improved
- Visibility improved
- Decisions improved
- Scalability improved

---

## 9. Product Pillars (Production-Grade)

### Pillar 1 — AI Agents
Configurable agents with:
- Identity (name, role)
- Purpose / instructions
- Knowledge (documents, websites, FAQs, data)
- Input channels (chat, email, WhatsApp, voice, web)
- Decision rules / policies
- Tools & integrations
- Triggers (scheduled, event, manual)
- Actions
- Escalation rules
- Human handoff
- Logs / audit
- Performance metrics

### Pillar 2 — Workflow Automation
- Trigger → Condition → Action → Result model
- Visual workflow builder
- Step retries, branching, parallel execution
- Background jobs for long-running workflows
- Human approval steps

### Pillar 3 — AI Operations
- Decision support
- Summarization
- Next-best-action recommendations
- Alerts & priorities
- Auto-generated reports

### Pillar 4 — Data & Analytics
- Dashboards (per workspace)
- Metrics (per workflow, per agent, per integration)
- Reports (scheduled / on-demand)
- Insights (AI-generated)
- Alerts

### Pillar 5 — CRM Automation
- Lead capture (forms, chat, WhatsApp, email)
- Lead enrichment
- Lead scoring
- Routing
- Follow-up sequences
- Pipeline automation
- Stage movement

### Pillar 6 — Connected Business Systems
- Integrations directory (CRMs, email, WhatsApp, calendar, payments, storage, communication)
- Webhooks
- REST APIs
- Connectors with auth (OAuth/API key)

### Pillar 7 — Billing & Subscription
- Plans (Starter / Growth / Scale / Enterprise)
- Monthly + annual
- Usage-based billing (AI calls, workflows, integrations)
- Invoices
- Tax handling (GST in India)
- Webhook-verified payment lifecycle

### Pillar 8 — Admin & Customer Success
- Customer management
- Subscription management
- Support tickets
- Health scoring
- Internal analytics

---

## 10. Product Modules (MVP + Future)

| Module | Status | Description |
|---|---|---|
| Marketing Site | [EXISTING] | Public website (current repo) |
| Assessment Engine | [PARTIAL] | Frontend form, no backend yet |
| Lead Inbox | [MISSING] | Lead capture + CRM routing |
| CRM Integration | [MISSING] | External CRM (HubSpot/Zoho/Internal) |
| Authentication | [MISSING] | Email/password, OAuth, MFA |
| Customer Workspace | [MISSING] | Authenticated dashboard |
| AI Agent Builder | [MISSING] | Configure and run agents |
| Workflow Builder | [MISSING] | Trigger/condition/action builder |
| Integrations Hub | [MISSING] | Connectors and credentials |
| Analytics & Reporting | [MISSING] | Per-workspace dashboards |
| Billing | [MISSING] | Subscriptions, invoices, webhooks |
| Notifications | [MISSING] | In-app, email, WhatsApp |
| Support Tickets | [MISSING] | Customer → Sthayu support |
| Admin Console | [MISSING] | Internal operator UI |
| Public API | [MISSING] | Developer-facing API |
| Mobile App | [FUTURE] | Companion mobile UX |
| Marketplace | [FUTURE] | Third-party connectors & templates |

---

## 11. Customer Journey (Real)

```text
Visitor
  → Engages with marketing site
  → Submits Assessment
  → Becomes Lead
  → Lead is qualified (AI + human)
  → Discovery call booked
  → Proposal / Trial activated
  → Account created (sign up)
  → Onboarding (guided setup)
  → Workspace configured
  → First AI agent or workflow activated
  → Value milestone reached (first outcome)
  → Subscription upgraded or expanded
  → Customer success loop (optimization)
  → Renewal / expansion / churn
```

---

## 12. Conversion Objectives

### 12.1 Marketing Site
- Primary: Book Discovery / Submit Assessment
- Secondary: Explore solutions, view pricing, view case studies, view AI agents, view industries

### 12.2 Product
- Sign up
- Activate first workflow
- Activate first AI agent
- Connect first integration
- Upgrade plan
- Reach outcome milestone

---

## 13. Subscription Plans

### 13.1 Marketing Plans (existing on website)
| Plan | Price | Audience |
|---|---|---|
| Starter | ₹9,999 / month | SMB, first automation |
| Growth | ₹24,999 / month | Scaling business, multi-workflow |
| Scale | ₹49,999 / month | Automation-led teams |
| Enterprise | Custom | Custom systems, SLAs, dedicated implementation |

> These numbers are **current website assumptions**. Pricing must be re-validated against unit economics, AI cost, support cost and competitor benchmarks before launch.

### 13.2 Pricing Model Dimensions
- Seats / users
- Workflows / active workflows
- AI calls / agent executions
- Integrations connected
- Storage / data retention
- Support tier (email / priority / dedicated)
- Custom SLA (Enterprise)

---

## 14. AI Architecture (Requirements)

The AI layer must be:
- Provider-agnostic (Claude / OpenAI / open-source / local)
- Behind a service abstraction
- Tenant-isolated
- Quota-bounded per plan
- Auditable (request + response + tokens logged)
- Cost-instrumented
- Capable of tool/function calls
- Capable of retrieval (RAG) over tenant data
- Configurable per agent

### AI Capabilities (v1)
- Chat
- Classification
- Summarization
- Extraction (from documents)
- Lead scoring
- Recommendation
- Knowledge retrieval
- Workflow planning
- Content generation

---

## 15. Automation Architecture (Requirements)

The automation engine must:
- Support triggers (event, schedule, webhook, manual)
- Support conditions (filters, branching)
- Support actions (API call, AI call, integration action, internal action)
- Support retries and error handling
- Run long jobs in background queues
- Provide step-by-step execution logs
- Support human approval steps
- Be tenant-isolated
- Be rate-limited

---

## 16. Authentication, Authorization & Identity

### Auth Methods
- Email + password
- Magic link (optional)
- OAuth (Google, LinkedIn, Microsoft) (optional)
- MFA / TOTP (recommended for enterprise)

### Authorization
- RBAC roles: Owner, Admin, Manager, Member, Viewer
- Capability-based permission checks (server-enforced)
- API tokens for integrations
- Audit log of sensitive actions

---

## 17. Onboarding

Mandatory onboarding steps:
1. Verify email
2. Create or join organization
3. Choose plan / start trial
4. Connect first data source (CRM / WhatsApp / form / sheet)
5. Activate first workflow or agent
6. Reach first measurable outcome
7. Invite team

---

## 18. Dashboard (Customer Workspace)

The dashboard must include:
- Overview (KPIs)
- AI Agents (list, status, runs)
- Workflows (list, runs, errors)
- Integrations (connected apps, health)
- Data (sources, sync status)
- Analytics (dashboards, reports)
- Billing & subscription
- Team & roles
- Notifications
- Support / help
- Settings

---

## 19. Account Management

- Profile, password, MFA
- Organization settings
- Members & invitations
- API keys & webhooks
- Audit log access (for admins)
- Data export (for paid customers)
- Account deletion (GDPR/DPDP compliant)

---

## 20. Notifications

- In-app notification center
- Email (transactional)
- WhatsApp (optional, billing-critical events)
- Webhooks for customers
- Per-event subscription controls

---

## 21. Analytics

### 21.1 Marketing Analytics
- Page view, CTA click, pricing view, assessment start, assessment complete, discovery request

### 21.2 Product Analytics
- Signup, login, agent created, workflow created, workflow executed, AI request, integration connected, subscription, upgrade, downgrade, cancellation

### 21.3 Operational Analytics
- Workflow success rate
- AI latency and cost
- Payment failures
- Active organizations / users
- Retention cohorts

---

## 22. Admin Functionality (Internal)

- Customer list & search
- Subscription overrides
- Refunds / credits
- Impersonation (with audit trail)
- Feature flag toggles
- Plan configuration
- Internal notes on customers
- Support ticket triage
- System health monitoring

---

## 23. Customer Support

- In-app help center (articles)
- Email support
- In-app support ticket creation
- Status page (status.sthayuventures.com)
- Priority support for Growth / Scale
- Dedicated support for Enterprise
- SLA-backed response times

---

## 24. Integrations (V1 Targets)

| Category | Targets |
|---|---|
| CRM | HubSpot, Zoho, internal CRM module |
| Email | SMTP, SendGrid, Resend |
| WhatsApp | WhatsApp Cloud API (or BSP) |
| Calendar | Google Calendar, Outlook |
| Payments | Razorpay, Stripe |
| Storage | S3-compatible object storage |
| Communication | Slack, Microsoft Teams |
| Analytics | GA4, PostHog, Mixpanel (product) |
| Auth | Google OAuth, Microsoft OAuth |

All integrations must be implemented as adapters with stable interfaces.

---

## 25. Security & Privacy Requirements

- HTTPS everywhere
- TLS 1.2+
- Server-side input validation
- Server-side authorization checks on every endpoint
- Encryption at rest (DB)
- Encryption in transit (TLS)
- Hashing (bcrypt/argon2) for passwords
- CSRF protection for cookie-based sessions
- Rate limiting (per IP, per user, per endpoint)
- CORS policy
- Secrets in secret manager (never in client bundle)
- Audit log for sensitive actions
- Dependency monitoring
- Backup & recovery strategy
- Privacy policy, terms of service, DPA
- GDPR / DPDP / data deletion workflows

---

## 26. MVP Scope (Phase 1)

### Must Have (MVP)
- Marketing site (already exists — preserve)
- Assessment form connected to backend (submission, storage, qualification)
- Lead inbox (internal)
- Authentication (email/password, email verification)
- Single-tenant early access (no full multi-tenant yet)
- One AI agent type (e.g., AI Sales Agent or AI Support Agent) usable end-to-end
- One workflow builder primitive (trigger → action)
- One integration (e.g., WhatsApp OR email)
- Subscription plans (no payment yet, or mocked)
- Stripe/Razorpay sandbox integration
- Internal admin (read-only)
- Basic analytics events
- Basic monitoring + error tracking

### Should Have (MVP+)
- OAuth (Google)
- MFA
- Multi-tenant data isolation
- Billing webhooks verified
- Email notifications
- Public REST API (read-only)

### Could Have
- AI calling agent (telephony)
- More integrations
- Vertical templates

### Later (Phase 2+)
- Full agent builder
- Full workflow builder with branching
- Marketplace
- Mobile app
- Public developer platform

---

## 27. Phase 2 — Core SaaS

- Multi-tenant data isolation hardened
- Full subscription billing with webhooks
- Invoices, GST handling
- AI Agent Builder (visual config)
- Workflow Builder (visual config)
- Integrations Hub (5+ connectors)
- Reporting dashboards
- Notifications (email + in-app)
- Support tickets
- Audit log

---

## 28. Phase 3 — AI + Automation

- AI calling agent (telephony integration)
- Voice agent (TTS/STT)
- Document ingestion (PDF/DOCX/CSV) with RAG
- Per-tenant knowledge bases
- AI-driven recommendations
- AI-assisted workflow creation
- AI evaluation & guardrails
- Cost dashboards for AI

---

## 29. Phase 4 — Payments + Subscriptions (Hardened)

- Razorpay + Stripe live integration
- INR + USD + GBP + AED
- Annual plans + monthly plans
- Coupons, trials, dunning
- Plan upgrade/downgrade with prorated billing
- Custom enterprise contracts
- Tax handling

---

## 30. Phase 5 — Production Infrastructure

- Managed PostgreSQL
- Managed cache (Redis)
- Background job system (queues)
- Object storage (S3-compatible)
- CDN
- Secrets manager
- Centralized logging
- APM (Application Performance Monitoring)
- Error tracking (Sentry-class)
- Status page
- Backup + recovery (RPO/RTO defined)
- Multi-region deployment (later)

---

## 31. Phase 6 — Testing + Security Hardening

- Unit tests
- Component tests
- Integration tests
- E2E tests for critical journeys
- Load tests
- Security review (OWASP ASVS)
- Penetration test (pre-launch)
- Dependency audit
- Threat model

---

## 32. Phase 7 — Beta Launch

- Invite-only beta (10–25 customers)
- Onboarding concierge
- Feedback collection
- Iteration
- Documentation (help center)

---

## 33. Phase 8 — Full Production Launch

- Public SaaS launch
- Pricing published
- Self-service signup
- Self-service trial
- Payment live
- Public status page
- Support channels open
- Public changelog

---

## 34. Phase 9 — Scale & Advanced Features

- Marketplace
- Public API + developer portal
- Mobile app
- Industry vertical SaaS modules
- White-label / partner program
- SOC 2 / ISO 27001 (for enterprise pipeline)
- International expansion (UAE, UK, US)

---

## 35. Functional Requirements (Production)

### FR-Marketing
- FR-M01 — Marketing site renders on every supported device.
- FR-M02 — Assessment submits to backend and stores lead.
- FR-M03 — Lead is auto-notified to sales.
- FR-M04 — Pricing page shows plans and CTAs.
- FR-M05 — Case studies labelled as illustrative vs verified.

### FR-Auth
- FR-A01 — Users sign up with email + password.
- FR-A02 — Email verification required.
- FR-A03 — Password reset works end-to-end.
- FR-A04 — Sessions are secure (HttpOnly cookies or token rotation).
- FR-A05 — RBAC enforced server-side.
- FR-A06 — Audit log captures sensitive actions.

### FR-Workspace
- FR-W01 — Customer has isolated workspace.
- FR-W02 — Customer can create agents and workflows.
- FR-W03 — Customer can connect integrations with credentials.
- FR-W04 — Customer can see execution history.
- FR-W05 — Customer can invite team members.

### FR-Billing
- FR-B01 — Customer can subscribe to a plan.
- FR-B02 — Customer can upgrade / downgrade.
- FR-B03 — Customer can cancel.
- FR-B04 — Invoices are generated and downloadable.
- FR-B05 — Payment failures trigger dunning.
- FR-B06 — Webhooks are signature-verified.

### FR-AI
- FR-AI01 — Agents execute on configured triggers.
- FR-AI02 — Agent runs are logged with token usage.
- FR-AI03 — Agent usage is billed according to plan limits.
- FR-AI04 — Provider failures are retried and surfaced.

### FR-Automation
- FR-AU01 — Workflows execute via background jobs.
- FR-AU02 — Workflow runs are inspectable.
- FR-AU03 — Workflow errors are surfaced and retryable.

### FR-Integration
- FR-I01 — Credentials are encrypted at rest.
- FR-I02 — Tokens are refreshed automatically.
- FR-I03 — Disconnections are detected and surfaced.

---

## 36. Non-Functional Requirements

- Responsive
- Accessible (WCAG 2.1 AA target)
- Fast (LCP < 2.5s on 4G)
- Secure (OWASP ASVS Level 2 target)
- SEO-friendly
- Modular
- Observable
- Scalable
- Multi-tenant safe

---

## 37. KPIs

### Marketing
- Visitors, conversion rate, MQLs, SQLs, cost per lead

### Sales
- Lead-to-call, call-to-proposal, proposal-to-customer, CAC, LTV

### Product
- Activation rate, weekly active workspaces, workflows executed, AI calls per workspace, retention (logo + revenue), NPS

### Operational
- Uptime, incident MTTR, support response SLA, AI cost per workspace

### Business
- ARR, MRR, net new ARR, churn, expansion ARR

---

## 38. Risks (Product)

- Pricing unvalidated against unit economics
- AI cost volatility
- Integration partner instability (Meta WhatsApp policy, payment processor policy)
- Multi-tenant data leakage risk
- Customer concentration risk
- Support scaling risk
- Regulatory risk (DPDP, GST)

---

## 39. Out-of-Scope (v1)

- Mobile apps (deferred to Phase 9)
- White-label / multi-brand
- Marketplace
- Industry compliance certifications (HIPAA, SOC 2) — deferred until customer pipeline requires them
- On-premise deployment
- Voice agent telephony (Phase 3+)

---

## 40. Product Principle

> **Sthayu should sell outcomes first, technology second, and price by value delivered.**

Every feature must demonstrate one or more of:
- Time saved
- Cost reduced
- Revenue increased
- Response improved
- Visibility improved
- Decision-making improved
- Scalability improved

---

## 41. Questions / Decisions Required

The following are unresolved and must be decided before/during Phase 1 implementation:

- Q1 — Which payment gateway: Razorpay, Stripe, both? (India + international)
- Q2 — Which CRM is the system of record: build internal, or integrate HubSpot/Zoho first?
- Q3 — Which AI provider(s) is primary, with what failover?
- Q4 — Is voice / telephony in MVP or Phase 3?
- Q5 — What is the actual unit economics of AI calls per plan?
- Q6 — Should the assessment engine be AI-driven from day 1 or rule-based first?
- Q7 — Is single-tenant early access acceptable before full multi-tenant?
- Q8 — Is there a free tier in v1, or trial only?
- Q9 — Are WhatsApp and Meta Cloud API BSP access approved?
- Q10 — What is the legal entity, GST, invoicing and DPA story?

These are flagged explicitly and not silently assumed.

---

## 42. PRD Change Log

- **v1.0** — Baseline marketing-focused PRD
- **v1.1** — Corrected into a realistic production SaaS blueprint with modules, phases, RBAC, billing, security, KPIs, risks and open questions
