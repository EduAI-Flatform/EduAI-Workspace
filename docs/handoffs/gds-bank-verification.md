# GDS bank selection, beneficiary verification and payout QR

Task `PAYW-03-002`; source starts on persistent `dev`, then review/CI.

## Integration gate — 2026-11-04

Owner confirmed **no VietQR account/API lookup entitlement**. No real lookup,
provider UAT, price or commercial supported-bank acceptance is claimed. Provider
and mandatory verification remain OFF. Current live limits stay
**10,000–10,000,000 VND**, fee zero. No fabricated success or payOS credentials.

Official catalogue: <https://api.vietqr.io/v2/banks>, 76 banks observed.
<https://casso.vn/api-msb/> documents separate VietQR `POST /v2/lookup` using
`x-client-id`/`x-api-key`. Obtain current written terms, fees, support and test
access before activation; published endpoint documentation is not entitlement.

## Behavior and contracts

- Complete bank catalogue filters locally by accent/case/space-insensitive full
  name, short name and code. Safe same-domain PNG proxy; 24-hour cache and full
  bundled last-good fallback. No per-keystroke upstream API.
- Policy OFF preserves manual name entry, including unsupported lookup banks.
  Policy ON requires a successful 600-ms-debounced lookup; returned name is
  readonly. Changes invalidate it immediately; stale responses cannot restore it.
- Immutable proof binds owner/bank/account for 15 minutes. Create uses backend
  proof name, never client name. Same idempotency key replays an existing request
  even after expiry/admission changes. Snapshot and proof cannot be edited.
- Transfer claims require a new normalized-name match outside financial locks
  when policy ON or request already verified. SQL guards enforce fresh evidence.
- QR is locally rendered from saved request/proof facts only for its claiming
  admin in PROCESSING. It contains BIN, account, amount and stable reference.
  State/expiry rechecked after rendering. Scanning QR is not payment evidence.
- New verified accounts support 6–19 digits, matching the existing QR encoder;
  leading zeros preserved. Longer legacy accounts remain readable/recoverable
  but require rejection/recreation before mandatory verified processing.
- Provider outages never release held money or block existing PROCESSING
  paid/failed reconciliation. Beneficiary lookup does not establish user KYC.

User API: `GET /wallet/gds/banks`, `POST /wallet/gds/account-verifications`;
withdrawal create accepts `verificationId`, required by admin policy. Admin API:
catalogue, `POST /admin/wallet/gds/withdrawals/:id/verify-account` and
`GET /admin/wallet/gds/withdrawals/:id/qr`. Sensitive responses use no-store.
Account endpoints enforce roles/ownership/claim/rate limits; bank details are
redacted from database errors/logs. Public logo route serves catalogue images only.

Migration `20261104120000_add_gds_account_verifications` adds proof table,
optional snapshot fields and default-false policy; preserves old rows/journal.
Apply schema before dependent code. Runtime gets SELECT/INSERT proof rights and
only the policy UPDATE column; immutable proof reads need no write/row-lock grant.
Production migration allowlist/checksum is intentionally unchanged.

Config defaults OFF: `GDS_BANK_VERIFICATION_ENABLED=false`; separate
`GDS_VIETQR_CLIENT_ID`, `GDS_VIETQR_API_KEY`, `GDS_VIETQR_SUPPORTED_BINS`.
Do not put secrets or customer bank data in chat/source/evidence.

## Design and verification

Stitch project `15052930607971141891`: user `cb9b9a8e6f964e7b93c161ff9cc4c5ca`,
admin `002e8e2beb834cd68aa8aafe59237e18`. Follow existing blue/navy/white design;
rejected generated KYC, automatic timing and PROCESSING-unclaim claims.

Checks include provider/catalogue fixtures, owner/purpose/expiry/replay binding,
forged name, failure without hold, exact QR TLV facts and exclusive access;
PGlite Unicode/NFD and before-migration legacy-row preservation. Real PostgreSQL
CI replays 65 baseline migrations plus 14 additions and exercises Prisma races
under restricted runtime. Record actual CI/browser outcomes before claiming DONE.

## Release and recovery

New production schema approval is separate from the previously approved
withdrawal migration. Do not merge automatic-deploy main before this gate.
After approval: reviewed schema and grants, code with verification OFF, exact
main/production checks. Only enable mandatory policy after provider rights,
terms/fees, supported BINs and UAT pass; otherwise live withdrawals would stop.
Disable admission separately from recovery processing. Keep additive schema and
immutable history on rollback. No automatic bank transfer is introduced.

## Observed dev evidence

- Backend `e40dca914eaac2c7fb63bf7c1e65c4f6733d0a80`: migration replay
  [41824208648](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/41824208648)
  PASS, including actual restricted-role Prisma/PostgreSQL verified create,
  proof reuse race, competing admin claims, exclusive QR and provider-outage
  PAID recovery. No external lookup or real money is used by that CI fixture.
- Local migration invariants 24 PASS; preexisting withdrawal invariants 22 PASS;
  restricted runtime grant regressions 5 PASS. Provider/QR/domain/withdrawal/privacy
  suites and backend build PASS. Endpoint audit: 309 routes, zero implicit access.
- Final backend dev `2e1e2bc67970bbe36da7ff0af46167023f6a3bb2`:
  [CI41824623549](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/41824623549)
  and [replay41824623541](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/41824623541)
  PASS. Draft [PR28](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/28).
- Reviewed new migration SHA256:
  `BA7DB8420F48CAB21F67BC0D2B11965E4B647B5A8C684DD03F2B9FCE3DE29327`.
  Main merge/deployment is not claimed.
- Frontend dev `c5c44cf`: local 505 tests in 111 files, typecheck/build and
  14 Chromium scenarios across 320/375/390/412/768/1024/1440 px PASS. Includes
  user verified create/cancel, admin verify/claim/QR/PAID, first-Escape behavior,
  expired-proof refresh, safe retry and settings PATCH without read-only fields.
  No horizontal overflow or runtime errors observed. Audit: zero high/critical,
  five existing moderate issues. No lint script exists. Chrome DevTools connection
  timed out; actual browser evidence came from Chromium Playwright/screenshots.
  Draft [frontend PR28](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/pull/28);
  [frontend dev CI41825409163](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/41825409163)
  PASS for `c5c44cf70b13ec1c893550e1110299742513044d`.
- Workspace [CI41825638347](https://github.com/EduAI-Flatform/EduAI-Workspace/actions/runs/41825638347)
  PASS for `bf47267e0ff2218253fc9010d2628a640097f888`; local conformance,
  record schemas and layout checks PASS. Draft [workspace PR27](https://github.com/EduAI-Flatform/EduAI-Workspace/pull/27).

Source/dev verification is ready for review; overall task remains WAITING_MANUAL on
new production schema authorization and provider rights/UAT. No main merge,
post-merge check or live integration is claimed. All three `dev` branches are
intentional persistent integration branches; no temporary branch was merged.
