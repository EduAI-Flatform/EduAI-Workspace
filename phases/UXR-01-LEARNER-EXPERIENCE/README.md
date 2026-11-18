# UXR-01 — EduAI navigation and learner experience

Owner-initiated 2026-11-18. Scope: user-facing public navigation, student Dashboard/Profile, shared header/account/language menus, Billing/Membership UI and regression coverage. Frontend-first; no API schema, database, auth, payment, wallet ledger or financial state changes.

## Delivery sequence

- UXR-01A — public vs account navigation, safe route compatibility, grouped student sidebar, account layout and scroll position.
- UXR-01B — shared account menu and language dropdown, responsive and keyboard/accessibility validation.
- UXR-01C — lean dashboard and profile summary cards, modal/drawer editing, no duplicate panels.
- UXR-01D — localized Billing and membership presentation, responsive, full regression/UAT.

Each subphase: inspect → approved design review → implement → tests/CI → browser UAT → PR → merge after gate → evidence → cleanup. Never report PASS without evidence.

## Baseline

At phase preflight, Frontend main was 49 commits ahead of dev (dev behind=49, ahead=0), Workspace main was 68 commits ahead of dev. Both dev branches were fast-forwarded safely to their main SHAs. No open PR was reported for either repository. Development was started on Frontend `feat/uxr-01a-navigation-shell`.

## Active findings

- Public learning navigation used /dashboard; certificate navigation used /dashboard/certificates.
- Student Sidebar exposed 21 items and mixed public and personal destinations.
- Billing, Wallet, Membership, Settings, Support and Affiliate were standalone routes using a separate header.
- Public Header and DashboardAccountBar use different account and locale UI.
- Platform Settings API can supply legacy navigation paths.
- AppFrame did not centrally restore scroll on navigation.

## Rules and dependencies

Existing current phase and financial records remain authoritative; do not edit them. Preserve role-based restrictions. Public /certificates must never expose user-specific data without auth. Existing deep links must remain valid. Use verified CI and browser evidence as quality gates. Follow Workspace Stitch-first UI policy; Stitch integration is not available in the current connector environment and this must not be marked as completed.

Status: VERIFYING for UXR-01A–D implementation; exact-head CI and Chromium browser regression PASS, but mandatory Stitch MCP design review and interactive existing-browser UAT not completed. PRs are unmerged; production untouched.
