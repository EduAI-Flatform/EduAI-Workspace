# Affiliate summary and transaction export contract

Status: implemented in working branches; native CI/release verification pending,2026-11-18. This addresses original
image fields absent from the current three-metric Dashboard and the missing
Withdraw Transactions Excel action. It does not authorize policy activation,
reconciliation, payments or historical data changes.

## Additive summary

Extend authenticated `GET /affiliate/me` with an optional-on-old-clients `summary`
object; retain existing response fields. Owner ID continues to come from JWT.
Existing state aggregates and the new summary must come from one read-only
RepeatableRead snapshot, not independent reads of different ledger states.

```ts
interface AffiliateSummary {
  asOf: string;                       // server ISO timestamp, exclusive upper bound
  timeZone: 'UTC';
  currency: 'VND';
  commissionBasis: 'recorded_signed_accruals';
  lifetimeCommissionMinor: string | null;
  today: { startsAt: string; endsBefore: string; amountMinor: string | null };
  month: { startsAt: string; endsBefore: string; amountMinor: string | null };
  commissionStatus: 'available' | 'unavailable';
  commissionReason: string | null;
  revenue: {
    status: 'available' | 'unavailable';
    amountMinor: string | null;
    basis: 'net_verified_paid_after_recorded_refunds';
    complete: boolean;
    reason: string | null;
  };
  ranking: { status: 'unconfigured'; value: null; reason: 'RANKING_POLICY_NOT_CONFIGURED' };
  subAffiliates: { status: 'disabled'; count: null; reason: 'SUB_AFFILIATE_POLICY_NOT_ENABLED' };
}
```

Commission uses `AffiliateAccrual.deltaMinor` joined through attribution/identity
to the authenticated owner. Sum signed corrections, not absolute values, latest
targets, wallet credits or hold balances. Lifetime/day/month exclude postings at
or after `asOf`; UTC calendar starts are explicit. Negative and genuinely empty
results are valid; unavailable or unsupported-currency source must not become0.
Recorded commission is not described as paid income or withdrawable funds.

The PostgreSQL affiliate accrual constraint already enforces VND; mixed-currency
commission is not an established production defect. Keep legacy accruedAmountMinor
as the string alias of the same valid snapshot lifetime sum. If defensive source
validation cannot supply that truthfully, fail state with a structured unavailable
error rather than fabricate zero or change the legacy type. Revenue can independently
be unavailable. New clients must honor summary status, not invent missing metrics.

Revenue is the current net verified paid value of attributed orders, not commission
and not platform-wide sales. Reuse `affiliateOrderSelect` and
`evaluateSettledSpend`, preserving verified settlement amount/currency/kind/
disposition, recorded-refund and duplicate-source checks. Only confirmed, fulfilled
VND orders contribute. Pending/unfulfilled orders contribute nothing; unsupported
or inconsistent qualified sources make the aggregate unavailable with a reason.
Do not silently accept the evaluator's excluded-currency count as a complete VND
total. Preserve original attribution/visit chronology; a source settled before
attribution must not count as legitimate referred revenue.

Apply exclusive timestamp predicates in the database to eligible settlement and
refund facts before inclusive evaluator comparison, while preserving malformed
recorded-refund/null-date evidence for its existing rejection path. Do not subtract
an arbitrary day or change the shared evaluator's other callers. Capture `asOf`
once and use it for every aggregate/window. Future postings/refunds are excluded.
Bound attribution.createdAt and visit chronology by that same asOf, so a future
attribution cannot contribute current referred revenue.

A bounded technical source scan is acceptable, matching existing card-read-model
patterns; probe one extra row. If the bound is exceeded, return amount=null,
complete=false and SOURCE_SCAN_LIMIT_EXCEEDED, never a partial figure titled Total
Revenue. The bound is a query/resource safeguard, not a guessed business policy.
No new table, balance projection, posting, audit mutation or reconcile call.
An order-count cap alone does not bound refund fan-out. Load recorded refunds
through a separately bounded scan (or explicit per-order plus total cap probes).
If any refund bound is exceeded, the revenue total is unavailable; never evaluate
a truncated refund set as complete. Preserve null-date malformed refund evidence
for rejection rather than hiding it with a timestamp filter.

## Ranking and sub-affiliate boundary

The source has no ranking definition, and current validation rejects enabled
sub-affiliates. Render their named Dashboard slots with explicit unconfigured/
disabled state and null values, not fake rank0/count0. This does not claim ranking
or multilevel attribution has been implemented.

If ranking is subsequently supported, add an explicitly selected Admin reporting
basis/period to the existing versioned affiliate policy, not a hidden runtime
default. Current validation derives exact object keys from defaults; old immutable
JSON revisions therefore require a compatibility normalizer (as course defaults
already use), not rewriting history. BE/FE defaults, validation, form labels,
approval/impact/effective-date checks and tests must change together. Until then,
do not infer a ranking basis from commission or revenue totals.

## Withdraw Transactions Excel

Add owner-scoped `GET /wallet/gds/transactions/export`, before any dynamic route,
with existing JWT/RolesGuard, learner/instructor roles, wallet read-capability
guard and a bounded per-user export rate limit. Reuse the exact shared
`gds-wallet-history.ts` source/filter, withdrawal lifecycle deduplication and masked
bank account output. Never query a parallel affiliate wallet or accept owner ID
from query parameters.

Preferred minimal full-filter contract: accepted filter enum matches history;
read at most technical export-bound+1 rows in one snapshot. If more rows exist,
fail explicitly with an export-limit reason and no workbook; never label a
truncated file as all history. Successful response follows the existing affiliate
export shape (`filename`, `contentType`, `dataBase64`) plus `exported`,
`scope:'filtered_history'`, `complete:true`, filter and snapshot time. UI says
Export Excel for this filter and displays error/limit feedback. An alternative
page export is valid only if button/metadata explicitly say page and preserve the
owner/filter-bound cursor; appended pages must not masquerade as the full dataset.

Reuse/refactor the existing standards-based `affiliate-workbook.ts` text-cell ZIP
writer into a shared utility for two consumers; do not add an Excel dependency or
duplicate its ZIP implementation. Values remain inline text cells, preserving
BigInt amounts/IDs and avoiding formula execution. Dates are ISO; include canonical
type/status and masked account only. Escape XML/control characters. No secrets,
full bank account or other-owner fields. Download uses the existing Blob pattern.

## Files and meaningful verification

- BE: affiliate service/new focused summary helper and tests; existing dashboard
  Prisma acceptance; wallet controller/service/history export tests; shared text
  workbook utility and existing affiliate workbook tests. No schema migration.
- FE: affiliate service contract/Page/stylesheet and populated dashboard tests;
  gds-wallet service/GdsWalletActivity and export tests; existing registered
  affiliate/dashboard browser fixtures, VI/EN and all seven required widths.
- Test signed positive/negative/zero commission, UTC day/month boundaries,
  exclusive `asOf`, future postings, BigInt above Number safe range, other-owner
  isolation and invalid currency. Revenue: canonical payment, partial/full refund,
  future refund, pending order, mismatch, duplicate source, attribution chronology,
  exact bound and overflow. Assert before/after journal/history/wallet unchanged.
- Export: guard/role/owner/capability denial, each filter, owner-bound cursor if used,
  lifecycle deduplication, microsecond ordering, masked account, XML/formula-like
  values, exact limit versus overflow and no workbook on incomplete export.
- Existing API clients without summary remain usable; UI handles missing summary
  as unavailable rather than deriving invented figures. No current policy is
  enabled or changed merely to test or display these fields.
