# UXR-01 tasks

## 01A — Navigation and shell
- [x] Baseline source and branch comparison
- [x] Safe fast-forward of Frontend dev and Workspace dev
- [x] Public study and certificate routes staged on feature branch
- [x] Student sidebar sections and duplicate removal staged
- [x] Embed student account pages inside dashboard shell staged
- [x] Back/forward scroll manager staged
- [x] Verify React/TypeScript/unit/build/CI on exact head `f067a8c5`
- [x] Synthetic Chromium browser route and responsive regression at CI widths; manual Chrome UAT pending
- [ ] Stitch-based design review (unavailable in this execution environment)
- [ ] PR review, gate and merge

## 01B — Shared menus
- [x] Shared account menu, avatar, mobile behaviour — implemented and CI-tested
- [x] Accessible shared locale dropdown, language persistence — implemented and CI-tested

## 01C — Dashboard/Profile
- [x] Lean dashboard cards and purposeful actions — implemented
- [x] Profile summary cards and modal forms — implemented and CI-tested
- [x] Remove duplicate progress, certificates and financial blocks — implemented

## 01D — Commerce account UI
- [x] Billing localization and cohesive order/invoice UI — implemented and CI-tested
- [x] Membership cards — GDS styles and responsive automated regressions PASS
- [ ] End-to-end regression and rollout evidence


## Integrated implementation progress — 2026-11-18
**Frontend draft PR #54** contains source changes for all four subphases:
- 01A staged: independent public learning/certificates, grouped student/instructor navigation, embedded account pages, route scroll.
- 01B staged: shared account and locale menus; keyboard and language test updates.
- 01C staged: simplified dashboard, profile summary cards and editable modals, duplicate panels removed.
- 01D staged: GDS billing/membership styling, billing filter reset, synthetic browser regression.
- Exact-head tests, visual UAT, accessibility review, Stitch design review, PR merge and release remain pending. No phase can be marked DONE yet.

## Final automated verification snapshot (2026-11-18)
- [x] Frontend CI #44258089080 (exact SHA `f067a8c59721c73e2b5717b2a305869c35820cda`): all 4 jobs successful.
- [x] Screenshot artifact #14407600811: role-specific account pages at 320–1440px (includes student Profile and Billing), archived 7 days.
- [x] Reviewed representative student Billing/Profile screenshots at 375px and 1440px.
- [ ] Stitch design review (required; no Stitch MCP in this session)
- [ ] Interactive authenticated Chrome UAT on existing browser (tool access read-only)
- [ ] PR review, merge, production owner approval and deployment
