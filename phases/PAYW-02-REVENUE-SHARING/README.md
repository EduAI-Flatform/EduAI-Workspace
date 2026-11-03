# PAYW-02 - Revenue sharing and membership participation

**Status:** IN_PROGRESS - source implementation and synthetic verification only.
**Owner start:** 2026-11-03, explicit request to implement the agreed revenue-sharing plan.

This authorization covers configurable retail fees, versioned membership shares, seller consent per course, rule-based automatic inclusion, scheduled policy changes, append-only recognition/refund accounting and admin/seller reporting. It includes the recording subset of seller earnings; it does not start PAYW-03 payout execution.

The owner explicitly chooses global retail fees and membership-version fees; membership distribution by weights; recognition at the end of each subscription month; rule matching by category, level and retail price; inclusion in every matching plan; rule weights with per-course overrides; no course-count cap. Sellers can leave for future sales. Later changes notify without reacceptance. Admin selects immediate activation with no day input, or delayed activation with a positive configurable number of days.

Existing orders and entitlements are preserved. No production deployment/migration, live payment-provider activation, real financial operation or payout is authorized. Existing PAYW legal/operational decisions and SPR25-007 remain independent and unchanged. This source-only start does not assert upstream live gates have passed.

[Specification](SPEC.md) | [Tasks](TASKS.md) | [Acceptance](ACCEPTANCE.md) | [Tests](TEST-PLAN.md) | [UI requirements](UI-STITCH.md)
