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

## Single-order reconciliation prerequisite

Backend PR 38 merged at `43c7e7abf8edff8dc1c81eb7e26114b6940f1139`, reviewed candidate `a69e13a0a0ed999ceab0ba9bc5c304e208bfcb30`. The platform-admin-only GET `/api/v1/admin/membership/legacy-orders/:orderId/reconciliation` compares one fulfilled historical membership purchase with subscription, course/grace/service grants, effects and quota usage. It preserves original dates and revoked rights; never repairs, renews or resets quotas. Its consistent snapshot and bounded relations fail closed. Canonical gateway payment evidence and native wallet capture are checked; refund history, bank/free collections, shared quota pools and exceeded bounds remain explicit review exceptions.

Local continuity/quota/report checks passed (42 tests before the final effect-source assertion, then 21 final report checks), Nest build and fixture syntax passed. [PR source CI 43234939199](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/43234939199) and [real PostgreSQL replay 43234939159](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/43234939159) passed. The actual report reconciled a canonical synthetic membership wallet purchase in both test and production-classified disposable replay, with identical purchased grants before/after. This is not a production-wide data reconciliation or completed migration. No schema, dependencies, policy activation or financial write was added.

[Production source deployment 43235858719](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/43235858719) passed at that exact main SHA, with runtime least-privilege readiness. Live GET-only role/validation checks passed: student/instructor 403, anonymous 401, Admin missing order 404 and invalid UUID 400. Sanitized artifact: `.codex-artifacts/gds-production/legacy-report-readonly.json` outside repositories. No production historical order was modified or represented as globally reconciled. Final post-merge CI and source-branch cleanup are recorded below when observed.

Final [post-merge CI 43235858647](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/43235858647) and [PostgreSQL replay 43235858692](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/43235858692) passed at the deployed revision. Public health returned 200. The merged source branch was deleted remotely/locally after exact tree equivalence and all release checks, then references were pruned; backend local/remote main are clean and matching.

Remaining work is still the inventory/repair/structured-benefit/consumer transition above; this read-only prerequisite does not complete original stage 6.
