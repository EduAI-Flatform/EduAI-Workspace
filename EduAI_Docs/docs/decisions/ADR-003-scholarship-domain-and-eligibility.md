# ADR-003: Scholarship domain and eligibility

- Status: Accepted (design contract only)
- Date: 2026-08-18
- Scope: Sprint 21 / `SPR21-014`

## Context

EduAI needs scholarship support as a distinct entitlement domain. A
scholarship may grant course access, a percentage benefit, or a fixed credit,
but it is not a promo-code redemption and must not be represented as a Voucher
field. The current project has course, identity, enrollment, and audit
boundaries but no scholarship persistence or application transaction.

The design must support administrator-managed campaigns, learner eligibility,
course applicability, time windows, quota, history, and either application or
automatic eligibility. It must also remain safe when multiple learners apply
for the last available award.

## Decision

Scholarships use a campaign policy with:

- lifecycle status: `draft`, `active`, `paused`, `closed`;
- `application` or `automatic` eligibility mode;
- benefit kind: `course_access`, `percentage_discount`, or `fixed_credit`;
- campaign start/end instants, optional quota, and awarded count;
- optional course-ID scope and category-slug scope;
- optional eligible-user scope, with privacy-safe rejection reasons;
- immutable application/award history and audit events.

The executable design contract is
`EduAI-Back-End/prisma/scholarship-contract.ts` and its tests. It validates
campaign lifecycle, time window, quota, duplicate application, user scope,
course/category scope, and benefit bounds without mutating a counter or
granting an entitlement.

## Boundary with Voucher and TMI

Voucher remains a code-based, server-authoritative promotion. Scholarship
eligibility is campaign/entitlement policy and does not require a promo code.
TMI rewards remain a wallet/ledger and redemption domain. A future shared
discount calculator may consume a normalized benefit, but ownership, history,
quota, and audit records remain domain-specific.

## Application and concurrency rules for `SPR21-015`

1. Re-read campaign status, validity, scope, quota, and the learner identity
   inside the application/award transaction.
2. Serialize quota reservation or use an atomic conditional update so awards
   cannot exceed the configured quota.
3. Enforce one application/award boundary per campaign and user; retries must
   return the existing result without granting twice.
4. Persist application, award/benefit, quota increment, and audit history in
   one transaction, or roll back all of them.
5. Never trust client-supplied user IDs, eligibility, quota, benefit values, or
   course ownership.
6. Keep benefit issuance separate from payment capture; no payment success is
   implied by a scholarship award.

Preview/eligibility evaluation is read-only. Only the later application or
automatic-award operation may reserve quota or issue a benefit.

## Proposed implementation boundary

The next implementation task may add additive persistence for campaigns,
eligibility scopes, applications/awards, and audit records, followed by
role-protected admin and learner APIs. Exact route names and benefit-to-course
enrollment behavior must be confirmed in that implementation task.

## Migration and rollback

No schema migration is part of `SPR21-014`. `SPR21-015` must use an additive
migration and preserve existing Voucher, course, enrollment, and TMI
boundaries. Rollback is to disable new scholarship entry points, preserve
auditable history, and avoid rewriting existing course prices or enrollments.

## Verification

The executable contract covers eligible application, inactive/paused campaign,
time-window rejection, quota exhaustion, user and course/category scope,
duplicate application, and invalid benefit values. It intentionally does not
create campaign records or mutate a database.
