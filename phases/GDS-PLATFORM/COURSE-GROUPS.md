# Public course program groups (release pending)

Original-plan P5.1 is VERIFYING. Backend PR58 (`1a8cf18b8f488ce1babe545f0fa2e99b8da28908`)
and frontend PR47 (`e909942c384399b1e4060a939792c31362907332`) implement the public
consumer; exact-head CI/release/deployed acceptance remain pending. Stitch
desktop/mobile references are recorded in `UI-STITCH.md`.

The native catalog already exposes `categorySlug`, consumed by voucher and
scholarship category scopes. Do not repurpose or overwrite that taxonomy for the
six education-program groups. Preserve existing course records and discount
semantics. The frontend summary type currently omits this API field.

The smallest coherent next slice should expose six configurable program choices
with stable identity separate from editable VI/EN labels and array ordering.
Provide compatibility for existing label-only effective configurations before
introducing new required fields. Online courses keep the existing native catalog,
search, level filters and pagination. School/partner program groups must show a
truthful unconnected state with a useful destination to existing GDS partner
onboarding until an actual program source is connected. Do not render unrelated
native courses, fake schools or derive connectivity from an approved application
or a manually selected partner-status label.

Use the existing effective Admin policy lifecycle rather than a second config
store. Preserve shareable URL selection, browser back/forward behavior and filter
state. Verify renamed/reordered groups, old config compatibility, disabled/unknown
selection, API errors and absence of unrelated courses. Browser acceptance must
cover VI/EN, keyboard focus and320/375/390/412/768/1024/1440px. No new school API,
business terms, production policy activation or data migration is implied here.

Source validation passed backend build/64 policy tests, frontend build/14 focused
tests and4 Chromium scenarios (VI/EN and historical/current configuration, seven
widths each). DevTools observed official GDS assets, shared font and no horizontal
overflow at320/1440px on the inspected live local view. The scoped review found
discrete-filter history and premature page clamping defects; both have targeted
regressions and the second review found no substantive issue. Continuous search
typing retains the prior replace-history behavior; group/level/page changes push.
No production configuration has been changed for this feature.
