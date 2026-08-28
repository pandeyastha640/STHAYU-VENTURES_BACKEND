# ADR-001 — Repository Layout & Monorepo Decision

**Status:** Accepted (Phase 0)
**Date:** 18 August 2026
**Deciders:** Sthayu Ventures engineering
**Phase:** 0 — Product Clarification & Architecture

## Context

Sthayu Ventures currently has a single repository containing the marketing site (`E:\STHAYU VENTURES\src\`) plus a `Sthayu_Ventures_Master_Business_Plan_v2.pdf`, the existing v1.0 and v1.1 PRD/TRD, and a Python `.venv/`. The marketing site is a Vite + React 19 + Tailwind 4 SPA.

The production SaaS will add:
- Backend API service
- Backend background worker service
- Customer workspace web app (separate from the marketing site)
- AI service abstraction
- Automation engine
- Integrations adapters
- Database migrations
- Infrastructure as Code (IaC)
- Documentation (this folder)

Without a clear repository decision, the marketing site, the workspace app and the backend will collide in tooling, dependencies and CI.

## Decision

Use a **single repository with a pnpm workspace** (monorepo) and the following top-level layout:

```text
sthayu-ventures/
├── apps/
│   ├── marketing/      # Existing Vite/React marketing site (DO NOT TOUCH in Phase 0)
│   └── workspace/      # NEW: Customer authenticated app (Phase 1+)
├── services/
│   ├── api/            # NEW: Backend REST API (Phase 1+)
│   ├── worker/         # NEW: Background worker (Phase 1+)
│   └── ai/             # NEW: AI service abstraction (Phase 1+)
├── packages/
│   ├── ui/             # Shared React component primitives (Phase 2+)
│   ├── config/         # Shared ESLint/TSConfig/tsup config (Phase 1+)
│   ├── types/          # Shared TypeScript types (Phase 1+)
│   └── billing/        # Razorpay wrapper (Phase 1+)
├── infra/
│   ├── terraform/      # IaC (Phase 5)
│   └── docker/         # Local dev compose (Phase 1+)
├── db/
│   ├── migrations/     # SQL migrations (Phase 1+)
│   └── seeds/          # Seed data (Phase 1+)
├── docs/
│   ├── business-plan/  # Business plan PDF mirror
│   ├── prd/            # PRD v1.0, v1.1, future versions
│   ├── trd/            # TRD v1.0, v1.1, future versions
│   ├── phase-0/        # THIS FOLDER
│   └── decisions/      # Future ADRs
├── scripts/
└── .github/
    └── workflows/      # CI/CD (Phase 1+)
```

### Why monorepo (not polyrepo)
- One PR can change API + workspace + migrations together (the most common change unit).
- Shared types live in `packages/types` — no more drift between frontend and backend.
- Shared CI/CD infrastructure (lint, type-check, test, build) is configured once.
- Refactoring across services is cheap.
- The marketing site can stay isolated under `apps/marketing/` without affecting anything else.

### Why pnpm (not npm or yarn)
- Fast install, strict dependency resolution.
- Excellent workspace support.
- Smaller `node_modules` due to symlinked content-addressable store.

## Migration from current layout

Phase 0 is documentation only. The existing layout is **not changed in Phase 0**. The actual migration to the monorepo layout happens at the start of Phase 1 by:
1. Creating the `apps/`, `services/`, `packages/`, `infra/`, `db/`, `docs/`, `scripts/`, `.github/` directories.
2. Moving the existing `src/`, `public/`, `index.html`, `package.json`, `vite.config.js`, `eslint.config.js` into `apps/marketing/`.
3. Adding the root `package.json` with `pnpm-workspace.yaml`.
4. Wiring up shared `packages/config` (ESLint + TSConfig presets).

## Consequences

- Marketing site remains untouched in Phase 0 (the file-safety rule is honored).
- A new `apps/marketing` path will be introduced in Phase 1, but `src/` keeps working as-is until that point.
- All new code (Phase 1+) goes into the monorepo from the start.
- Future engineers will have a single clone to work on.

## Alternatives Considered

| Alternative | Pros | Cons | Verdict |
|---|---|---|---|
| **Polyrepo per service** | Strict isolation, separate deploy keys | Cross-service PRs are painful; types drift; CI duplicated | Rejected |
| **Single app, no workspaces** | Simplest | All code collides in one `package.json`; can't isolate marketing from backend | Rejected |
| **Nx / Turborepo on top of pnpm** | Caching, generators, dependency graph | More tooling, more learning curve, not needed at MVP | Deferred (revisit in Phase 2+) |

## References

- PRD v1.1 §6 (Customer Workspace)
- TRD v1.1 §6 (Frontend Architecture) and §7 (Backend Architecture)
- Phase 0 deliverable: `docs/phase-0/README.md`
