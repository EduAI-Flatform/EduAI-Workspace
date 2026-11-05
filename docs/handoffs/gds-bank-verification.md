# GDS bank selection, beneficiary verification and payout QR

Task `PAYW-03-002`; source starts on persistent `dev`, then review/CI.

## Admin manual-review update - 2026-11-05

Owner requested a usable bank-app check while lookup entitlement is absent.
Backend dev `fb4c385bb73b52b44ee3041d2cc0d2cde1034ef5`; frontend dev
`4f9d8b60ea585428b061b9f64c356c1f6452c9fa`. The earlier provider-only QR rule
is superseded only when mandatory lookup is OFF and the original request has
no provider verification snapshot. Manual checks are not API verification or KYC.

Operator flow:

1. Compare the saved bank, full account and holder with the bank application's
   beneficiary. Enter the bank-returned name, explicit confirmation and note.
   Protected/rate-limited `POST /admin/wallet/gds/withdrawals/:id/confirm-recipient`
   records immutable `admin_manual` TRANSFER evidence and audit actor/time/reason;
   a matching PENDING request becomes APPROVED atomically. A mismatch changes no
   status or funds. Reject incorrect requests with a reason instead.
2. **Nhận chuyển khoản & mở QR** claims exclusive processing after wallet/debt
   checks. Evidence expires after15minutes and binds the current admin, request,
   bank, account and name. Another admin must perform their own check. QR loads
   automatically only in the claimant's PROCESSING view.
3. Transfer in the bank app, then confirm PAID with transaction reference, actual
   time and reconciliation note. Unknown outcomes remain PROCESSING; FAILED
   requires established non-payment and releases the hold once. Scanning QR is
   never proof of payment. Expired manual evidence can be refreshed by the
   claimant without rewriting the recipient snapshot or changing funds.

Policy ON or provider-verified original requests still require live lookup at
claim and provider TRANSFER evidence. Manual evidence cannot authorize CREATE or
bypass that policy; SQL guards enforce both. Provider outages never release
funds or block terminal reconciliation of an already-processing transfer.

Dashboard: queue first, request-scoped counts, status filters, masked lists and
collapsed limits. Details: one amount/status header, three steps, bank/logo/copy,
manual/provider labels, matched-name feedback, claimant QR and collapsed audit.
Prior owner-name change accepts A-Z/spaces, uppercases/removes Vietnamese accents
and strips digits/symbols/emoji; backend rejects malformed manual input.

Stitch project `15052930607971141891`: reviewed dashboard
`a7fe9cf2c595483490b4fa41d4727c38` and mobile detail
`f70f9e61ba2c4ef7a1a35efa1c458e7e`. Adopt hierarchy/settings/manual check/claim;
reject invented university affiliation, banking schedules, KYC and export rails.

Migration `20261105040000_add_gds_manual_recipient_checks`, SHA256
`6d46022b0b753701a32856ef050081c6dd77541da788cc94013fac54d83b71b4`, applied
once to owner-confirmed TEST DB in `.env` before source rollout. Fingerprints of
all wallet/journal/withdrawal/status-event rows unchanged. TEST remains
10000..10000000 VND, admission/processing ON, mandatory lookup OFF. No production
migration, activation or payout. New migration remains outside production allowlist.

Local checks: frontend528tests/116files, build/typecheck,14Chromiumscenarios at
320/375/390/412/768/1024/1440 PASS; reviewed desktop/mobile screenshots. Manual
mismatch, explicit notes, manual-to-QR without lookup, provider flow and terminal
QR removal covered. Backend114unit tests,48PGlite cases, build, endpoint audit
(310routes/0implicit) and24release/runtime script checks PASS. Real PostgreSQL
baseline-to-head replay and claim/payment races PASS in
[run41964757149](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/41964757149).
Frontend audit: no high/critical,5preexisting moderate. Backend audit FAIL:
2high transitive tooling findings (`picomatch`,`tmp`),8low/35moderate. No package
or lockfile changed; track before main/production release, never claim audit PASS.

Provider onboarding: [My VietQR](https://my.vietqr.io/),
[current lookup docs](https://www.vietqr.io/tra-cuu-stk),
[Casso contact](https://casso.vn/lien-he/). Docs announce migration to CAS Pay Out.
Confirm endpoint/auth, eligibility, supported banks, pricing/quotas and sandbox
acceptance first. Keys alone do not prove entitlement; keep lookup OFF.

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

## TEST schema repair — 2026-11-05

Owner reported Vercel/Render wallet500 and no withdrawal form; after initially
saying Render used another database, owner clarified that the TEST DB is in the
backend `.env`. Operations used that confirmed TEST connection only; no production
environment or `.env` value was changed.

- Read-only reproduction: Prisma settings read failed `P2021`. TEST had exactly
  three pending migrations: runtime projection hardening, withdrawals and account
  verifications. Missing settings/debt schema blocks wallet summary; frontend
  consequently hides the withdrawal panel. Build success had not migrated TEST.
- Applied those three reviewed migrations. Before/after fingerprints of existing
  wallet balances/status and the complete journal were equal. No reset, seed,
  topup, withdrawal request, historical revenue approval or payout was performed.
- TEST settings now version2: minimum10000, maximum10000000, admission/processing
  true, mandatory verification false. Atomic SYSTEM audit records this scoped
  repair/enablement. Provider entitlement remains absent and lookup stays OFF.
- Exact Prisma wallet/settings reads now PASS on the confirmed DB using explicit
  UAT capability configuration: READY_SANDBOX, readable balance and
  withdrawalEnabled=true. Used an existing wallet; no wallet was initialized.
- Public Vercel bundle points at `eduai-back-end.onrender.com`; Render `/health`
  returns200 and unauthenticated wallet/settings return401. Browser access host
  is unavailable, so authenticated Render/Vercel UI confirmation was requested
  from the owner and is not claimed from these checks alone.
- Backend dev `ecce03a` adds safe `DATABASE_SCHEMA_OUTDATED` classification for
  Prisma P2021/P2022 and a schema-first Render runbook. Regression first failed
  before the change; final privacy/wallet/withdrawal30tests and build PASS.
  Backend [CI41950486094](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/41950486094)
  and [PostgreSQL replay41950486120](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/41950486120)
  PASS for `ecce03aa52a7dba04a969d771ff3da432802d947`. Workspace
  [CI41950625754](https://github.com/EduAI-Flatform/EduAI-Workspace/actions/runs/41950625754)
  PASS for the repair receipt. Main/production release gate is unchanged.

## Unified wallet history — 2026-11-05

Owner confirmed that the TEST wallet and withdrawal form are visible after the
schema repair, then requested a cleaner design with withdrawals inside the
existing transaction history rather than a separate withdrawal-history card.

The source change keeps one transaction-history surface with a withdrawal
filter, status/detail access and existing pending-cancellation behavior. A compact
withdrawal action replaces the large duplicate panel. Financial state transitions,
holds, amounts, limits and beneficiary verification gates are unchanged.

Summary entries add optional `withdrawalId` for the three withdrawal journal
kinds only. The query remains wallet-owner scoped and bounded to20entries;
unrelated order references and bank data are not exposed. Frontend groups linked
reserve/release/paid postings under the request, while preserving legacy entries
without a link and linked requests outside the first loaded page. All request
history remains reachable through withdrawal pagination. No schema migration.

Backend dev `b8cb9232b7248d51e2809634a4831c1f2902701b`: wallet/withdrawal25tests
and build PASS. [CI41952146393](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/41952146393)
and [CI41952146243](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/41952146243)
PASS. Stitch refinement `77366d65d6004d85b6f31abac3a4bdae` in the same project
was reviewed: adopt compact action/single feed/mobile row alignment; reject its
invented NAPAS timing, university branding, saved-account and new-navigation
claims. Frontend `85df0c84ec64a6f793b2c4c861e08f48bdcd217b` now replaces the
duplicate panel with a compact action and one shared history component. The feed
shows recent activity with All/Withdrawals filters, paginates all requests, keeps
detail/cancel actions and masks accounts. Pending amounts are held, paid amounts
are debits, cancelled/rejected/failed amounts are neutral with money returned.
Explicit status tones distinguish pending/processing/paid/terminal outcomes.

Review regressions cover stale pending requests superseded by terminal journal
facts, equal-timestamp terminal priority, legacy links, out-of-page request IDs,
failed-page stale-row suppression and cancellation after switching filters.
Ordinary topup/payment history and bank forms remain intact. Final local515tests
in113files, build/typecheck and14Chromiumflows across320/375/390/412/768/1024/1440
PASS. Root reviewed actual375/1440screenshots. Audit gate PASS with zero
high/critical and five preexisting moderate findings; no dependency change.
The unavailable-wallet regression preserves one original balance error, an
unavailable-history message, no invented zero and disabled topup; its existing
browser test and a new unit regression PASS. Final
[frontend CI41954617459](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/41954617459)
passes all3jobs including checkout/PWA browsers. Vercel reports success for the
exact final frontend SHA. Public test `/wallet/gds` returns200 and serves
`index-BTHkMhI2.js` / `GdsWalletPage-DlxjvJd8.js` containing the unified history.
This confirms deployment assets, not a new authenticated customer UAT session.
No new DB migration or production change. Main release remains separately gated.
