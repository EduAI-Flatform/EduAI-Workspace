# ADR-006: Bank QR, Ví GDS and seller earnings boundaries

**Status:** PROPOSED — PAYW-00 design gate, not approved for real money movement  
**Date:** 2026-10-22  
**Scope:** Payment-Wallet program `PAYW`, cross-repository

## Context

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
6. **No retroactive policy mutation.** Snapshot share version, seller,
   item price, discounts and allocation. Reversals/adjustments are new journal
   entries tied to source events. Order-level/seller accounting must reconcile.

## Explicit unresolved gates

- Actual account beneficiary and merchant receiving authority.
- Merchant of record vs collection agent, tax/invoice/affiliate policy.
- Regulatory classification and contract with permitted wallet provider.
- Seller payout hold period, threshold, refund liability and dual approval.
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
