# ADR-006: Bank QR, Ví GDS and seller earnings boundaries

## Complete history addendum — 2026-11-05
PAYW-03-004 adds owner-scoped, read-only keyset activity and gross lifetime
deposit/payment totals. A withdrawal lifecycle has one request row, not separate
spending rows for hold/release/paid postings. Requests sort by immutable creation
time; cursors retain microsecond precision and bind owner/filter/version. New
activity is visible on refresh. Existing summary fields remain compatible even
though the UI removes total balance and the redundant history-scroll action.
No schema or financial-write change; see [handoff](../handoffs/gds-wallet-history.md).

## Wallet overview reporting addendum — 2026-11-05

Owner-approved PAYW-03-003 adds read-only lifetime wallet metrics. Payment holds,
pending withdrawal holds, paid withdrawals and instructor net earnings remain
distinct; deposits/payouts never stand in for earned revenue. Existing source
ledgers and refund semantics remain authoritative, including historical reviews.
Use one RepeatableRead snapshot for balance and totals, with a savepoint isolating
optional income failures. Extend the API without migration or new money writes.
Product copy can omit internal/provider explanations while preserving actual
pending/confirmed states and all payment-evidence checks. See
[handoff](../handoffs/gds-wallet-redesign.md) and [design](../design/gds-wallet/DESIGN.md).

**Status:** PROPOSED — PAYW-00 design gate, not approved for real money movement  
**Date:** 2026-10-22  
**Scope:** Payment-Wallet program `PAYW`, cross-repository

## Context

> Bank selection/beneficiary lookup/QR extension: see
> [GDS verification handoff](../handoffs/gds-bank-verification.md). Source work is
> authorized; production lookup remains OFF because the owner has no VietQR
> lookup entitlement. Beneficiary lookup does not establish user identity/KYC.

> Update 2026-11-04: [ADR-007](ADR-007-gds-withdrawals-and-revenue-credit.md)
> supersedes decisions 3 and 6 for the owner-approved source/dev implementation:
> learner/instructor withdrawals, revenue credited to GDS, one manual payout admin.
> Existing production and financial activation gates remain in force.

> Update 2026-11-05: the owner authorized admin bank-app recipient checks while
> lookup remains unavailable. See [the operator flow and evidence](../handoffs/gds-bank-verification.md#admin-manual-review-update---2026-11-05).
> Manual TRANSFER evidence is distinct from API lookup, expires after15minutes,
> and binds the operator before claim/QR. It cannot replace mandatory lookup or
> a provider-verified request. Source/test scope does not authorize production
> schema changes, provider activation, automatic payout or KYC claims.

> Later owner update 2026-11-05 simplifies this to one explicit approval button.
> The backend records an admin attestation against the saved recipient and
> atomically approves/claims the request; no re-entered name or pre-approval note.
> APPROVED/PROCESSING remain immutable internal history, shown as one waiting-for-
> transfer state. Final bank payment evidence and exclusive operator checks stay
> required. See the latest [simplified flow](../handoffs/gds-bank-verification.md#simplified-approval-update---2026-11-05).

EduAI has an authoritative Commerce payment/settlement path with PayOS and
VNPay, a separate TMI **points** ledger, and seller identity on order lines.
The owner requests temporary MB VietQR collection and both a learner Ví GDS
and seller revenue/payout balances. Existing AI-DOS Phase 3 explicitly excluded
stored-value money and split settlement; this is a new controlled program.

## Proposed decision

1. **Bank transfer is its own instrument.** Create `bank_transfer` provider or
   instrument adapter with per-order reference, exact amount, receiving-account
   evidence, stale/late transfer reconciliation and manual review until
   authorized bank API facts exist. No PayOS webhook masquerading.
2. **Learner Ví GDS is partner-governed stored value.** A permitted/appropriately
   licensed wallet/payment provider is authoritative for actual funds, KYC,
   funding, reserve/debit/refund and externally confirmed outcomes. EduAI
   stores an idempotent projection and cannot mint withdrawable cash. Live
   functionality is off until the legal/partner gate passes.
3. **Seller earnings are internal payables, not learner cash wallets.**
   Versioned per-line allocation follows matched settlements; an append-only,
   balanced journal tracks pending/available/held/paid/reversed amounts.
   Withdrawals are requests for an external bank payout, first manual with
   dual control. No transfer of money between internal user balances.
4. **TMI remains a non-cash loyalty ledger.** It is not funded, redeemed or
   paid out in VND, and is not reused as a wallet payment instrument.
5. **Keep ADR-004 verified financial/fulfillment separation.** Allocation and
   payout journal effects are independently idempotent and recoverable;
   downstream failure cannot erase a verified provider/bank settlement.
6. **No learner cash-out on demand.** The owner confirmed on 2026-10-22 that unused Ví GDS balance cannot be withdrawn at will. Refunds are a distinct, policy-controlled process, with eligibility, mandatory legal exceptions, route, timing and partner mechanics still requiring approval. This business preference does not resolve the regulatory classification of real-money prepaid balances.
7. **No retroactive policy mutation.** Snapshot share version, seller,
   item price, discounts and allocation. Reversals/adjustments are new journal
   entries tied to source events. Order-level/seller accounting must reconcile.

## Explicit unresolved gates

- Actual account beneficiary and merchant receiving authority.
- Merchant of record vs collection agent, tax/invoice/affiliate policy.
- Regulatory classification and contract with permitted wallet provider.
- Seller payout hold period, threshold, refund liability and dual approval.
- Learner Ví GDS refund policy, statutory exceptions and approved refund rails; no self-service discretionary balance withdrawal.
- Production provider switch and real-money UAT owner authorization.

The data models and detailed failure matrix are in
`docs/finance/EDUAI_PAYMENT_WALLET_ARCHITECTURE_ROADMAP.md`, `phases/
PAYW-00-PAYMENT-WALLET-ARCHITECTURE-AUDIT/AUDIT.md` and `DECISIONS.md`.

## Rejected shortcuts

- Hardcoding the MB screenshot in the PayOS checkout while retaining PayOS
  signed-webhook semantics.
- Marking an order paid because a user clicked a button, returned from a
  redirect, uploaded a receipt or let the countdown finish.
- Using TMI point balance for cash or letting Admin set real wallet balances.
- Replacing an immutable seller journal with a mutable amount column.
- Approving a seller payout from a browser-only/receipt-only signal.

## Consequences

Safer incremental QR rollout, separate legal wallet gate, traceable seller
liabilities and preservation of historical finance evidence. It requires
new provider/instrument contracts and finance modules rather than a UI-only
patch. This proposal remains non-executable until relevant decisions, code,
tests and release gates are satisfied.
