# ADR-004 — AI Provider Abstraction

**Status:** Accepted (Phase 0)
**Date:** 18 August 2026
**Phase:** 0 — Product Clarification & Architecture

## Context

User locked decision: **Claude (Anthropic) primary, OpenAI embeddings for RAG**. AI capabilities required:
- Chat / completion (agent reasoning)
- Structured output (lead scoring, assessment scoring, classification)
- Function/tool calling (agents need to call integrations)
- Embeddings (RAG in Phase 3+)
- Streaming (UI agent responses)

The AI layer must:
- Be provider-agnostic so we can add a second provider later without rewriting callers
- Meter token usage and cost per organization
- Log every call (prompt, completion, tokens, latency, cost, errors)
- Enforce per-plan quotas
- Support streaming to the UI

## Decision

### Provider roles

| Provider | Role | Why |
|---|---|---|
| **Anthropic Claude** | Primary for chat/completion/structured output/tool use | Excellent structured reasoning, strong tool use, good latency |
| **OpenAI `text-embedding-3-small`** | Embeddings only | Cheapest reliable embedding model; well-documented; compatible with pgvector |
| **Anthropic Claude Haiku** | Cheap classification, scoring, simple extraction | Cost optimization |

### Abstraction layer

A thin interface in `services/ai`:

```ts
interface AIService {
  chat(input: ChatInput): Promise<ChatOutput>;
  chatStream(input: ChatInput): AsyncIterable<ChatStreamChunk>;
  classify(input: ClassifyInput): Promise<ClassifyOutput>;
  extractStructured<T>(input: ExtractInput<T>, schema: ZodSchema<T>): Promise<T>;
  embed(input: EmbedInput): Promise<EmbedOutput>;
}
```

Implementations:
- `AnthropicAdapter` (primary)
- `OpenAIEmbeddingsAdapter` (embeddings only)

No direct provider SDK calls outside `services/ai`. All callers go through the interface.

### Quotas & metering

- `usage_records` table records `(organization_id, agent_id, model, prompt_tokens, completion_tokens, embedding_tokens, estimated_cost_usd, created_at)` per call.
- Per-plan soft cap (warning) and hard cap (rejection) enforced before the call.
- Cost in USD computed from a static model-price table in `packages/billing` (provider list prices + 10% margin).

### Logging

- Every call logged via Pino with: `org_id`, `user_id`, `agent_id`, `model`, `tokens_in`, `tokens_out`, `latency_ms`, `estimated_cost_usd`, `request_id`, `error?`.
- Request ID correlated across services for tracing.

### Streaming

- Server uses Server-Sent Events (SSE) over HTTP — simpler than WebSockets and works through most proxies.
- Frontend uses native `EventSource` (or `fetch` + ReadableStream for POST bodies).

### Guardrails (Phase 1 minimum)

- Input length cap (e.g., 32k tokens).
- Output length cap.
- System prompt injection protection (basic delimiter checks).
- PII redaction in logs only (not in prompts) — Phase 2.

### Failover (deferred)

- No automatic failover in Phase 1. If Anthropic is down, surface a 503 with retry-after. Phase 2 adds a secondary provider (e.g., OpenAI for chat) for failover on critical agent types.

## Consequences

- All AI costs are visible per organization.
- Provider switch is a single-file change in `services/ai`.
- Per-plan quotas protect margin.
- Streaming UI works without WebSocket infrastructure.

## Alternatives Considered

| Alternative | Verdict |
|---|---|
| Direct Anthropic SDK in route handlers | Rejected — couples business logic to provider |
| LangChain / LlamaIndex | Rejected — adds magic, harder to debug, not needed at MVP |
| OpenAI for everything | Rejected — Claude is better at structured reasoning |
| Self-hosted OSS model (Llama) | Deferred — operational cost too high for v1 |

## References

- TRD v1.1 §9 (AI Architecture)
- PRD v1.1 §14 (AI Architecture Requirements)
- Locked decision Q3 (Claude + OpenAI embeddings)
