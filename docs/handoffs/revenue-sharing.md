# Revenue sharing implementation

Owner authorized source implementation on 2026-11-03. Scope: configurable retail platform fee, versioned membership revenue sharing, seller participation, automatic rule-based membership assignment, recognition ledger and reporting. Payouts and production activation are excluded.

## Business contract
- Retail fee is global; membership fee belongs to a plan version. Integer basis points, integer VND and deterministic largest-remainder allocation.
- Admin chooses immediate activation (no notice days) or delayed activation (positive integer days). Immutable order snapshots preserve previous terms.
- Seller accepts participation per course, sees matching plans and terms, and may leave for future orders. Later commercial changes notify without requiring acceptance again.
- Matching uses category, level and price; AND within each rule, first matching ordered rule per plan, all matching plans. Positive rule weights with per-course overrides. No capacity cap.
- Membership recognises at the end of each subscription month. Verified payments only; temporary receipt access never creates earnings. Append-only idempotent recognition and refund adjustments, no withdrawable balance.

## Verification targets
Allocation conservation and deterministic rounding; rule precedence; effective-date validation; immutable legacy orders; concurrent participation and checkout; month-end/leap-year recognition; replay/recovery; partial/full refund reversals; role/ownership protection; existing payment regressions.

## Delivery state
Source implementation and local verification finished on feature/revenue-sharing in Backend, Frontend and Workspace. Source changes were committed locally after owner authorization; no production operations were performed. Existing financial release gates remain unchanged; CI, deployment and real multi-client PostgreSQL runtime verification are not claimed.

## Delivered behavior
- Admin /admin/dashboard/revenue-sharing: explicit retail fee, terms, membership rules/weight overrides, before/after dilution preview, immediate or delayed activation and cancellation, reports.
- Seller /instructor/dashboard/revenue-sharing: actual versus prospective plan placement, consent history, opt-out for future orders and own reports.
- Checkout captures immutable fee/course/seller allocations under the shared revenue lock. No legacy backfill. Membership revenue uses actual subscription dates and whole-term monthly budgets while preserving every snapshotted component total.
- Recoverable minute scheduler recognizes verified settlements, retries failures and records append-only adjustments linked to canonical recorded refunds. Temporary receipt access earns nothing. Hard-ineligible/nonconsenting course owners cannot receive new member allocations.
- Managed catalogues have immutable versions; empty managed seller pools are hidden from new sales. Manual legacy membership inclusion/version publication is guarded against bypass of managed policies.

## Verification observed
- Backend targeted regression: 20 suites / 146 tests passed; final Nest build passed; Prisma schema validation passed.
- PostgreSQL/PGlite historical-plus-new migration and privilege/provenance tests: 9 passed. Runtime role regressions previously 29 passed.
- Frontend final complete suite: 103 files / 432 tests passed; final TypeScript/Vite build passed.
- Responsive synthetic browser checks: 14 scenarios at 320,375,390,412,768,1024,1440; final changed seller-state check at390 passed.
- Endpoint security audit: 286 endpoints, zero implicit protection. Workspace contracts/layout passed.

## Activation handoff
Apply the additive migration 20261103000000_revenue_sharing and the repository runtime-grant workflow to the intended environment before deploying this source. No database URL was used for migration tests. Configure explicit fee rates and publish terms before enrolling sellers; there are no example fee defaults. Existing base membership plans remain unchanged until explicitly configured for automatic revenue sharing. Production migration/deployment/payment activation remains a separate authorized operation. Payouts are outside scope.
## Local commit receipt - 2026-11-03
Owner requested commits after source verification. Branch: feature/revenue-sharing in all repositories.
- Backend: c3089f3 (fees, allocation, membership participation and earnings ledger).
- Frontend: 12eb2d0 (admin and seller controls).
- Workspace: this documentation commit records source scope and observed evidence.
No push, merge, database migration or deployment was performed. The dev branch remains unchanged.