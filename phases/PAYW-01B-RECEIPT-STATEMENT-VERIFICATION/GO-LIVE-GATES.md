# PAYW-01B — Evidence intake, operator flow and GO-LIVE gate

**2026-10-23 snapshot — NO-GO.** Owner requests immediate live real-money transfer/screenshot/OCR/full access/review/revoke; no production activation or evidence acceptance is asserted here.

## What the owner has reported
- Company allocated the MB receiving account for EduAI. Owner does not personally possess bank-holder or signing/collection documents; transaction payee name from QR alone is not proof of authority.
- Owner clarified they can view incoming transactions of the company MB account in the banking app only, without statement export, and will operate reconciliation themselves. Admin checking remains required. This reported access does not establish collection authority or independently satisfy live bank-source acceptance. Never request PIN, OTP, passwords, bank sessions or raw statements in chat/Git.
- One available reconciliation/admin person. Current bank code expects two independent operator approvals; the owner asks for one-admin post-review workflow. Any alternative to dual control remains a separate security/legal/finance change proposal.
- No third-party seller contract yet; direct company courses and third-party courses require separate activation tracks. Scope seller/membership independently.

## Bank evidence hierarchy (do not conflate)
1. **Authenticated bank-origin receiving-account feed** (contracted API/signed provider) with stable transaction identity and trusted timestamp: candidate for automatic verified settlement after contract/security review.
2. **Bank-origin statement of incoming corporate MB transactions**, securely exported or independently reviewed from authorized account access: candidate for protected operator reconciliation, with digest, stable reference and audit; bank-app visual review only supports manual verification when source/account and operator are authenticated and permissible.
3. **Student-provided payment screenshot/OCR, exported image, SMS or transfer-app history of payer**: untrusted claim, never proof of credit.

## Admin flows

| Admin action | Required proof / result |
| --- | --- |
| `Xem chứng từ` | View isolated/retained user claim, OCR fields, review flags; must not set `PAID` |
| `Đối chiếu sao kê` | Authorized access to genuine *incoming* account statement/source; match bank/account/transaction ID/time/order reference/exact amount, detect conflict/replay |
| `Xác nhận đã thanh toán` | Enabled only after accepted source evidence and financial approval controls; server validates again, idempotently commits verified settlement then recovers exactly-once entitlement |
| `Thu hồi quyền truy cập` | For a specific unverified early-access entitlement only; reason + actor + evidence, no deletion of payment history, does not revoke a separate genuinely paid entitlement |
| `Phục hồi quyền` / appeal | Authorized corrected-evidence path with immutable chronology and user notice; never backdate settlement |

**Operational caveat:** Deleting access does not undo downloaded course materials, viewed lessons, earned credits, notifications or membership benefits already consumed. This requires advance customer disclosure and capped fraud/loss budgets for any later live experiment.

## Release checklist / stop triggers

1. Determine true incoming bank-source, data provenance/access permission and statement delivery/review cadence.
2. Validate legal bank collection authority, separately decide own course vs third-party seller vs membership, tax/receipts and refunds.
3. Implement and verify feature OFF in production until release; preserve PAYW-01 disabled guard and `SPR25-007`.
4. Prove synthetic forged/replay/collision/OCR false-match/late/underpayment/duplicate/same-actor/rollback tests, statement source authenticity, cross-provider regressions and full CI.
5. Get independent written risk acceptance for any early full entitlement, release operator roster or substitute compensating control, rollback plan, provider source monitoring and bounded first payment.
6. Only after all gates and a further explicitly scoped owner release, production deployment/migration/env/real-money UAT may be performed via approved paths. If source unavailable or ambiguous, stop payment confirmation and entitlement release; never use photo authenticity as substitute.

**Stop immediately** on untrusted/failed source, duplicate bank ID, unusual chargebacks or fraud, inability to reconcile same day, revoked admin role, failed release check, insufficient consent or CI failure. Fail closed; preserve evidence, open support case and rollback by reviewed procedure.
