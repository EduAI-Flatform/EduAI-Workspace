# GDS account implementation

Source implementation verified on 2026-11-11.

## Delivered behavior

- Profile cover upload uses the existing image signature checks and authenticated owner. New fields are additive. Internal storage keys are excluded from profile responses.
- Profile displays the account ID, editable Bio and paginated own posts through an authenticated owner query, including private posts.
- Settings persists VI/EN preference and embeds the shared MFA settings component.
- Local password changes verify current credentials, compare-and-swap the prior hash and revoke refresh sessions with an audit row in one transaction.
- Firebase password changes require the matching Firebase password provider and recent password reauthentication. A partially completed password change reports pending GDS session revocation at sign-in.
- Billing uses owned paginated orders with server-side status/date filters. Date boundaries use Asia/Saigon calendar days.
- Invoice requests reference a confirmed owned order and matching canonical settlement. Structured recipient data is private. A unique order reference makes repeated submissions return the existing request.
- Invoice requests use the existing support conversation and Admin handling workflow. The Admin operation flag controls intake.

## Verification

- Backend focused account regression completed with 16 tests across five suites.
- Frontend account and request regression completed with nine tests.
- Frontend TypeScript check and backend build passed.
- Seven Chromium tests covered Profile, Settings and Billing at 320, 375, 390, 412, 768, 1024 and 1440 px using synthetic intercepted responses. No horizontal overflow, page exceptions or unintended writes were observed.
- Screenshots under frontend test-results/gds-profile-*, gds-settings-* and gds-billing-* were visually inspected.
- Stitch account references are screens 9349681af7334d0babecfae20ca276d1 and 9c6359a7f0b8422dad2c8e55a359f561 in project 7305056649090413856.

## Integration and release

Root integrates AuthSecurityModule and routes /settings, /billing and /billing/orders/:orderId. Initial request migration includes invoice subtype fields. No migration was applied to the existing database during this work.

The invoice workflow records and processes requests. Issuance by an external tax-invoice provider remains an integration dependency.
