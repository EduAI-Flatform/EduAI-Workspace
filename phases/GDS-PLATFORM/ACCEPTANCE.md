# GDS acceptance boundaries

- Admin can edit branding/navigation and eligible business parameters through typed configuration; API validation and authorization remain enforced independently of visibility.
- Business policies retain immutable revisions, approval/effective dates, impact preview and auditability. Card/point/affiliate results retain their policy provenance.
- Official GDS logo and supplied palette appear in the public shell, account surfaces and PWA assets. VI/EN applies to system UI while preserving user-authored content.
- Login sessions remain independent across devices, refresh safely across tabs and survive ordinary inactivity/network failure.
- Account, invoice, private attachment and draft-course APIs enforce owner/Admin boundaries.
- Existing paid access, account balances, orders and financial history survive card policy changes and retirement of old package sales.
- Affiliate credits require canonical settlement and available platform-fee funding after seller entitlements. Refund recovery precedes new spending/withdrawal; replay must not duplicate financial effects.
- The responsive contract is 320/375/390/412/768/1024/1440 px, including usable dialogs, keyboard/focus and loading/empty/error states.
- Local checks, remote PR checks, exact SHAs and actual release prerequisites are recorded separately. Synthetic fixtures establish UI behavior, not production integration readiness.

Not accepted as live: undeclared financial terms, unapproved school API/point adapters, sub-affiliate policies, top-up qualification, automatic bank payout, automatic invoice issuance or destructive legacy data cleanup. Their flags stay disabled until their contracts and release conditions are met.

Production deployment and actual database migrations require explicit authorization under the existing Workspace hard stops. `SPR25-007` remains unchanged.
