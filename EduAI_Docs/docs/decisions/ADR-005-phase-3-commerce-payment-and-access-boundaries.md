# ADR-005: Phase 3 commerce, payment, and access boundaries

- Status: Accepted — amended for permanent Commerce runtime
- Accepted: 2026-08-24 by explicit human approval
- Amended: 2026-08-24 by explicit human architectural decision
- Date: 2026-08-23
- Scope: Sprint 23 / `SPR23-001`

## Context

EduAI is a NestJS/Prisma/PostgreSQL modular monolith with a separate React
client. The backend is authoritative for prices, authorization, enrollment,
progress, and completion. Phase 3 adds course and membership orders, PayOS
VietQR settlement, centralized entitlements, analytics, and affiliate
operations without replacing the verified learning domains.

The live implementation already establishes constraints that this design must
preserve:

- courses expose an optional non-negative `priceAmountMinor` and ISO currency;
- direct course enrollment is unique per learner and course, and many learning,
  assessment, classroom, certificate, and AI checks authorize through it;
- voucher redemption, scholarship awards, and TMI reward redemption are
  transactional, idempotent or uniqueness-bound, and write sanitized audit
  events;
- voucher and scholarship monetary records use minor-unit integer values;
- TMI is an append-only points ledger and explicitly is not money;
- audit records are append-only and their metadata is recursively sanitized;
- API responses use explicit DTOs and projections rather than exposing Prisma
  entities.

The current system has no cart, order, payment, membership, or shared access
grant model. Existing voucher redemption consumes quota before an order exists,
scholarship application immediately creates an award, and access checks are
distributed across modules. Those behaviors cannot silently become payment or
entitlement authority.

## Amendment 1: Permanent Commerce runtime

Commerce is a permanent production capability. Its cart, catalog, order, and
administrative entry points must not depend on the former operator-controlled
runtime feature flag or return the former disabled-state error because runtime
configuration is absent or false.

This amendment changes only Commerce activation and rollback mechanics. It
does not weaken authentication, authorization, ownership isolation,
idempotency, transaction and concurrency controls, immutable financial and
audit history, reconciliation, payment safety, or least-privilege database
requirements. `COMMERCE_IDEMPOTENCY_SECRET` remains mandatory and secret in
production. Missing or unsafe production configuration must fail startup, and
order creation must remain fail-closed outside production if the secret is not
configured.

Payment-provider activation remains independently controlled by the Payment
domain's configuration and safety gates. Removing the Commerce runtime flag
does not enable PayOS calls, payment attempts, settlement handling, webhooks,
or fulfillment. The bounded Sprint 23 production UAT remains required, with
post-UAT reconciliation, proof of no provider/payment effect, preserved
immutable administrator history, authorization checks, and healthy production
readiness replacing the former enable/disable ceremony.

## Decision

### 1. Domain ownership

Phase 3 remains inside the modular monolith. Dependencies flow through explicit
application interfaces; modules do not import another module's persistence
repository directly.

| Domain | Owns | Does not own |
| --- | --- | --- |
| Course | Catalog identity, publication/moderation, current list price | Cart totals, paid price, payment state |
| Commerce | Cart, pricing decision, order, immutable line and discount snapshots | Provider secrets, learning progress |
| Voucher / Scholarship / TMI | Eligibility, quota/reservation, award or reward history | Order lifecycle, payment success |
| Payment | Provider request, normalized provider event, settlement and refund records | Pricing, course access |
| Membership | Plan identity, immutable plan versions, purchased terms and term lifecycle | Payment confirmation, learning progress |
| Access | Course/service grants and the centralized authorization decision | Price calculation, settlement |
| Fulfillment | Exactly-once conversion of a confirmed order into memberships and grants | Provider verification |
| Analytics | Versioned metric definitions and read projections from authoritative records | Mutable revenue or balance authority |
| Affiliate | Attribution policy and append-only commission/withdrawal records | Order revenue, automatic payout |
| Audit | Sanitized immutable security and business event history | Domain state or raw provider payloads |

Controllers expose versioned `/api/v1` resources through explicit input and
output DTOs. Learners may access only their own cart, orders, payments,
memberships, grants, and affiliate data. Platform administrators receive
role-protected, paginated operational views. Instructor reporting must not
expose buyer identity unless a separately approved contract requires it.

### 2. Money and pricing

- Phase 3 checkout supports `VND` only. `amountMinor` means an integer count of
  đồng because VND has zero fractional digits. Floating-point arithmetic is
  forbidden.
- New financial columns use PostgreSQL 64-bit integers. Every new commerce,
  payment, refund, membership, analytics, and affiliate monetary DTO always
  emits `amountMinor` as a base-10 string. Existing course DTOs retain their
  backward-compatible JSON number, must remain non-negative safe integers, and
  are converted to 64-bit integers at the Commerce boundary. Prisma `BigInt`
  values are never serialized directly.
- Every monetary value carries `currency`, and an operation rejects mixed
  currencies. Negative amounts are forbidden except as a typed direction in an
  append-only adjustment ledger.
- The server re-reads current catalog price and all eligible benefits when it
  prices a cart. Client-supplied prices, totals, discount amounts, membership
  terms, or commission amounts are never authoritative.
- The pricing result records a `pricingPolicyVersion`. The initial policy
  permits at most one monetary promotion per line. A full course-access award
  wins over a monetary promotion. TMI points are never tender; a TMI reward may
  create a voucher or entitlement only through its declared reward kind.
- Rounding is integer-only. Percentage discounts round down to a whole đồng,
  are capped at the configured maximum and line price, and never produce a
  negative total. Shared order discounts are allocated with a deterministic
  largest-remainder rule ordered by stable line ID. Order total equals the sum
  of line totals after allocated discounts.

A cart is mutable and disposable. Creating an order re-prices the cart and
persists immutable snapshots containing:

- product type, stable product ID, and seller/beneficiary identity at sale time;
- display title, quantity, unit list price, currency, and line subtotal;
- each applied benefit's type, source ID, policy/version, allocated discount,
  and reservation ID;
- line total, order subtotal, discount total, and payable total;
- for membership lines, plan ID, immutable plan-version ID, duration, service
  benefits, quotas, included courses, and removed-course grace policy.

Course and membership products always have quantity `1`; a cart has at most one
line for the same product/version. Repeated units cannot imply duplicate grants
or multiplied membership duration.

Later catalog, voucher, scholarship, membership, or course changes never alter
an existing order snapshot. Corrections are new append-only adjustment/refund
records, not edits to financial history.

### 3. Promotion reservation and compatibility

Preview remains read-only and consumes no quota. Order creation reserves a
voucher or monetary scholarship benefit transactionally with the order. A
reservation has one of `reserved`, `consumed`, `released`, or `expired` and is
unique for its benefit source, consumable instance, and order. Voucher global
and per-user limits count active reservations plus consumed redemptions. A
one-time scholarship award can have at most one active or consumed reservation
across all orders and lines. Confirmed settlement consumes a reservation;
order cancellation or expiry releases it exactly once under the same locked or
serializable quota boundary.

Voucher availability has one authority: under a voucher row lock, the service
derives consumed usage from immutable `VoucherRedemption` rows and pending
usage from active Commerce reservations. `Voucher.redeemedCount` remains a
transactionally maintained projection for compatibility and is never sufficient
by itself for an eligibility decision. At Commerce cutover, the existing direct
voucher-redemption command must call this same reservation/consumption boundary
or be disabled; paid checkout cannot be enabled while a legacy mutation path
can consume quota without seeing active reservations.

Existing voucher redemptions and scholarship awards remain immutable history.
They are not re-consumed or automatically attached to a new order. A migration
may add an explicit order/reservation link, but it must preserve old identifiers
and counts and prove that the same benefit cannot be counted by both legacy and
commerce paths.

Course-access scholarship awards and course-entitlement TMI rewards bypass
payment but still create an access grant through the same idempotent
fulfillment boundary. Monetary scholarship awards become order discount
sources; they do not mark an order paid.

When the TMI domain refunds or revokes a course-entitlement redemption, it must
revoke that redemption's `TMI_REWARD` access grant through the Access interface
inside the same transaction and idempotency boundary as its existing TMI ledger
and `TmiEntitlement` transition. Other independent grants remain unaffected.

### 4. Order, payment, fulfillment, and refund state machines

Order acceptance, provider payment, fulfillment, and refund progress are
orthogonal fields so one transition cannot erase another.

```text
Order status
PENDING_PAYMENT -> CONFIRMED
       +---------> CANCELLED
       +---------> EXPIRED

Fulfillment status
NOT_STARTED -> PROCESSING -> FULFILLED
                    +------> FAILED -> PROCESSING

Derived refund status
NONE -> PARTIAL -> FULL
NONE -----------> FULL
```

- `CONFIRMED` means the first valid settlement matched the immutable order or
  an internal zero-payable settlement was recorded.
- `FULFILLED` means every required effect committed exactly once.
- `FAILED` is retryable and never rolls payment back to pending. Confirmed or
  failed-fulfillment orders remain eligible for a manual refund.
- A confirmed order cannot become `CANCELLED` or `EXPIRED`.

```text
Payment settlement status
CREATED -> PENDING -> PAID
   |          |
   +-> FAILED +-> FAILED
              +-> CANCELLED
              +-> EXPIRED

CANCELLED or EXPIRED -> LATE_PAID
```

At most one payment attempt per order may be open, and only the first matched
settlement confirms the order. A second valid settlement is recorded as a
duplicate collection, creates `RECONCILIATION_REQUIRED`, never fulfills twice,
and requires an operator-recorded external refund.

Transitions are monotonic. Duplicate provider events reproduce the existing
result. A valid settlement received after local cancellation or expiry moves
the order to `LATE_PAYMENT_REVIEW` and the attempt to `LATE_PAID`; it is never
ignored. An authorized operator either accepts it, atomically re-reserves every
released consumable benefit, and moves the order to `CONFIRMED`, or records the
external refund and moves the order to `LATE_PAYMENT_REFUNDED`. If benefits
cannot be re-reserved, refund is mandatory. Only `CONFIRMED` authorizes
fulfillment and revenue recognition; both resolution states close the
reconciliation item. Local cancellation/expiry releases reservations only
after a provider status check or cancellation attempt is recorded. No later
catalog or promotion change alters the amount received. A browser redirect is
presentation only and cannot transition an order or payment to paid.

When the authoritative payable total is zero, Commerce records a unique
`NO_PAYMENT_REQUIRED` internal settlement and confirms the order without
creating a PayOS attempt. Only the server pricing result can authorize this
path.

Refunds are manual in the initial release. A refund record progresses from
`REQUESTED` to `RECORDED` or `REJECTED`. `RECORDED` means an authorized operator
has supplied a unique external reference and confirmed the external action; it
does not claim EduAI initiated a payout. Partial and total refunded amounts are
derived from append-only refund records and cannot exceed settled amount.
Refund status is a projection from `RECORDED` rows; the immutable `PAID`
settlement state is not rewritten into a second refund authority. A refund
request contains explicit immutable `(orderLineId, amountMinor)` allocations
whose sum equals the requested amount. Each allocation is bounded by that
line's settled total net of prior recorded refunds. Commerce never guesses
which mixed-cart line an operator intended to refund.

A fully refunded course line revokes only its `COURSE_PURCHASE` grant. A fully
refunded membership line cancels only the term created by that line. Partial
refunds preserve access in the initial policy. Refund effects never delete
enrollment, progress, attempts, submissions, attendance, or certificates, and
an independent scholarship, TMI, administrator, membership, free, or legacy
grant may continue to authorize the same course. Refund recording and its grant
or membership effect commit atomically; an unfulfilled order has no access
effect to revoke.

### 5. Idempotency, concurrency, and transaction boundaries

- Every learner command that may create an order, payment attempt, reservation,
  refund request, membership, or grant requires an `Idempotency-Key` with a
  bounded format. Uniqueness is scoped to authenticated actor and operation.
- The first request stores a canonical request hash. Reuse with the same hash
  returns the original result; reuse with different input returns `409`.
- Raw client idempotency keys are never copied into audit, logs, monitoring, or
  evidence. Those surfaces use a server-generated operation ID or keyed hash.
  This privacy rule supersedes ADR-002's requirement to store the raw voucher
  idempotency key in audit metadata. Existing historical audit records are not
  rewritten; the legacy voucher path must emit only the safe operation identity
  when Commerce cutover occurs.
- Provider request identity is derived from the stable local payment attempt,
  never a browser-generated order reference.
- The webhook route enforces JSON content type and a bounded body size, parses
  the envelope without trusting it, validates its shape, then verifies the
  signature using PayOS's documented HMAC-SHA256 canonicalization of the parsed
  `data` fields (or the official SDK's equivalent verifier) before normalizing
  or acting on any field. Provider event identity and settlement reference are
  unique. The event, state transition, audit event, and fulfillment attempt are
  committed under row locks or serializable retry where invariants require it.
- Fulfillment effects are unique by `(orderLineId, effectType, sourceId)`.
  Retrying a confirmed order returns existing memberships/grants rather than
  creating duplicates.
- External network calls do not run inside a database transaction. Local state
  is committed before the call; timeout or ambiguous provider results enter
  reconciliation using the stable provider request identity.

Service quota consumption locks the owning term/grant or uses an atomic
conditional write that proves `consumed + requested <= purchasedQuota` before
appending usage. Different idempotency keys cannot over-consume the final unit.

The provider-neutral boundary exposes only a minimal payment specification:

```text
createPaymentRequest(paymentAttemptIdentity, localOrderReference, amountMinor,
                     currency, boundedDescription, returnUrls)
cancelPaymentRequest(providerPaymentIdentity)
getPaymentStatus(providerPaymentIdentity)
verifyAndNormalizeWebhook(rawBody, signatureHeaders)
```

Provider responses are untrusted and schema-validated. PayOS is the only
initial implementation. Credentials and signature material come from validated
server environment configuration, never reach the browser, and are excluded
from logs, monitoring, errors, audit metadata, and canonical evidence.

Before payment routes can be enabled, backend bootstrap must allow the bounded
`Idempotency-Key` request header for approved CORS origins. Tests must prove
preflight, header bounds, body-size and schema rejection, official PayOS
signature fixtures, malformed/invalid-signature rejection, and that webhook
payloads/signatures are never logged or retained. Exact raw-body capture is not
a PayOS verification prerequisite. This contract follows PayOS's official
[signature algorithm](https://payos.vn/docs/tich-hop-webhook/kiem-tra-du-lieu-voi-signature/)
and [Node SDK webhook verifier](https://payos.vn/docs/sdks/back-end/node/).

### 6. Membership versions and terms

- A membership plan has a stable identity and lifecycle. Each publish creates
  an immutable version containing display terms, price options, duration,
  discounts, services, quotas, included courses, and grace policy.
- Orders reference the exact plan version. Existing active terms never change
  when an administrator publishes a later version. Renewal uses the latest
  eligible published version and creates a new order snapshot.
- A plan change takes effect at the next term boundary. There is no mid-term
  proration, credit, automatic recurring charge, or implicit replacement of a
  paid term.
- A membership term is `PENDING`, `ACTIVE`, `EXPIRED`, or `CANCELLED`.
  Settlement plus fulfillment activates it once. Expiry stops membership-only
  service access but never deletes learning history or certificates.
- Removing a course from a later plan version does not rewrite prior versions.
  When the purchased policy permits continuity, the access grant receives its
  snapshotted grace end; administrators cannot shorten an already purchased
  grace term.

Membership purchase, renewal, and plan change serialize on the learner's
membership boundary. A learner has at most one effective active term and one
scheduled successor. Concurrent commands return the same idempotent result or
`409`; they cannot create overlapping independently active terms.

### 7. Central course and service access

Access uses an additive grant model. A course grant records learner, course,
source type, source ID, start, optional end, optional grace end, status, and
revocation reason. Supported sources include `COURSE_PURCHASE`, `MEMBERSHIP`,
`SCHOLARSHIP`, `TMI_REWARD`, `ADMIN`, `FREE_ENROLLMENT`, and
`LEGACY_ENROLLMENT`. Source identity plus target is unique.

The centralized resolver returns an operation-specific allow/deny decision and
safe reason code with this precedence:

1. A deleted user or deleted course denies learner access.
2. Platform administrators and the owning instructor use their existing
   management authorization, separate from learner grants.
3. Non-clear moderation denies learner content access and returns not found.
4. Public preview requires a published, public, moderation-clear course and a
   preview-marked resource.
5. Full learner access requires an active/grace grant or a qualifying legacy
   enrollment. A clear archived course remains available to existing entitled
   learners but cannot accept a new purchase or free enrollment. Private
   visibility does not defeat an explicit grant.

The resolver does not expose another user's grant or source existence. All
lesson, quiz, assignment, classroom, certificate, and course-grounded AI
callers must use the same operation contract; temporary compatibility adapters
must reproduce this precedence.

Migration is additive:

1. Existing `active` or `completed` enrollment for a non-deleted user and
   non-deleted course at the recorded cutover instant remains valid as
   perpetual legacy access. Other or malformed statuses are reported for
   reconciliation and are not granted access automatically.
2. A deterministic backfill creates `LEGACY_ENROLLMENT` grants idempotently
   with the enrollment ID as source identity and the recorded cutover instant.
3. All learning, lesson, quiz, assignment, classroom, certificate, and
   course-grounded AI checks move to the resolver in focused later tasks.
4. Fulfillment creates the access grant, then ensures the existing enrollment
   and initial progress records exist in the same transaction.
5. Purchased, scholarship, TMI, and administrator grants are not revoked by
   membership expiry. No access transition deletes enrollment, progress,
   submissions, attempts, attendance, or earned certificates.

At Commerce cutover, `POST /courses/:id/enroll` permits a new learner enrollment
only when the server-authoritative course price is absent or zero. A priced
course returns a stable `PAYMENT_REQUIRED` error and must use Commerce. Existing
enrollments are grandfathered, but the paid-catalog feature cannot be enabled
until this guard and its concurrency tests are deployed. Checkout rejects a
course already owned through any perpetual grant or qualifying legacy
enrollment with `ALREADY_OWNED` before payment creation.

Service quotas use the same source/version identity but an append-only usage
ledger with an idempotency key. A mutable displayed remaining count is a
projection, not authority.

### 8. Analytics and affiliate boundaries

Analytics reads immutable order, payment, refund, fulfillment, membership,
grant, and usage records through versioned metric definitions. It may maintain
rebuildable projections, but it never writes authoritative financial state.
Revenue is recognized only from matched paid amounts net of recorded refunds;
pending orders, browser returns, TMI units, and unconsumed discounts are not
revenue.

Referral input is untrusted. The affiliate domain validates attribution policy
and snapshots an accepted attribution on the eligible order. It never changes
the order total. Fulfillment produces at most one pending commission effect
from the snapshotted policy and commission base. Approval, reversal, payable
balance, reservation, and manual withdrawal are append-only ledger effects.
Only `RECORDED` refunds reduce revenue and commission. The original commission
base and commission amount are snapshotted by line. For each refund, the target
cumulative reversal is calculated from cumulative line refund allocation; the
new ledger effect is the target minus the amount already reversed. A final full
refund assigns the exact remaining rounding residue so commission conservation
reaches zero. EduAI does not initiate an automatic affiliate payout.

### 9. Audit, privacy, and operations

The domain that owns a mutation owns its audit action and writes it in the same
database transaction. Before provider callbacks are enabled, the audit schema
adds `actorKind` (`USER`, `SYSTEM`, or `PROVIDER`) and makes `actorId` nullable
only for non-user actors. Existing records default to `USER`; user mutations
still require the current user foreign key. Audit API DTOs add `actorKind` and
make the actor summary nullable. Fake user accounts are forbidden.
Administrator refunds and adjustments retain the authenticated actor. Audit
metadata contains stable local identities, state transition, minor-unit
amounts, currency, safe reason codes, and a server-safe operation identity only
where operationally necessary.

Raw webhook bodies, signatures, checkout URLs, QR payloads, credentials,
tokens, cookies, personal payment data, and provider error bodies are never
stored in audit metadata or evidence. Operational records retain only the
minimum provider identifiers required for reconciliation and follow an approved
retention policy. Until a legal/operations retention decision is approved,
Phase 3 performs no automatic deletion of order, settlement, refund,
fulfillment, commission, withdrawal, or audit records; raw provider payloads
are never retained.

Financial transactions write a minimal idempotent notification outbox event in
the same transaction. After commit, a retryable dispatcher invokes the existing
notification service with a unique event key. Notification or email failure
never rolls back money, fulfillment, or access, and publishing cannot occur
before the owning transaction commits. Notifications contain no raw provider
data, payment link/QR payload, buyer identity beyond the recipient's own data,
or secret material.

Every protected endpoint enforces authentication, current role, ownership, DTO
validation, bounded pagination, and safe projections. Payment creation,
webhooks, status polling, refunds, exports, and affiliate endpoints receive
separate rate limits and monitoring. Errors use stable codes and correlation IDs
without provider or stack details.

## Consequences

- Commerce and access can be added without a microservice or a second identity,
  course, enrollment, audit, or revenue authority.
- Settlement, fulfillment, and access failures remain distinguishable and
  retryable.
- Immutable snapshots and append-only effects increase storage and require
  reconciliation jobs, but make historical prices and financial totals
  reproducible.
- Centralizing access requires a staged migration because direct enrollment
  checks currently exist across many verified modules.
- The default non-stacking promotion rule is intentionally conservative; a
  future additive pricing-policy version may permit explicit combinations.
- Plan changes at term boundaries avoid proration but do not provide instant
  mid-term upgrades in the initial release.

## Alternatives considered

### Mark payment successful from the browser redirect

Rejected. Browser state is forgeable and cannot prove settlement.

### Let each product module own its own checkout and payment fields

Rejected. Duplicate state machines make idempotency, refunds, analytics, and
affiliate reconciliation inconsistent.

### Replace enrollment immediately with access grants

Rejected. Verified learning domains depend on enrollment. An additive resolver
and backfill preserve behavior while callers migrate incrementally.

### Treat TMI as currency or a stored-value wallet

Rejected. TMI is a points ledger with no cash value and must not become a
payment rail.

### Add a separate cash balance or stored-value wallet

Rejected. Phase 3 stores orders, provider settlements, refunds, and affiliate
ledger effects only. It does not create a user cash balance, wallet transfer,
cash conversion, card storage, installment or split settlement, automatic
recurring billing, automatic refund, or automatic affiliate payout.

### Mutate old orders or membership terms when catalog policy changes

Rejected. This destroys purchased-term evidence and makes reconciliation
non-reproducible.

### Call PayOS inside the order database transaction

Rejected. Network ambiguity would hold locks and still could not atomically
commit across EduAI and the provider.

## Migration and rollback

No schema or runtime change is authorized by this ADR alone. Later tasks use
additive Prisma migrations, explicit constraints, deterministic backfills, and
independent provider safety controls. Deployment enables provider calls and
webhook processing only after configuration, migration, signature,
idempotency, failure-path, and reconciliation checks pass.

Rollback does not disable permanent Commerce through an environment flag. A
code rollback or approved traffic-routing containment may stop affected new
writes, while provider entry points and workers remain independently
controllable. Rollback preserves orders, payment events, refunds, memberships,
grants, audit history, learning history, and old enrollment behavior, then
reconciles any in-flight attempts. It never deletes or rewrites settled
financial effects.

## Verification and acceptance

This proposal must be reviewed against the live course, enrollment, voucher,
scholarship, TMI, audit, notification, authorization, and frontend price
contracts. AI-DOS conformance and projection must pass. A human must explicitly
accept this ADR before `SPR23-001` becomes `DONE` or any `SPR23-002` schema work
begins.
