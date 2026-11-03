# PAYW-02 Acceptance

All items remain unverified until evidence is recorded; this checklist is a target, not a PASS report.

- [ ] Global retail fee and per-membership-version fee are explicit, versioned, validated and conserve integer VND.
- [ ] Order snapshots preserve discounted base, fee, course owner, weights and allocations; legacy orders are not backfilled.
- [ ] Seller sees terms and matching plans, accepts per owned course, can leave, and cannot access another seller's data.
- [ ] Rule AND semantics, first-match priority, all matching plans, per-course weight override and no-match participation work.
- [ ] Only eligible courses enter future-sale versions; published versions and existing purchases/subscriptions stay immutable.
- [ ] Immediate activation has no notice days; delayed activation accepts positive whole days, notifies affected sellers and activates atomically; pending changes can be cancelled.
- [ ] Dilution and other commercial changes notify every affected owner; later changes do not force reacceptance.
- [ ] Only verified canonical payment produces revenue; provisional receipt access never posts earnings.
- [ ] Retail recognition and end-of-subscription-month membership recognition are idempotent/recoverable and separate from settlement commit.
- [ ] Canonical confirmed partial/full refunds proportionally adjust pending and recognised money, without mutable historical entries or double reversal.
- [ ] Admin/seller reports distinguish pending, recognised and refund adjustments without presenting withdrawable money.
- [ ] Focused financial/security/concurrency tests, additive migration rehearsal and existing payment/member regressions pass.
- [ ] Stitch design and browser/responsive/a11y evidence at seven required widths are recorded.
- [ ] Diff, generated-schema consistency, build/type checks and applicable delivery/CI/merge/cleanup gates are recorded truthfully.
- [ ] No payout, real financial operation, production database mutation/deployment or release-gate waiver occurred.
