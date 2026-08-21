# ADR-002: Voucher domain and server-authoritative discount

- Status: Accepted (design contract only)
- Date: 2026-08-18
- Scope: Sprint 21 / `SPR21-009`

## Context

EduAI already exposes course price and currency data through the course
domain, but it does not yet have a voucher persistence, redemption, order, or
payment domain. The Couponis package is a reference for the WordPress UI and
link/code behavior only; it is not a runtime dependency and its implementation
must not be copied into EduAI.

Voucher behavior must remain distinct from scholarships and TMI rewards. A
voucher is a code-based promotion applied to a server-authoritative course
price. Scholarship entitlement and TMI balance conversion are separate domain
decisions and must not be represented as voucher fields.

## Decision

The Voucher domain will use an explicit policy with:

- normalized promo code and lifecycle status (`draft`, `active`, `disabled`);
- percentage or fixed-amount discount;
- ISO currency, start/end validity window, minimum course price, and optional
  maximum discount;
- global usage and per-user usage limits;
- optional course-ID scope, category-slug scope, and eligible-user scope.

Eligibility and discount calculation are server-side. The client may submit a
code, but it cannot provide the authoritative course price, discount, or final
amount. The calculation starts from the current course price and currency
returned by the course domain, caps the discount at both the configured maximum
and the course price, and returns stable reason codes for rejection.

The contract permits a voucher to match either an explicitly scoped course or
an explicitly scoped category. If any scope is configured, an unmatching course
and category is rejected. Empty scope means the voucher is not restricted by
course/category. User eligibility is checked independently.

`SPR21-009` defines and tests this policy contract only. It does not add a
database migration, payment integration, order mutation, or redemption route.

## Redemption and concurrency rules for the implementation task

The later Voucher implementation task must:

1. Re-read course price, voucher status, validity, scope, and counters on the
   server at redemption time.
2. Serialize the voucher counter update (row lock or an equivalent atomic
   conditional update) so concurrent requests cannot exceed global or per-user
   limits.
3. Use an idempotency/replay key with a uniqueness boundary such as
   `(voucherId, userId, redemptionKey)`. A repeated request returns the original
   decision or redemption result without applying the discount twice.
4. Commit voucher redemption, entitlement/order state, and its audit record in
   one transaction, or return a failure without any partial entitlement or
   counter mutation. Payment capture must not be reported as successful unless
   its own provider state is confirmed.
5. Authorize the acting user and verify ownership of any user-scoped operation;
   client-supplied user IDs, prices, counters, and discount totals are never
   trusted.
6. Record an audit event containing voucher identity, actor, course, decision,
   amount/currency, idempotency key, and outcome. Secrets and payment
   credentials are excluded.

Preview is read-only and may use the same evaluator, but preview never consumes
 a quota. Redemption is the only operation allowed to mutate counters or
 entitlement state.

## Proposed boundary (not an API commitment in this task)

The eventual application boundary should expose a server-side voucher preview
and a server-side redemption operation behind the course/enrollment boundary.
Exact route names and response DTOs belong to the implementation task after
the order/payment model is confirmed. The reusable evaluator contract is
covered by `EduAI-Back-End/prisma/voucher-contract.spec.ts` and
`EduAI-Back-End/prisma/voucher-contract.ts`.

## Migration and rollback

No schema migration is part of `SPR21-009`. The implementation task must add
schema changes only after the redemption transaction and audit model are
approved. Rollback must be additive and reversible: disable new redemption
entry points or the feature flag, preserve audit history, and do not rewrite
course prices or existing enrollments.

## Alternatives rejected

- **Use Couponis/WordPress at runtime:** rejected because EduAI owns the
  course, identity, enrollment, and future payment boundaries.
- **Calculate totals in the browser:** rejected because it permits stale or
  tampered prices and limits.
- **Merge Voucher with Scholarship or TMI:** rejected because those domains
  have different entitlement, balance, and audit semantics.
- **Add payment integration in the design task:** rejected because it would
  create an unreviewed partial-failure boundary before an order model exists.

## Verification

The executable contract test covers successful percentage/fixed calculations,
maximum discount and zero-floor behavior, lifecycle and time-window rejection,
minimum price, scope, user/global limits, currency/policy validation, and
incorrect/replayed code rejection. The existing course price contract remains
the source of the server-shaped amount and currency.
