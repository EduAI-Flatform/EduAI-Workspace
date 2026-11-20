# Billing, wallet exports and inline MFA verification

Date: 2026-11-20 (Asia/Saigon)
Task: PAYW-03-005
State: source main/dev integrations, post-merge CI, automatic deployments and bounded production checks verified.

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

## Integration receipt

The owner requested integration into main and dev after merging newer brand-consistency changes. Frontend includes ce101cd without rewriting history. Existing Workspace dev-only UI/UX documentation stays on dev and will be preserved.

Backend:

- Dev PR68 and main PR69 merged; local and remote main/dev both 9f03f4e16fe23ac92cfaefe7d8f3fe889d60562f.
- PR CI, exact-main/dev CI and migration replays passed. Production workflow44695456125 succeeded; its log confirms the exact deployedBackendSha.
- Public health200/ok; unauthenticated order, invoice and wallet export requests401. No credentials, customer records, financial writes or provider activation used for these checks.
- Merged feature branch removed locally/remotely after ancestry checks; Backend left on clean dev.

Frontend:

- Dev PR63 and main PR64 merged after all4 CI groups and Vercel passed. Main47c1b98b5aca86caaa5200567a6c75aec85c19f5 and dev13b88e0f7af05334af099be15f9dbe0dbc0bd1f9 have identical source trees.
- Main-push deployment44697803240 VPS job136159243795 passed; log confirms exact deployedFrontendSha. Backend deployed first.
- Deployed frontend bundle passed all4 synthetic API-intercepted scenarios at320/768/1024/1440; screenshots inspected. These are production-bundle UI checks, not real customer or financial UAT.
- Initial wallet sandbox failures were obsolete global textbox-count assertions after adding date filters. Corrected assertions preserve the no-inline-topup-input safety check and require visible date filters; all14 affected local cases passed.
- Exact-main CI44697803255 and dev CI44696771192 passed all4 groups (unit/build, PWA, checkout and193GDS scenarios). Feature/promotion checks also passed; no CI bypass or history rewrite.
- Merged feature branch removed locally/remotely after both remote branches and CI were verified. Frontend left on clean dev; local main/dev match their remotes and have identical source trees.

Workspace dev-only UI/UX documentation stays on dev; only this feature/evidence is integrated into main. Existing financial/manual activation gates remain unchanged. Production authorization controls, including productionSourceReleaseAuthorized=false, are unchanged; this receipt records observed existing automation and does not authorize manual deployment or activation.

Workspace contracts and layout passed locally with the observed release evidence; canonical task PAYW-03-005 is closed without changing production authorization or existing financial/manual activation gates.
