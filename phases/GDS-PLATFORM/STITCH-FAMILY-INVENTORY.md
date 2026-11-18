# Stitch family inventory and post-implementation reconciliation

Reconciled 2026-11-17 (Asia/Saigon). Project: `7305056649090413856`.
Scope: original-plan P0.4 design-reference inventory only. No UI code, authentication, business policy, integration, financial operation, deployment or Git mutation was performed by this task.

## Chronology and evidence boundary

The historical references below already appear in UI-STITCH.md, ACCOUNT-PAGES.md and IMPLEMENTATION-RECEIPT.md. Their prior review claims remain historical receipt statements. This task independently retrieved their metadata and downloaded and visually inspected four historical screenshots.

The nine missing/unmapped device references and three corrective refinements were created **after implementation**, on this reconciliation date. They cannot establish that every original UI family had a reviewed desktop/mobile design before implementation. No historical record has been rewritten to imply that.

All sixteen screenshots in the resource register were actually downloaded through Stitch `download_file` and displayed for visual inspection during this task. The retained evidence is the exact Stitch screen/file resource, not a newly saved local image. No artifact-fetch blocker occurred. Project listing was non-enumerable (`list_screens` returned an empty object in the coordinator's preflight and `get_project` supplied no screen instances); direct `get_screen`, generation and file download worked. Missing means unmapped in the inspected records, not proof that no older screen exists anywhere in the project.

## Six-family device mapping

These are scoped structural references with the exclusions below, not blanket approval of every generated element.

| Family | Desktop reference | Mobile reference | Mapping |
|---|---|---|---|
| Shell/navigation | `5014f8bb380646bc927da1e661c54804` | `5c3051eb84eb466d8e0749934d7e5f1d` | New corrected source-preserving header composition; replace initial clipped/spec-heavy outputs |
| Home | `ab2ffa5718474147ad94d6e86c6cfb38` | `36192f4e3dbf4d27b6f9a94af6cb7d76` | New section hierarchy/empty-state references only; retain existing shell, assets and authored/configured copy |
| Account/Profile | `f91e6e90c194444b8a618ece1251de09` | `4f49fed5505f41bf973fb3fe8bfe2c5b` | Historical desktop + new stacked profile reference; existing Settings desktop separately retained below |
| Billing | `9c6359a7f0b8422dad2c8e55a359f561` | `73d0282dc26f49898aa8023e105d0352` | Historical desktop + new mobile filters/empty-state reference only |
| Support | `ecf69e8ccd8d4fbfabe1d648926db601` | `8dc9a204aeca4cd2b106ac65612a968e` | Historical conversation/dialog structure + corrected actual MOBILE paused/empty reference |
| Affiliate | `568c3e71607945269db8e434049774e6` | `90407acb1b50494699e940e76469af3f` | New tab/panel/stack and off-state references only |

Settings/security desktop `9349681af7334d0babecfae20ca276d1` supplements the account family. The six-family mapping is not exhaustive coverage of every account subroute/state; no separate Settings mobile screen is claimed. Admin configuration `6eb089863c41422894a8a70a2e5e6f96` and course desktop/mobile `8bfdce89b6c9456ab76c15a1bfda0771` / `dc5036c93423401da57c7cbe4b873e09` remain their existing separate references; this task did not re-inspect those screenshots.

## Source and design constraints used

Read Workspace AGENTS.md, working rules, current phase README/TASKS/ACCEPTANCE/TEST-PLAN/UI-STITCH, ACCOUNT-PAGES, implementation receipt, frontend architecture and the installed stitch-design-taste SKILL.md. Existing project branding and explicit owner scope override the skill's generic single-accent/font/motion defaults. No DESIGN.md or design-system mutation was needed.

Inspected native frontend source: `components/layout/header.tsx`, `features/platform/platform.defaults.ts`, `features/home/HomePage.tsx`, student sidebar/profile, `features/account/BillingPage.tsx`, `AccountSettingsPage.tsx`, `features/requests/SupportPage.tsx`, and `features/affiliate/AffiliatePage.tsx`.

Preserve Be Vietnam Pro, white/pale surfaces, charcoal text and exact GDS tokens: `#4700F4`, `#E71F69`, `#00A89F`, `#D9D9D9`, `#7A8AD9`, `#6EEDC7`, `#FFA7C8`, `#A97DFF`. Official logo remains existing `public/gds-logo.png`; an asset slot in a reference is not a replacement asset. Existing hero/assistant/point artwork and certificate SVG remain separate from that logo.

Preserve configured eight-destination public navigation; source mobile uses first five plus More, not a new bottom bar/hamburger system. Account routes/menus and role-dependent cart/wallet/revenue access remain source-owned. Locale affects system text; user-authored names, titles, Bio/posts and content remain unchanged. Empty, error, loading, disabled and unconfigured states remain driven by existing APIs/configuration.

Home metric-bearing configured copy was left as an explicit configured-copy slot in new references; this does not authorize editing that copy or asserting its truth. Existing AI tool labels were preserved as labels only, without adding capabilities.

## Visual inspection decisions and rejected material

- **Historical Profile:** inspected cover/avatar, Bio form, side settings panels and posts empty state. Reject substitute graduation-cap logo, sample identity, Pro upsell/unlimited benefits, demo progress/counts, SCORM/compliance assertions, invented organization and obsolete email-OTP/MFA-roadmap claims. Actual profile, Settings, TOTP and provider-aware password behavior remain authoritative.
- **Historical Settings:** inspected preferences/password/TOTP panels. Reject substitute logo, timezone/email-notification features not in current AccountSettingsPage, global Save all, periodic-password policy/last-change claims, premium upsell, security compliance copy, fake secrets/QR/session IPs and session-management UI not established by this source. No auth changes follow from a design.
- **Historical Billing:** inspected tabs, filters and order blocks. Reject spend/course counters, fictitious orders/prices/dates/providers/tax IDs, PDF/Excel export/search, automatic invoice-issued/downloaded claims, tax-provider/legal assertions, request deadlines, payment timing promises, upgrades and invented cancellation/payment controls. Actual owner-scoped history/details and confirmed-order invoice **requests** remain unchanged.
- **Historical Support:** inspected overlay create form and conversation/list composition. Reject replacement brand/shell, fake tickets/people/counts, category selector, SLA/24-hour claims, blocked-attachment/storage-level claims, public/internal note tabs and embedded partner application not in SupportPage. Actual title/content/private image and owner/Admin request conversation flow remains authoritative.
- **Initial Shell desktop/mobile** `df5dd58dc9a54b08b4764cbaff6253e6` / `12306ae6e92e40cf8650ef81e7fbb26c`: screenshots visibly clipped the header/account edge and injected token/spec/compliance annotations and a confirmation button. Rejected as final composition. Corrected references show entire header, closed account menu, blank content and mobile More links. Reject generated footer year and placeholder path wrapping as product content; use official responsive brand component.
- **New Home desktop/mobile:** inspect split/stack hero, two existing CTAs, course/benefit empty areas, four existing AI labels and certificate asset slot. Reject added wordmark beside asset slot, generated footer links as contract evidence, missing mobile More/account controls and the invented four-item bottom nav. Use corrected shell references instead. Do not replace actual illustrations with placeholder boxes or simplify existing source copy based on the reference.
- **New Profile mobile:** inspect single-column cover/avatar, account ID, Bio/Posts tabs and empty panels. Reject substitute cap/logo/wordmark, UTF-8 annotation, verified-employer/degree wording, invented social-connections directory, moderation implication that only approved posts show, extra secondary-state preview inside the page, and unconditional public-share visibility. Actual share remains conditional; Posts is a separate tab and owned private posts remain included. Preserve current career/learning/portfolio controls rather than copying simplified empty cards.
- **New Billing mobile:** inspect stacked status/date controls and empty result. Reject substitute logo/back button, technical invoiceRequestsEnabled annotation, placeholder order example and inline invoice fields displayed simultaneously under empty Orders. Actual invoice intake is the existing modal for a confirmed owned order. No automatic issuance is implied.
- **Initial Support mobile request** `f13cd6a64bcd44c8af3b032a1da82f67` returned **DESKTOP** metadata and 2560px canvas containing a narrow mobile column. It was not counted as mobile coverage. Corrective `8dc9a204aeca4cd2b106ac65612a968e` returns MOBILE/780px and was visually inspected edge to edge: preserved official slot, paused intake, disabled creation, stacked filters, reload, empty state and privacy. Reject incidental footer and bilingual select labels as source-copy changes.
- **New Affiliate desktop/mobile:** inspect three tabs, unavailable-value placeholders, referral identity absent and create-code off-state. Reject mock identity/initials, invented program-update explanation, API internals, incorrect separate instructor-portal/policy claims, automatic filter/export activation promises, added dashboard policy panels and version/footer claims. Source instructor identity is conditional in the same page. Dashes are design placeholders, not proof that source shows null for every numeric field. Actual API values, role gates, funding/processing state, existing wallet and manual Admin withdrawal remain unchanged. Static mobile button styling does not prove disabled semantics.

No generator prose claiming “100%”, “no overflow”, “44px”, “verified” or feature readiness was accepted as test evidence. Generator suggestions (dark mode, new flows, states, exports) were not authorization and were not implemented.

## Exact retained resource register

Every row below: metadata fetched and screenshot downloaded/displayed/visually inspected on 2026-11-17. Sizes are returned raster metadata, not verified CSS viewport sizes. Mobile prompts target 390px logical; 780px rasters are commonly 2x, but this task does not certify pixel ratio or responsive behavior.

Screen resource prefix: `projects/7305056649090413856/screens/`.
Screenshot resource prefix: `projects/7305056649090413856/files/`.

| Screen ID | Returned device | Raster size | Exact title | Screenshot file ID |
|---|---|---|---|---|
| f91e6e90c194444b8a618ece1251de09 | DESKTOP | 2560×4122 | GDS - Hồ sơ & Tài khoản cá nhân | 41103a1d946b43d180bce5f3bf01a80d |
| 9349681af7334d0babecfae20ca276d1 | DESKTOP | 2560×3486 | GDS - Cài đặt tài khoản & Bảo mật | c6d7a6ee33a94a22984572e1e8e6a498 |
| 9c6359a7f0b8422dad2c8e55a359f561 | DESKTOP | 2560×2924 | GDS - Billing & Lịch sử giao dịch | 6ce2671e2e2940b1a0e88a4d881e0f1b |
| ecf69e8ccd8d4fbfabe1d648926db601 | DESKTOP | 2560×5190 | GDS Support Ticket Workspace & Create Dialog | eb3c86460e3b4a0a9fe5d09ce13c500b |
| df5dd58dc9a54b08b4764cbaff6253e6 | DESKTOP | 2560×2056 | GDS shell baseline | abaf4faf11fb440e91f30669758d580f |
| 12306ae6e92e40cf8650ef81e7fbb26c | MOBILE | 780×2994 | GDS shell baseline (Mobile) | d0636f4132a0496eaa9d8b704e2ff91b |
| ab2ffa5718474147ad94d6e86c6cfb38 | DESKTOP | 2560×4670 | GDS - Homepage Baseline (Desktop) | 2be60d0cc0984603878bcb54ad9a02d3 |
| 36192f4e3dbf4d27b6f9a94af6cb7d76 | MOBILE | 780×3366 | GDS - Trang chủ Baseline (Mobile) | b4188c50cef947548c451826dd3e7191 |
| 4f49fed5505f41bf973fb3fe8bfe2c5b | MOBILE | 780×4954 | GDS - Hồ sơ cá nhân (Mobile Profile Baseline) | c04ef4ed01e64d53a3506a747ad7309e |
| 73d0282dc26f49898aa8023e105d0352 | MOBILE | 780×2912 | GDS - Thanh toán (Mobile Baseline Reconciliation) | 8aab283c398e49f1955c4bd8883ed3be |
| f13cd6a64bcd44c8af3b032a1da82f67 | DESKTOP | 2560×2048 | GDS - Hỗ trợ (Mobile Support Baseline) | c574c8ba576145e9b2ed7ee920b41ccf |
| 568c3e71607945269db8e434049774e6 | DESKTOP | 2560×2626 | GDS - Doanh thu và referral (Baseline Reconciliation) | 3021be10b0da46869f3421579d63decd |
| 90407acb1b50494699e940e76469af3f | MOBILE | 780×3574 | GDS - Doanh thu và referral (Mobile Baseline Reconciliation) | 2dde00e177c94a869a6c46f6bf05069e |
| 5014f8bb380646bc927da1e661c54804 | DESKTOP | 2560×2140 | GDS - Desktop Shell Baseline (Clean Header) | 6d3b88dec824476bbd5148be26cbb1f4 |
| 5c3051eb84eb466d8e0749934d7e5f1d | MOBILE | 780×1768 | GDS - Mobile Shell Baseline (Clean Header) | 78f122d2b51a4ce2b14e991b3ed1a2c2 |
| 8dc9a204aeca4cd2b106ac65612a968e | MOBILE | 780×1768 | GDS - Hỗ trợ (Mobile Support Baseline) | f364d9d96ec24cb4abb2a50fee57c79b |

## Completion boundary

The six requested families now have exact desktop/mobile design-reference mappings and retained render resources with documented adoption/rejection decisions. The family inventory is reconciled. This does not retroactively satisfy chronology, approve rejected generator details, prove production data, or pass frontend responsive/accessibility/auth/business acceptance. P0.4 can cite this document for inventory/render review; any requirement for fully clean standalone approved comps or separate mobile Settings/state coverage remains a design follow-up, not permission to redesign implemented UI.

No implementation tests/build/browser checks were rerun because no UI source changed. Source inspection and exact Stitch metadata/render review are the verification performed here. Existing runtime receipts retain their own scope. No claim of a seven-width or VI/EN runtime pass was made by this task.
