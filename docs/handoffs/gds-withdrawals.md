# GDS withdrawals — dev implementation

Date: 2026-11-04. State: VERIFYING. Owner requires dev validation before main,
then validation of the exact merged main revision. Production is not activated.

## Contract

- Learner and instructor wallet: `/wallet/gds`; request creation/list/detail/cancel:
  `/wallet/gds/withdrawals`. Creation requires `Idempotency-Key` and decimal-string
  `amountMinor`, `bankCode`, numeric `accountNumber`, `accountHolder`.
- Admin UI: `/admin/dashboard/gds-withdrawals`; APIs under `/admin/wallet/gds`.
  Settings GET/PATCH use `withdrawal-settings`, optimistic `version`,
  `minimumMinor`, `maximumMinor`, `admissionEnabled`, `processingEnabled`.
  Defaults: 50,000–10,000,000 VND, both switches off.
- Admin request actions: `approve`, `reject`, `process`, `pay`, `fail`.
  All require `reason`; pay also requires unique `bankTransactionRef` and
  `transferredAt` between request creation and current time.
- Historical revenue: paginated `revenue-reviews`; approve with `paidMinor`
  and a reason identifying prior-payout evidence. `recognizedMinor` bounds prior
  payouts; `netMinor` includes refund reductions. These may correctly differ.
- Lists mask bank account numbers. Owner/admin details contain the immutable
  destination snapshot. No payment-provider integration or real-money tests.

## Accounting and recovery

Withdrawal, event, revenue projection and effect records extend the existing
append-only GDS journal and nonnegative wallet checks. Revenue uses the same
advisory transaction lock as recognition. Each membership snapshot is reconciled
once per owner sync. The bounded background worker retries source projections;
serialization failures from Prisma's pg adapter receive bounded retries.

Never release PROCESSING holds on timeout, unknown result or browser retry.
The claiming admin confirms paid or definitively failed/not-paid with a reason.
Single-admin operational control does not permit self-processing.

Prior external payouts can exceed current net recognized revenue after refunds;
recording that fact creates debt. Future earnings offset debt before spendable
credit. Held funds are never used to absorb a refund.

## Migration and release

Backend migration: `20261104100000_add_gds_withdrawals`. It is additive, preserves
existing topup/capture validation and starts disabled. Runtime privileges are
column-scoped for settings/review and insert-only for financial events/effects;
projections remain trigger-controlled. First processing activation fixes the
historical revenue cutoff permanently.

The existing production migration allowlist deliberately excludes this new
migration. Backend source requires this schema; do not deploy before separately
authorizing and applying the reviewed migration. Frontend main pushes currently
trigger production CD, so merging main must respect the production approval gate.
Roll back admission by switching it off, retaining schema/history and resolving
pending holds. Do not drop schema with unresolved funds.

### Owner release approval — 2026-11-04

The owner explicitly approved production migration/deployment, then requested
withdrawals enabled for owner testing with minimum **10,000 VND** and maximum
**10,000,000 VND**. This supersedes the earlier pending-release statements in
this checkpoint. No agent-created request or external bank transfer is authorized.

The release runner now pins the exact previously reviewed withdrawal migration.
The manual backend deployment exposes a preserve/enable/disable withdrawal action.
Activation follows migration, runtime grants, build, process restart and readiness;
it checks exact deployed SHA, production classification, non-owner runtime role,
and the applied migration checksum. A SYSTEM audit records the approved limits.
Disable stops new requests and preserves pending processing. First activation
retains historical-earnings review; it does not mark old revenue paid or approved.

Local SSH keys were rejected by the server; use the existing production GitHub
Actions environment and its SSH secrets. Credentials must never be logged.

## Observed verification

- Domain: 11 cases passed; API/service boundaries and retry classifier: 19 passed.
- Revenue worker replay/debt/recovery: four cases passed.
- Synthetic PostgreSQL: 21 new cases passed, including source checks, historical
  debt, first-activation cutoff, transfers and immutable projections.
- Backend full unit suite: 194 suites / 1,617 passed before the additional four
  worker cases; final changed-schema build and 34 targeted cases passed.
- PostgreSQL regression: four suites / 55 cases passed.
- Frontend full suite: 107 files / 490 passed. A CI UTC timestamp-fixture failure
  was reproduced and corrected without changing product validation; all 490 then
  passed under UTC, with the targeted nine also passing in Vietnam time.
- Browser: 14 instructor/admin scenarios passed at 320, 375, 390, 412, 768,
  1024 and 1440 px with synthetic HTTP responses; no console/runtime errors or overflow.
- Backend/frontend builds, endpoint audit (303 endpoints / zero implicit auth),
  15 deployment/runtime gate tests and AI-DOS conformance passed.
- No high/critical production dependency vulnerabilities at audit; pre-existing
  moderate findings were not changed by this feature.
- Backend dev `906051c97e18b3c8f08dc9a3560be9592947d284`: migration replay and
  real multi-session withdrawal races passed in CI run 41794237614. This covers
  competing withdrawals, idempotent replay, checkout reserve competition,
  cancel/approve race, transfer claim/paid race and restricted runtime.
- Backend quality CI run 41794237568 and migration/concurrency run 41794237614
  both passed on `906051c97e18b3c8f08dc9a3560be9592947d284`.
- Frontend CI run 41794496709 passed all three jobs (unit/build, payment/withdrawal
  browser scenarios and PWA browser) on `502aa958941844d49c862de440f370df898786e2`.
- Workspace conformance run 41794698990 passed on the initial documentary commit;
  the final evidence update receives its own conformance check.
- Remote main remains unchanged. Schema-first production release approval and
  subsequent exact-main/post-merge checks are pending; neither is claimed complete.

## Release review references

- Backend: https://github.com/EduAI-Flatform/EduAI-Back-End/pull/27
- Frontend: https://github.com/EduAI-Flatform/EduAI-Front-End-Web/pull/27
- Reviewed migration SHA256:
  `8015F0029726ECFEA645158CF76299FF8BDFEC4E9A4908E3F2FAE6E411CEBF56`.
- `dev` is intentionally persistent as requested by the owner; do not delete it
  as a temporary task branch.

Volume limitation: owner sync deduplicates membership snapshots but still scans
all recognized seller periods inside one transaction. Large-history latency/load
acceptance is not established by this change; no production volume claim is made.
