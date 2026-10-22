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
- [x] Stitch-first checkout plus controlled admin API/runbook review, copy, timer and responsive/a11y browser proof at seven widths.
- [x] Backend/frontend required and focused checks, final independent review pass.
- [x] Source delivery conformance, PR/main CI, remote SHAs and merged source-branch cleanup recorded; own final documentation lifecycle is verified in Workspace PR#8 timeline.
- [x] No live transaction/activation/deploy/production DB/secret change or AI-DOS financial mutation.

## Production gates - OPEN

- [ ] PAYW-D01 inspected documentary proof of account holder, current control and legally authorized collections for every enabled course model, with restricted evidence references and reviewer signoff.
- [ ] PAYW-D08 two distinct named authorized, independently trained reconciliation operators; verified bank-source custody/retention, escalation and explicit release approval.
- [ ] Independent SPR25-007 canonical gates satisfied.
- [ ] PAYW-D03/D04/D10 (as applicable) contracting, tax/invoice, allocation/refund policy and model A/B applicability accepted; unimplemented seller proceeds remain disabled.
- [ ] Reviewed fail-closed real-bank production implementation (current production path intentionally refuses), migration/rollback/security checks, fresh CI and monitoring acceptance.
- [ ] Explicit production/migration/env/real-money UAT approval and separate release evidence specifying pilot scope and safe stop.

Technical delivery can coexist with production BLOCKED_EXTERNAL; never infer PASS production or GO-LIVE.

Owner-reported document availability and dual business model on 2026-10-22 **do not** satisfy the unchecked gates. Two operators remain unassigned. See [GO-LIVE readiness](GO-LIVE-READINESS.md) for evidence intake, dual-control roster and no-go checks.
