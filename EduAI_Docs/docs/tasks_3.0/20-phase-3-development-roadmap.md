# EduAI Phase 3 Development Roadmap

## Objective

Deliver Marketplace, PayOS-based payments, configurable memberships,
advanced business analytics, and affiliate operations without weakening the
verified EduAI learning, authorization, audit, and production boundaries.

## Delivery order

```text
Commerce contracts and orders
    -> Membership catalog and access
    -> PayOS settlement and fulfillment
    -> Advanced analytics
    -> Affiliate
    -> Release hardening and production UAT
```

Analytics follows settlement so financial metrics derive from authoritative
orders and payments. Affiliate follows analytics and settlement so attribution
and commissions never become a second source of truth for revenue.

## Sprint 23 - Commerce Foundation

| Task | Title | Depends on |
| --- | --- | --- |
| SPR23-001 | Define commerce, membership, payment, and access contracts | None |
| SPR23-002 | Add product, cart, order, and payment persistence | SPR23-001 |
| SPR23-003 | Deliver learner cart, server-authoritative pricing, and order creation | SPR23-002 |
| SPR23-004 | Deliver administrator commerce catalog and order operations | SPR23-003 |
| SPR23-005 | Verify commerce boundaries, concurrency, and regression | SPR23-004 |

## Sprint 24 - Membership and Entitlements

| Task | Title | Depends on |
| --- | --- | --- |
| SPR24-001 | Add versioned membership plans and dynamic durations | SPR23-002 |
| SPR24-002 | Add configurable service entitlements and usage quotas | SPR24-001 |
| SPR24-003 | Add included-course mappings and centralized access grants | SPR24-001 |
| SPR24-004 | Deliver membership administration | SPR24-002, SPR24-003 |
| SPR24-005 | Deliver learner membership catalog, purchase, renewal, and plan change | SPR24-004 |
| SPR24-006 | Preserve removed-course learning continuity with configurable grace | SPR24-003, SPR24-005 |
| SPR24-007 | Verify membership lifecycle, authorization, and production UX | SPR24-006 |

## Sprint 25 - PayOS Payment and Fulfillment

| Task | Title | Depends on |
| --- | --- | --- |
| SPR25-001 | Add payment-provider boundary and secure PayOS configuration | SPR23-002 |
| SPR25-002 | Create PayOS payment requests and learner QR checkout | SPR23-003, SPR24-005, SPR25-001 |
| SPR25-003 | Verify and ingest idempotent PayOS webhooks | SPR25-002 |
| SPR25-004 | Fulfill course and membership orders atomically | SPR24-003, SPR25-003 |
| SPR25-005 | Reconcile pending payments and expose payment-review operations | SPR25-004 |
| SPR25-006 | Handle expiry, cancellation, and audited manual refunds | SPR25-005 |
| SPR25-007 | Verify PayOS security, duplicate delivery, failure recovery, and production UAT | SPR25-006 |

## Sprint 26 - Advanced Analytics

| Task | Title | Depends on |
| --- | --- | --- |
| SPR26-001 | Define authoritative commerce analytics metrics and privacy rules | SPR25-007 |
| SPR26-002 | Deliver revenue, order, payment, and refund analytics | SPR26-001 |
| SPR26-003 | Deliver membership MRR, renewal, expiry, and churn analytics | SPR26-002 |
| SPR26-004 | Deliver product, voucher, checkout-funnel, and entitlement-usage analytics | SPR26-002 |
| SPR26-005 | Add exports and verify analytics accuracy, access, and performance | SPR26-003, SPR26-004 |

## Sprint 27 - Affiliate

| Task | Title | Depends on |
| --- | --- | --- |
| SPR27-001 | Define affiliate policy, identities, and immutable financial records | SPR25-007, SPR26-001 |
| SPR27-002 | Attribute eligible orders to referral links and codes | SPR27-001 |
| SPR27-003 | Calculate pending, approved, reversed, and payable commissions | SPR27-002 |
| SPR27-004 | Deliver administrator affiliate and commission operations | SPR27-003 |
| SPR27-005 | Deliver affiliate dashboard and manual withdrawal requests | SPR27-004 |
| SPR27-006 | Verify attribution abuse controls, financial invariants, and UAT | SPR27-005 |

## Sprint 28 - Phase 3 Release

| Task | Title | Depends on |
| --- | --- | --- |
| SPR28-001 | Audit migrations, settlement, access, and accounting invariants | SPR26-005, SPR27-006 |
| SPR28-002 | Run cross-role commerce and membership end-to-end UAT | SPR28-001 |
| SPR28-003 | Verify security, observability, accessibility, and performance | SPR28-002 |
| SPR28-004 | Deploy, verify, and close the Phase 3 release | SPR28-003 |

## Release gates

- No order becomes paid from a browser redirect or unsigned callback.
- PayOS webhooks are signature-verified, idempotent, and reconciled.
- Order line prices, discounts, plan version, duration, and benefits are
  immutable snapshots.
- Course access resolves consistently across lessons, quizzes, assignments,
  classrooms, certificates, and course-grounded AI.
- Membership expiry never deletes progress or earned certificates.
- Financial, analytics, affiliate, and audit records reconcile with the same
  authoritative orders and payments.
- Backend/frontend builds, focused suites, migration checks, cross-role UAT,
  rollback verification, and production verification pass with sanitized
  evidence.

## Not in the initial release

- Stored-value wallet or user cash balance.
- Card storage or automatic recurring billing.
- Installment or split payments.
- Automatic refund payout.
- Automatic affiliate payout.
- Multiple active payment providers.
- Proration for mid-term membership upgrade or downgrade.
