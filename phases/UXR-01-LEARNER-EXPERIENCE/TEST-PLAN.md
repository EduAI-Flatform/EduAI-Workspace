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

State at initial implementation: tests NOT RUN, browser UAT NOT RUN, visual Stitch review NOT RUN.
