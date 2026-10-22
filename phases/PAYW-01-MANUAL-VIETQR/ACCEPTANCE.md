# PAYW-01 Acceptance

## Safe implementation - observed gates

- [x] Per-order unique reference, immutable snapshot, integer VND, valid VietQR.
- [x] Default-off and absolute production block; unavailable method hidden/rejected.
- [x] Ownership, finance RBAC, two distinct authorized approvers enforced server-side.
- [x] Official source/digest, immutable evidence/audit identity/time and exact field/time match.
- [x] DB transaction/uniqueness/idempotency protect concurrent confirmation and entitlement.
- [x] Screenshots, buyer notification, unreviewed evidence and forged gateway callbacks cannot grant access.
- [x] Under/overpayment, wrong account/content, suspicious/late/closed requests stay support-only.
- [x] Safe cancel/expiry, preserved settlement and idempotent fulfillment recovery.
- [x] Stitch-first checkout/admin states, copy, timer and responsive/a11y browser proof at seven widths.
- [ ] Backend/frontend required and focused checks, final independent review pass.
- [ ] Workspace conformance/layout, PR/CI/main SHAs and merged branch cleanup recorded.
- [x] No live transaction/activation/deploy/production DB/secret change or AI-DOS financial mutation.

## Production gates - OPEN

- [ ] PAYW-D01 actual beneficiary, control/legal receiving authority verified.
- [ ] PAYW-D08 trained authorized operators/source custody and release approval.
- [ ] Independent SPR25-007 canonical gates satisfied.
- [ ] Explicit production/migration/real-money UAT approval and separate release evidence.

Technical delivery can coexist with production BLOCKED_EXTERNAL; never infer PASS production or GO-LIVE.
