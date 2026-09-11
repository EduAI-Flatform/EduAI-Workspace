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

## Release-gate status

`SPR25-007` remains `WAITING_MANUAL`. The operator reported that the original
production payment UAT succeeded, but these new revisions still require
deployment and a repeat live Cart check; this handoff does not claim that
post-fix production verification is complete.
