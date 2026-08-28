# ADR-003 — Database & Multi-Tenant Strategy

**Status:** Accepted (Phase 0)
**Date:** 18 August 2026
**Phase:** 0 — Product Clarification & Architecture

## Context

Sthayu will run as a multi-tenant SaaS. Every customer owns an `Organization`. Users, agents, workflows, integrations, billing, audit logs etc. all belong to an organization. The data model must be correct from day 1 to avoid an expensive migration in Phase 2.

User decisions:
- Single-tenant early access is acceptable for the first 5–10 customers.
- Full multi-tenant UI/UX is required by Phase 2.

This means: **the data model is multi-tenant from day 1**, but the UI may treat the first customers as a single organization.

## Decision

### Database
- **PostgreSQL 16** (managed Neon for dev/staging, managed RDS for prod in Phase 5)
- **Prisma** for schema, migrations, type-safe client
- **pgvector** extension enabled (used from Phase 3+)
- **Database-per-environment**: dev, staging, prod each have their own DB

### Multi-tenant data model

Every tenant-owned table has a non-null `organization_id UUID NOT NULL` column with a foreign key to `organizations(id)` and an index on `organization_id`.

The list of tenant-owned tables in Phase 1:
- `users` (technically tenant-scoped via membership; a user can belong to multiple orgs)
- `organization_members` (user ↔ org + role)
- `agents`
- `agent_versions`
- `agent_executions`
- `integrations`
- `integration_connections`
- `notifications`
- `audit_logs`
- `api_keys`
- `webhooks`
- `usage_records`

Tables that are **not** tenant-scoped (system-level):
- `organizations`
- `plans`
- `subscriptions`
- `invoices` (linked to organization but also queried by Razorpay)
- `payments`
- `leads` (pre-customer)
- `assessments` (pre-customer)
- `support_tickets` (linked to organization)
- `feature_flags` (system-level)

### Authorization at the query layer

Two enforcement layers, **both required**:

1. **Application layer:** every Prisma query explicitly filters by `organizationId` from the session context. A helper `db.forOrg(orgId)` wraps Prisma to make accidental cross-tenant queries visually obvious.
2. **Database layer:** Postgres Row-Level Security (RLS) enabled on all tenant-owned tables with policies like:
   ```sql
   CREATE POLICY tenant_isolation ON agents
     USING (organization_id = current_setting('app.current_org_id')::uuid);
   ```
   Every connection sets `app.current_org_id` from the session at the start of each request.

This is **defense in depth**: if application code forgets to filter, the database refuses.

### Roles (RBAC)

| Role | Capabilities |
|---|---|
| `owner` | All (billing, members, delete) |
| `admin` | Members, agents, workflows, integrations |
| `manager` | Agents, workflows, integrations (read-only billing) |
| `member` | Create/edit own agents, workflows |
| `viewer` | Read-only |

Roles are enforced server-side on every endpoint. The frontend hides controls based on role but **never relies on hiding alone**.

### Indexes

Standard indexes per tenant-owned table:
- `organization_id` (B-tree)
- `created_at` for ordering
- Composite indexes on common query patterns (e.g., `(organization_id, status, created_at)` for executions)

## Consequences

- The first 5–10 customers can be a single organization in the UI but the data is correctly tenant-scoped from day 1.
- When Phase 2 introduces multi-org UI (organizations switcher), no migration is needed.
- RLS is a small performance overhead but massive security gain. Acceptable.
- Developers must remember to set `app.current_org_id` per request — enforced by middleware in `services/api`.

## Alternatives Considered

| Alternative | Verdict |
|---|---|
| Schema-per-tenant | Rejected — too much operational overhead at MVP |
| Database-per-tenant | Rejected — same |
| `tenant_id` column with app-only filtering | Rejected — no defense in depth |
| Citus / sharded Postgres | Deferred — not needed until 1000+ customers |

## References

- TRD v1.1 §8 (Database), §11 (Multi-Tenant Architecture), §12 (Authorization)
- PRD v1.1 §16 (Authorization)
- Locked decision Q7 (multi-tenant from day 1, single-tenant UI acceptable early)
