# PAYW-01 - Minimal design and contract

**2026-10-22.** Sandbox implementation contract prepared before source changes; no legal acceptance or live activation.

## Decision

Keep dedicated bank request/evidence/audit tables and a bank service/controller. Bank transfers cannot fabricate VerifiedPaymentWebhook events. Add bank_transfer to a payment-method union while preserving the PayOS/VNPay gateway union. A future approved Bank Open API/Virtual Account adapter may supply independently verified bank evidence through this boundary.

Snapshot order/request IDs, unique transfer reference, integer VND amount, bank BIN/name/account/beneficiary and expiry. Locally generate VietQR with correct CRC and quiet zone from the immutable snapshot; no external image generation request. Proposed real beneficiary details are documentation only, never defaults or fixtures.

## API contract

- GET /payments/methods returns { methods: [...] } from server-enabled methods; disabled bank method is omitted.
- POST /payments/orders/:id/request optionally accepts { provider }; omitted body preserves current default. Explicit unavailable method fails closed.
- Existing response optionally includes payment.bankTransfer { bankName, bankBin, accountNumber, beneficiaryName, transferContent }, qrCodeDataUrl and server expiry/status. QR must encode the same account, amount and reference snapshot.
- Order request/read/cancel/support actions require ownership or explicitly authorized access. Buyer support notification only requests review; it never sets PAID or fulfills.
- Finance endpoints require explicit reconciliation capability and two distinct active authorized admins. Actual endpoint/DTO/schema names are recorded from implementation evidence.

## States and verified-money boundary

PENDING may become UNDER_REVIEW on support/evidence review. Time expiry yields EXPIRED; safe cancellation yields CANCELLED; mismatch or suspicion yields NEEDS_SUPPORT. Only independently approved, exactly matched statement evidence permits PAID. Expired/cancelled requests cannot be reopened by buyer action, upload, polling or timer. App expiry cannot revoke a bank QR; late funds need an exception case.

A maker records bank/account/transaction identity, bank occurrence time, integer amount/reference and immutable official-statement source plus SHA-256 digest. Two distinct authorized admins independently approve source provenance and every value. Source entry is not approval; the maker may be one approver but cannot supply both approvals. A digest alone cannot authenticate an external bank fact. No screenshot, customer claim, checkbox or unreviewed evidence can cross the verified-settlement boundary.

Unique bank/BIN + receiving account + transaction identity prevents reuse across orders. Unique request/order settlement, conditional transactional writes and idempotency prevent double acceptance. Same-key conflicting payloads fail. Recheck actor permission, order/request state, expiry, source and exact amount/reference/account/time at commit. Under/overpayment, wrong content/account, before-request/late occurrence, suspected evidence and closed orders cannot settle/fulfill automatically.

The dedicated bank domain service commits a canonical payment event/settlement only after both approvals and records bank provenance protected by a dedicated database trigger. It never invokes a VerifiedPaymentWebhook callback. Commit canonical verified settlement before independently idempotent fulfillment; recover failures without erasing evidence or replaying a financial effect. Do not create learner cash balance or seller payable. Preserve gateway webhook verification and TMI.

## Fail-closed rollout

All new flags default off; absolute production refusal overrides flags. Validated synthetic account configuration only. No deployment, production migration, secret change or live collection. Future activation requires PAYW-D01/D08, independent SPR25-007 compliance, reviewed security/migration/UAT evidence and explicit owner authorization; changing the production guard is outside this safe implementation.
