# EduAI Dependency Graph

## Independent execution lanes

### AI-DOS Phase 3 lane

`SPRINT:23 → SPRINT:24 → SPRINT:25 → SPRINT:26 → SPRINT:27 → SPRINT:28`

This lane remains governed by `.ai-dos/records/*`. Current payment/reconciliation release gate is `SPR25-007`. Admin UI work must not rewrite its financial truth.

### Admin UI lane

```text
ADM-00 Baseline & Inventory
  ↓
ADM-01 Design System & Shell
  ↓
ADM-02 Shared Admin Component Foundation
  ↓
ADM-03 Governance & Platform Operations
  ↓
ADM-04 Commerce & Benefits Operations
  ↓
ADM-05 Career & Mentor Operations
  ↓
ADM-06 Mobile, Tablet & Accessibility Hardening
  ↓
ADM-07 Runtime UAT & Visual Acceptance
```

## Cross-lane constraints

- ADM-04 may redesign payment/commerce presentation, but it may not alter payment-provider verification, reconciliation, settlement, fulfillment, refund or financial authorization semantics without a separately authorized payment task.
- ADM-07 production/runtime UAT must respect all active AI-DOS payment hard stops.
- Admin UI work may proceed while `SPR25-007` is unresolved only when changes are UI/UX-safe and do not require a provider activation or real financial mutation.
- Any discovered functional/payment defect outside Admin UI scope must be recorded as a blocker or separate task; do not hide it inside a visual refactor.

### Payment & Wallet lane (owner started PAYW-00)

```text
PAYW-00 Architecture & risk audit
  ↓
PAYW-01 Bank VietQR with manual reconciliation
  ↓
PAYW-02 Versioned revenue allocation
  ↓
PAYW-03 Seller earnings and manual payout

PAYW-04 Buyer wallet sandbox → PAYW-05 Licensed partner/live UAT
PAYW-06 Optional bank APIs / automated payout (separate gate)
```

PAYW-04 may be designed after architecture audit while PAYW-01–03 proceed,
but real-money wallet activity is prohibited until PAYW-05's legal/provider
and owner-approval gates pass. No new PAYW phase starts without owner approval.
PAYW does not supersede TMI points, Phase 3 Analytics/Affiliate or ADM-04 UI.
