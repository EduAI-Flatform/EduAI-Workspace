# GDS source integration receipt

Updated: 2026-11-12 (Asia/Saigon). Status: VERIFYING. This receipt does not authorize production changes.

## Requirement coverage

| Requirement | Source implementation / evidence |
|---|---|
| GDS identity | Official GDS logo, Be Vietnam Pro local fonts, shared brand component, PWA icons and manifest; configurable branding palette and imagery |
| Landing page | Required English headline and description, Vietnamese counterpart, GDS hero illustration; no invented metrics |
| Navigation | Eight configured destinations, account/language/notification controls, PWA install flow, revenue last in sidebar |
| VI/EN | Shared catalog and system-text boundary; locale-aware presentation formatters; author/user content preserved |
| Sessions | Independent refresh tokens, atomic rotation, cross-tab coordination, network retry; 30-day refresh lifetime |
| Admin configuration | Eight typed groups, validation, immutable revisions, impact preview, approval, effective date, cancellation and restoration through a new revision |
| Profile | Cover/avatar, account ID, Bio, own posts, common authenticated profile for all roles |
| Billing | Buyer-owned history, date/status filters, order detail, invoice request and Admin intake |
| Security settings | Local/Firebase password change, TOTP enrollment/challenge, recovery codes, session revocation |
| Support | Owner/Admin conversations, status workflow, validated private image upload and attachment retrieval |
| Course authoring | Restricted rich text, backward-compatible plain text, authorized draft preview, existing lesson/quiz linkage and post-video prompt |
| Partners / activities | Configured partners/categories, applications, Admin processing, community link and configured events/competitions |
| Membership cards | Configurable Member/Golden/Platinum classification and real settled-spend impact evaluation; old package sales retired; historical entitlements retained |
| Affiliate | First-touch attribution, policy-versioned accrual, filters/export, QR links, existing GDS wallet adapter and existing manual withdrawal flow |

The code retains historical packages, purchases and entitlement structures deliberately. Their removal requires data migration/reconciliation evidence; table names are not sufficient evidence for deletion.

## Design and assets

Stitch project: `7305056649090413856`. Reviewed designs:

- Admin configuration: `6eb089863c41422894a8a70a2e5e6f96`.
- Profile: `f91e6e90c194444b8a618ece1251de09`.
- Support: `ecf69e8ccd8d4fbfabe1d648926db601`.
- Course authoring: `4fd1e032a8cd42dda2741e21aca0a388`.
- Activities: `75977d714d2848beb39001f96534ac6a`.

Official logo source: `https://giaoducso.org.vn/images/250/21547324/LOGOGIAODUCSOchinhthucquynh-SjepN1CvpsYg3U8NA-yl9w.png`, saved as frontend `public/gds-logo.png`.

Brand tokens: `#E71F69`, `#4700F4`, `#00A89F`, `#D9D9D9`, `#7A8AD9`, `#6EEDC7`, `#FFA7C8`, `#A97DFF`. Semantic status colors remain meaningful. Admin-selected primary colors receive a computed contrasting foreground.

Generated raster artwork originals are retained under `C:/Users/tantr/.codex/generated_images/01a1ca1f-c1ad-7a81-a35a-f8d9973779c2/`:

- Hero: `exec-fc853576-043c-411b-a3d1-021acfe8d56f.png`, optimized to `public/gds-hero.webp`. Direction: clean curved violet/blue open-book sculpture, spacious white composition matching the supplied reference.
- Assistant: `exec-52a5db97-7730-43c0-b035-353bf096db7d.png`, optimized to `public/gds-assistant.webp`. Direction: friendly silver GDS astronaut mascot with iridescent helmet, transparent background.
- Point: `exec-134ca84a-1d09-432b-bb60-dd329506146f.png`, optimized to `public/gds-point.webp`. Direction: silver GDS coin based on the supplied point reference, transparent background.

These illustrations are separate from the official logo. Generated design examples containing invented metrics were not implemented.

## Verification boundaries

Source checks use Vitest, TypeScript/Vite, Jest/Nest, disposable PGlite and synthetic Playwright API responses. Browser fixtures do not prove production integrations or current production data migration safety.

Responsive targets: 320, 375, 390, 412, 768, 1024 and 1440 px. Browser suites cover public branding/configuration, account/support, MFA, course preview/video quiz, cards and affiliate. Screenshots are local artifacts, not product data.

Detailed account and course evidence: [ACCOUNT-PAGES.md](ACCOUNT-PAGES.md), [COURSE-AUTHORING.md](COURSE-AUTHORING.md). Final integration counts and outstanding source-control checks belong in the terminal receipt below.

## Release prerequisites

- Apply additive schema migrations with the approved migration role after backup/rehearsal; update runtime privileges with the existing helper.
- Provision the MFA encryption key through the existing secret workflow; absence keeps enrollment unavailable.
- Obtain Admin approval and effective dates for actual card/affiliate business policies. Defaults do not invent financial terms.
- School API/point adapters, top-up qualification and sub-affiliate remain disabled until their contracts/policies exist.
- Existing GDS wallet capabilities and processing switches still govern money operations. Invoice requests do not imply a connected invoice provider.
- Complete historical entitlement/package migration and reconciliation before deleting obsolete schema.
- Preserve the canonical financial release gate `SPR25-007`; no production deploy, live transfer, actual database migration or destructive cleanup was performed.

## Terminal receipt

Verified integration results:

- Frontend: 131 Vitest suites, 593 tests passed; TypeScript and production Vite build passed. Build retains the existing large-chunk advisory.
- Backend: 223 Jest suites, 1,835 tests passed; Nest build passed. Sandboxed listener/junction permission failures were resolved by running the same checks with the approved test permissions, without changing assertions to suppress failures.
- Disposable finance migration checks: four suites, 51 tests passed; runtime privilege checks: eight tests passed. Platform-policy and MFA disposable checks were also validated separately.
- Synthetic Chromium: Admin/public branding two tests, account/support across three roles and seven widths 21 tests, MFA eight tests, course authoring eight tests, cards/affiliate including reused withdrawal form seven tests.
- Reviewed support attachment screenshot at 320 px and affiliate withdrawal screenshot at 320 px. Both remain constrained to the viewport with scrollable dialogs.
- Independent affiliate security review found and resolved a refund-before-spend race: finance lock precedes recovery/order locks, recovery-only negative effects remain available during processing pauses, positive credits remain blocked during pause. Runtime trigger execution grants were also restricted and tested.
- Staged source scans found no private-key or live-token signatures; actual environment files were excluded.

Backend source checkpoint: `4c5e79e14bfa497a82dbebd1394680a1a7116817`. Frontend asset checkpoint: `25d34d7`; integrated UI: `8dbe8a3bbe2f4b985d3cf152529bca6ef0dc2855`.

Both source branches were pushed to `origin/feature/gds-platform`. `git ls-remote` matched the local HEAD exactly for each repository, and both working trees were clean after push.

Source-control delivery remains VERIFYING. Git transport is available, but portable GitHub CLI has no authenticated account and local browser access is disabled. Automatic approval rejected extracting Git's stored credential for API use because that credential access was not specifically authorized. No attempt was made to bypass the rejection. PR/CI/merge verification and eventual merged-branch cleanup require an approved authenticated GitHub interface. No branch has been merged or deleted.
