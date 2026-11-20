# Billing, wallet exports and inline MFA verification

Date: 2026-11-20 (Asia/Saigon)
Task: PAYW-03-005
State: implementation locally verified; release gates remain open.

## Behavior

- Billing uses six explicit order states and separate invoice processing filters, inclusive Vietnam calendar dates, URL filters and pagination reset on filter changes.
- Invoice requests keep the existing paid-order eligibility and duplicate handling. Existing request status is exposed in order history. Support resolution is never presented as proof of legal invoice issuance.
- Billing and wallet have clearly separated date filters and Excel actions, feedback for empty/error/loading states and all-filter export rather than current-page export.
- My learning uses one shared classifier for tabs and completion labels: rounded/clamped 100% or completed enrollment is complete; other courses are untouched or in progress.
- MFA keeps the server's five-minute recent-primary-authentication rule. Only MFA_REAUTHENTICATION_REQUIRED opens inline verification; ordinary invalid codes do not cause login loops or token refresh.
- The dialog stages a fresh same-account session in memory and completes required MFA before replacing the current app session. Cancel, late responses, wrong accounts and newer-session races are guarded. Recovery/disable require a fresh action code after the sign-in challenge consumes its own code.
- Google reauthentication uses an isolated Firebase app with in-memory persistence; Facebook/Zalo use popup-only flows. Real-provider interactive UAT was not performed.

## API changes

- GET /commerce/orders/export?status&startDate&endDate
- GET /platform/support/invoice-requests/export?status&startDate&endDate
- GET /wallet/gds/transactions and /wallet/gds/transactions/export accept optional startDate/endDate; cursor scope includes the dates.
- Exports return filename, contentType, dataBase64, exported, scope=filtered_history, complete=true and asOf. Wallet retains its filter property.
- Every export is owner-scoped, private/no-store, rate-limited and capped at 2,000 matching rows. Oversize requests return COMMERCE_ORDER_EXPORT_LIMIT_EXCEEDED, INVOICE_EXPORT_LIMIT_EXCEEDED or GDS_HISTORY_EXPORT_LIMIT_EXCEEDED, never partial files.
- Order filters include late_payment_review and late_payment_refunded. Order responses add invoiceRequest; invoice list responses add orderNumber and structured invoiceDetails.
- No dependencies, schema migration, ledger writes, provider activation or fiscal invoice integration added. Text cells preserve exact money/identifiers and prevent formula execution. Bank account masking remains unchanged.

## Verification

- Frontend: 99 affected tests across 16 files passed; includes billing, wallet, learning, MFA, API refresh, OAuth popup and download validation cases.
- Backend: 37 focused export/history/request tests and 28 MFA/orchestration tests passed; TypeScript and production build passed.
- Frontend production build passed. Existing Vite chunk-size warning remains; no bundle redesign was undertaken.
- Four Playwright scenarios passed, each traversing billing, wallet, learning and inline MFA at 320, 768, 1024 and 1440px. Synthetic account and mocked APIs only. Screenshots inspected; no horizontal overflow or uncaught page errors.
- Real generated order, invoice and wallet XLSX packages opened through ZIP/XML parsing; Vietnamese headers, leading-zero tax codes, large exact amounts and formula-as-text verified.
- Authorization metadata audit passed: 359 endpoints, zero implicit authorization classifications. Final source diff checks passed.

Reproduce browser checks in Frontend:

    npx playwright test --config playwright/billing-wallet-ux.config.ts

## Release handoff

Source committed on feature/billing-wallet-auth-ux: Backend 5a6d565 (MFA) and 4c4db62 (exports); Frontend bd492dc (MFA) and 989a153 (account UX). No push, PR, merge or production deployment was performed. New task remains IN_PROGRESS; existing financial/release gates are preserved. Backend must deploy before frontend so export metadata, date filters and the explicit MFA error contract exist first. Obtain applicable owner release authorization, run required CI/exact-revision checks, then production read-only verification. Follow repository branch strategy and merged temporary-branch cleanup when a merge workflow is authorized.
Workspace validation: layout passed. AI-DOS contract validation reports MISSING_REQUIRED_EVIDENCE only for this new task's DEPLOY and PRODUCTION checks. This is an open release gate, not a local test failure; no fabricated evidence or gate exemption was added.
