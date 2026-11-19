# Final verification continuation

The original GDS plan remains VERIFYING. This receipt supplements the earlier
source, retirement and affiliate acceptance without converting partial evidence
into a full completion claim.

## Accessibility release

Frontend PR55 candidate006aa5cd45a0148cae03e055704c1993f376977b passed all four
CI jobs44255901024 and preview. Merge7375883ab87a52adaa6d768216316e489a54e2cd
matched the tested tree and passed main CI44256403679 and deployment44256403870.
Fourteen API-fixture browser cases against shipped JavaScript passed VI/EN at all
seven required widths, including localized visible/accessibility names, target
geometry, keyboard containment and focus restoration after Escape/Cancel/Close.
No business writes, unexpected APIs, runtime errors or overflow were observed.
The source branch was deleted remotely/locally after ancestry/main gates and pruned.

Initial196-case axe audit had20 cases with determinate violations; after fixes
there were zero, with186 incomplete cases requiring manual disposition. Separate
manual evidence and two named-group semantic corrections are being finalized;
the zero automatic violation count is not a blanket accessibility certificate.

## Live locale and assignment layout

PR56 candidate8a70e1025cb6574749ca7861f4099eeff3d2b446 contains four consumer
fixes, five unit regressions and35 browser cases. Module-level Intl instances
froze dates/numbers; raw booking statuses and first-party operational signals
bypassed translation. Call-time formatting/context updates now cover VI -> EN -> VI
while preserving authored content and canonical API values.

Actual browser checks also exposed intrinsic form/grid overflow. Instructor input
width218px exceeded its160px column; mobile student grid expanded to437.6px.
Bounded controls and a shrinkable minmax track remove the cause without clipping.
All35 final browser cases passed across seven widths; the standalone student
submission receives locale from a real second tab through existing storage sync.
The combined tree passed154 Vitest files/695 tests, TypeScript and build.
Independent reviews found no actionable issues. PR/main deployment and shipped
locale checks remain pending; no release is inferred from local checks alone.

PR56 final-head CI44257015347 subsequently passed all four jobs and preview.
It merged as5484710db9d96fcd2d1216e2c8a68d89514b6aa6; fetched main ancestry
and tree equality were verified. Main CI44257699527/deployment44257699451 are
still being checked; this is not yet a completed production receipt.

Subsequent main CI44257699527 and deployment44257699451 both passed. All35
locale/responsive cases also passed against shipped JavaScript with intercepted
synthetic read-only APIs. The merged locale branch was deleted remotely/locally
after ancestry/main gates, then references were pruned.

At2026-11-18T07:22:46.903Z, the retained production session passed again against
backendd9f288e914afc68560026bfa88c4c2992b310db8 after165704 seconds of primary
authentication age (about46 hours). Two Settings tabs remained authenticated;
one refresh returned200, keeping the same family/authTime, with no fresh login,
runtime error or business/financial write. Access failure was deliberately
simulated; this does not claim a natural access-expiry wait. Only a sanitized
receipt was printed; credentials remain in ignored storage.

## Named-group correction

PR57 candidateea6ce5de9e4912557f0fbed44df52cb9e01c1b57 adds only semantic
group roles to existing profile-achievement and course-status clusters, with
localized group names and unchanged child actions. The registered14-case fixture
and28 targeted AX/ARIA checks passed in VI/EN at all seven widths. Independent
review found no actionable issue. The final combined source passed155 Vitest
files/696 tests. PR/main/shipped-code gates remain pending.

PR57 final-head CI44257963962 subsequently passed all four jobs and preview.
It merged as5e28f9720d29520dc2f0e028759887eb6bb43a2f; fetched ancestry and tree
equality passed. Main gates, shipped-group fixtures and branch cleanup are pending.

## Final audit findings still being addressed

Further original-image comparison identifies missing separate affiliate period/
revenue/ranking/sub-affiliate summary fields; current aggregate receipts prove
their actual three metrics, not every image field. P7.1 is reopened for that
specific gap. Ranking or sub-affiliate business terms must not be invented.
Two remaining partner/moderation visible-name mismatches and populated wallet
activity VI/EN labels are also undergoing focused corrections before final audit.

## Subsequent label and semantic releases

PR57 main CI44258578974/deployment44258578962 passed. Its merged temporary branch
was deleted remotely/locally after ancestry verification and pruned. PR58 candidate
58e7f582ad40eb68216c078c2927c1571f639f02 fixes the remaining partner/moderation
names and populated wallet labels/hints/badges, preserving authored bank/account
details and every financial value. Its four head CI jobs44259547008 and preview
passed. Merge006f010abbfaea8e9e8021a869801bd1fb4aac4a matches the tested tree;
deployment44300371667 passed. Main CI44300371531 still has a live PWA browser-install
step; its source/build, GDS-responsive and embedded-checkout jobs passed. The PR58
branch is retained until that gate is terminal and successful.

Twenty-eight fixture cases against shipped JavaScript passed: named groups and
populated wallet/support accessibility in both locales at all seven widths. This
does not activate production wallet/affiliate policies.

## Summary and withdrawal export implementation

The source gaps P7.1/P7.2 remain OPEN until native CI, release and final acceptance.
The reviewed AFFILIATE-SUMMARY-CONTRACT.md now has an implemented read-only backend
summary: signed UTC periods, legacy-alias equality and bounded canonical net paid
revenue/refund source, with separate refund-fan-out bounds.27 focused helper/service
tests and build passed. Native fixtures now also create canonical synthetic paid
and partial-refund sources through real fulfillment/refund services; their actual
PostgreSQL execution is pending rather than inferred from syntax/guard tests.

Owner-scoped filtered-history export reuses the canonical history SQL and masked
account output, rejects more than2000 rows and writes inline-text XLSX.7 focused
Jest tests,7 actual PGlite SQL cases and TypeScript passed. Independent review found
an XML noncharacter issue; its regression failed before the sanitizer correction.
Final corrected tests/build and native CI are still being completed.

Frontend summary and export use existing GDS cards/controls, exact signed BigInt,
explicit UTC metadata, unavailable/unconfigured states and real browser downloads.
The combined frontend passed157 Vitest files/709 tests, TypeScript and build.
New summary acceptance and download/focus fixtures passed at all seven widths.
These changes remain on working branches; they are not described as deployed.

Backend PR66 initial heade274751e78d5c277c74f63b59c1a6c59bcb2fe47 failed native
replay44304077494 at synthetic payOS attempt creation (PostgreSQL23514). Migration
inspection confirmed missing request expiry/start fields and receiving-account
identity. Fixture-only correctionb1d68bf supplies those facts and finer sanitized
checkpoints; script syntax and all five unsafe-target guard tests passed. No
constraint was weakened. Native replay on the corrected head remains required.

Frontend PR59 heade4a4ab4973fc31fa5098da563dd4296be6d2770c awaits that backend
dependency. Corrected shared workbook tests/build passed after the XML regression;
fresh review found no further issue. Neither PR is merged or deployed at this checkpoint.

## Released summary/export checkpoint - 2026-11-19

The pending statements above retain their original timing. Corrected backend
headb1d68bfd0fdfade102f055954b37fcc5c4a3a197 passed CI44304664902 and native
PostgreSQL replay44304665056, including the exact paid/partial-refund immutable-read
and restricted-runtime export markers. Merge41c8cea3327bfd9c8a043c8402b1348082b7439d
matches the tested tree; main CI44305926352, replay44305926291 and deployment
44305926493 passed. Its temporary branch was deleted remotely/locally after
ancestry/main gates and references were pruned.

Frontend initial CI44304255302 exposed an ambiguous old locator: the new unavailable
summary slots made a global unavailable-text match non-unique. Test-only correction
c15358dee67d722e77bc1d17bc48e336b12a1487 checks the exact wallet metric and all
five absent-source slots separately; seven local cases passed. Final CI44305881183
passed all four jobs and preview. Merge113f23323aabb247351df8c0c009d8a4b6acb818
matches that tree; main CI44434798565 and deployment44434798648 passed after the
backend release.42 browser cases against shipped JavaScript passed summary,
fallback/card/referral states and download/focus behavior at all seven widths in
VI/EN using synthetic read-only fixtures. The source branch was deleted remotely/
locally and pruned. Earlier PR58 main CI44300371531 also completed successfully;
its temporary branch is cleaned.

Actual production read acceptance at2026-11-19T01:14:00.077Z passed against backend
41c8cea: summary currency/UTC windows, legacy/lifetime alias and policy/null states
matched the contract. The saved access token was naturally expired (no substitution);
one refresh200 retained its original family/authTime after229973 seconds (about64
hours), with no primary login, business write or page error. The real account's
wallet read capability was enabled, so the disabled-export403 probe was expressly
skipped; no personal workbook was downloaded. Sanitized receipt:
`.codex-artifacts/gds-production/summary-read.json` under the shared parent.

P7.2 is now evidenced. P7.1 remains open for real versioned Admin ranking:
unconfigured/null is truthful presentation but not an implemented evaluator.
AFFILIATE-RANKING-CONTRACT.md defines explicit basis/period/tie selection, bounded
self-only ranks, old-revision compatibility and paired impact, now in development.
Final locale sampling also found known commerce/refund enums, confirmations and
historical membership copy that are being corrected separately. No full-plan
completion or financial activation follows from this release.

## Ranking and remaining locale candidate - 2026-11-19

Backend PR67 head4db0c64390db84e11785741f76725c34813f7f33 implements the
ranking contract. Admin explicitly chooses basis, UTC period and tie policy through
the existing version/impact/approval/effective-date workflow. Read-only bounded
population/source scans produce only the caller's rank; old immutable policies
normalize to disabled without being rewritten. General JWT identities and current
instructor-role boundaries are preserved. Reporting cannot activate funding,
credit wallets, grant quotas or alter purchased access.126 tests across8 focused
Jest suites, build and6 native-fixture guard tests passed. Independent source
review found no actionable defect. Native replay44471126151 passed with the
versioned_ranking/competition_ties/historical_sources/role_boundaries/future_policy
and immutable_reads marker. Head CI44471126300 and deployment remain required.

Frontend PR60 head3ef7ac4 adds the Admin controls, paired impact and self-ranking
states/provenance, plus remaining Commerce/refund/historical-order/Mentor/Jobs
VI/EN labels. Authored content and financial payloads are unchanged; card navigation
uses /membership-cards. A fresh review found an inherited-key crash in the impact
fallback; constructor/__proto__/toString regressions failed first, then passed
after an own-property check. Follow-up review closed the finding. The full163-file
Vitest suite passed743 tests, TypeScript and build passed.35 combined browser
cases passed in VI/EN across320/375/390/412/768/1024/1440px, including new ranking
save/preview and declined Commerce confirmations; no real API or financial write.
Both new suites are registered in shared responsive CI. Independent sampled
original-plan review identified no additional product gap beyond release/audit
reconciliation and the existing explicit provider/business prerequisites.

These are candidate receipts. Neither PR is described as deployed at this point;
the backend must deploy first, then frontend main checks, shipped-code acceptance
and merged temporary-branch cleanup must pass before final reconciliation.

Backend PR67 deployed as5e76fb87b26dbb20b3ab5fb757e1195d27c8b19c after its
head CI passed. Main replay44472083792 and deployment44472083448 passed; main
CI44472083621 is still running. Actual read-only production acceptance at
2026-11-19T06:29:57.766Z verified the extended unconfigured ranking metadata,
UTC/asOf consistency and absence of participant/score fields. Naturally expired
access refreshed200 in the same original family after248931 seconds (about69
hours), with no primary login, page error or business write. No personal export
was downloaded. Sanitized receipt: `.codex-artifacts/gds-production/ranking-read.json`.

A sibling legacy wallet browser assertion also expected the retired package link.
Test-only frontend heade9e308e0d3f34b7535d55d33aee2e5550df01bb6 updates that
one expectation to the card label/direct destination. All18 wallet browser cases
passed, including both fixture modes at seven widths and unavailable/loading/
large-amount states. Two existing unavailable-wallet cases emitted local Vite
proxy-refusal diagnostics for an unmocked /tmi/wallet read with no backend running;
their expected unavailable UI assertions passed. This is isolated fixture evidence,
not a claim of zero proxy diagnostics or a real provider/financial test. Final-head
CI and subsequent frontend deployment/shipped-code acceptance remain required.

Backend main CI44472083621 subsequently passed. With native main replay,
deployment, production read acceptance and tested-tree equality established, the
merged feat/affiliate-ranking-policy branch was deleted remotely/locally and
references pruned. No unique unmerged commits or worktree changes were discarded.

## Frontend release and isolated production fixture correction

PR60 final heade9e308e0d3f34b7535d55d33aee2e5550df01bb6 passed all four
CI44472655090 jobs and preview. Initial CI44471550734 failed the obsolete wallet
link assertion; the correction changed only that assertion. Merge
2295295c6f5135a0850a3eeda8f1d1d430e3de97 matches the tested tree. Main
CI44473316256 and deployment44473316233 passed. The merged
fix/commerce-system-locale branch was deleted remotely/locally after ancestry and
main gates, and references were pruned.

Production shipped-code acceptance passed49 cases, including all new ranking
Admin/self-only states, but7 Commerce cases failed before data load: the strict
fixture allowed only page-origin APIs while the production bundle uses the exact
separate API origin. This is retained as a failed receipt, not counted as success.
Test-only PR61 heade79c82e2fb64dc95321d5f0afebfecf046dc1b2f permits only
https://api.eduai.giaoducso.org.vn under /api/v1/ to enter existing synthetic
handlers; unknown endpoints/origins and non-GET requests still abort, never reach
the real API. Independent source review found no escape. The corrected7 cases
passed locally and against shipped JavaScript at all seven widths, including
VI-EN-VI, unchanged authored values and dismissed confirmations. Combined scoped
production fixture evidence is49 unchanged passes plus7 corrected passes, rather
than a claim that the initial56-case run passed. Logs are frontend ignored
`.git/gds-final-shipped.log` and `.git/gds-commerce-origin-shipped.log`.

No runtime product source changes in PR61. Its CI/merge/main gates and temporary
branch cleanup remain pending before final Workspace reconciliation.
