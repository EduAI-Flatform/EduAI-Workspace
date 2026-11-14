# Original-plan completion audit

Checkpoint: 2026-11-14. Overall result: **not proven complete**. This inventory derives from the owner's original numbered GDS plan and subsequent decisions, rather than from the features already implemented. It supplements the earlier broad requirement matrix.

`EVIDENCE` identifies inspected source/tests or an observed scoped receipt; it is not a blanket claim that every production path has been exercised. `REVIEW` requires further source/behavior verification. `OPEN` is a concrete missing deliverable. `VERIFYING` has a change undergoing release. `CONDITIONAL` retains an explicit original-plan business/provider prerequisite; it must remain safely off without inventing terms or endpoints.

Source references use `FE` = EduAI-Front-End-Web and `BE` = EduAI-Back-End. Their exact current deployed revisions are maintained in `state/PROJECT-STATE.md`. Existing receipts distinguish actual production, disposable database and API-fixture browser evidence. A final completion decision must resolve every REVIEW/OPEN/VERIFYING item and prove the appropriate disabled behavior for CONDITIONAL items.

## Decisions and Admin foundation

| ID | Explicit requirement | Evidence / next verification | State |
|---|---|---|---|
| D01 | React/Nest architecture and reuse existing Admin, wallet and affiliate | Existing feature modules; `IMPLEMENTATION-RECEIPT.md`, affiliate native wallet controller/adapter | EVIDENCE |
| D02 | Multiple devices, 30-day remembered sessions, no five-minute idle logout | JWT/device tests prove lifetime/distinct tokens; retained-session refresh500 recovered through PR50. Adversarial revocation/legacy-binding findings still require correction; see `AUTH-REFRESH-CORRECTNESS.md` | REVIEW |
| D03 | VI/EN system UI; do not translate user content | FE global static TSX catalog test, `SystemText.test.tsx` UGC/account-name assertions and locale tests; finish dynamic-label coverage review | REVIEW |
| D04 | Retire package sales, retain accounts/orders/balances/purchased access | `PACKAGE-RETIREMENT.md`, `INVENTORY-CONTINUATION.md`, historical live dependencies | EVIDENCE |
| D05 | Quiz invitation only after video ends | `VIDEO-PROGRESS.md`, native trusted-ended/replay browser scenario, `LessonPlayer` end handler | EVIDENCE |
| D06 | Configurable business terms; Admin can add arbitrary card tiers; quotas first | `SERVICE-LIMITS.md`; fourth-tier browser save/impact and evaluator; supported service operation bindings | EVIDENCE |
| A01 | Branding: logo, hero, mascot, point art, intro and support links | Typed branding defaults/form/URL validation; official asset inventory in integration receipt | EVIDENCE |
| A02 | Navigation labels VI/EN, ordering, enable switches, safe internal/external URLs | Header consumes the effective navigation array in order and filters disabled entries; header tests assert order, hidden jobs, nested active destinations and mobile More; backend rejects unsafe URLs and preserves meaningful array ordering | EVIDENCE |
| A03 | Card tiers/thresholds/basis/cycle/benefits/validity/upgrade-downgrade rules | Configurable rank evaluator and service quota windows; verify complete source/consumer mapping against original terms | REVIEW |
| A04 | Point activities/amounts/limits/expiry/adjustments | `ACTIVITY-POINTS.md`, `POINT-RELEASE.md`; need final adjustment/reversal coverage review | REVIEW |
| A05 | Partner list/logo/category/connection status | `PARTNER-CONNECTION-STATUS.md`; status metadata separate from review and real connectivity | EVIDENCE |
| A06 | Affiliate participation/rates/attribution/withdrawal/support configuration | BE effective policy readiness and identity guards; review participation/support parameter coverage | REVIEW |
| A07 | Course categories, quiz options and new-content defaults | Six configured categories; `QUIZ-DEFAULTS.md` effective defaults and locked teacher API behavior | EVIDENCE |
| A08 | Operations invoice information/support intake/attachment limits/feature flags | `ACCOUNT-PAGES.md`, `REQUEST-INTEGRATION.md`; catalog visibility regression released and checked against actual settings and deployed-code fixtures | EVIDENCE |
| A09 | Draft → valid → impact → approve → effective date → apply | Platform service tests; actual unchanged disabled-point lifecycle; PostgreSQL quiz/partner lifecycle | EVIDENCE |
| A10 | Versions/editor/approver/audit history | Immutable revision creation, atomic audit and approval fields; production policy receipt | EVIDENCE |
| A11 | Impact: rank changes/benefit changes/unconvertible cases | Card source and quota impact with cursors/completeness/issues; inspect final full impact assertions | REVIEW |
| A12 | Policy provenance on rank/points/commissions | Card provenance migration, immutable point receipts and affiliate accrual revision | EVIDENCE |
| A13 | Stop/restore configurations; compensate transactions without rewriting history | Active-revision cancellation denial and restoration by new revision; financial recovery tests | EVIDENCE |
| A14 | Purchased access independent of cards | PostgreSQL purchased-grant invariants, separate quota provenance/pools, actual historical inventory | EVIDENCE |
| A15 | Ordinary filters save directly; governed publication/business groups use versions | UI local filters vs policy revisions; review route/state handling | REVIEW |
| A16 | No SQL/executable config/security or balance bypass; typed group permissions | Strict object keys/URL validation, Admin JWT/role guard independent of menu; no executable fields | EVIDENCE |
| A17 | Change hero/menu/thresholds via Admin without code/redeploy | Public effective-config reload, configured navigation/branding and arbitrary thresholds; seven-width browser fixtures | EVIDENCE |

## Stage 0 — inventory and design

| ID | Explicit requirement | Evidence / next verification | State |
|---|---|---|---|
| P0.1 | Requirement/existing-function/change/acceptance matrix for all supplied images | Integration receipt broad matrix plus this itemized audit; remaining REVIEW rows prevent completion | REVIEW |
| P0.2 | Check AI-DOS/Admin/Payment-Wallet/Affiliate to avoid duplicate systems | Existing canonical financial lane, native wallet adapter and reused request/order modules | EVIDENCE |
| P0.3 | Official GDS logo and usable hero/mascot/point assets | Integration receipt records official logo source, generated illustration provenance, optimized files and eight palette tokens | EVIDENCE |
| P0.4 | Stitch families: shell/home/account/Billing/support/affiliate; desktop/mobile | UI-STITCH and account/course references exist; verify complete family coverage and retained render evidence | REVIEW |
| P0.5 | Be Vietnam Pro, consistent typography/spacing, exact GDS palette, semantic colors | OPEN: local fonts/palette are present and most CSS uses the shared font, but InstructorLessonManagementPage.css still overrides it with Plus Jakarta Sans/Inter. Normalize that confirmed exception and finish scoped title/spacing verification | OPEN |
| P0.6 | Admin configuration inventory before UI | Typed eight-group defaults and existing configuration design; preserve historical checkpoint ordering | EVIDENCE |

## Stage 1 — sessions

| ID | Explicit requirement | Evidence / next verification | State |
|---|---|---|---|
| P1.1 | Reproduce two-device/expiry/tab/inactivity failures | Distinct-token regression; FE concurrent/late401/lock tests; review full browser two-device evidence | REVIEW |
| P1.2 | Refresh and replay instead of immediately clearing any401 | FE `api-client.refresh.test.ts` renew-once, retry and definitive-rejection boundaries | EVIDENCE |
| P1.3 | Concurrent and cross-tab rotation coordination | Browser-wide lock/recheck test and BE consumed-token rejection | EVIDENCE |
| P1.4 | Per-device logout/revocation; one device cannot log out others | OPEN: matching-row unit test is insufficient for concurrent rotation/logout and legacy prefix ambiguity. Fresh-context review requires explicit session-family semantics and database interleavings | OPEN |
| P1.5 | 30 days, invalid/expired/revoked refresh clears session appropriately |30-day expiry/soft-deletion denial, PR51 stale-MFA rejection and PR52 common revoke-all fence are proven with PostgreSQL schedules and production ordinary renewal. Exact legacy-token binding, primary-authentication epoch and atomic MFA proof/issuance remain open | OPEN |
| P1.6 | Offline keeps session/retry state | FE temporary-refresh failure, new-login/logout race protection | EVIDENCE |

## Stage 2 — brand, navigation and localization

| ID | Explicit requirement | Evidence / next verification | State |
|---|---|---|---|
| P2.1 | Exact GDS English hero headline/description, VI equivalent and illustration | Integration receipt and configurable branding defaults/public smoke | EVIDENCE |
| P2.2 | Download WebApp → account → language → notifications; PWA browser behavior | Header source composes controls in that order; PWA tests prove Chromium native prompt, explicit Safari iOS steps, installed/unsupported states and keyboard-opened guide | EVIDENCE |
| P2.3 | Account popover avatar/name/email-or-ID/Profile/Billing/logout | DashboardAccountBar uses authenticated identity fields and existing profile/billing/logout routes; Escape closes and restores focus, outside pointer and route change dismiss the menu; scoped account browser receipts retain runtime coverage | EVIDENCE |
| P2.4 | Eight ordered menu destinations from original image | Configured navigation defaults; verify actual destinations and flag/order consumers | REVIEW |
| P2.5 | Revenue/member last; Billing/Settings/Support according to role | Instructor sidebar source places revenue/member last after common account/affiliate destinations; student sidebar exposes common permitted account routes without instructor revenue; existing protected dashboards and role/browser receipts preserve boundaries | EVIDENCE |
| P2.6 | Global translation keys/catalog, saved locale, date/number/currency formatting without conversion | Global AST catalog test; locale first-render/UGC/money tests; dynamic-label coverage still REVIEW | REVIEW |
| P2.7 | Brand/menu/assets controlled by Admin | Public effective-settings provider, typed form and policy lifecycle | EVIDENCE |
| P2.8 | Dev/main consistent branding including certificate and returning caches | Certificate cache fix production receipt and current official logo; no claim from equal Git commits alone | EVIDENCE |

## Stage 3 — account surfaces

| ID | Explicit requirement | Evidence / next verification | State |
|---|---|---|---|
| P3.1 | Profile cover/avatar/ID/card/referral/Bio/own posts | Profile/account source and `ACCOUNT-PAGES.md`; actual Bio restore and portfolio upload; avatar/cover have unit boundaries but direct runtime replacement remains unproven | REVIEW |
| P3.2 | Billing owned orders/status/date/detail/invoice request | Account browser fixtures; restricted real PostgreSQL ownership/idempotent invoice workflow | EVIDENCE |
| P3.3 | Admin invoice intake, no implied external invoice issuance | Shared request handling integration; production intake stays off | EVIDENCE |
| P3.4 | Settings/account locale/provider-aware password/2FA and recovery codes | Auth security tests; actual fresh-login TOTP/recovery/disable receipt | EVIDENCE |
| P3.5 | Verify account linkage before allowing2FA | MFA issuance/provider binding guards; inspect final failure-path evidence | REVIEW |
| P3.6 | Support title/content/image/list/status/replies and Admin processing | Real restricted-Prisma request/image integration plus three-role seven-width browser fixtures | EVIDENCE |
| P3.7 | Real points/credit, distinguish points/wallet/earnings | DashboardAccountBar reads permitted TMI wallet and GDS available balance, resets on account change and renders unavailable without trusted runtime state; `hasTrustedGdsBalance` requires matching READY mode/VND. Affiliate accrual and available native wallet balance are separately labeled | EVIDENCE |
| P3.8 | Owner-only data, upload validation, loading/empty/error states | Request owner-denial/private-image/invalid-upload tests and account browser cases; finish profile/billing boundary review | REVIEW |

## Stage 4 — course authoring and video quizzes

| ID | Explicit requirement | Evidence / next verification | State |
|---|---|---|---|
| P4.1 | Bold/italic/underline/lists/limited font sizes | Shared renderer test proves strong/em/u/list/large formatting and inert HTML; editor selection test preserves legacy text and inserts markup; limited classes avoid arbitrary HTML/CSS | EVIDENCE |
| P4.2 | Legacy descriptions readable, backend normalization, safe common renderer | BE description normalization tests; FE inert-HTML preview and actual private draft receipt | EVIDENCE |
| P4.3 | Learner-style private draft preview, owner/Admin only | Authorized preview and denial browser case, actual anonymous404/401; inspect teacher-to-teacher denial | REVIEW |
| P4.4 | Create/select lesson quiz directly in video lesson form | LessonQuizPicker regression attaches an unassigned quiz to the current saved lesson, excludes quizzes owned by other lessons, prevents attaching before save and provides a create link carrying the exact lesson ID into the quiz form | EVIDENCE |
| P4.5 | Native video end invitation; retain passing score/attempts/required options | Native video/replay/checkpoint browser test; governed defaults and API override protection | EVIDENCE |
| P4.6 | Admin defaults and permitted teacher overrides | PostgreSQL85→90 future-only scenario, actual read-only form checks, explicit unlimited/locked update tests | EVIDENCE |
| P4.7 | No public draft/XSS/duplicate progress or attempts on replay | Actual private preview; native browser no auto-attempt and real PostgreSQL progress persistence/replay; full quiz submission contract remains to review | REVIEW |

## Stage 5 — categories, activities and partners

| ID | Explicit requirement | Evidence / next verification | State |
|---|---|---|---|
| P5.1 | Six course groups, school logos and partner information destination | OPEN: six category labels exist in Admin defaults but no public TSX consumer of courses.categories was found; CoursesPage currently reads only q/level/page. Implement meaningful public category navigation/content or explicit unconnected states without inventing partner courses. Existing partner logo/website links alone do not satisfy this requirement | OPEN |
| P5.2 | Activities groups Community/Competition/Event, reuse community | `ActivitiesPage` links to existing `/community`, filters enabled items by competition/event and shows a truthful empty state; current test asserts the existing route and empty state | EVIDENCE |
| P5.3 | Four partner kinds, name/org/phone/email/content contact form | Existing partner form and real PostgreSQL consent/provenance/intake/review | EVIDENCE |
| P5.4 | Admin manages categories/partners/applications/competitions/events | Typed configuration and requests surfaces; actual connection-status acceptance | EVIDENCE |
| P5.5 | Design school adapter boundary, education-ID mapping and learning events | The audit found this artifact missing. `SCHOOL-ADAPTER-DESIGN.md` now defines provider/tenant namespaces, verified identity/source boundaries, native-vs-external point adapters, deduplication, adjustments, reconciliation and capability gates; provider-specific API remains conditional | EVIDENCE |
| P5.6 | Enable real school sync only after API contract and points policy approval | No school exists; intake/onboarding ready, no fabricated provider endpoint or credentials | CONDITIONAL |
| P5.7 | Idempotent verified learning events and reconciliation logs | Native course-completion point adapter, immutable receipts/provenance, duplicate/expiry/replay integration; provider-specific mapping follows P5.5/6 | EVIDENCE |
| P5.8 | Working destinations or clear unconnected state; registrations stored/processed | Real request integration; public catalog flag fix released in FE PR44, actual disabled settings and all enabled/intake combinations on deployed code passed separately | EVIDENCE |

## Stage 6 — cards and legacy preservation

| ID | Explicit requirement | Evidence / next verification | State |
|---|---|---|---|
| P6.1 | Initial three card types plus Admin-defined additional ranks | Fourth-tier validation/evaluator/browser save; service quota configuration | EVIDENCE |
| P6.2 | Eligible spending OR proven topups; no double counting | Separate basis evaluators; canonical settlement/refunds/journal checks; exact-boundary/reuse tests | EVIDENCE |
| P6.3 | Annual rank cycle configurable; independent service-limit reset periods | Rolling-month config and clamped UTC evaluator, independent monthly/fixed/lifetime quota windows | EVIDENCE |
| P6.4 | Simulate existing data and report exceptions before applying | Bounded Admin impact/inventory; actual three-order historical audit; inspect completeness and retained exception handling | REVIEW |
| P6.5 | Stop old sales and preserve accounts/rights/balances/history | Retired catalog/create/publish APIs410; actual historical inventory; native grant pools and unchanged-grant integration | EVIDENCE |
| P6.6 | Remove old UI/API/jobs/dependencies incrementally | Sales routes retired; retained necessary fulfillment/refund/access/history consumers documented; final dependency audit needed | REVIEW |
| P6.7 | Delete schema only after archive/transfer/reconciliation/no live consumers | Owner permits justified deletion, not blind deletion. Current legacy tables still have necessary consumers; no verified missing-right repair candidate | EVIDENCE |
| P6.8 | Version-traceable classification/points/quota consumption; no balance drift | Provenance migration, shared-pool real PostgreSQL races and original financial regression gates | EVIDENCE |
| P6.9 | Business quotas/higher-tier thresholds configured by Admin, not invented | Supported runtime and Admin controls released; actual undeclared terms remain off | CONDITIONAL |

## Stage 7 — referral and revenue

| ID | Explicit requirement | Evidence / next verification | State |
|---|---|---|---|
| P7.1 | Dashboard/Withdraw/Performance with statistics/referral links/codes/QR/copy/withdrawable balance | Existing affiliate page and reused withdrawal component; inspect all named UI/data fields | REVIEW |
| P7.2 | History filters/search/pagination/Excel with proper access scope | Owner query in service/controller; actual XLSX format/Unicode/formula-safe text test; bounded current-page export | EVIDENCE |
| P7.3 | Instructor vs normal referral; gated sub-affiliates | `general`/`instructor` identity types and instructor-only guard test; unsupported sub-affiliate policies rejected | EVIDENCE |
| P7.4 | Reuse Affiliate/revenue-sharing/native wallet, no parallel money ledger | Existing affiliate-wallet adapter, funded allocation/recovery integration; finish source boundary review | REVIEW |
| P7.5 | Versioned configurable rates/eligibility/hold/withdrawal; invalid config earns nothing | Effective-policy validation/readiness and provenance tests; exact participation/support settings require A06 review | REVIEW |
| P7.6 | Manual request/approval withdrawals; no auto-transfer | Shared existing withdrawal flow; original financial activation remains independent | EVIDENCE |
| P7.7 | Source-consistent statistics, duplicate/refund/adjustment safety | Canonical settlement source, replay/recovery/concurrent finance tests; inspect dashboard aggregation assertions | REVIEW |
| P7.8 | Live money/undeclared affiliate/sub-affiliate terms safely disabled | No new activation or real financial transaction in these GDS releases | CONDITIONAL |

## API, verification and release conditions

| ID | Explicit requirement | Evidence / next verification | State |
|---|---|---|---|
| R01 | Keep response shape; typed policy/preview/apply and reuse existing feature modules | Existing controllers/DTOs and compatibility helpers; no new envelope or duplicate wallet | EVIDENCE |
| R02 | API authorization independent of hidden menu/flags | Admin JWT/role controller, owner-scoped request/order/affiliate APIs; inspect complete role matrix receipt | REVIEW |
| R03 | Additive migration → data/compare → remove consumers → justified drops | Reviewed migration/replay/backup receipts and retained historical dependencies; no unsupported drop | EVIDENCE |
| R04 | Auth/device/tab/expiry/offline/logout required tests | P1 rows; FE coordination, PostgreSQL slow-proof/rollback and14 PR52 refresh/revoker schedules plus inverse/last-admin concurrency pass. Atomic MFA proof/issuance, primary-authentication epoch, exact-token binding and family logout remain unproven | OPEN |
| R05 | Invalid config/permission/version/effective date/purchased rights tests | Typed validation, policy lifecycle, actual disabled-policy UAT and real PostgreSQL grant invariants | EVIDENCE |
| R06 | Rank/point/commission boundaries/duplicate/refund/conversion tests | Evaluator suites and real database concurrency/recovery/inventory receipts | EVIDENCE |
| R07 | Rich text/draft/quiz/upload/cross-user tests | Course/request/profile tests and scoped browser/storage acceptance; P3/P4 reviews remain | REVIEW |
| R08 | VI/EN/keyboard/focus/contrast/responsive seven sizes | Relevant browser suites and palette/locale tests; final cross-surface focus/contrast scope needs review | REVIEW |
| R09 | Vitest/build/Playwright; Jest/build/data integration for finance/conversion | Final-head/main CI plus disposable PostgreSQL replay; individual receipts retain exact SHAs/runs | EVIDENCE |
| R10 | Delivery order, per-stage evidence and Workspace plan updates | Base and continuation receipts; check all PRs/remote-main CI/temporary-branch cleanup before final claim | REVIEW |
| R11 | No guessed policy defaults; incomplete integrations off; no fake metrics | Conservative effective policy readiness, public disabled flags, unconfigured affiliate/card terms | EVIDENCE |
| R12 | Feature flags/rollback before removing structures; preserve SPR25-007 | Non-financial GDS release and rollback receipts; canonical financial records unchanged | EVIDENCE |
| R13 | Production/risky migration/real money follow existing approval gates | Owner scoped authorizations and controlled backup/migration evidence; GDS completion cannot imply provider activation | EVIDENCE |

## Immediate next work

1. FE PR44 release and public catalog/intake checks are complete; preserve the distinction between actual settings and intercepted fixture scenarios.
2. Review the new P5.5 design with the first real school contract before any provider-specific implementation or synchronization activation.
3. Review remaining rows against their actual implementations/tests. Record defects as concrete tasks; do not substitute extra production mutations for adequate disposable integration evidence.
4. Reconcile stale historical `remaining` notes with later receipts. Never label the full plan DONE until every explicit row has authoritative coverage at the required scope.

Concrete dynamic-label defects found: `AffiliatePage` rendered `row.kind` directly (`general`/`instructor`), and `AdminPlatformSettingsPage` rendered `row.status` directly in revision history. These system enums bypass the static Vietnamese-literal catalog test. The focused fix is released with deployed-code verification; see `DYNAMIC-SYSTEM-LABELS.md`. D03/P2.6 retain broader REVIEW scope after correcting these two fields. Actual authenticated acceptance exposed the refresh500 tracked separately. P5.1 is a confirmed original-plan implementation gap, not merely a missing production screenshot.

Further concrete checks: `InstructorLessonManagementPage.css` still overrides the shared font token with Plus Jakarta Sans/Inter, so P0.5 is OPEN. Authenticated label acceptance exposed refresh500, now recovered using the same retained session after PR50. `AUTH-REFRESH-CORRECTNESS.md` supersedes any inference that existing unit/CI results completed the whole stage1 contract. Prioritize remaining session correctness before the public category gap.

## Catalog visibility release receipt

The public page previously rendered catalog items even when `partners.enabled=false`. Both new unit regressions failed before a one-condition fix. Frontend candidate `a3aa9f426b86c2e9df880314ba813c896b5b673c` passed 143 Vitest files / 625 tests, TypeScript, build and four relevant local Chromium scenarios. Final PR44 CI `43553425757` passed all four jobs and Vercel preview. It merged as `43cf230e05948b0dc0cd7cd3967a7432cf88593a`; fetched main matched the tested tree. Main CI `43553809090` and deployment `43553809043` passed. The merged branch was deleted remotely/locally and references pruned after ancestry verification.

At 2026-11-14T03:56:16.367Z, actual anonymous public `/partners` checks passed VI/EN at seven widths with real `catalogEnabled=false`, zero visible catalog partners and `intakeEnabled=false`, zero business writes and page errors. Sanitized receipt: `D:/Work/Edu-AI/.codex-artifacts/gds-production/catalog-public.json`. Separately, two Chromium cases against the deployed JavaScript passed all four catalog/intake flag combinations in both locales with intercepted synthetic API data. Those fixtures prove nonempty disabled catalogs stay hidden without changing production settings; they are not represented as live policy activation. No dependency/backend/schema/financial behavior changed. The existing build chunk advisory and previously audited lower-severity dependency findings are unchanged.
