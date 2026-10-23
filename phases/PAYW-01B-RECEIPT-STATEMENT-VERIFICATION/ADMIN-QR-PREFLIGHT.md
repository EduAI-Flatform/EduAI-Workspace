# PAYW-01B-QRP — Admin-only VietQR receiving-account preflight

**Date:** 2026-10-23. **Scope:** Backend-only source implementation. **Public production:** NO-GO.

## Operator requirement and where the bank details belong

The receiving bank is a changeable deployment configuration, not an account number hardcoded in a source file. The company-issued receiving account is sensitive. The owner sets the exact values on the Backend VPS through the separately approved production configuration process; no real number or beneficiary account is committed to Git.

| Backend env key | Purpose |
| --- | --- |
| `BANK_TRANSFER_PREVIEW_ENABLED` | Default `false`; only enables the Admin-only QR preview, never checkout |
| `BANK_TRANSFER_RECEIVER_BANK_NAME` | Bank display name |
| `BANK_TRANSFER_RECEIVER_BANK_BIN` | Six-digit VietQR bank identifier |
| `BANK_TRANSFER_RECEIVER_ACCOUNT_NUMBER` | Bank receiving-account number, stored only in deployment config |
| `BANK_TRANSFER_RECEIVER_NAME` | Exact beneficiary name shown by the bank |

Admin API (when configured): `GET /api/v1/admin/commerce/bank-transfers/qr-preview`, requiring an authenticated platform administrator. It responds with QR data, receiver metadata and a **DO NOT TRANSFER** preview-only warning. Without the flag or valid receiver configuration, it fails closed. Rate limiting and endpoint access audit remain in force.

This is a verification surface only. It does **not** create payments, accept statements, upload screenshots, grant entitlements, set `PAID`, or modify a database. The existing public production bank-transfer refusal and independently verified financial settlement controls stay unchanged.

## Verification and release state

- Local Backend full tests (CI-safe env): 156 suites / 1,063 tests passed.
- Focused Admin endpoint + receiver validation tests: 10 passed after replacing sensitive live account test fixtures with synthetic identifiers.
- Backend build PASS; endpoint security audit PASS (Admin-only route protected); no DB migration.
- Backend pull request: [#12](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/12), **merged**; GitHub Actions [Backend CI run #224](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/39897620888) concluded **success**. Merge commit: `7955b25abd737daf875c877d53ef7fa592fe35c6`. The preview document was independently fetched from remote `main` after merge.
- Site UI preview, VPS deployment, live bank scan and real-money transaction are **not yet verified**. Do not upgrade GO-LIVE state based on this source-only evidence.

## Changing account later

Change the receiving bank data only with the owner-approved runtime process; restart/reload to apply config, confirm exact payee in a newly scanned QR, and preserve historical per-order payee snapshots when a live bank payment lane is eventually introduced. Never rewrite an existing order's recipient details or reuse a past order QR after a bank-account rotation.
