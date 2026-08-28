# Phase 0 Deliverable Index

**Phase:** 0 — Product Clarification & Architecture
**Date:** 18 August 2026
**Status:** Complete

## Purpose

Phase 0 produces **documentation only**. No existing application files are modified. Phase 0 answers: "What exactly are we building, with what stack, at what cost, in what order?"

Phase 0 output is reviewed by the founder (you) before Phase 1 (MVP Foundation) begins.

## Deliverables

| File | Purpose |
|---|---|
| [`README.md`](./README.md) | This file |
| [`ADR-001-monorepo-and-repo-layout.md`](./ADR-001-monorepo-and-repo-layout.md) | Repository structure (pnpm monorepo) |
| [`ADR-002-stack-selection.md`](./ADR-002-stack-selection.md) | Full stack (Next.js, Node/Fastify, Postgres, Razorpay, etc.) |
| [`ADR-003-database-and-multi-tenant.md`](./ADR-003-database-and-multi-tenant.md) | Postgres + Prisma + RLS multi-tenant model |
| [`ADR-004-ai-provider-abstraction.md`](./ADR-004-ai-provider-abstraction.md) | Anthropic + OpenAI embeddings via abstraction |
| [`ADR-005-billing-and-razorpay.md`](./ADR-005-billing-and-razorpay.md) | Razorpay Subscriptions + webhooks + GST |
| [`ADR-006-automation-engine.md`](./ADR-006-automation-engine.md) | Trigger → Condition → Action workflow engine |
| [`unit-economics.md`](./unit-economics.md) | Pricing validation, margin per plan, quotas |
| [`environment-and-secrets.md`](./environment-and-secrets.md) | Doppler + per-env secrets strategy |
| [`phase-1-readiness-checklist.md`](./phase-1-readiness-checklist.md) | What must be true before Phase 1 starts |

## Locked Decisions (from PRD v1.1 §41)

User has locked:
- Q1: **Razorpay** for payments
- Q2: **Internal** CRM
- Q3 (recommended): **Claude primary + OpenAI embeddings**
- Q4 (recommended): **Voice/telephony deferred to Phase 3**
- Q5 (deferred to Phase 0): unit economics — see `unit-economics.md`
- Q6 (recommended): **Rule-based assessment first, AI later**
- Q7 (recommended): **Multi-tenant data model from day 1; single-tenant UI OK early**
- Q8: **Trial only (14-day, Growth, no credit card)**
- Q9 (recommended): **WhatsApp deferred to Phase 2**
- Q10 (recommended): **Standard India SaaS legal structure**

## Phase 0 Decisions Still Open

These are flagged in `unit-economics.md` and need your call before Phase 1:

- **D1** — Pricing: keep Starter ₹9,999 / Growth ₹24,999 / Scale ₹49,999?
- **D2** — Annual discount: 15%?
- **D3** — Starter AI quota: 300 calls/month?
- **D4** — Enterprise ACV target: ₹6,00,000/year?
- **D5** — Trial length: 14 days?
- **D6** — Hard cap vs soft cap at quota?

## What Phase 0 Does NOT Produce

- No code is written
- No existing file is modified
- No new directory created outside `docs/phase-0/`
- No infrastructure is provisioned
- No third-party accounts are created (those happen in Phase 1)

## What Phase 1 Will Produce (after your approval)

Phase 1 (MVP Foundation) produces:
- Monorepo skeleton (apps/marketing preserved, apps/workspace created, services/api, services/worker, services/ai)
- Working signup → email verification → workspace
- Working Assessment → backend → Lead
- One AI agent type end-to-end (AI Sales Agent)
- Razorpay sandbox checkout for one plan
- Basic admin (read-only)
- Deployed to staging

**Estimated Phase 1 effort: 4–8 weeks of focused engineering.**

## How to Use This Folder

1. Read each ADR in order (001 → 006)
2. Read `unit-economics.md` — review the open D1–D6 decisions
3. Read `environment-and-secrets.md` — sanity-check the Doppler approach
4. Read `phase-1-readiness-checklist.md` — see what must be true before Phase 1 starts
5. Approve or override any decision
6. Phase 1 begins on approval

## References

- PRD v1.1 (`Sthayu_Ventures_PRD_v1.1.md`)
- TRD v1.1 (`Sthayu_Ventures_TRD_v1.1.md`)
- Business Plan v2 (`Sthayu_Ventures_Master_Business_Plan_v2.pdf`)
