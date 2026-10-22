# PAYW-00 — Payment & Wallet Architecture Audit

**Status:** VERIFYING — audit/docs merged, contract CI passed; ADR acceptance, final gate and merged-branch cleanup pending  
**Major-phase owner start:** Authorized 2026-10-22  
**Next phase:** PAYW-01 is not authorized by this start.

## Goal

Establish the exact boundary between (1) bank QR collection, (2) learner
stored-value Ví GDS through a permitted partner, (3) seller earnings/payable
accounting, and (4) existing TMI points. Freeze payment/ledger invariants
before modifying production-affecting code.

## In scope

- Inspect current Backend payment, Commerce, TMI, refund and fulfillment
  contracts, Frontend checkout contract, Workspace AI-DOS/ADR/state.
- Record verified observations, gaps, financial/legal decisions and risk matrix.
- Propose an ADR and provider-neutral data/API boundaries.
- Create an actionable PAYW roadmap and acceptance/test matrix.
- Commit/push/PR, verify applicable documentation/contract gates and record
  exact evidence before marking DONE.

## Out of scope

No bank API credentials, real bank transfers, forced PAID, webhook emulation,
DB schema migration, wallet top-up, payouts, provider activation, UX redesign
or changes to AI-DOS canonical financial records.

## Entry / exit

Entry: the user explicitly requested performing the first phase and placing
its materials into Workspace. Exit: reviewed audit + ADR + approved design
decisions + documentation gates/CI + remote merged SHA. Unknown regulatory,
merchant-of-record or bank-account facts remain decision gates, not assumptions.

## Inputs

- [Program roadmap](../PAYMENT-WALLET-ROADMAP.md)
- [Current source audit](AUDIT.md)
- [Decision register](DECISIONS.md)
- [Proposed ADR](../../docs/decisions/ADR-006-payment-wallet-seller-earnings-boundaries.md)
- [Architecture](../../docs/finance/EDUAI_PAYMENT_WALLET_ARCHITECTURE_ROADMAP.md)
