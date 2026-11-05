# GDS wallet overview and product copy

Task PAYW-03-003; approved plan2026-11-05. Persistent dev → tests/review/CI → main
→ exact revision checks → backend then frontend production. Source authorized;
lookup flags, money policies and limits unchanged. No migration, real payout,
revenue backfill or external transfer.

## Contract and data
GET /wallet/gds adds optional paymentHeldMinor, withdrawalHeldMinor,
totalWithdrawnMinor and income. Existing fields unchanged; integer VND strings.
Income:null for non-instructors, selected via trusted server roles. READY contains
totalMinor/recognizedMinor/pendingMinor/reviewPendingMinor; UNAVAILABLE uses null
amounts. Total=recognized+pending net refunds, independent of deposits/payouts.
Legacy review is separate from credited cash.

Wallet/topup evidence/holds/totals use RepeatableRead, bounded first-visit retry.
PostgreSQL savepoint isolates income errors. Owner-scoped lifetime sums are
independent of recent20rows. Financial writes unchanged.

## UI and copy
See [design](../design/gds-wallet/DESIGN.md). Modal entry, QR then confirmed result.
Withdrawal validation/claim/cancel preserved. Recent filters classify actual money
effects; holds/releases neutral, withdrawals grouped once with full pagination.
Missing metrics never0; silent income retry preserves trusted wallet/drafts.
Application-owned user/admin copy removes provider/process explanations; retain
statuses, limits, expiry, bank facts and proof inputs. Legal/logs/identifiers/
persisted evidence unchanged. Hosted partner checkout is outside app control.

## Verification and release
Local frontend540tests/117files, build and38Chromium wallet flows across seven
widths PASS. Additional25receipt and2embedded checkout flows PASS. Screenshots
375/1440 and30digit320 were inspected. Independent review found income retry,
Radix description, long-amount overflow and copy issues; fixes and regressions
pass. Audit: backend6low/35moderate, frontend runtime2moderate, zero high/critical.

Backend dev d23cd7fd6fe9fa3b364e8ad3d0b98ca2e4760d0a: CI41999575122 and disposable
PostgreSQL replay41999575105 PASS. Replay initially caught a checkout fixture
missing withdrawal SELECT; fixed with SELECT-only and explicit write-denial tests,
without production grant changes. Independent47service/5SQL tests PASS (5th SQL
case verified after independent initial4). Production main PR29 merged as
78e70a2b263aa5b1f9fc3227dcbde919a82dd51a; exact-main83tests/build PASS locally.
Frontend dev be39b36155c8b34c3c5d40ea6dfbf20e80b7ac23 has two focused commits
(copy and wallet). A later in-flight entry guard prevents reopening the amount
modal while QR creation/cancellation is pending, with a failing-then-passing test.
CI41999706412 caught stale return/membership browser assertions after copy cleanup;
updated those assertions to actual pending/confirmed states, preserving hostile
query checks and request counts. All18affected browser cases PASS locally.
Empty-filter follow-up943764231b0d2c0199edc39298d66706ec3c1500 distinguishes no
matching activity from an unused wallet, with a failing-then-passing regression.
Dev CI42001701998 all3jobs PASS. Frontend PR29 merged only after backend production
as4cc188e5787adf49e799404b846900716b919af4; exact-main540tests/build PASS locally.
Main CI42002410486 all3jobs and production42002410504 PASS. VPS echo confirms exact
deployedFrontendSha4cc188e5787adf49e799404b846900716b919af4. Local exact-main
540tests/build and38Chromium scenarios across all seven widths PASS after merge.

Backend main CI42000060072 and replay42000060130 PASS. Production42000060078
PASS: expected-SHA equality gate matches main (echo partially masked by GitHub),
migrationPostflight PASS, financialRowsChanged0, runtimeFinancialGuardPrivilegesBlocked
and runtimeMembershipPrivilegesGranted true. Existing flags preserved; no migration.
Public checks: API health200, protected wallet401, TPB logo200image/png; web wallet
200 with entry index-UOWAXZQ6.js,10linked assets contain all6required new labels
and none of3obsolete copy labels. This verifies serving/source, not a new real-money
customer UAT or agent payout. Persistent dev branches retained intentionally.

Copy inventory: wallet/topup; checkout/method choice/return/fallbacks; receipt
upload/review; admin withdrawal queue/detail; commerce/refund/membership;
certificate verification and configuration-error fallbacks. Internal identifiers
and developer comments were deliberately preserved. Generic service Error.message
paths were reviewed without introducing a global sanitizer that could erase
validation codes used by existing handlers.

Rollback redeploys previous source, no DB rollback/reset. Additive contract permits
frontend rollback independently. Preserve flags/holds/reconciliation. Check API
errors/latency, public assets and deployed SHA. Synthetic fixtures and health checks
do not substitute for authenticated customer financial UAT.
