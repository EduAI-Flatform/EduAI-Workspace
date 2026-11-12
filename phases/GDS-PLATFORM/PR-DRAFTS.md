# Prepared GDS pull request descriptions

These are reviewable descriptions, not records of opened PRs.

## Backend

Title: `Add versioned GDS platform policies and workflows`

Adds typed Admin configuration with immutable revisions, validation, impact preview, approval and effective dates. Integrates account security/MFA, private support images, invoice/partner intake, authorized course preview, card classification and policy-versioned affiliate attribution with the existing GDS wallet. Old package sales stop while historical purchases and access remain available.

Affiliate credits use proven remaining platform-fee capacity after seller entitlements. Canonical refunds recover before spending or withdrawal, including negative recovery during processing pauses; existing debt blocks new spending. No production migration, provider activation or actual transfer is included.

Validation: 223 Jest suites / 1,835 tests, Nest build, four disposable finance migration suites / 51 tests and eight restricted-privilege tests passed. Separate platform/MFA disposable migration checks also passed. Apply additive migrations and restricted grants only through the existing release procedure; `SPR25-007` remains authoritative.

Branch: `feature/gds-platform`; HEAD: `4c5e79e14bfa497a82dbebd1394680a1a7116817`.

## Frontend

Title: `Integrate GDS branding and configurable bilingual workflows`

Uses the official GDS logo, supplied palette, local Be Vietnam Pro fonts and optimized hero/assistant/point artwork. Integrates configured navigation, VI/EN system UI, Admin policy lifecycle, profile/Billing/settings/support, MFA, course authoring/preview/video quiz, partner/activity pages, membership cards and affiliate with the existing manual withdrawal flow. User-authored content remains unchanged by locale switching.

Validation: 131 Vitest suites / 593 tests, TypeScript and Vite production build passed. Synthetic Chromium checks cover seven responsive widths, three account roles, image preview, configuration lifecycle, MFA, course preview/quiz and affiliate withdrawal. These fixtures do not establish production data or provider readiness. Backend GDS endpoints and additive schema changes must be available before enabling the new business flows.

Branch: `feature/gds-platform`; HEAD: `8dbe8a3bbe2f4b985d3cf152529bca6ef0dc2855`.
