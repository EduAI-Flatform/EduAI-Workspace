# Sprint 23 - Commerce Foundation

## Goal

Establish stable commerce contracts, persistence, cart pricing, order creation,
and administrator operations before connecting external settlement.

ADR-005 Amendment 1 makes Commerce a permanent runtime capability. It retains
the production idempotency secret and all authorization, concurrency,
reconciliation, audit, and least-privilege controls. PayOS/payment activation
remains independent, and `SPR23-005` still requires its bounded production UAT.

## Tasks

1. `SPR23-001` - Define commerce, membership, payment, and access contracts.
2. `SPR23-002` - Add product, cart, order, and payment persistence.
3. `SPR23-003` - Deliver learner cart, pricing, and pending-order creation.
4. `SPR23-004` - Deliver administrator commerce catalog and order operations.
5. `SPR23-005` - Verify security, concurrency, pricing, and regression.
