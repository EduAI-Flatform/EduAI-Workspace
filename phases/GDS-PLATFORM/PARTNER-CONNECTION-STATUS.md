# Partner catalog connection metadata

Status: scoped configuration released with actual read-only production acceptance. This completes an identified missing configuration field from original plan section 2, not the full GDS goal.

## Contract

Admin can record `unconfigured`, `preparing`, `testing`, `connected` or `suspended` per partner catalog item through the existing partners policy. This status is separate from application review. It does not enable an adapter, API/SSO, account provisioning, application intake or point accrual. Real school integrations still follow the future partner contract.

The field is optional for existing clients and immutable historical JSON. Validation and the Admin form normalize a copy to `unconfigured` when absent. Explicit null, unknown statuses, unsafe URLs and credential fields remain rejected. The existing draft/preview/approval/effective-date/audit workflow applies. Public configuration retains its existing response envelope and exposes only this non-secret metadata. No migration, dependency or financial write is added.

## Observed local verification

- Regression-first backend tests rejected all five newly supported values before implementation; frontend initially rendered a free text input instead of a controlled select.
- After implementation, 97 platform/request Jest tests and Nest build passed. Disposable real PostgreSQL replay `43551627353` passed at the final backend candidate. `GDS_PARTNER_CONNECTION_METADATA_POSTGRES=PASS` was observed in standard and production-classified synthetic cases at 03:27:44Z/03:27:45Z on 2026-11-14, proving actual policy persistence, preview, approval/effectiveness and reload while preserving intake flags and purchased grants.
- Frontend 142 Vitest files / 623 tests, TypeScript and Vite build passed. Two Chromium scenarios passed VI/EN, keyboard selection, local status changes, draft save/reload, unchanged active settings and all seven widths. The Vietnamese 390px screenshot was visually inspected. Existing large-chunk advisory remains; production dependency audits report zero high/critical vulnerabilities (frontend two moderate; backend one low/thirteen moderate).
- Backend candidate `d21f4ba8e2905b2f67db90cc1df9da4f8a64b3dd` is in PR49; frontend candidate `fa6b8c99bc77b1808bf0eab0d39bf7882e313c6a` is in PR43. Frontend final-head CI `43551654843` passed all four jobs and Vercel preview. Release order is backend before frontend. UI rollback can retain the additive backend compatibility for already-saved revisions.

## Terminal release evidence

Backend final-head quality/concurrency `43551627366` passed before PR49 merged as `f531bf558c7cdbce0ff6dbf81f191f072435a2bc`; fetched main exactly matched the tested candidate's tree. Post-merge quality `43552227616`, replay `43552227560` and deployment `43552227630` passed. After deployment, frontend PR43 merged as `a0010f8a6c1a9c7706288b4dbc376cd3c10f89af`, again with an exact tested-tree match. Frontend deployment `43552588678` and main CI `43552588661` passed. Both merged source branches were deleted remotely/locally after ancestry checks, with stale references pruned and remote main revisions verified.

The initial manual health probe used `/api/v1/health` and received 404. Source `src/app.setup.ts` explicitly excludes the health route from the API prefix. Corrected `https://api.eduai.giaoducso.org.vn/health` returned 200 at 2026-11-14T03:38:12Z. This was a probe-path error, not an application health failure.

Actual authenticated Admin acceptance passed at 2026-11-14T03:40:32.327Z: read real configuration, add an unsaved partner row, choose testing, verify VI/EN at seven widths, reload and prove the policy/item count unchanged. One ordinary refresh occurred; there were zero business writes, financial writes or page JavaScript errors. The production 390px English screenshot was visually inspected. Sanitized receipt: `D:/Work/Edu-AI/.codex-artifacts/gds-production/partner-status-readonly.json`; screenshots `partner-status-vi-390.png` and `partner-status-en-390.png` in that directory.

## Acceptance boundary

No school partner exists yet. An Admin-recorded `connected` label does not prove a real provider integration. Production acceptance exercised unsaved local form changes and discarded them, using the actual authenticated Admin API without saving or activating a policy. The overall GDS plan remains VERIFYING; outstanding original requirements require their own completion audit. That audit must also verify public catalog visibility: current `PartnerApplicationPage` renders catalog items without checking `settings.partners.enabled`.
