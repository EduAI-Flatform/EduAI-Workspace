# Sprint 25 - PayOS Payment and Fulfillment

## Goal

Accept VietQR payments through PayOS, verify settlement server-side, fulfill
orders atomically, and recover safely from delayed or duplicate callbacks.

## Tasks

1. `SPR25-001` - Payment-provider boundary and secure PayOS configuration.
2. `SPR25-002` - Payment requests and QR checkout.
3. `SPR25-003` - Signed, idempotent webhook ingestion.
4. `SPR25-004` - Atomic course and membership fulfillment.
5. `SPR25-005` - Reconciliation and payment-review operations.
6. `SPR25-006` - Expiry, cancellation, and manual refund lifecycle.
7. `SPR25-007` - Security, failure recovery, deployment, and production UAT.
