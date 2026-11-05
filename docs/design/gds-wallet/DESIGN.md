# EduAI wallet design — 2026-11-05

Daily-use wallet with restrained digital-art details. Follow the approved mobile
reference, existing typography and blue/navy/white theme; no new navigation.

## Tokens and layout
- Canvas #f6f8fc; surface #ffffff; navy #123052; action #0058be;
  body #14263b; secondary #627389; border #dde5ef.
- Max width1200px, mobile gutters16px, desktop gap24px. Desktop balance/actions
  left2/3, TMI/withdrawn right1/3; income/activity full width. Mobile balance →
  actions → debt if any → income if instructor → withdrawn → TMI → activity.
- Balance32..52px/tabular; body14..16px; touch44px; radius20/16/8px by hierarchy.
- Faint concentric lines confined to balance edge, no interactive decoration or
  overlap with text. Visible focus, wrapping filters and large monetary values.
- Reduced-motion removes non-essential transitions. No perpetual animation.

## States and content
Known zero is0; missing/error is em dash. Separate available funds, payment holds,
withdrawal holds and debt. Income failure retains usable balance. Topup entry →
exact QR awaiting → confirmed result; no success inferred from QR/redirect. Resume
pending intent; new intent after terminal result; uncertain creation retry keeps
same-amount idempotency key. Copy shows facts/status/action without internal names.

## Stitch review
Project7399384083603492623; desktop1233b196f7b644a4b73131a71cf1acd9,
mobile2b52747b617e496e8e83e18882a4b6f4, topup99658596c3fc4d34b496296fad364a1f,
states4fd1f79c6d2f43b9b37b0985ca7e8f4b. Root reviewed screenshots. Adopt hierarchy,
balance and actions. Reject generated escrow/guarantee/NAPAS, TMI conversion/expiry,
growth/dates/loans, invented navigation/payment choices/limits. Topup2000..10000000;
withdrawals remain configured. Manual names must not appear API verified.
