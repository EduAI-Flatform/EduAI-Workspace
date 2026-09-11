# 2026-09-10 - Application repository baseline

## Repository state

The application repositories remain independent siblings; the workspace tracks
handoffs and state, not application source contents.

| Repository | Branch | Revision | Worktree | Verification |
| --- | --- | --- | --- | --- |
| Front-End | `main` | `7ac6cda` | clean | `npm test`: 92 files / 340 tests passed; `npm run build`: passed |
| Back-End | `main` | `ae81dc3` | clean | `npm.cmd test -- --runInBand`: 146 suites / 858 tests passed; `npm run build`: passed |

Front-End revision `7ac6cda` and Back-End revision `ae81dc3` were pushed to
their respective `origin/main` branches.

The payment pending notice fix excludes closed payment states in the Cart UI
and excludes expired local payment windows from the backend pending-payment
query. Regression tests cover both expired and cancelled responses.

## Post-fix production verification

On 2026-09-11, the operator rechecked the production Cart after deployment.
A previously cancelled or expired payment no longer appeared in the pending-
payment notice. The sanitized result is recorded as
`EVIDENCE:SPR25-007:CART-CLOSED-PAYMENT-VERIFICATION`; no credential, payment
identifier, raw provider payload, or financial detail was recorded.

## Release-gate status

`SPR25-007` remains `WAITING_MANUAL` for the broader settlement,
reconciliation, and provider-rollback evidence. The targeted post-fix Cart
regression check passed; it does not by itself close the full payment release
gate.
