# Point adjustment and affiliate continuation — 2026-11-16

Status: scoped point/affiliate releases verified below; the full GDS plan remains VERIFYING.

## Point adjustment payload binding

BE PR60 candidate464a3b70dd86662c2a546cbd2d3ddfa322b2f8a6 fixes silent
adjustment-key conflicts. Changed amount/direction/reason now returns409; an
identical retry returns persisted values without a new posting/audit. The existing
user lock and Serializable boundary remain.31 local redemption/expiry tests and
build passed; independent review found no substantive issue.

Head CI43868194265 and disposable PostgreSQL replay43868194213 passed. The new
restricted-runtime scenarios verify simultaneous identical/conflicting requests,
one posting/audit, unchanged history after rejection, debit replay and audit-failure
rollback. Main6f977e1ce58e13d37c784a35cd8f3f4a61d3c189 matched the tested tree;
main source CI43869231829 and deployment43869231393 passed.

Main replay43869231907 failed before the point suite in the existing inverse-Admin
role-mutation fixture, with P2034 at audit insertion. This is not recorded as a
passed main gate. The temporary point branch remains until the corrected main
passes all gates; no historical ledger or production financial test write occurred.

## Admin concurrency follow-up

Inspection confirmed the actual product already retries three complete Serializable
transactions. Immediate retries can overlap the peer again; the precise failed
schedule was not logged. PR62 candidate90b2e50a8f2bd0ddd135b1f1843370a6577ed224
adds25/50ms yields outside rollback and returns409 when recognized retries exhaust.
Subject locks, last-Admin protection, revocation and transactional audit are intact.
The fixture adds sanitized failed attempt counts without weakening assertions.
Two regression failures were reproduced;13 local tests, build and independent
review passed. Changed-revision PostgreSQL/main release verification is pending.

## Affiliate readiness and Admin consumers

BE PR61 candidateebdbe510db75147da5d28c2074f5161068554fe3 requires configured
funding/effective version for new participation and verifies frozen visit/policy
provenance before positive accrual. Historical canonical refund calculation stays
independent of current participation. Review caught a service-first pending-wallet
recovery ordering issue; composed regressions now cover both orderings, one negative
effect, recovery debt and unchanged held funds.54 tests/build passed; second review
found no substantive remaining issue. No schema or SQL posting guard changed.

FE PR50 candidatefa4d8bc1556ea549b431b46898ff8bddfd87199c uses existing support
contacts, keeps the inactive legacy withdrawal minimum serialized and directs
Admin to the sole canonical GDS withdrawal settings. Valid special mailboxes are
encoded safely. Funding guidance and partial reconciliation outcomes are localized,
as is the new point409; stored notices follow locale changes.151 Vitest files /
675 tests, build and registered VI/EN browser fixtures at seven widths passed.
CI/main/deployment/deployed-bundle acceptance and branch cleanup remain pending.

These changes do not activate affiliate policies, set business rates/thresholds,
add a second wallet, execute payouts or rewrite retained financial history.

## Released checkpoint — 2026-11-17

The initial pending statements above retain their chronology. Backoff PR62 merged
as4f25394a327b1655f0e46a8952b0e60e10dea6ab. Main CI43995201121, actual PostgreSQL
replay43995201277 and production deployment43995201053 passed. This supersedes
the failed6f977e1 replay; both point/backoff temporary branches were deleted
remotely/locally after ancestry/main gates, then references pruned.

Affiliate PR61 was updated by merge from that main and retested as
e0d1216f2f28fa398e8554b1328341a3d4a10ede: CI43995216337 and replay43995216335
passed. Merge4120e86123a0490874a0f9fdb996d32fdee5e7a5 passed main CI43996480348,
replay43996480328 and deployment43996480340. Its temporary branch was deleted
remotely/locally and pruned after verification.

FE PR50 merged as73a21313a8cbcc8837fd0bbbeddf32b6a543f097. Final-head
CI43871137489, main CI43871785777 and deployment43871785920 passed. Two browser
cases against shipped JavaScript passed VI/EN and all seven widths using intercepted
support/referral fixtures, with zero writes/errors/overflow. The merged branch
was deleted remotely/locally and pruned.

Actual retained-session acceptance at2026-11-17T01:51:10.992Z passed against later
backend5fc10a6bf214f5f74796f2f92998df7043d8e9f8: two authenticated settings tabs,
one successful refresh200, same family/original primary-auth time after59402 seconds
(about16.5 hours), zero fresh primary logins, errors or business/financial writes.
The access failure was explicitly simulated; this does not claim a natural
access-token expiry wait. Sanitized receipt: `.codex-artifacts/gds-production/auth-browser-diagnostics.json`
under the shared Edu-AI parent directory. No auth material was printed.

Dashboard nonzero/signed multi-owner statistics and QR/copy acceptance are being
added separately; this receipt does not replace those remaining P7.1/P7.7 checks.
