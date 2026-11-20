# Acceptance / QA

- [ ] Profile dropdown background matches legacy GDS gradient; new menu structure, actions, no UUID, accessibility retained.
- [ ] Point and credit metrics show on all student dashboard routes, including /profile, /wallet/gds, /billing, /support, /dashboard/tmi, with trusted amounts or explicit placeholder. Guest/role permissions respected.
- [ ] Single GdsPointMark component consistently renders actual `public/gds-point.webp` on account top bar, Wallet and Rewards. No image distortion.
- [ ] Wallet retains balances, ledger/withdrawal/card actions and real status messages; GDS color/contrast reviewed.
- [ ] Rewards catalog, history, redemption confirmation and empty states work, no fake rewards.
- [ ] Support request filters, privacy, create/detail dialogs, API status and image upload preserved. Disabled mode still enforced.
- [ ] Applications, Mentor Directory, Mentor Bookings keep access controls, search/booking/cancellation status; empty-state CTAs useful.
- [ ] VI/EN and keyboard/focus; responsive 320, 375, 768, 1024, 1440, 1920; no overflow. Screenshots before/after.
- [ ] Frontend lint, TS, unit, build, responsive/PWA/checkout browser CI exact SHA all PASS.
- [ ] PR reviewed, merged to dev after gate; main/production only after explicit owner approval and deploy verification.

Keep this phase separate from UXR-01 and unrelated running phases. No force pushes, no real transactions during UAT.
