# PAYW-01B-LIVE-UI-ACCEPTANCE — 30/10/2026

**Status: VERIFYING / WAITING_GITHUB_CONNECTION. Not accepted as live-complete.**

This continues PAYW-01B-UAT-R2 under the owner's latest browser scope. Use the existing EduAI environment; no staging resource is requested or created. Missing SSH/Neon does not block read-only UI work. Public payment remains NO-GO; SPR25-007 and canonical financial contracts are unchanged.

## Current browser boundary

UI control is restricted to the existing approved Chrome session and its EduAI tab. No Windows desktop, personal app, unrelated Chrome tab, Remote Desktop, alternate browser/profile, cookie deletion or credential extraction is authorized. After this instruction, only existing DevTools page 5 on eduai.giaoducso.org.vn was used for UI actions. No new browser/context/profile or Playwright live runner was launched afterward. Source/test/build/Git actions continued through development tools.

The pre-restriction Playwright run remains dated LIVE_READ_ONLY evidence, not a fixture and not a substitute for the current-session retest. Its 21 screenshots and JSON are explicitly distinguished below. An earlier native Computer Use Escape interruption was honored; native computer control was not resumed after the new restriction.

## Verified baseline and runtime

- Frontend source/deployment baseline: `f101097dab56869ae27e81685995e5d1588d458c`.
- [Frontend CI 41026822755](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/41026822755): success. [Frontend CD 41026823893](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/41026823893): success; Validate/build and Deploy to VPS jobs independently success, deploy job `123967324412`.
- Website HTTP 200 serves `/assets/index-D_ZKvDE8.js`. The approved Chrome tab also reported that script after applying the existing in-app update.
- Backend baseline: `dccb4db7d1e80b92ac7bfae177ef83c5e110b2d0`, latest observed successful [CD 40994679159](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/40994679159) and [CI 40994679205](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/40994679205). No Backend redeploy/restart was attempted. Direct VPS SHA/PM2 remains unverified because the existing SSH alias denied access on the R2 read-only attempt.
- API health: success, status ok, Redis ok.
- Workspace baseline before this report: `a00eb53d792039cf8bd1044aceb35f817282e5d3` (PR25 already merged and cleaned).

## Actual live UI findings

| Surface / behavior | Observed result | Acceptance boundary |
| --- | --- | --- |
| Demo learner sign-in | PASS through normal form; reauthenticated after expiry | No token/cookie extraction; auth persistence only |
| Demo Admin sign-in | PASS through normal form, including same approved tab after normal app logout/login | No role or guard change |
| Course detail | Existing enrollment, ordinary lesson list and Continue learning controls visible | Read-only, no access grant inferred |
| Membership | Existing expired UAT membership; catalog/one-month VND 20,000 option visible | Continue disabled before acknowledgement; no checkout submitted |
| Cart | Empty state, discovery/order links visible; seven current-Chrome viewport checks below | No add/remove/cart checkout write |
| Order history | Eight historical demo-account orders, zero pending, mixed expired/cancelled/confirmed statuses | Existing records unchanged; no new payment confirmation claimed; private order IDs not copied into this dossier |
| Admin dashboard | Overview and role navigation load through actual API | Read-only; no mutations |
| Admin receipt route | Route and Kiểm tra QR navigation present on current deployed UI | Old missing-route blocker RESOLVED |
| Payment methods | Authenticated GET `/api/v1/payments/methods`: HTTP 200, methods `payos`, `vnpay` | `bank_transfer` absent; MB receipt flow not enabled |
| Admin receipt list | Authenticated GET `/api/v1/admin/commerce/receipt-claims?page=1&pageSize=20&scope=pending`: HTTP 503, code SERVICE_UNAVAILABLE, message BANK_RECEIPT_DISABLED | BLOCKED_BY_PRODUCTION_GUARD, not an absent Frontend route |
| Receipt/OCR / grant-revoke-restore | Actual applicable controls/data unavailable behind the guard | BLOCKED_BY_GUARD; no mutation or successful E2E claim |
| Course/membership checkout, QR/receiver/expiry/back/cancel | No new order or payment attempt created; cart empty and historical list has zero pending | NOT_RUN for active checkout; backup/target prerequisites still apply to writes |

The Admin console records the expected failed-resource 503 from the guard. Do not report a clean-error-free receipt workflow or successful Admin E2E from this error screen. The learner role was redirected to `/dashboard` when attempting the Admin route in the earlier read-only runner; no permission bypass.

### Existing Chrome PWA update — resolved without a code change

The user's existing session still displayed an available-update banner and an old Admin menu without Kiểm tra QR. The ordinary EduAI **Cập nhật** button was clicked in that tab. The resulting tab retained the Admin session, loaded `/assets/index-D_ZKvDE8.js`, and displayed Kiểm tra QR. No profile/cookie cleanup or new browser was used. Thus CD success and an older active client shell must not be conflated. Existing update behavior worked; it was not redesigned or counted as the source defect below.

## UI defect 01 — misleading receipt-disabled error

**URL:** `/admin/dashboard/receipt-review`. Reproduced live at 320px/1440px and visible across the read-only viewport matrix.

**Before:** the backend returns `{error:{code:'SERVICE_UNAVAILABLE',message:'BANK_RECEIPT_DISABLED'}}`, but the UI says `Chưa thể hoàn tất. Vui lòng tải lại trạng thái và thử lại.` This incorrectly presents an environment-disabled capability as a transient retryable failure.

**Cause:** ApiClient preserves the HTTP/Nest category in `ApiClientError.code` and puts the business identifier in Error.message, possibly followed by a correlation-id suffix. `receiptError` only checked the outer code, despite already containing the correct BANK_RECEIPT_DISABLED Vietnamese mapping.

**Focused fix:** `src/services/receipt.service.ts` maps an allowlisted uppercase business identifier from the message when the outer code has no known mapping. Known direct codes retain precedence; arbitrary diagnostics are never rendered. No Backend endpoint, payment guard, entitlement decision, API contract, auth or financial behavior changed. Existing UI layout/Stitch structure is preserved.

**Source branch:** `fix/payw-receipt-disabled-message`; pushed commit [1fdc9366ffcb99fdb79103d789f57978a3101e51](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/commit/1fdc9366ffcb99fdb79103d789f57978a3101e51).

**Publication:** no PR/CI/merge/CD for this commit is claimed. [Prepared PR comparison](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/compare/main...fix/payw-receipt-disabled-message) is a review link, not an opened PR. The current session has no connected GitHub MCP; normal Git push works, but cannot by itself create or merge a GitHub pull request. Existing Chrome authorization expressly excludes GitHub tabs, so browser UI is not used as an alternate publishing channel. No CLI login or credential helper access is required/requested by this handoff.

**Live status:** still open until required PR gates, automatic CD and retest in the same approved EduAI Chrome tab succeed. There is no fabricated after-fix screenshot.

## Verification of the source fix

- New service regression first produced a meaningful RED: **2 failed / 3 passed** for wrapped business codes. An earlier test-file creation attempt had a Windows pipe-encoding issue; corrected UTF-8 before accepting the RED. No application behavior was changed to accommodate damaged strings.
- Focused receipt service, ReceiptPanel and Admin receipt tests: **3 files / 11 tests PASS**.
- Full Frontend `npm test -- --run`: **100 files / 396 tests PASS** (5 new service tests).
- `npm run build`: **PASS**, includes `tsc --noEmit` and production Vite build. No separate lint script exists; no lint PASS is asserted.
- `npm audit --audit-level=high`: **PASS**, 0 high/critical, 5 moderate; no dependencies changed or exception granted.
- Self-review: two source/test files only, existing architecture retained, unknown server messages remain generic, direct-code precedence tested, no auth/payment mutation path modified. Diff check PASS.
- Local checks used existing installed dependencies. Required locked-install CI for the new PR remains pending; baseline CI is separate evidence.

## Live responsive and screenshot evidence

Widths: **320, 375, 390, 412, 768, 1024, 1440**.

1. Earlier R2 LIVE_READ_ONLY run: actual site/API, normal demo form sign-ins, separate contexts, no mocked/fulfilled API response; blocked every attempted non-GET outside normal auth. Course detail, loaded membership catalog and Admin receipt error state: **21 checks**, no horizontal overflow, **21 full-page screenshots**. The final run recorded zero blocked writes and no runner issues. One preceding rerun failed during login without a classified cause; preserved as `live-readonly-attempt2.json`, not hidden or asserted fixed. Loading-only membership captures were replaced only after waiting for the real catalog heading.
2. After the user's browser-only scope update: current DevTools tab 5, empty cart, **7 live checks**. At mobile widths innerWidth/client/scroll matched; at desktop 1024px client/scroll were 1009/1009 and at 1440px 1425/1425 (scrollbar), no horizontal overflow. **7 viewport screenshots** saved without changing image contents.
3. Current approved Chrome after the in-app update: Admin receipt 1440px before-fix screenshot saved separately. Earlier guard screen and new client both show the same incorrect generic message.

Files are under [evidence/uat-r2-20261030](evidence/uat-r2-20261030/), with [SHA256SUMS.txt](evidence/uat-r2-20261030/SHA256SUMS.txt), [live-readonly.json](evidence/uat-r2-20261030/live-readonly.json), and [cart-current-chrome.json](evidence/uat-r2-20261030/cart-current-chrome.json).

Representative captures: [course 320](evidence/uat-r2-20261030/course-detail-320.jpg), [membership 390](evidence/uat-r2-20261030/membership-390.jpg), [Admin 320](evidence/uat-r2-20261030/admin-receipt-320.jpg), [cart 320](evidence/uat-r2-20261030/cart-320.jpg), [cart 1440](evidence/uat-r2-20261030/cart-1440.jpg), [same-Chrome Admin before fix](evidence/uat-r2-20261030/current-chrome-admin-before-1440.jpg). Screenshots were visually sampled as well as measured. Source-approved Stitch references are in UI-STITCH.md; only the accessible surfaces/error states can be compared live. The protected receipt detail/actions and active QR/modal layouts cannot be accepted from an unavailable state.

**RESPONSIVE_7_WIDTHS = PASS for observed read-only surfaces only.** This is not full checkout/QR/upload/modal/financial acceptance. After the latest browser restriction, earlier alternate-context evidence is historical; no alternate profile was reopened to obtain an after-fix retest.

## Blocker classification and continuation

| Item | State | Next action |
| --- | --- | --- |
| Frontend baseline deployment | RESOLVED | CI/CD and current Chrome asset verified; no redundant deployment |
| Stale active PWA client | RESOLVED | Existing in-app update observed to load current shell |
| Receipt route missing | RESOLVED | Actual route present |
| Receipt/MB access policy | STILL_BLOCKED_BY_GUARD | Preserve guard; a later separately approved test capability would require its own policy/release, not changing NODE_ENV or enabling live collection |
| UI defect 01 live remediation | STILL_BLOCKED on publishing | Connect approved GitHub channel; create PR, required CI/review, merge, automatic CD, then same-tab live retest and after screenshots |
| New order/upload/access test writes | NEEDS_VERIFICATION | Validate runtime DB target, backup/recovery and bounded demo scope first; this does not stop UI reads |
| Order-detail click | STILL_BLOCKED_BY_AUTO_REVIEW | Rejection was honored; no alternate route/profile/API used to bypass that specific action |
| Browser scope | CONFIRMED | Existing Chrome/EduAI tab only; if it disconnects, reconnect that session or BLOCKED_BROWSER, never launch another browser/profile |

No financial success was fabricated. No existing order, balance, bank evidence, paid entitlement, GDS, provider production flag or guard was changed. Auth form logins/logout and the app update were the only non-read application actions in the current browser.

**PAYW_01B_LIVE_UI_ACCEPTANCE=NOT_COMPLETE. FINANCIAL_E2E=NOT_RUN/BLOCKED. PAYMENT_GO_LIVE=NO-GO. SPR25_007=UNCHANGED.**
