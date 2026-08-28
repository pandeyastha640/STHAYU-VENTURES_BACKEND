# ADR-002 — Stack Selection

**Status:** Accepted (Phase 0)
**Date:** 18 August 2026
**Deciders:** Sthayu Ventures engineering
**Phase:** 0 — Product Clarification & Architecture

## Context

Sthayu needs to ship a multi-tenant AI + Automation SaaS for the Indian SMB market. The current marketing site uses React 19 + Vite + Tailwind 4. The new SaaS requires:
- Customer authenticated workspace (separate from marketing)
- Backend API + background workers
- AI service abstraction (Claude primary, OpenAI embeddings)
- Workflow automation engine
- Razorpay billing
- PostgreSQL database
- Email + (later) WhatsApp + (later) voice

The user has explicitly chosen:
- **Razorpay** as the only payment gateway
- **Internal CRM** (not HubSpot/Zoho)
- **REST** as the API style

## Decision

### Frontend — Customer Workspace
- **Next.js 14 (App Router) + TypeScript**
- Tailwind CSS (shared tokens with marketing site)
- TanStack Query for server state
- React Hook Form + Zod for forms
- Radix UI primitives for accessible dialogs/menus (no full component library — keep design custom)
- Recharts for analytics
- `@react-three/fiber` + `@react-three/drei` only if Phase 3+ needs it (skip for v1)

**Why Next.js, not Vite + React Router:**
- Built-in routing, server components (less code), edge deployment, image optimization, middleware (useful for auth gating).
- Better fit for an authenticated dashboard with many routes than Vite SPA.
- Marketing site stays on Vite (different concerns).

### Backend — API + Worker
- **Node.js 20 LTS + TypeScript + Fastify**
- **Prisma** ORM (PostgreSQL)
- **BullMQ** (Redis-backed queue) for background jobs
- **Pino** for structured JSON logging
- **Zod** for request validation
- **tRPC not chosen** — REST was explicitly chosen for clarity and tooling neutrality.

**Why Node/TS, not Python:**
- Single language across frontend + backend + workers + tooling reduces context switching.
- TypeScript everywhere = end-to-end type safety.
- Fastify is faster and lighter than Express; better TypeScript story than NestJS.
- Python was considered for AI-heavy work, but the AI layer will be a thin wrapper around provider SDKs (Anthropic, OpenAI), which are excellent in both Node and Python. Node wins on simplicity.

### Database
- **PostgreSQL 16** (managed, e.g., Neon or Supabase Postgres or AWS RDS)
- **Prisma** migrations
- **pgvector** extension for RAG embeddings (Phase 3+)
- Redis for cache + BullMQ

### AI
- **Anthropic Claude API** (claude-3-5-sonnet default; claude-3-haiku for cheap classification)
- **OpenAI** `text-embedding-3-small` for RAG embeddings
- Provider abstraction layer in `services/ai` — Anthropic SDK is primary; OpenAI SDK is for embeddings only. A unified interface allows swapping providers in future.

### Billing
- **Razorpay** only
- Razorpay Subscriptions API for recurring plans
- Razorpay Webhooks with signature verification
- No Stripe. India-only for v1.

### Email
- **Resend** (or AWS SES as fallback) for transactional email
- Templates: verification, password reset, assessment confirmation, payment receipt, workflow error alert

### Hosting (deferred to Phase 5, decided now for clarity)
- **Frontend workspace:** Vercel (Next.js native)
- **Marketing site:** Cloudflare Pages (static) — no change from current pattern
- **Backend API + Worker:** Fly.io (simple, regional, containerized)
- **Postgres:** Neon (managed Postgres with branching)
- **Redis:** Upstash (managed Redis)
- **Object storage:** Cloudflare R2 (S3-compatible, cheap)
- **Secrets:** Doppler (developer-friendly secret manager)
- **Error tracking:** Sentry
- **APM:** Highlight.io (lightweight, good DX) or Datadog (heavier, more enterprise)
- **Status page:** Better Uptime (free tier covers MVP)

### Tooling
- **pnpm** workspaces
- **TypeScript** strict mode everywhere
- **ESLint** flat config (already exists in repo, extend to monorepo)
- **Prettier**
- **Vitest** for unit + integration
- **Playwright** for E2E
- **k6** for load testing
- **Husky** + **lint-staged** for pre-commit
- **Commitlint** for commit message convention

## Consequences

- All new code is TypeScript.
- All API endpoints are REST + JSON.
- All AI calls go through `services/ai` abstraction — no direct provider SDK calls in route handlers.
- All Razorpay calls go through `packages/billing`.
- All secrets come from Doppler — never in `.env` files committed to git.

## Alternatives Considered

| Area | Alternative | Verdict |
|---|---|---|
| Frontend | Vite + React Router | Rejected — Next.js better for dashboards |
| Backend | Python FastAPI | Rejected — split stack adds friction |
| Backend | NestJS | Rejected — too opinionated for our scale |
| ORM | Drizzle | Rejected — Prisma more mature for v1 |
| Queue | SQS / Cloud Tasks | Deferred — BullMQ simpler for MVP; revisit in Phase 5 |
| Hosting | AWS (ECS+RDS+S3) | Deferred — Fly+R2 simpler for MVP; revisit at scale |
| Auth | Auth0 / Clerk | Rejected — build it ourselves to keep cost low and data portable |

## References

- PRD v1.1 §14 (AI Architecture), §15 (Automation), §16 (Auth), §17 (Onboarding)
- TRD v1.1 §5–§20
- Locked user decisions (Razorpay, Internal CRM, REST)
