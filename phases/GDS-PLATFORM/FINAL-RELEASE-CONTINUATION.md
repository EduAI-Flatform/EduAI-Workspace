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
