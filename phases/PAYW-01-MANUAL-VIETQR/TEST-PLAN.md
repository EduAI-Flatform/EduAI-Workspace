# PAYW-01 Test Plan

Synthetic orders, beneficiaries, admins and statement fixtures in isolated environments only.

1. Unit: integer amount, QR payload/CRC, reference uniqueness, method/config gating, state/expiry.
2. Integration: ownership/RBAC, same-admin duplicate approval/revoked permission denial, source/audit immutability, exact amount/reference/account/time, valid independent review and fulfillment recovery.
3. Concurrency: competing creators/reviewers, duplicate bank identity across orders, replay and conflicting idempotency keys, cancel/expiry races and crash recovery. Real isolated DB constraint/transaction tests are required to establish DB race safety; mocks alone are insufficient.
4. Abuse: screenshots/support notification never settle; bank method cannot enter gateway webhook path; late/mismatched/suspected/closed requests never fulfill; production overrides enabled flags; missing config fails closed.
5. Browser: inspect native components/tokens; Stitch review before UI code. Verify 320/375/390/412/768/1024/1440 px, QR fit/quiet zone, long Vietnamese text, copy success/failure, countdown/status, keyboard/focus/labels/touch and overflow.
6. Regression: PayOS/VNPay request/cancel/status/webhook, verified settlement/fulfillment, TMI and unverified-payment access boundaries.
7. Run relevant Backend repository gates; Frontend lint/typecheck/unit/build/audit plus browser checks. Workspace npm run test:contracts and npm run test:workspace. Record actual commands, exits, limitations.
8. Review diff for secrets/AI-DOS mutation; record required PR/main CI, merged remote SHAs and verified merged branch cleanup. Pending evidence never means PASS.
