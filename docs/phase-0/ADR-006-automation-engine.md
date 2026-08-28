# ADR-006 — Automation Engine

**Status:** Accepted (Phase 0)
**Date:** 18 August 2026
**Phase:** 0 — Product Clarification & Architecture

## Context

Sthayu's automation engine must support workflows of the form:

```
Trigger → Condition(s) → Action(s) → Result
```

Use cases from the marketing site and business plan:
- New lead → AI qualification → CRM update → WhatsApp follow-up → appointment booking → sales notification
- Invoice paid → AI summary → customer notification → internal dashboard update
- Support ticket created → AI triage → route to agent or human

Requirements:
- Multiple trigger types (webhook, schedule, event, manual)
- Conditional branching
- Parallel actions
- Retries with exponential backoff
- Human approval steps
- Background execution (no HTTP-blocking)
- Per-organization isolation
- Full execution logs
- Visual builder (Phase 2 MVP)

## Decision

### Architecture

Three components:
1. **Workflow definition** — JSON document, versioned, stored in `workflows` and `workflow_versions` tables.
2. **Trigger dispatcher** — receives events (webhook, schedule, internal event) and enqueues a workflow run.
3. **Worker pool** — BullMQ workers consume jobs, execute steps, log results, advance the state machine.

### Workflow schema (Phase 1 minimal, Phase 2 visual builder)

```jsonc
{
  "id": "uuid",
  "version": 1,
  "trigger": {
    "type": "webhook" | "schedule" | "event" | "manual",
    "config": { /* trigger-specific */ }
  },
  "steps": [
    {
      "id": "step_1",
      "type": "ai_classify" | "ai_chat" | "http_call" | "send_email" | "integration_action" | "internal_action" | "human_approval" | "condition",
      "config": { /* step-specific */ },
      "next": "step_2" | { "branches": { "true": "step_2a", "false": "step_2b" } }
    }
  ],
  "error_policy": {
    "retry": { "max_attempts": 3, "backoff": "exponential" },
    "on_failure": "stop" | "continue" | "fallback_step"
  }
}
```

Phase 1 supports a subset: `webhook` trigger, `ai_chat`, `ai_classify`, `http_call`, `send_email`, `internal_action`, `condition`. Other step types added in Phase 2.

### Triggers

| Type | Source | Notes |
|---|---|---|
| `webhook` | Public URL `POST /v1/webhooks/in/{workflow_id}` | Per-workflow signing secret |
| `schedule` | Cron expression | BullMQ repeatable jobs |
| `event` | Internal event bus (e.g., `lead.created`) | Phase 2 — Phase 1 supports `manual` only for events |
| `manual` | UI button | Always available |

### Execution model

- Each run creates a `workflow_executions` row with status, started_at, finished_at, error.
- Each step creates a `workflow_step_executions` row with input, output, latency, status, error.
- Worker uses BullMQ delayed/retry jobs.
- Long-running steps (AI calls, HTTP) have a 30s timeout in Phase 1; longer steps broken up in Phase 2.

### Human approval step

- Workflow pauses; status = `awaiting_approval`.
- Notification sent to approvers (email + in-app).
- Approver clicks "Approve" / "Reject" in workspace.
- Workflow resumes or terminates.

### Limits per plan

| Plan | Active workflows | Runs/month | Step types |
|---|---|---|---|
| Starter | 3 | 1,000 | basic |
| Growth | 10 | 10,000 | basic + ai |
| Scale | unlimited | unlimited | all + integrations |
| Enterprise | custom | custom | all |

Enforced by quotas in `getEntitlements`.

### Logs UI

- Workspace → Workflows → [workflow] → Runs → [run] → step-by-step log
- Each step: input, output, latency, status, error, retry count

## Consequences

- Long-running workflows do not block HTTP requests.
- Failures are retried automatically with exponential backoff.
- Human approval pauses work without losing state.
- Visual builder (Phase 2) can be added without schema changes.

## Alternatives Considered

| Alternative | Verdict |
|---|---|
| Temporal | Rejected — heavier than needed for MVP, adds infrastructure |
| Inngest | Deferred — interesting but adds a third-party dependency for a core feature |
| n8n / Windmill embedded | Rejected — we want our own product |
| Simple cron jobs | Rejected — doesn't support events, conditions, branching |

## References

- TRD v1.1 §10 (Automation Engine)
- PRD v1.1 §15 (Automation Architecture), §9 Pillar 2 (Workflow Automation)
