# PAYW-01B source audit and contracts

## Observed baseline (2026-10-23)

All three working trees were clean; no local unpushed commit. Backend fast-forwarded from e4688c0 to 1db0510b519e30aeb0a73aa039cc291a28181912; Workspace from 0681b3d to 5ee4208ae53a579c421727a1131b1072181db1e1; Frontend already 67335effd9b9b9e849cb468d09d347b0f3b35ff3. Target Backend/Frontend AGENTS.md absent; Workspace policy applies. No .env or private credentials read.

GitHub exact baseline main CI: Backend 39903009521 and 39902788083 success; Frontend 39740995832 success; Workspace 39898030026 success. Public homepage HTTP 200, title EduAI, asset /assets/index-DLMGz8QZ.js. This identifies the observed frontend artifact only; production backend SHA/database/schema/env drift is NOT established. No SSH or production mutation.

BankTransferService already has owner-scoped request/status/support, integer VND QR and unique content, immutable per-order receiver snapshot, serializable/order locking, incoming-statement matching, two distinct allowlisted active Admin approvals and post-commit fulfillment recovery. DB migration pins synthetic receiver; default production guard refuses bank transfer. Admin UI currently has generic payment reconciliation, no buyer receipt queue. Checkout shared by course and membership. TmiLedgerEntry is points; no buyer money wallet ledger was found. Existing storage is unsuitable for private receipts without a dedicated adapter (missing-storage fallback, no image decoding/TTL).

## Separate trust domains

1. Claim upload/OCR: untrusted buyer image, never written into CommerceBankStatementEvidence. Decode/re-encode bounded pixels, private storage, owner/RBAC retrieval, original/canonical hashes, transaction replay checks, retention and bounded retries.
2. Early access: separate claim/access/effect ledger. CourseAccessSourceType needs dedicated source. Order/payment/fulfillment state remains unchanged; existing SQL forbids fulfillment without settlement. Membership unique source line/overlap/consumption rules require explicit conversion tests.
3. Verified settlement: preserve existing statement/evidence/approval routes and SQL guards. Owner handles actual app review; no new bank adapter now. Source attestations/SHA are not an authenticated bank feed.

## Proposed additive API (not implemented by A)

- POST /payments/orders/:orderId/receipts: multipart image only, idempotency key, owner check before decode/storage, 5 MiB and 12 MP maximum, at most 3 submissions/order and rate-limited per actor. Client cannot submit OCR verdict, storage key or entitlement source.
- GET /payments/orders/:orderId/receipts: owned order only, assessment/status and pending reconciliation notice.
- GET /payments/receipts/:receiptId/image: owner or current authorized Admin, private bytes, no-store/nosniff, no public URL.
- GET /admin/commerce/bank-transfers/receipts: paginated buyer/order/amount/product/claim/access queue; no arbitrary object keys.
- POST /admin/commerce/bank-transfers/receipts/:receiptId/revocations: reason + expected version + idempotency key, transactional exact-source revocation, immutable action audit. Restore creates a new generation.
- Existing statements/approvals routes remain the sole bank-settlement authority; no force-paid receipt endpoint. Structured Vietnamese errors; UUID parameters and current backend auth/RBAC conventions.

Receipt fields: bankBin, accountNumber, beneficiaryName, amountMinor (canonical integer VND string), transferContent, occurredAt (explicit offset), optional transactionId. MATCHED_CLAIM and REVIEW_REQUIRED both carry financialProof=false. Exact amount/reference/account/time/name comparison; no fuzzy reference corrections or inferred missing OCR values. OCR failure requires review, never access/payment success.

## Threat model / verification obligations

Forged/recycled/cropped/recompressed images; cross-order/user replay; reused transaction codes; MIME/signature spoofing, decompression bombs and corrupt decoder input; private image enumeration/path traversal; OCR timeout/false positive; repeated and concurrent upload/revoke/settlement; revoked Admin authority; expiry races; verified paid-source survival; membership overlap and consumed-benefit conversion. SQL uniqueness, transactional source checks and real disposable PostgreSQL races required, not mock-only proof.

No public real-user data collection or activation; default OFF, allowlisted synthetic identities and nonproduction runtime. Existing financial migration hashes and approval checks stay byte-exact. No new dependency or endpoint in A.
