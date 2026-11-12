# Prepared GDS pull request descriptions

These prepared descriptions are reflected in the open backend/frontend PR #31. Final CI and source-control status is recorded in IMPLEMENTATION-RECEIPT.md.

## Backend

Title: `Add versioned GDS platform policies and workflows`

Adds typed Admin configuration with immutable revisions, validation, impact preview, approval and effective dates. Integrates account security/MFA, private support images, invoice/partner intake, authorized course preview, card classification and policy-versioned affiliate attribution with the existing GDS wallet. Old package sales stop while historical purchases and access remain available.

Affiliate credits use proven remaining platform-fee capacity after seller entitlements. Canonical refunds recover before spending or withdrawal, including negative recovery during processing pauses; existing debt blocks new spending. No production migration, provider activation or actual transfer is included.

Validation: 223 Jest suites / 1,835 tests, Nest build, four disposable finance migration suites / 51 tests and eight restricted-privilege tests passed. Separate platform/MFA disposable migration checks also passed. Apply additive migrations and restricted grants only through the existing release procedure; `SPR25-007` remains authoritative.

Final PR CI passed, including the real 65-baseline / 22-upgrade PostgreSQL replay. Source merge is held because `EDUAI_AUTO_CD_ENABLED=true` triggers production deployment. Production role grants remain a separate reviewed release prerequisite.

Branch: `feature/gds-platform`; HEAD: `777eb5f1ccd05e0e0df5499bbabf22183fcf2347`.

## Frontend

Title: `Integrate GDS branding and configurable bilingual workflows`

Uses the official GDS logo, supplied palette, local Be Vietnam Pro fonts and optimized hero/assistant/point artwork. Integrates configured navigation, VI/EN system UI, Admin policy lifecycle, profile/Billing/settings/support, MFA, course authoring/preview/video quiz, partner/activity pages, membership cards and affiliate with the existing manual withdrawal flow. User-authored content remains unchanged by locale switching.

Validation: 132 Vitest suites / 599 tests, TypeScript and Vite production build passed. Final remote CI also passed 46 GDS browser scenarios, 28 PWA scenarios with two existing platform skips, 101 checkout scenarios and 25 receipt scenarios. Profile membership/referral display uses GET only. These fixtures do not establish production data or provider readiness. Backend GDS endpoints and additive schema changes must be available before enabling the new business flows. Source merge remains held because main automatically deploys production.

Branch: `feature/gds-platform`; HEAD: `12e8b9ef41179ccdad6d6b08b943ea305e168784`.
