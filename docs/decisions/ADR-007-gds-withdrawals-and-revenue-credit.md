# ADR-007: GDS withdrawal and recognized revenue credit

**Status:** Accepted for source/dev implementation; production release remains separate

**Date:** 2026-11-04

## Decision

The owner approved learner and instructor bank withdrawals, instructor earnings
credited to the same GDS wallet, single-admin manual payout, no withdrawal fee,
and administrator-configured minimum/maximum amounts. Defaults are 50,000 and
10,000,000 VND per request. This supersedes ADR-006 decisions 3 and 6 concerning
separate withdrawable seller balances, dual approval and no learner cash-out.
Verified Commerce settlement, immutable revenue snapshots and TMI separation remain.

Withdrawal creation atomically moves available funds to held funds. Cancellation
is owner-only while pending; rejection precedes processing. Processing is claimed
by one admin, who cannot process their own request. Unknown bank outcomes retain
the hold. Payment requires bank reference, transfer time and reconciliation reason;
confirmed nonpayment/failed transfer releases the hold. Every transition is an
append-only event, with SQL guards controlling the resulting wallet journal.

Revenue remains traceable to earning periods and immutable recognized/refund
entries. A recoverable projection credits each net change once. Refunds first
recover available GDS, then create separate debt without taking held funds.
Future earnings repay debt before adding spendable funds. Debt blocks withdrawal
creation and transfer claims. Refund source facts are refreshed before cash-out.

Historical cutoff freezes at first revenue-processing activation, covering earnings
between schema deployment and activation. Historical periods need admin attestation
of prior external payouts and a reason/reference. Previously paid amounts are
bounded by original recognized earnings, so a later refund may correctly produce
debt even when prior payouts exceed current net earnings. Reviews are immutable.

## Rollout and consequences

Source is developed and tested on persistent `dev`; `main` requires passing
dev CI and a second check of the exact merged revision. Production database
migration, deployment, activation and real transfers retain existing owner gates.
The new schema must precede deployment of backend source that reads it. Existing
production migration allowlists are deliberately not expanded by this source task.

Admission and processing are independent switches, both initially off. Closing
admission preserves pending processing and cancellation. Confirmed cancellation
or rejection releases funds even for a suspended wallet. Do not undo financial
history or drop the additive schema to roll back; stop admission and reconcile
outstanding requests. This change does not integrate an automatic bank payout API.
