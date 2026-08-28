# Phase 1 Readiness Checklist

**Phase:** 1 — MVP Foundation
**Date:** 18 August 2026
**Status:** Pending Phase 0 sign-off

## Purpose

Define what must be true before Phase 1 (MVP Foundation) begins coding. Phase 1 cannot start until every item is checked.

## Prerequisites

### Documentation sign-off
- [ ] PRD v1.1 reviewed and approved
- [ ] TRD v1.1 reviewed and approved
- [ ] All six ADRs in `docs/phase-0/` reviewed and approved
- [ ] Unit economics reviewed and D1–D6 decisions made
- [ ] Environment & secrets strategy approved

### Account provisioning (do this during Phase 1 week 1, not before)
- [ ] Doppler account created (free tier)
- [ ] Neon Postgres account created (free dev tier)
- [ ] Upstash Redis account created (free tier)
- [ ] Fly.io account created (free tier for Hobby)
- [ ] Vercel account created (free Hobby)
- [ ] Anthropic API key obtained ($5 minimum credit)
- [ ] OpenAI API key obtained ($5 minimum credit)
- [ ] Razorpay account created (test mode active)
- [ ] Resend account created (free tier)
- [ ] Cloudflare R2 bucket created
- [ ] Sentry account created (free tier)
- [ ] Better Uptime status page created

### Domain & legal (do this during Phase 1 week 1)
- [ ] Confirm domain ownership (sthayuventures.com) and DNS access
- [ ] Decide legal entity (LLP or Pvt Ltd) — recommend Pvt Ltd for Razorpay payouts and future investment
- [ ] Register GST if not already done
- [ ] Draft Privacy Policy + Terms of Service (use a SaaS template; have a lawyer review before Phase 8)

### Engineering prerequisites
- [ ] Node.js 20 LTS installed locally
- [ ] pnpm installed (`npm install -g pnpm`)
- [ ] Doppler CLI installed (`brew install doppler` or equivalent)
- [ ] Docker installed (for local Postgres + Redis)
- [ ] GitHub organization/repo access
- [ ] CI/CD provider chosen (recommend GitHub Actions)

### Repayment of technical debt before Phase 1
- [ ] None required — existing marketing site stays as-is until Phase 1 migration

## Decisions To Lock Before Phase 1

From `unit-economics.md`:
- [ ] **D1** — Pricing confirmed or adjusted
- [ ] **D2** — Annual discount % confirmed
- [ ] **D3** — Starter AI quota confirmed
- [ ] **D4** — Enterprise ACV target confirmed
- [ ] **D5** — Trial length confirmed
- [ ] **D6** — Hard cap vs soft cap confirmed

## Phase 1 Definition of Done

Phase 1 is complete when **all** of the following are true:

### Marketing site (unchanged, preserved)
- [ ] Existing marketing site still builds and runs identically
- [ ] No `src/`, `public/`, `index.html`, `package.json`, or config file modified by Phase 1 work

### Monorepo
- [ ] pnpm workspace set up with apps/marketing, apps/workspace, services/api, services/worker, services/ai
- [ ] Existing marketing site moved into apps/marketing without functional regression
- [ ] Root package.json with workspace scripts (`pnpm dev`, `pnpm build`, `pnpm test`, `pnpm lint`)
- [ ] Shared packages/config (ESLint, TypeScript config) wired up

### Authentication & Workspace
- [ ] User can sign up with email + password at `app.sthayuventures.com` (or local equivalent)
- [ ] Email verification required before workspace access
- [ ] Password reset works end-to-end
- [ ] User session is secure (HttpOnly cookie, SameSite=Lax)
- [ ] Workspace dashboard renders (empty state OK)

### Assessment → Lead Pipeline
- [ ] Assessment form on marketing site submits to backend
- [ ] Backend stores lead in Postgres
- [ ] Lead triggers email to internal team
- [ ] Lead visible in internal admin (read-only list)

### AI Agent (AI Sales Agent)
- [ ] One agent type (AI Sales Agent) configurable in workspace
- [ ] Agent runs on demand (manual trigger) and via webhook
- [ ] Agent execution logged with tokens, cost, latency
- [ ] Agent output visible in workspace UI
- [ ] Anthropic Claude integration through abstraction layer

### Billing (sandbox)
- [ ] Razorpay test mode integration
- [ ] Customer can subscribe to Growth plan (test card)
- [ ] Razorpay webhook signature verified
- [ ] Subscription status reflected in workspace entitlements
- [ ] Customer sees an invoice (mirrored from Razorpay)

### Internal admin (read-only)
- [ ] List of customers, leads, subscriptions
- [ ] Read-only — no mutations from admin in Phase 1

### Multi-tenant
- [ ] Every tenant-owned table has `organization_id`
- [ ] Postgres RLS enabled and tested
- [ ] First 5–10 customers can be onboarded as a single org (UI simplicity OK)

### Observability
- [ ] Structured JSON logging via Pino
- [ ] Sentry error tracking in backend and frontend
- [ ] Request correlation IDs across services

### Deployment
- [ ] Staging environment deployed and accessible
- [ ] CI pipeline runs lint + type-check + tests on PRs
- [ ] Deploy to staging on merge to main

### Documentation
- [ ] API endpoints documented (OpenAPI spec auto-generated)
- [ ] Setup instructions in repo README for new developers
- [ ] Runbook for common operations

## What Phase 1 Does NOT Include

To keep Phase 1 shippable in 4–8 weeks, the following are **out of scope**:

- Workflow builder UI (Phase 2)
- Multiple AI agent types (Phase 2)
- Integrations hub beyond email (Phase 2)
- Annual plans (Phase 2)
- Multi-organization switching in UI (Phase 2)
- RAG / knowledge bases (Phase 3)
- Voice/telephony (Phase 3)
- WhatsApp (Phase 2)
- Mobile app (Phase 9)
- Marketplace (Phase 9)
- Production environment (Phase 5)
- SOC 2 / compliance (Phase 9)

## Estimated Phase 1 Effort

- Setup + accounts + repo migration: 1 week
- Auth + workspace + DB: 1–2 weeks
- Assessment → lead: 3–5 days
- AI agent runtime: 1–2 weeks
- Razorpay sandbox integration: 3–5 days
- Internal admin: 3–5 days
- Observability + CI/CD: 3–5 days
- Buffer + polish: 1 week

**Total: 4–8 weeks of focused engineering.**

## References

- PRD v1.1 §26 (MVP Scope), §27 (Phase 2)
- TRD v1.1 §5 (Target Production Architecture)
- All Phase 0 ADRs
- `unit-economics.md`
- `environment-and-secrets.md`
