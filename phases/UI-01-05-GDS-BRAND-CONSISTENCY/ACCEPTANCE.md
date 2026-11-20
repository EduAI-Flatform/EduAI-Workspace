# Acceptance / QA

- [x] Profile dropdown background matches legacy GDS gradient; new menu structure, actions, no UUID, accessibility retained.
- [x] Point and credit metrics show on all student dashboard routes, including /profile, /wallet/gds, /billing, /support, /dashboard/tmi, with trusted amounts or explicit placeholder. Guest/role permissions respected.
- [x] Single GdsPointMark component consistently renders actual `public/gds-point.webp` on account top bar, Wallet and Rewards. No image distortion.
- [x] Wallet retains balances, ledger/withdrawal/card actions and real status messages; GDS color/contrast reviewed.
- [x] Rewards catalog, history, redemption confirmation and empty states work, no fake rewards.
- [x] Support request filters, privacy, create/detail dialogs, API status and image upload preserved. Disabled mode still enforced.
- [x] Applications, Mentor Directory, Mentor Bookings keep access controls, search/booking/cancellation status; empty-state CTAs useful.
- [x] VI/EN and keyboard/focus; responsive 320, 375, 768, 1024, 1440, 1920; no overflow. Owner-supplied before screenshots and reviewed automated after screenshots.
- [x] Frontend lint, TS, unit, build, responsive/PWA/checkout browser CI exact SHA all PASS.
- [x] PR reviewed, merged to dev after gate; main/production only after explicit owner approval and deploy verification.

Keep this phase separate from UXR-01 and unrelated running phases. No force pushes, no real transactions during UAT.

## Final acceptance evidence — 2026-11-20

- **Frontend PR:** https://github.com/EduAI-Flatform/EduAI-Front-End-Web/pull/62 — MERGED, merge SHA `ce101cd58e9a6ca2fc238aacb1660d62f93d5b67`.
- **Source CI on PR head:** https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/44663971342 — 4/4 SUCCESS on `4667fc2f0f641ba667953e45bb9b5775fed6d71a`.
- Merge result tree was verified identical to the already tested PR source tree.
- **Main branch CI on exact deployed SHA:** https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/44665567675 — 4/4 SUCCESS.
- **Production deploy on exact SHA:** https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/44665567793 — SUCCESS, including frontend build/tests, SSH and VPS deploy steps.
- **Browser screenshot artifact:** https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/44663971342/artifacts/14597786174 — screenshot capture of Wallet, Rewards, Support, Applications, Mentors, Mentor Bookings at 375 and 1440px. Samples reviewed visually.
- New icon component `GdsPointMark` uses actual `public/gds-point.webp` in top account bar, Wallet and Rewards; menu retains original `--gds-gradient-iridescent` while preserving new structure.
- The top bar displays *trusted/placeholder* balances on learner account routes. Instructor-only detail routes preserve prior wallet polling behavior. Financial operations unchanged.
- **Front-end main = dev:** `ce101cd58e9a6ca2fc238aacb1660d62f93d5b67`.
- Verified: automated CI, Chromium synthetic regression and UI screenshots. **No additional claim of interactive authenticated Chrome UAT** was made; evidence is automated.
- No real transactions, API contract changes, DB migrations, PayOS or Firebase updates in UI-01–05.

Status: **DONE — source changes merged, CI 4/4 PASS on production SHA, VPS deployment SUCCESS, phase record closed.**
