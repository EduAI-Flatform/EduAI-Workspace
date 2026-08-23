# EduAI Phase 3 Task Index

Phase 3 turns the verified EduAI 2.0 learning platform into a commerce-capable
product. Execution starts after Sprint 22 and remains dependency ordered.

## Product decisions

- EduAI does not operate a stored-value wallet in the Phase 3 MVP.
- Learners pay for course orders or memberships through PayOS VietQR.
- Only a verified, idempotent PayOS webhook may mark an order paid.
- Membership plans, durations, prices, discounts, services, quotas, included
  courses, and removed-course grace periods are administered data, not
  hard-coded tier behavior.
- Membership plans are versioned. Existing paid terms retain their purchased
  version; renewals use the latest published version.
- A separately purchased course is perpetual. Membership access expires, but
  learning progress and earned certificates are retained.
- Automatic recurring billing, stored balance, automated refunds, and
  automated affiliate payouts are outside the initial Phase 3 scope.

## Sprints

| Sprint | Goal | Tasks |
| --- | --- | ---: |
| [Sprint 23](./sprint-23/README.md) | Commerce contracts, cart, orders, and administration | 5 |
| [Sprint 24](./sprint-24/README.md) | Versioned memberships, entitlements, and course access | 7 |
| [Sprint 25](./sprint-25/README.md) | PayOS QR payment, webhook, fulfillment, and reconciliation | 7 |
| [Sprint 26](./sprint-26/README.md) | Revenue, membership, funnel, and usage analytics | 5 |
| [Sprint 27](./sprint-27/README.md) | Affiliate attribution, commission, and withdrawals | 6 |
| [Sprint 28](./sprint-28/README.md) | Phase 3 hardening, UAT, and production release | 4 |

Detailed acceptance criteria and verification contracts are canonical in
`.ai-dos/records/tasks.json`. The human-readable roadmap is
[`20-phase-3-development-roadmap.md`](./20-phase-3-development-roadmap.md).
