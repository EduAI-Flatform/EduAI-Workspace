# Instructor lesson heading typography

Original audit item P0.5 identified a remaining Plus Jakarta Sans/Inter override
in `InstructorLessonManagementPage.css`. Frontend PR46 replaces that single
declaration with the shared `--font-sans` token, whose first face is the supplied
local Be Vietnam Pro font. Layout, content, API contracts and permissions remain
unchanged. This small token correction retains the existing approved surface and
does not require a new Stitch design.

Tested source: `18859131b5701fcc3720a0bcfbd54e8c655a6b87`. TypeScript/Vite build
passed. DevTools observed the actual loaded font and Vietnamese heading. Its
window-resize tool has a500px minimum; that observation was not counted as mobile
coverage. A separate synthetic-only Chromium check verified exact inner widths
320/375/390/412/768/1024/1440 in both VI and EN: loaded Be Vietnam Pro, heading
within viewport, no body overflow, page errors or API writes. All API responses
were controlled fixtures; no real account data or financial operation was used.

Final-head CI43793426379 passed all quality, PWA, GDS responsive and embedded
checkout jobs; Vercel preview also passed. PR46 merged as
`5f7c47cfe58f2008648a852cacbcd53a292a5ff1` after exact-head checks, with the fetched
main tree and ancestry verified against the tested source. Main
[CI43793888988](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/43793888988)
and [deployment43793888926](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/43793888926)
passed. The same exact-width VI/EN Chromium acceptance passed against the deployed
site, using synthetic-only state and intercepted APIs: the actual served bundle
loads Be Vietnam Pro without heading clipping, body overflow, page errors or
production writes. This is deployed frontend evidence, not authenticated backend
integration. After rechecking the exact remote-main tree/ancestry, the merged
`fix/gds-lesson-heading-font` branch was deleted remotely/locally and refs pruned.

This resolves the confirmed font exception only. Broader original typography,
title alignment/spacing and whole-system VI/EN review remain scoped audit work;
the overall GDS plan remains VERIFYING.
