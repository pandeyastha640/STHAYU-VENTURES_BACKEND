# Unit Economics & Pricing Validation

**Status:** Draft for Phase 0 review
**Date:** 18 August 2026
**Currency:** INR (₹)
**Phase:** 0 — Product Clarification & Architecture

## Purpose

Validate that the pricing on the marketing site (Starter ₹9,999, Growth ₹24,999, Scale ₹49,999, Enterprise custom) actually produces a viable SaaS business after accounting for AI costs, support costs, infrastructure costs, and Razorpay fees.

If margins are too thin, Phase 0 must recommend pricing changes **before** Phase 1 launches paid plans.

---

## Cost Components Per Customer (Monthly)

### 1. AI Cost (variable, usage-based)

Assumptions:
- Primary model: Claude 3.5 Sonnet at $3/MTok input, $15/MTok output
- Cheap model: Claude 3 Haiku at $0.25/MTok input, $1.25/MTok output
- Embeddings: OpenAI `text-embedding-3-small` at $0.02/MTok (Phase 3+, ignored in Phase 1)
- USD-INR assumed at ₹84/$ for v1

Estimated tokens per customer per month by plan:

| Plan | Avg AI calls/mo | Tokens in/call | Tokens out/call | Model mix | Monthly AI cost |
|---|---|---|---|---|---|
| Starter | 200 | 1,500 | 500 | 80% Haiku / 20% Sonnet | ₹150 |
| Growth | 1,000 | 2,000 | 800 | 60% Haiku / 40% Sonnet | ₹700 |
| Scale | 5,000 | 2,500 | 1,000 | 40% Haiku / 60% Sonnet | ₹3,400 |
| Enterprise | custom | — | — | — | — |

(Detailed calculation in `unit-economics-calc.md` for audit.)

### 2. Razorpay Fees

Razorpay charges 2% per transaction on standard plans.

| Plan | Monthly revenue | Razorpay fee (2%) |
|---|---:|---:|
| Starter | ₹9,999 | ₹200 |
| Growth | ₹24,999 | ₹500 |
| Scale | ₹49,999 | ₹1,000 |
| Enterprise | custom | custom |

### 3. Infrastructure Cost (allocated per customer)

Assumptions at 100 customers:
- Managed Postgres (Neon Pro): ₹42,000 / month total → ₹420 / customer
- Redis (Upstash): ₹8,400 / month total → ₹84 / customer
- Hosting API+Worker (Fly.io): ₹21,000 / month total → ₹210 / customer
- Object storage + bandwidth: ₹4,200 / month total → ₹42 / customer
- Error tracking (Sentry): ₹4,200 / month total → ₹42 / customer
- Email (Resend): ₹2,000 / month total → ₹20 / customer
- Misc (status page, monitoring): ₹2,000 / month total → ₹20 / customer
- **Total infra per customer:** ~₹840 / month

At 500 customers, infra per customer drops to ~₹300/month (better economies of scale).

### 4. Support Cost (allocated per customer)

Assumptions:
- 1 support engineer can handle ~150 paying customers at MVP (email + occasional tickets).
- Support engineer fully loaded cost (salary + benefits): ₹80,000 / month.
- Per customer: ~₹530 / month at 150 customers.
- Drops to ~₹200 / month at 400 customers per engineer.

### 5. Customer Acquisition Cost (CAC) — flagged

Phase 0 does not have CAC data. For v1 launch, assume:
- Inbound (organic + content): CAC ~₹1,500
- Outbound (paid ads): CAC ~�4,000

CAC must be < LTV / 3 to be viable. With Growth plan at ₹24,999/month × 24 months gross retention = ₹6,00,000 LTV, even paid CAC of ₹4,000 is healthy. **No pricing change needed for CAC.**

---

## Margin Per Plan

| Plan | Revenue | AI | Razorpay | Infra | Support | **Gross margin** | Margin % |
|---|---:|---:|---:|---:|---:|---:|---:|
| **Starter** | ₹9,999 | ₹150 | ₹200 | ₹840 | ₹530 | **₹8,279** | **82.8%** |
| **Growth** | ₹24,999 | ₹700 | ₹500 | ₹840 | ₹530 | **₹22,429** | **89.7%** |
| **Scale** | ₹49,999 | ₹3,400 | ₹1,000 | ₹840 | ₹530 | **₹44,229** | **88.5%** |
| **Enterprise** | custom | — | — | — | — | **target ≥75%** | — |

**All three plans exceed the 70% gross margin target.** ✅

---

## Pricing Recommendations

### ✅ Starter ₹9,999/month — keep
Healthy margin (82.8%). Risk: if AI usage creeps up, margin compresses fast. Recommend:
- Enforce hard quota of 300 AI calls/month on Starter
- Overage: ₹2 per additional AI call (or block)
- This protects margin if a heavy user lands on Starter

### ✅ Growth ₹24,999/month — keep, possibly raise
Strong margin (89.7%). Demand test in Phase 7 beta will tell us if pricing power exists. **Consider ₹29,999** in Phase 2 if conversion stays >5%.

### ✅ Scale ₹49,999/month — keep, possibly raise
Strong margin (88.5%). AI cost is the highest here. **Hard cap of 8,000 AI calls/month**, overage ₹1.5/call.

### ✅ Enterprise — custom
Standard. Negotiate per deal. Target ACV (Annual Contract Value) ₹6,00,000+.

---

## Annual Plan Discount

Recommendation: **15% discount** on annual prepay vs 12× monthly.

| Plan | Monthly | Annual prepay | Annual saving | Annual saving % |
|---|---:|---:|---:|---:|
| Starter | ₹9,999 | ₹1,01,988 | ₹17,988 | 15% |
| Growth | ₹24,999 | ₹2,54,988 | ₹44,988 | 15% |
| Scale | ₹49,999 | ₹5,09,988 | ₹89,988 | 15% |

Annual prepay improves cash flow and reduces churn.

---

## Free Trial (per locked decision Q8)

**14-day trial on Growth plan, no credit card required.**
- Trial creates subscription in `status = created` with `trial_end = now + 14 days`.
- Razorpay's `start_at` or trial via subscription offers.
- Day 12: email reminder
- Day 14: trial ends → subscription prompts user to add payment method
- If no payment method by day 14: workspace enters "limited read-only" mode for 7 days, then deactivated.

---

## Quota Enforcement

Per-plan hard caps (enforced server-side):

| Plan | Active workflows | Workflow runs/mo | AI calls/mo | Members | Storage |
|---|---|---|---|---|---|
| Starter | 3 | 1,000 | 300 | 3 | 1 GB |
| Growth | 10 | 10,000 | 2,000 | 10 | 10 GB |
| Scale | unlimited | unlimited | 8,000 | 50 | 100 GB |
| Enterprise | custom | custom | custom | custom | custom |

Overage behavior:
- Soft cap: email warning + in-app banner
- Hard cap: API returns 429 with `quota_exceeded` code; UI shows "upgrade plan" CTA

---

## Phase 0 Decisions Required From User

These are flagged because they affect revenue and margin:

1. **D1 — Pricing on website:** keep Starter ₹9,999 / Growth ₹24,999 / Scale ₹49,999? Or adjust before public launch?
2. **D2 — Annual discount:** 15% confirmed?
3. **D3 — Starter AI quota:** 300 calls/month confirmed?
4. **D4 — Enterprise ACV target:** ₹6,00,000/year minimum?
5. **D5 — Trial length:** 14 days confirmed?
6. **D6 — Hard cap vs soft cap at quota:** hard cap (block + upgrade CTA)?

User has explicitly said "select according to yourself" for technical choices. For these commercial choices, **I recommend** the values above but flag them so the user can override.

---

## References

- PRD v1.1 §13 (Subscription Plans), §37 (KPIs)
- TRD v1.1 §13 (Billing & Subscription)
- Locked decision Q8 (trial only)
