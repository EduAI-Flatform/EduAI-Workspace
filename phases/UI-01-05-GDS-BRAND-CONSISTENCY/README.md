# UI-01–UI-05 — GDS brand consistency (2026-11-20)

Owner requests a focused visual follow-up after UXR-01 production delivery. Frontend first. No API, database, wallet ledger, PayOS, Firebase, identity/authorization or data changes.

## Contract
- **UI-01 Account dropdown**: retain the new dropdown composition (name/email, menu items, no UUID); restore the older gradient token `--gds-gradient-iridescent` for background; use shared component public/dashboard.
- **UI-02 Dashboard balances**: show trusted GDS Point and GDS credit metric links across account routes, including Profile, Billing, Wallet and Support. No fabricated amounts; existing service contracts and unavailable semantics preserved. Use supplied artwork `public/gds-point.webp`.
- **UI-03 Wallet**: bring wallet summary and GDS Point panel into GDS violet/teal visual system, while keeping balance authority checks and topup/withdrawal/payment flows unchanged.
- **UI-04 Rewards**: prominently use GDS Point artwork; short copy, clear cards, rewards/ledger grounded in existing API and meaningful empty states.
- **UI-05 Support + Career**: cleaner hierarchy, concise descriptions, icons, better empty states/CTAs for Support, Applications, Mentor Directory and Bookings, without hiding essential warnings or changing workflows.

## Delivery
Frontend integration: `feat/ui-01-05-brand-consistency`, [PR #62](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/pull/62) targeting `dev`.

Status: **IMPLEMENTED / CI-VERIFIED / DEPLOYED** on 2026-11-20. Source merged in Frontend PR #62. Exact production-head CI and VPS deploy both SUCCESS; automated Chromium screenshots reviewed. This is CI-based visual evidence, not a claim of a fresh manual authenticated-browser UAT.

Production deployment verified at GitHub Actions run #44665567793 on approved Frontend main SHA `ce101cd58e9a6ca2fc238aacb1660d62f93d5b67`. Backend, database and provider configuration unchanged.
