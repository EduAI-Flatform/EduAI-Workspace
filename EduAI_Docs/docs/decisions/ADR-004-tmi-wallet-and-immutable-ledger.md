# ADR-004: TMI wallet and immutable ledger

- Status: Accepted (design contract only)
- Date: 2026-08-18
- Scope: Sprint 21 / `SPR21-018`

## Context

EduAI needs a trustworthy TMI reward balance for later course, voucher, and
gift entitlements. A mutable balance integer would hide how points were
earned, spent, expired, refunded, or adjusted. TMI must not become a money
equivalent or a payment rail.

## Decision

TMI uses an append-only ledger. Each entry records:

- kind: `earn`, `redeem`, `refund`, `adjustment`, or `expiry`;
- positive integer amount and adjustment direction where applicable;
- source type and source ID, actor, occurrence timestamp, and optional expiry;
- immutable identity and an audit event in the implementation boundary.

Current, earned, spent, and expired totals are derived from ledger entries, not
stored as an authority. The executable contract is
`EduAI-Back-End/prisma/tmi-ledger-contract.ts` and its tests.

## Transaction and security boundaries

1. Redemption locks the wallet/account boundary, re-derives current balance,
   validates reward eligibility and quota, and writes the redemption plus
   debit ledger entry atomically.
2. Every mutating request has an idempotency key unique to the user and
   operation. Replays return the original result without a second debit.
3. A debit is rejected when current balance is insufficient; no path may
   create a negative balance.
4. Earn/refund/expiry/adjustment entries require an authorized source and
   actor. Learners cannot mint or edit entries; admin adjustments are least
   privilege and auditable.
5. Reward costs are TMI units only and must never be displayed as currency or
   imply cash conversion. Course access, vouchers, and gifts remain separate
   entitlement domains.
6. Ledger entries are never updated or deleted during ordinary rollback.
   Disable future earning/redemption and preserve history instead.

## Wallet summary semantics

- `earned`: earn, refund, and credit adjustments;
- `spent`: redeem, expiry, and debit adjustments;
- `expired`: expiry entries only;
- `current`: `max(0, earned - spent)`.

Expiry policy and ordering of expiring lots belong to the implementation task;
the design contract only establishes the invariant and audit shape.

## Out of scope

No wallet tables, reward catalog, redemption route, payment conversion, cash
withdrawal, or production migration is part of `SPR21-018`. Those boundaries
belong to `SPR21-019` and `SPR21-020` after this design is approved.

## Verification

The contract tests derive all summary totals, handle debit adjustments and
invalid amounts, reject insufficient/replayed/invalid redemptions, and prove a
valid redemption leaves a non-negative TMI-unit balance.
