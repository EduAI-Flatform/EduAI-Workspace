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

## MFA revision correction in review

Backend PR51 initial candidate `eefd4da4161c5cd03c3b0d7f5f2987dfe5b1a1f1` rejects stale MFA revisions on renewal instead of adopting the current revision, including after disablement. Missing legacy revisions count as0. Fresh primary login and same-revision provisional/verified sessions retain their behavior/authentication time. Central issuance now reads MFA through its supplied transaction client. This is a scoped correction, not a claim that sharing a transaction alone serializes MFA changes.

Three regressions failed before correction. All17 auth suites/138 tests and Nest build passed locally. Runtime audit has zero high/critical findings, with existing one low/thirteen moderate unchanged. A fresh-context adversarial reviewer found no scoped defect. External cross-model CLI was skipped in autonomous context. Real PostgreSQL replay adds same-revision renewal, preserved auth time, stale enabled/disabled rejection, exact token-row rollback and unchanged purchased grants. Remote checks/release are pending at this checkpoint.

Initial replay `43573386581` failed on the new synthetic enabled-factor fixture, which omitted encrypted secret/enabled date and correctly violated the existing `user_mfa_enabled_secret_check`. Candidate `18cfd69a1a7812d0af243de8c6ac9890b1be0610` supplies a synthetic encrypted factor and clears it on disable; no database constraint or production logic was weakened. Final-head replay `43573593537` and quality/concurrency `43573593542` are running. Do not treat the first failed replay as a production failure or claim the replacement passed before observing it.

Final-head replay `43573593537` and all quality/concurrency jobs in `43573593542` subsequently passed. The actual `GDS_AUTH_MFA_REVISION_POSTGRES=PASS` marker was observed at2026-11-14T08:00:22Z and08:00:32Z for the ordinary and production-classified disposable runs. PR51 merged as `d3123f949a1e98d0f7cfbbbf27d86660de0f13e4`; fetched main exactly matched the tested candidate tree and ancestry. Main quality `43574039310`, replay `43574039237` and deployment `43574039399` are running. Runtime verification and merged-branch cleanup remain pending at this checkpoint.

Release terminal receipt: main quality `43574039310`, replay `43574039237` and deployment `43574039399` all passed at the merged SHA. Production health returned200 at2026-11-14T08:08:17Z. Actual retained synthetic Admin acceptance passed at08:08:22Z without fresh login: one refresh200, real settings/history read, VI/EN/VI at seven required widths, unchanged creator identifiers, zero page errors and zero business/financial writes. Sanitized receipt remains `D:/Work/Edu-AI/.codex-artifacts/gds-production/policy-labels-readonly.json`. This proves ordinary current-revision production renewal; stale-revision denial/rollback is proven in disposable PostgreSQL, not by mutating production MFA. After exact main-tree/ancestry and all post-merge gate verification, `fix/auth-mfa-refresh-revision` was deleted remotely and locally, then references pruned. The backend worktree is clean. Overall original stage1/plan remains IN_PROGRESS for the coordinated requirements below.

## Remaining coordinated revocation design constraints

Fresh-context source review found an additional mandatory case: MFA confirm/verify/recovery currently commits proof or factor mutation before a separate `issueMfaSession` transaction. Password/provider/Admin revocation can complete between them without changing MFA revision. A user-row lock in each separate transaction does not close that gap. Proof/mutation and issuance must share an atomic boundary; a primary-authentication security epoch is also needed to reject already-issued provisional sessions after credential revocation. Do not reinterpret MFA revision as a password/role epoch merely to avoid a necessary schema change.

The common subject fence must precede authoritative account/role reads and writes in every issuance/revocation path. Local password login must recheck its proven hash after acquiring that fence; OAuth/Firebase must not issue from a pre-lock eligibility snapshot. Keep Admin's complete Serializable retry boundary and last-active-administrator protection. Evaluate `FOR NO KEY UPDATE` for a stable user-row fence: stronger `FOR UPDATE` conflicts with audit actor foreign-key key-share locks during inverse Admin mutations. Verify actual PostgreSQL behavior rather than infer a deadlock fix from mocks.

Required deterministic interleavings remain rotation-before-revoke, revoke-before-rotation, password change during proof, MFA proof/issuance interruption and inverse Admin mutations. Observe actual lock waits with bounded gates; assert committed sessions, independent devices, expiry and unchanged purchased rights. Session-family logout and versioned full-token binding remain separate mandatory requirements. Legacy bcrypt prefix ambiguity cannot be solved by an unrestricted fallback; document any one-time reauthentication before rollout. These are implementation constraints, not newly invented owner approval gates.
