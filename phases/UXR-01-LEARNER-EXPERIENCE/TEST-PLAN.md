# UXR-01 validation plan

Unit/regression:
- Header labels and destinations under default and API-supplied old navigation.
- StudentSidebar grouping and absence of redundant destinations.
- Route mapping for /billing, order details, /profile, /wallet/gds, /membership-cards, /settings, /support.
- Public guest /certificates: sign-in/verification only; authenticated certificate view.
- Student/instructor/admin role-based routing unchanged.
- Scroll: PUSH, REPLACE, POP, hashes, repeated navigation and nested containers.
- Shared dropdown keyboard/outside interactions, locale persistence (UXR-01B).
- Modal create/edit/cancel/validation/focus (UXR-01C).
- Billing, Wallet and Membership regressions (UXR-01D).

Runtime:
- Existing Chrome session only; do not start another browser/profile.
- Desktop/mobile widths: 320, 375, 768, 1024, 1440 and 1920 px.
- Screenshot before/after, keyboard accessibility, contrast WCAG AA, no horizontal overflow.
- CI status and exact SHA required before merge.

## Observed evidence — 2026-11-18

- Frontend implementation draft: https://github.com/EduAI-Flatform/EduAI-Front-End-Web/pull/54
- Workspace dossier draft: https://github.com/EduAI-Flatform/EduAI-Workspace/pull/65
- Initial Frontend CI run 44240830519: 680/682 unit tests passed; 2 failed (undefined user.roles in mocked session, and font-weight 750 violating mobile token guard). Build skipped in that job.
- Both identified failures were patched on the feature branch; latest observed SHA `9b93aa360887e5a433fc8620fd63b2ffb37167b7`, re-run 44241371504 **IN_PROGRESS**, not PASS.
- Browser UAT using existing Chrome: NOT RUN. Connected browser tool is read-only and cannot perform interactive UAT.
- Stitch design review: NOT RUN; Stitch MCP unavailable in this environment.
- Merge/deploy: NOT DONE. Both PRs remain DRAFT pending mandatory gates.

Never infer successful checks from a prior, different commit.


## Further observed evidence
- Repaired earlier source scanner errors for unlocalized literals in new dropdowns and header.
- Legacy synthetic browser tests updated for account-profile modals and locale dropdown.
- Added `playwright/uxr-navigation.spec.ts` for public routes, student account shell, locale, profile dialog, responsive widths (including 1920px), and scroll restoration. Registered in GDS CI test list.
- An earlier SHA (`2391d4802`) passed unit/build and embedded checkout but failed GDS browser due old language select tests. Later UI changes require new complete run.
- Current integration head latest observed: `c522fd19615553374b05f7a0e1b16ea558425b4f`. Latest CI **QUEUED** at last check; no latest-head PASS assertion.
- All code remains only on a draft Frontend PR. Stitch review and interactive existing-Chrome UAT remain unavailable.

## Integration checkpoint

- Frontend PR #54 latest observed head `b9f32e0d2c1ff777cae3a44791dea241d535bb8f` (profile cancel regression included).
- Latest-head GitHub Actions run: [#44246845713](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/44246845713), state **QUEUED** when observed. No conclusion or release claim.
- Unit/build and checkout had earlier green results on older SHAs; these are not substitutes for exact-head gates.
- Frontend PR and Workspace PR remain DRAFT; no main/prod changes after dev fast-forward baseline.

## Verified exact-head CI PASS — 2026-11-18
- Frontend commit: `f067a8c59721c73e2b5717b2a305869c35820cda`.
- GitHub Actions run: https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/44258089080
- Test/build frontend: **SUCCESS**.
- PWA Chromium/WebKit browser smoke: **SUCCESS**.
- Embedded checkout and wallet browser regression: **SUCCESS**.
- GDS responsive browser scenarios: **SUCCESS**.
- Screenshot evidence: https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/44258089080/artifacts/14407600811
- Reviewed screenshot samples: student Billing and Profile, 375px and 1440px. Existing user data in screenshots synthetic.
- Financial API contracts/payment logic untouched; code only in Draft PR #54.
- Interactive existing-Chrome UAT: **NOT RUN**. Stitch MCP review: **NOT RUN**. Thus phase remains **VERIFYING**, not DONE, and merges remain blocked pending required review.
