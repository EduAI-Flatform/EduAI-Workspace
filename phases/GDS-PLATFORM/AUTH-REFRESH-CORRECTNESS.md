# Refresh runtime failure and remaining session contract

Status: IN_PROGRESS. The actual authenticated policy-label probe observed an access401 followed by refresh500. Two deployed-code localization browser cases passed, but that does not override the authenticated refresh failure or prove the complete session requirement.

## Evidence and first correction

The retained opaque synthetic Admin session was used without extracting/logging credentials or attempting a fresh login to manufacture a pass. A diagnostic retry observed Admin settings401 and refresh500, with no returned policy state and no business write. Increasing only the probe observation window did not resolve it. The application stayed on the protected route, consistent with retaining a session after a temporary refresh failure. No server stack trace has yet established the exact production exception.

Source refresh code scanned all active bcrypt hashes inside an interactive transaction. A local synthetic24-comparison benchmark took5502ms, while the configured Prisma client retains the documented five-second default. A deterministic transaction-budget regression failed before correction. The first backend slice moves expensive candidate proof outside rotation, then reloads account eligibility and conditionally consumes the exact proven token ID/user/hash while active/unexpired. Missing, blocked or soft-deleted accounts are rejected before proof and again inside the transaction. It preserves the existing token format,30-day lifetime, rate limits, MFA behavior and atomic successor issuance. No timeout is raised.

Focused checks passed27 tests across refresh/device/MFA issuance suites and Nest build. Real PostgreSQL replay now includes a six-second proof and forced issuance failure, checking rotation/replay/rollback and unchanged purchased grants. Its actual remote result, production recovery using the same retained synthetic session and source cleanup remain pending. See backend `docs/handoffs/auth-refresh-transaction-budget.md` for the narrow contract and framework source.

Full local auth verification subsequently passed17 suites /134 tests; production dependency audit has zero high/critical findings (one low/thirteen moderate unchanged). Backend PR50 candidate is `4d768423e8f75805b47156abb5f69a9f47068719`. The feature branch is intentionally retained while its real database/quality checks and release are pending; do not delete it as though already merged.

Final-head real PostgreSQL replay `43570058855` subsequently passed, including the slow-proof rotation, revoked predecessor denial and forced issuance rollback. The remaining quality check and release gates are still pending at this checkpoint. A green disposable replay is not yet the retained production session's recovery result.

## First-slice release and actual recovery

PR50 final quality/concurrency `43570058885` passed before merge as `31727e536d1d1da66cc78478b5ab90115c03cc7e`. Fetched main matched the tested candidate tree. Main quality `43570678215`, replay `43570678223` and deployment `43570678247` passed. Public health returned200 at2026-11-14T07:24:26Z. The merged temporary backend branch was deleted remotely/locally after ancestry verification, then references pruned.

Actual retained-session recovery passed at2026-11-14T07:24:35.868Z: the same opaque synthetic Admin state that previously produced refresh500 was used without a fresh primary login. One ordinary refresh returned200, then the real settings API returned two existing point-policy revisions. Their labels switched VI→EN→VI correctly at all seven required widths; creator identifiers stayed unchanged. Zero business/financial operations and page JavaScript errors occurred. Sanitized receipt outside Git: `D:/Work/Edu-AI/.codex-artifacts/gds-production/policy-labels-readonly.json`, with screenshot `policy-labels-en-390.png` in that directory. This observed recovery supports the diagnosed transaction-budget correction; the broader session contract below remains open.

## Fresh-context adversarial review

The doubt-driven-development skill explicitly required the read-only fresh-context reviewer. External cross-model CLI review was skipped in this autonomous continuation. The scoped second review found no new implementation defect and requested issuance-failure rollback coverage; that actionable request is now included in the disposable database probe.

The broader original session contract still has inherited gaps to resolve, rather than declare fixed by the timeout correction:

1. Legacy direct-bcrypt JWT hashes cannot prove the entire token when token prefixes collide; versioned exact-token binding and a safe compatibility/reauthentication strategy need implementation/testing.
2. Per-device logout requires explicit rotation/session-family semantics and a race-safe relationship between predecessor and successor.
3. Refresh must serialize or otherwise fence password/MFA revoke-all operations so a concurrent successor cannot survive revocation.
4. Stale MFA revision must not be upgraded to the current revision during refresh; eligibility/MFA state must be checked under the coordinated boundary.
5. Real database interleavings must test refresh versus logout/password/MFA revocation and preserve independent devices, account eligibility and purchased rights.

These are internal engineering work within original stage1, not missing business-policy decisions. Keep the full goal active. No production financial operation, schema change, primary-login reset or account/MFA mutation has been performed in this investigation.
