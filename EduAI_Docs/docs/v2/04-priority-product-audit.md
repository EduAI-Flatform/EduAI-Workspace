# Priority Product Track Audit

Date: 2026-08-18

This audit converts the Product Owner request into repository-backed gaps. The
attached screenshots are UX references only; no CreativeHub branding, assets,
or source code are in scope.

## Current repository findings

### Mobile UX and navigation

- `EduAI-Front-End-Web/src/components/layout/header.tsx` already exposes
  `/courses`, `/community`, and protected `/ai` navigation items.
- A fixed mobile navigation exists in `header.css`, but it declares four grid
  columns for three links. Active state uses exact pathname equality, so nested
  routes do not remain active.
- The mobile bar has a 56px minimum link height and safe-area padding. Existing
  footer compensation reduces overlap risk, but route-level regression coverage
  for the mobile bar is missing.
- Typography, icon dimensions, spacing, and touch-target values are mostly
  local hard-coded values rather than a documented mobile token set.

### Course data and pricing

- The Backend already has a guarded development/demo seed flow:
  `npm.cmd run db:seed:demo` and `npm.cmd run db:verify:demo`.
- The current contract covers 10 published public AI courses, 40 lessons,
  thumbnails, video/PDF/article lesson types, enrollments, progress, reviews,
  quizzes, assignments, classrooms, library, community, and certificates.
- Course prices are stored as minor units plus ISO currency and the frontend has
  a VND formatter. The current course contract has no original-price,
  discount, voucher, or scholarship state.
- The current demo contract has no course category dimension and all ten seeded
  courses are paid; free/discounted pricing scenarios are therefore gaps.

### Voucher, scholarship, and TMI

- Repository search found no EduAI voucher/coupon, scholarship, reward, wallet,
  points ledger, order, or payment domain.
- The current architecture must not pretend that payment/order infrastructure
  exists. Voucher and scholarship work therefore starts with explicit domain
  decisions and must remain compatible with the existing course/enrollment
  model.
- TMI must use an authoritative backend ledger and transaction boundary; a
  client-side integer balance is not an acceptable implementation.

### Installable web app

- No `manifest.webmanifest` or service-worker implementation is present in the
  frontend public/runtime surface. This is a PWA audit and installability task,
  not a request for an Electron/native desktop executable.

## Couponis reference findings

The supplied `Theme-Couponis-V3.2.1.zip` was reviewed statically from the
already extracted archive. Useful product-flow ideas include coupon listing,
category/store filters, featured items, expiry/expired presentation, code
reveal/copy, save/favorite, sharing, feedback, and admin-managed taxonomy.

The following are not suitable for reuse: WordPress/PHP theme code, WordPress
database structures, AJAX/nonce runtime, bundled plugins, Elementor or
KingComposer integration, Google Maps/store directory behavior, and packaged
copyrighted assets. EduAI will adapt only product concepts to its own NestJS,
Prisma, and React architecture.

## Priority implementation sequence

The canonical task records in `.ai-dos/records/tasks.json` contain the complete
acceptance, verification, dependency, security, UAT, deployment, migration,
rollback, and evidence metadata. Minimal test fixtures are explicitly allowed
to support feature tests early, but they are not the final demo dataset. The
Product Owner priority sequence is:

1. Mobile UX/UI, bottom navigation, feature entry points, price presentation,
   and responsive regression.
2. Voucher.
3. Scholarship.
4. TMI Rewards.
5. PWA/installable EduAI.
6. Final Demo Course Dataset and integrated demo/UAT dataset.
7. Final integrated regression/UAT.

The final dataset phase is represented by `SPR21-027` through `SPR21-030` and
is release-gated after Voucher, Scholarship, TMI, and PWA completion. No
existing task was marked done, cancelled, or blocked, and `SPR17-002` was left
`IN_PROGRESS`.
