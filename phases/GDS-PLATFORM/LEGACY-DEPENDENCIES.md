# Legacy access and card benefit continuation

Status: IN_PROGRESS. Source inventory at backend `e05aa95b34daf4f35f74289294cb32788d0d33e3`; this is not a production data reconciliation or a completed migration.

The public membership checkout endpoint already returns `410 MEMBERSHIP_SALES_RETIRED`. Existing membership purchases still have fulfillment, refund, access, service-quota and revenue consumers. Card evaluation currently returns `entitlementMigrationApplied: false`; its localized benefit strings are explanatory metadata, not executable grants.

## Retained dependencies

| Tables | Active consumers and required preservation |
|---|---|
| `membership_plans`, `membership_plan_versions` | Historical subscriptions, products, fulfillment and revenue-membership policies reference immutable versions. Preserve their original commercial terms and foreign keys. |
| `membership_plan_included_courses` | Fulfillment and revenue allocation read included courses and weights; continuity calculates removed-course grace. Snapshot and reconcile consumers before retiring this dependency. |
| `membership_duration_options`, `membership_checkout_intents` | Order history displays purchased term/action; pending historical orders and fulfillment use the intended start/end dates. Retain history and resolve outstanding orders rather than reconstructing terms from a new card policy. |
| `membership_subscriptions`, `membership_removed_course_snapshots` | Current historical membership, fulfillment, refunds and emergency revocation still use these records. Preserve term windows and source identities, including grace. |
| `membership_plan_entitlements` | Existing fulfillment copies purchased service benefits into grants. Replacement must handle outstanding historical fulfillment before this configuration dependency can be removed. |
| `service_entitlement_definitions`, `service_entitlement_grants`, `service_entitlement_usage` | These are reusable service authorization/quota records, not merely obsolete sales tables. Keep grant source, validity, consumed quota and idempotency intact. |

`course_access_grants` already stores course-level sources and validity independently of card classification. `CommerceFulfillmentService` creates membership/grace grants; `PaymentRefundService` revokes only the corresponding refunded sources. `CourseAccessService` consumes the grants. A card downgrade or disabled policy must never rewrite these purchased rights.

## Next implementation slices

1. Add a read-only, bounded reconciliation report using canonical order/fulfillment facts. Identify missing grants, mismatched term/source/owner, unverified receipt access, pending fulfillment and quota-history exceptions. Do not infer verified payment from a screenshot or a subscription alone.
2. Repair only verified missing historical grants through an idempotent, audited transaction. Preserve original dates, refunds, revocations and quota consumption; no new policy may renew expired purchases or reset usage. Compare before/after access and balance/history digests on disposable fixtures, then on the authorized production scope.
3. Add structured, supported card-benefit configuration separately from display text, with policy revision/effective-date provenance, impact preview and deterministic fulfillment/revocation. Reuse service-grant authorization; do not parse free text into privileges. Keep historical purchased grants independent of conditional card benefits.
4. Migrate remaining readers/writers one consumer at a time, preserve immutable commercial history, and remove unused sales code only after reference and regression checks. Drop a table/column only when its data is safely retained, reconciled and no runtime/reporting/foreign-key consumer remains. Owner authorization permits justified deletion; it does not establish those facts.

Acceptance still requires real authenticated production UAT. Public smoke and disposable test identities do not establish that acceptance. No school partner is needed for these internal migration steps.
