# Public course program groups

Original-plan P5.1 has scoped release evidence. Backend PR58 (`1a8cf18b8f488ce1babe545f0fa2e99b8da28908`)
and frontend PR47 (corrected head `43219ed62eed21504982115d00ef956dbc9ff858`) implement the public
consumer; exact-head CI/release/deployed acceptance passed as recorded below. Stitch
desktop/mobile references are recorded in `UI-STITCH.md`.

The native catalog already exposes `categorySlug`, consumed by voucher and
scholarship category scopes. Do not repurpose or overwrite that taxonomy for the
six education-program groups. Preserve existing course records and discount
semantics. The frontend summary type currently omits this API field.

The implementation exposes six configurable program choices
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

Backend PR58 merged as `243c2265656d1293ea70ea90e895597e6069fe75`; main
quality43829028477/replay43829028472 and auto-CD deployment43829028488 passed,
with exact V2 health and preserved existing sessions. Its temporary source branch
was deleted remotely/locally after ancestry/main-gate verification and refs pruned.

Frontend initial-head CI43828275836 found an omitted-settings response regression:
the new course reader dereferenced `response.settings.courses`, crashing views
whose API fixtures omitted the settings object. A focused unit reproduced the
TypeError, and optional settings access restores last-known presentation without
changing payment behavior. The regression unit, all3 order-payment widths and the
first failed production-wallet fixture passed locally after the fix. Corrected
head CI and deployment are recorded below; do not count the failed initial head
as a successful full release.

## Final release and acceptance

Corrected frontend [CI43830839018](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/43830839018)
passed every gate, including checkout, GDS responsive and PWA. PR47 merged as
`be385812b95299570ed06e50ecd04631f814ab1b` with identical tree and verified ancestry.
Main CI43831430719 and VPS deployment43831430538 passed at that revision. Backend
remains243c2265656d1293ea70ea90e895597e6069fe75. Both source branches were deleted
remotely/locally after main gates/deployment verification, with stale refs pruned.

The shipped frontend bundle passed4 program scenarios using intercepted synthetic
APIs: VI/EN x old/current config, each at7 widths (28 combinations), including
reordered/renamed identity, native versus unconnected views, preserved query/level,
Back, keyboard focus, no overflow and no API writes. Three shipped-bundle payment
layout fixtures also passed. A supplementary wallet fixture stopped only on the
explicit Playwright warning that its service-worker registration was blocked;
do not report that optional probe as a clean pass. Its local and exact-head/full
main CI wallet counterparts passed. No guard was weakened or real financial API
enabled to silence the harness warning.

Separate Chrome DevTools inspection used actual public production configuration:
all6 groups appeared, K12 was selected with a truthful unconnected state and zero
native cards, and the partner link was /partners. Official GDS logo, Be Vietnam Pro
and rgb(71,0,244) were observed. Actual1440/320 views had no horizontal overflow;
the320 native select contained6 options. The inspected view emitted no console
errors. No production Admin policy, partner connection or business term was changed.
