# Policy impact and system locale release — 2026-11-16

The card basis-switch preview previously ignored unavailable evidence in the
current policy when the candidate was valid. BE PR59 retains each prior evaluation,
propagates either-side exceptions to page status/reason/completeness and exposes
page-local comparable/incomparable counts. The candidate remains visible; counts
do not claim a complete global migration scan. Purchased rights and money are not
mutated by this read-only preview.

Two regressions failed before the fix; all15 source tests and build passed.
Candidate38c11b096a72b3bbd6642386fd9b9f81a5fddc4a passed head CI43865053566
and migration replay43865053435. Main e0bbf1d7e2d1cde1c9cc5bae8e97e4ee1c82e9dc
matched the tested tree and passed CI43866008877, replay43866009325 and deployment
43866008973. The merged branch was deleted remotely/locally and references pruned.

FE PR49 consumes those optional fields with localized prior-source reasons while
remaining compatible with earlier API responses. It also translates persisted job,
Billing, voucher and evaluator enums, makes three classroom/instructor date
consumers react to locale changes, resets Billing pagination when filters change,
and restores mobile More focus after Escape. User content and money are unchanged.

Candidate1c0d420270cbb85488b2f2882699cd83652118e9 passed149 Vitest files /
649 tests, build and seven synthetic Chromium scenarios at all required widths.
Final-head CI43865573548 passed all four jobs and preview. Main
6371104584b09fb4c976114c7440221ea0b5d45d matched that tree; main CI43866441854
and production deployment43866441861 passed. All7 Billing/locale/focus scenarios
passed against the shipped JavaScript with intercepted API data and no writes,
page errors or overflow. This is deployed-bundle fixture evidence, not modification
of actual orders. The new suite is included in checked-in GDS CI. Independent
source reviews found no substantive remaining issue; both merged branches were
deleted remotely/locally and pruned.

The full plan remains VERIFYING. Further audit found a concrete point-adjustment
key/payload conflict defect, affiliate admission missing funding readiness,
unconsumed support settings and an inert legacy affiliate withdrawal field.
Those are separate follow-up slices; no business terms or provider activation
were inferred. Global locale and accessibility review retains its stated scope.
