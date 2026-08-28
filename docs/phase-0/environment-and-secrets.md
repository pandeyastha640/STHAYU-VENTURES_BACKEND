# Environment & Secrets Strategy

**Status:** Accepted (Phase 0)
**Date:** 18 August 2026
**Phase:** 0 — Product Clarification & Architecture

## Purpose

Define the environment topology and secrets management strategy for Sthayu Ventures across all phases.

## Environments

Three environments, isolated from each other:

| Env | Purpose | Data | Access |
|---|---|---|---|
| **local** | Developer machine | Synthetic seed data only | Developer |
| **staging** | Pre-prod verification | Synthetic data; reset weekly | Engineering |
| **production** | Real customers | Real customer data | Restricted (on-call) |

Each environment has its own:
- Postgres database
- Redis instance
- Razorpay account (test mode for staging, live for prod)
- Anthropic API key (separate keys per env)
- OpenAI API key (separate keys per env)
- Email provider (Resend test mode for staging, live for prod)
- Object storage bucket (separate prefix per env)
- Secrets manager config (Doppler config per env)

## Branching → Environment Mapping

When the monorepo is introduced in Phase 1, the default branch is `main`.

| Branch | Auto-deployed to | Notes |
|---|---|---|
| `main` | staging | Every merge to main deploys staging |
| Tagged release (`v*.*.*`) | production | Manual approval gate |
| Feature branches | preview | Vercel previews for workspace, ephemeral env per PR (Phase 5+) |

## Secrets Management

**Tool:** Doppler (https://doppler.com)

### Why Doppler
- Free tier covers MVP
- Per-environment config (dev/staging/prod)
- Per-developer read access
- CLI injects secrets as env vars at runtime; never written to disk
- Audit log of who read what
- Slack/email alerts on secret access

### Categories of secrets

**Server-only (NEVER in client bundle):**
- `DATABASE_URL`
- `REDIS_URL`
- `RAZORPAY_KEY_ID` (server key)
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `ANTHROPIC_API_KEY`
- `OPENAI_API_KEY`
- `RESEND_API_KEY`
- `JWT_SECRET`
- `SESSION_SECRET`
- `ENCRYPTION_KEY` (for credential envelope encryption)
- `SENTRY_DSN_SERVER`
- `OBJECT_STORAGE_*`
- `WEBHOOK_SIGNING_SECRET`

**Public (in client via `NEXT_PUBLIC_*` or `VITE_*`):**
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SENTRY_DSN` (browser)
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` (publishable, safe to expose — Razorpay confirms)
- `NEXT_PUBLIC_SUPPORT_EMAIL`

### Naming convention
- `*_KEY_ID` / `*_KEY_SECRET` for paired credentials
- `*_WEBHOOK_SECRET` for webhook verification
- `*_URL` for connection strings
- All uppercase, underscores

### Local development
- Developer installs Doppler CLI
- `doppler login`
- `doppler setup` selects `dev` config
- `doppler run -- pnpm dev` injects secrets into the process
- `.env.example` checked into repo (no real values) as documentation

## `.env.example` Template

```bash
# ─── Public (safe to expose) ──────────────────────────────
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_SUPPORT_EMAIL=hello@sthayuventures.com

# ─── Server-only ───────────────────────────────────────────
NODE_ENV=development
PORT=3001

DATABASE_URL=postgresql://sthayu:sthayu@localhost:5432/sthayu_dev
REDIS_URL=redis://localhost:6379

RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxx

ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxx

RESEND_API_KEY=re_xxxxxxxxxxxx

JWT_SECRET=change-me-min-32-chars
SESSION_SECRET=change-me-min-32-chars
ENCRYPTION_KEY=change-me-32-byte-base64

SENTRY_DSN_SERVER=

OBJECT_STORAGE_ENDPOINT=https://xxx.r2.cloudflarestorage.com
OBJECT_STORAGE_BUCKET=sthayu-dev
OBJECT_STORAGE_ACCESS_KEY=xxxxxxxxxxxx
OBJECT_STORAGE_SECRET_KEY=xxxxxxxxxxxx

WEBHOOK_SIGNING_SECRET=change-me
```

## Secret Rotation Policy

| Secret | Rotation frequency | How |
|---|---|---|
| `JWT_SECRET` / `SESSION_SECRET` | Yearly | Doppler's rotation + invalidate sessions |
| `RAZORPAY_*` | On personnel change | Razorpay dashboard |
| `ANTHROPIC_API_KEY` | On personnel change | Anthropic console |
| `OPENAI_API_KEY` | On personnel change | OpenAI console |
| `ENCRYPTION_KEY` | **Never rotate** (would require re-encrypting all stored credentials) | Set once at production creation |

If `ENCRYPTION_KEY` is compromised, **all stored integration credentials must be re-collected from customers** (forced re-auth flow).

## Backups & Disaster Recovery

- Database: automated daily snapshots, 30-day retention, PITR enabled
- Object storage: versioning enabled, 30-day retention
- Secrets: Doppler has its own backup
- Recovery RPO target: ≤ 1 hour
- Recovery RTO target: ≤ 4 hours
- Quarterly recovery drill

## Production Access Control

- Only on-call engineers have production database access (via Doppler + bastion)
- All production access is logged (Doppler audit + DB query log)
- No direct `psql` to production; all access via approved tooling
- Customer data export requires admin role + audit log entry

## Monitoring & Alerting

- All secrets access events logged to Doppler audit log
- Anomalous access (new IP, new user, off-hours) → Slack alert
- API key revoked → immediate notification to security@sthayuventures.com

## References

- TRD v1.1 §20 (Deployment), §21 (Environment Variables), §16 (Security), §22 (Backup & Recovery)
- ADR-002 (Stack Selection)
