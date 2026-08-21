# SPR21-006 — Minimal Course Test Fixture Contract

## Classification

This document defines `A_MINIMAL_TEST_FIXTURE` data for `TEST_SUPPORT` only.
It is not the Product Owner's Final Demo Course Dataset.

The fixture contract exists to unblock focused automated tests for the Sprint
21 feature domains. It must remain synthetic, deterministic, isolated from
production, and safe to reset.

## Required scenarios

The dedicated test fixture set must be able to represent these cases without
changing the existing `db:seed:demo` contract:

| Scenario | Required state |
| --- | --- |
| Free course | Published/public course with `priceAmountMinor: 0` and `priceCurrency: VND`. |
| Paid course | Published/public course with a non-negative integer minor-unit price and ISO currency. |
| Promotion-ready course | Paid base price plus a test-only promotion projection containing original/current display values; no client-provided final price is authoritative. |
| Unpublished course | Draft or archived course that is not presented as publicly available or priced for enrollment. |
| Category metadata | A deterministic category value in the fixture contract so Voucher/Scholarship scope tests can run; the current Course schema has no category field. |
| Course content | At least one instructor, thumbnail, preview lesson, and representative video/article/PDF lesson data where the test requires it. |
| Learner state | One enrolled learner with progress and one eligible public course without an enrollment. |
| Review state | A review only where the feature test needs rating or review display. |

## Boundaries

- The fixture namespace must be separate from the existing demo IDs and must
  never be enabled by production startup or production seed commands.
- The existing guarded `db:seed:demo` command and its ten-course/forty-lesson
  development dataset must remain unchanged and usable for development.
- This design must not create or curate the Final Demo Course Dataset.
- No migration is required for this design task. Category persistence and
  promotion persistence remain schema decisions for the Voucher and
  Scholarship tasks; a fixture adapter may carry those values in test memory
  until an approved additive schema exists.
- Fixture values must be server-shaped inputs or projections. Tests must not
  treat a browser-supplied final price as authoritative.

## Implementation handoff to SPR21-007

`SPR21-007` may implement only the smallest dedicated fixture factory/seed
needed by feature tests, behind an explicit test/development guard. It must
prove idempotence, reset/cleanup behavior, and production rejection without
expanding the fixture into a complete demo catalog.

## Validation and rollback commands

The configured development/test target is classified separately from
production. Use the explicit guard for every write:

```text
MINIMAL_FIXTURES_ENABLED=true npm.cmd run db:seed:minimal
MINIMAL_FIXTURES_ENABLED=true npm.cmd run db:verify:minimal
MINIMAL_FIXTURES_ENABLED=true npm.cmd run db:reset:minimal
```

The seed uses deterministic upserts. The reset command deletes only the
dedicated minimal fixture IDs (category, resource, courses, lessons,
enrollment, progress, and review). Production mode rejects all three commands
before opening a database connection. If a future fixture migration is
approved, it must remain additive and have an explicit rollback plan; this
fixture implementation requires no migration.
