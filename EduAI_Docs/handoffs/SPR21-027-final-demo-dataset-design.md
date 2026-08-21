# SPR21-027 — Final Demo Course Dataset design

## Gate and scope

This is the Product Owner's final demo/UAT dataset phase. It starts only after
Mobile, Navigation, Voucher, Scholarship, TMI Rewards, and PWA are stable.
Tasks 006–008 remain minimal test fixtures and are not replaced by this design.
No production database, payment settlement, WordPress/Couponis source, or
third-party scraped content is in scope.

## Existing seed extension

`EduAI-Back-End/prisma/demo-seed.ts` and `demo-fixtures.ts` remain the base
framework. The current guarded `db:seed:demo` flow is preserved, including its
production rejection and deterministic UUIDs. The final seed will extend it
with a dedicated namespace and cleanup list; it will not reset or delete the
existing 10 courses, 40 lessons, thumbnails, accounts, or learning records.

## Final scenario matrix

| Scenario | Dedicated data | Expected journey |
| --- | --- | --- |
| Free discovery | One existing course with `priceAmountMinor=0`, public thumbnail, preview lesson | Public catalog → detail → preview → learner enrollment |
| Paid price | Existing paid courses across beginner/intermediate/advanced levels | Catalog/detail shows VND minor-unit price without payment claim |
| Promotion-ready | Course scope + active fixed/percentage voucher, plus expired/disabled controls | Learner validates eligible, invalid, expired, disabled, and idempotent voucher paths |
| Scholarship | Course scope + active campaign, pending/awarded/denied/expired/quota scenarios | Learner applies; admin reviews; award/revoke state is visible |
| TMI course access | Active course-access reward, earned points, redemption, entitlement, history | Learner wallet → catalog → redeem → entitlement/history; admin sees sanitized ledger |
| TMI safety states | Disabled, expired, exhausted-quota rewards and insufficient balance | Safe rejection with no partial debit/entitlement |
| Learning progress | Existing enrollments with not-started/in-progress/completed lessons | Dashboard → course → lesson/progress/resume |
| Review/social proof | Deterministic reviews on featured and non-featured courses | Detail ratings/reviews render without private identifiers |
| Instructor/admin roles | Existing demo instructor/admin plus owned courses and moderation context | Role redirects and management surfaces remain protected |
| Installable web app | Manifest/icons/service-worker shell, no API cache | Public shell can install where supported; authenticated API stays network-only |

## Proposed deterministic namespaces

Use UUID v4-shaped IDs with a final-demo namespace distinct from existing
`0x10–0x2f` fixture namespaces:

- `0x30`: final course/category updates and scenario markers;
- `0x31`: final voucher records and course scopes;
- `0x32`: final scholarship campaigns, applications, and awards;
- `0x33`: final TMI rewards, ledger entries, redemptions, and entitlements.

The implementation must expose these IDs through a dedicated final-demo ID
registry so verification and cleanup never rely on title/code matching.

## Schema assumptions

- Course pricing remains integer minor units with `VND`; zero means free and
  does not represent a payment transaction.
- Voucher and scholarship scopes reference existing course IDs; no new
  category model or migration is required.
- TMI uses the authoritative ledger and existing transaction boundary; reward
  cost is never supplied by a seed/API client as trusted input.
- PWA data is static public shell metadata. No token, private API response, or
  production user record is seeded into a service-worker cache.

## Reset, cleanup, and rollback

The final seed must be rerunnable and idempotent. A dedicated reset command or
cleanup function deletes only final-demo IDs in dependency-safe order:

1. entitlements/redemptions/ledger entries;
2. scholarship awards/applications/scopes;
3. voucher redemptions/scopes;
4. rewards/campaigns/vouchers and final course metadata markers.

Existing demo records are retained. Production mode rejects both seed and
reset. If a final scenario is incomplete, block SPR21-029 rather than creating
ad-hoc records during UAT.

## Review result

The matrix covers the stable feature contracts and keeps Final Demo Dataset at
P3. SPR21-028 may implement this extension only in the authorized Neon/demo
target; no deployment is implied by this design task.
