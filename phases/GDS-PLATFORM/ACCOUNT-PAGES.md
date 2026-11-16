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

## Profile persistence release — 2026-11-16

Frontend PR48 fixes a stale sign-in avatar after upload/reload and prior-owner Bio
surviving a same-role account switch. Profile state is keyed by authenticated user
ID, owned reads settle independently, authoritative null clears the avatar, and
initial loading disables image controls so a late read cannot overwrite an upload.
No auth-store, API, schema or business-policy change was introduced.

Candidate173c627e911698d000952cc271b1a18a838872d5 passed24 account Chromium
scenarios and build. Independent review found loading/failure gaps in cycle1;
regressions and fixes passed, and cycle2 found no further substantive issue.
Final-head CI43836196858, main CI43837027409 and production deploy43837027516
passed. Main55783f265631077ad71d1c5df86cbb5a39d4e447 matched the tested tree;
the merged temporary branch was deleted remotely/locally and references pruned.

Three new scenarios also passed against the shipped bundle using intercepted
API/image fixtures: upload/reload/null, owner switch, and slow/failed sibling reads.
Actual read-only student acceptance at2026-11-16T11:53:26.968Z returned owned
profile/career200, decoded the canonical avatar, preserved Bio and showed no
overflow at320/375/390/412/768/1024/1440px, page errors or business/financial writes.
No fresh primary login was needed. The actual account had no cover; no production
avatar/cover replacement or deletion was performed. Sanitized receipt is
`D:/Work/Edu-AI/.codex-artifacts/gds-production/profile-readonly.json`.

Provider/MFA boundary review found no concrete bypass: verified provider identity,
active account/revision, session family and primary-authentication freshness are
rechecked at issuance/enrollment. Root ran127 tests across12 auth/profile suites,
all passed. This does not claim live external SSO or a composed real-provider MFA
exercise; actual local-password/TOTP/recovery evidence is in the auth receipt.
