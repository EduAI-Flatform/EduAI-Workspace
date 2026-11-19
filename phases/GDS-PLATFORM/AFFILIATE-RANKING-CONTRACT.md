# Versioned affiliate ranking contract

Status: implementation contract,2026-11-19. The current permanently unconfigured
Ranking card is truthful but does not implement ranking. This closes that specific
P7.1 gap without activating commissions, sub-affiliates, payouts or purchased rights.

## Admin policy and compatibility

Extend the existing versioned `affiliate` group with:

```ts
ranking: {
  enabled: false,
  basis: 'unconfigured',     // recorded_signed_commission | recorded_referral_count
  period: 'unconfigured',    // utc_day | utc_month | lifetime
  tiePolicy: 'unconfigured', // competition
}
```

Disabled/unconfigured is the only new default. Before enabling, Admin must select
every supported value explicitly. Competition ranking means `1 + the number of
participants with a strictly greater score`; equal scores share a rank. Selecting
that policy is explicit, rather than silently choosing an active business rule.
Unknown keys/values, malformed objects and unsupported enabled combinations fail
boundary validation. Participant eligibility and authorization are fixed security
boundaries, not editable expressions or SQL.

The usual draft, validation, impact, approval, effective-date and audit workflow
applies. A future draft or merely approved revision cannot change live ranking.
Ranking is a read-only reporting switch: it must not implicitly enable top-level
affiliate admission, positive accrual or wallet credit. Existing financial admission
and funding gates remain independent and unchanged.

Add a compatibility helper that supplies a disabled ranking object only when the
whole field is absent in an old immutable revision. Do not rewrite old JSON rows
or silently repair malformed present objects. Apply the helper consistently to
effective reads, validation, preview comparisons and the Admin form's old-revision
editing path. New drafts should persist explicitly prepared canonical content.
`validatePlatformSettings` currently returns a group identifier (`PlatformGroup`),
not normalized content: never assign its return value as policy JSON. Prepare the
affiliate content, validate it, then persist that prepared object.

## Read model and response

Use the existing authenticated owner's summary, not a public leaderboard or a new
balance. Population consists of distinct owners with an active eligible identity
and an active, undeleted account. Preserve existing instructor-identity permission
boundaries; an old identity must not grant a removed role. Multiple identities for
one owner do not create multiple participants. No other owner's ID/name/email or
score is returned to the learner. General referral identities are JWT-only in
the existing API: do not add a student-role prerequisite. An active general
identity qualifies an active, undeleted owner; an instructor-only identity also
requires the current instructor role. Identity creation must be before asOf.

For each eligible owner, `recorded_signed_commission` sums immutable signed
`AffiliateAccrual.deltaMinor`; it is not a wallet balance or a recomputed earning.
`recorded_referral_count` counts unique recorded attributions/orders, not visits,
accrual rows or paid orders. Retained historical sources owned by the participant
remain historical sources; the label must not imply new payout eligibility.
Zero and negative recorded scores are valid. A participant with zero records is
not an unavailable source; an ineligible caller is not rank zero.

Capture one `asOf` and compute within the summary's read-only `RepeatableRead`
snapshot. Resolve the effective affiliate policy/version inside that same snapshot
using that captured asOf, rather than passing an earlier current() result across
the transaction boundary. Apply this to paired impact's before-policy too; a
concurrent scheduled activation must not mismatch rank and policy provenance.
Use `createdAt` of the relevant source with `[UTC start, asOf)` for day
or month, and only `< asOf` for lifetime. No refund query or revenue reevaluation
is needed for either ranking basis; signed commission corrections are already
recorded effects. Comparison arithmetic remains BigInt until the bounded ordinal
rank is produced.

Read population and source through separately bounded scans with one-extra-row
probes. These are technical resource safeguards, not commercial thresholds. If
either bound is exceeded or source cannot be validated, return unavailable/null
with completeness/reason metadata; never rank only a partial population. Avoid
one query per owner. Do not append a ledger, audit, wallet, grant or reconcile effect.

Extend `summary.ranking` compatibly with statuses `unconfigured`, `disabled`,
`available`, `not_participating` and `unavailable`; `value` is a positive integer
only for `available`, otherwise null. Include effective `policyRevisionId`, basis,
period, tie policy, UTC/asOf, completeness and a stable reason. Missing old config
retains unconfigured/null. The frontend must handle both old summary responses and
the extended result without fabricating rank0.

## Impact and scheduling

The current affiliate preview is a generic JSON before/after diff. Add a paired
ranking impact under the same Admin-only preview, using the effective before-policy
and proposed after-policy in one snapshot and returning both revision IDs.
Report examined participants, newly ranked/removed participants, changed and
unchanged ordinal ranks, completeness and aggregated exception reasons. Rank-change
counts compare only participants ranked on both sides. Disabled-to-enabled changes
are newly ranked, not a fabricated comparison with rank0. An unavailable before
side is explicitly incomparable; do not silently omit it or publish partial totals.

No participant PII or individual score is needed in the impact response. An enabled
after-policy that cannot compute a complete supported ranking reports an activation
blocker. Disabling remains possible; an unavailable old side must not prevent a
safe disabled after-policy. Existing approval/audit/effective-date checks stay in
force. Ranking changes have no learning-access or monetary adjustment effect.

## Affected source and verification

Backend:

- New `src/modules/affiliate/affiliate-ranking.policy.ts`: types, supported choices,
  normalization and readiness validation.
- New `src/modules/affiliate/affiliate-ranking.ts`: bounded owner ranking and paired
  impact; focused tests beside it.
- `platform-settings.defaults.ts`, `platform-settings.validation.ts` and
  `platform-settings.service.ts`: explicit prepare/validate/persist, effective-read
  compatibility, paired preview and scheduling readiness.
- `affiliate-domain.ts`, `affiliate-summary.ts` and `affiliate.service.ts`: optional
  legacy policy shape and actual self-ranking with frozen effective provenance.
- Existing guarded dashboard/policy Prisma replay: native owner isolation, ties,
  signed corrections, old-policy compatibility and unchanged history after reads.

Frontend:

- `platform.defaults.ts`, `AdminPlatformSettingsPage.tsx`,
  `PlatformSettingsForm.tsx`: old-revision compatibility and localized explicit
  basis/period/tie controls, including a disabled/unconfigured explanation.
- `services/platform-settings.service.ts` and Admin impact UI: typed complete versus
  incomparable preview counts and activation feedback.
- `services/affiliate.service.ts`, `AffiliateSummaryStats.tsx` and existing fixtures:
  extended self-ranking states/provenance with exact positive ordinal formatting.

Required checks cover explicit selection and invalid config, unchanged old JSON,
future-effective revisions, active/removed identities and account eligibility,
multi-identity dedup, owner-only output, competition ties, zero/negative scores,
UTC boundaries/future sources, both scan caps, paired impact exceptions and
disabled-after recovery. Assert no writes and no changed purchased grants,
balances or immutable postings. Run focused Jest/native PostgreSQL and frontend
Vitest/TypeScript/build, then VI/EN Admin save-preview and learner display at all
seven required widths. Record fixture versus actual production scope separately.
