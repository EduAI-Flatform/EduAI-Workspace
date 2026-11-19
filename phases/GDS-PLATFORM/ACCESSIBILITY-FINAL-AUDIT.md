# GDS accessibility: final scoped disposition

Checkpoint:2026-11-18. This receipt supplements the original-plan R08 audit.
It distinguishes actual browser evidence, shared-component reasoning and states
that remain outside the checks. It is not a WCAG certification.

## Automated baseline and corrections

The retained artifact-only axe matrix covers14 surfaces, VI/EN and widths
320,375,390,412,768,1024,1440px:196 cases. After accessible-name and header-target
corrections, it has zero determinate violations, zero fixture gaps, zero document
overflow and186 cases containing at least one incomplete result. An incomplete
result is neither an automatic failure nor an automatic pass.

The source correction makes Support detail and affiliate-history filter names
include their visible localized labels; header navigation targets are at least24px.
Shared Modal restores external opener focus while preserving native Radix
triggers, nested dialogs, unavailable targets, newer dialogs and combobox Escape.
The registered14-case browser regression checks VI/EN at all seven widths,
including Tab/Shift-Tab trapping and Escape/Cancel/Close restoration. Independent
source review inspected actual installed Radix composition and found no issue.
Frontend PR55 was subsequently released: main7375883, main CI44256403679 and
deployment44256403870 passed;14 tests against shipped JavaScript passed and the
temporary branch was cleaned. Exact full merge SHA belongs in the final release
state receipt. This does not include the later named-group change below.

Two further semantic defects were confirmed: achievements and course-status
clusters had aria-label on generic divs, so their intended names were absent from
the accessibility tree. Adding role=group exposes those existing names without
changing child content or action payloads. A failing regression preceded the fix;
two focused unit files/three tests now pass. Targeted real Chromium accessibility
tree and ARIA-rule checks pass28 cases: two groups, VI/EN and all seven widths.
The durable `gds-accessible-groups.spec.ts` regression additionally passes14
Chromium cases, each visiting Profile and the authoring list. It asserts named
groups, child counts/pressed state, unchanged authored identity and zero unknown
APIs, business writes, runtime errors or document overflow. Its artifact harness
first had a mismatched local base port; correcting that tooling configuration
produced the14 passing cases without any product workaround.
These source changes still require the normal PR/main/deployment gates.

## Manual disposition of incomplete families

| Family | Evidence and disposition |
|---|---|
| Color gradients, short metric text and empty inputs | Targeted computed-style snapshots at all seven widths across Home, Profile, authoring list/create, Admin branding and Support create.911 sampled nodes;873 meet conservative bounds, minimum4.801862:1. Bounds treat gradient RGB as the full possible gamut and bound only alpha over actual ancestor backgrounds; they do not assume endpoint RGB is the worst interpolation. Short counts are actual text. Inputs contain synthetic values before inspection. |
| Opaque gradients that the gamut bound cannot resolve |56 background-only text-range raster samples: Profile primary button and three Admin preview text selectors, both locales/all seven widths. Profile minimum5.043265:1; preview heading15.085712:1; preview strong/paragraph15.307043:1. Text transparency is temporary and restored; measurements use actual foreground and background pixels under the text range. All38 unresolved computed-style occurrences have a corresponding raster selector/locale/width. |
| Fixed mobile navigation overlap | Ordinary390px viewport at top/middle/bottom in VI/EN, rather than full-page screenshots: all sampled link centers hit their own controls. Computed96%-white navigation backdrop gives at least8.639:1 for its dark text even over arbitrary content behind it. This color bound generalizes to the same shared CSS on other routes; their every overlap geometry was not individually re-sampled. |
| Isolated320px overlap flags | Existing initial/centered viewport observations for VI Home outline CTA and EN withdrawal outstanding-debt label show all three sampled points inside their own element. Actual solid-white ancestor composition gives8.157718:1 and9.435091:1 respectively. |
| Generic div names | Fixed as named groups above. Targeted ARIA checks now have zero violations or incomplete results in those two clusters. |
| Closed notification aria-controls | In sampled VI/EN Profile, opening through keyboard produces expanded=true and a real matching named dialog ID/role in the accessibility tree. The closed popup is unmounted; that closed-state axe uncertainty is not evidence of a missing open association. |
| Radix aria-hidden root and focus guards | Registered14-case keyboard regression proves focus remains inside the open Support dialog and returns after close at all seven widths/both locales. A separate manual20-key sequence in each locale also stays within the dialog with no hidden ancestor. An immediate post-Escape snapshot occurs before Radix asynchronous focus restoration and is not used as a restoration verdict. |

Whole-input screenshot contrast is expressly rejected as text evidence: borders
and decorations produce a minimum1.922668:1 outside the glyph footprint. That is
not a demonstrated text failure. Actual entered-text computed foreground and
solid/alpha-composited backgrounds are used instead.

The original80 color selector/reason cases represent68 distinct selectors; every
selector has sampled manual evidence. The extra seven-width run improves the
prior390/768/1440 sample to every required width for the six named states above.
It does not claim that every repeated selector occurrence in every other route
was individually re-measured. Shared header/sidebar/preview CSS and conservative
unknown-background bounds support the repeated-component disposition; route
specific keyboard and responsive suites remain separate evidence.

## Reproduction artifacts and limits

All files below live under the shared parent directory
`.codex-artifacts/gds-a11y-tooling/results-fixed/`:

- `matrix.json`, `manual-review.json`: retained196-case results and exact incomplete targets.
- `manual-final-seven-widths.json`:104 records including84 locale/state/width snapshots and12 runtime receipts. Every runtime receipt has no unknown API, attempted business write or external traffic.
- `contrast-bounds-final-seven-widths.json`:911 measured nodes and conservative calculations.
- `raster-final-seven-widths.json`:76 records, including56 admissible text-range gradient samples,14 inadmissible whole-input raster observations and6 ordinary-viewport nav observations.
- `manual-extra.json`, `contrast-bounds-with-extra.json`: the two isolated320px overlap checks and earlier sampled families.
- `group-final-verification.json`:28 named-group accessibility-tree/targeted-rule cases.

Reproduction scripts use actual product Vite configuration with an artifact-only
no-env override, synthetic API fixtures, blocked business mutations and owned
localhost port5202. Each owned browser/context/server closes in finally. Product
dependencies, credentials, policies and production data are unchanged by tooling.

The matrix covers Home, Profile, Settings, Billing, Support list/create,
affiliate Dashboard/Withdraw/Performance, Admin branding/impact/course settings
and instructor authoring list/create. Provider activation, enabled withdrawal
bank forms, every role permutation, video caption content, hover/focus contrast
for every component and actual screen-reader speech are outside this matrix.
Relevant existing feature-specific acceptance remains required; no broad claim
about those unsampled states follows from these measurements.
