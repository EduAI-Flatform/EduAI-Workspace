# 2026-09-10 - Application repository baseline

## Repository state

The application repositories remain independent siblings; the workspace tracks
handoffs and state, not application source contents.

| Repository | Branch | Revision | Worktree | Verification |
| --- | --- | --- | --- | --- |
| Front-End | `main` | `689cafaa0e04dd0acff517b9b562a8239cdfeca9` | clean | `npm test`: 92 files / 338 tests passed; `npm run build`: passed |
| Back-End | `main` | `dc2e712d6193092875e00ea4463cb9fa0d249a6c` | clean | `npm.cmd test -- --runInBand`: 146 suites / 857 tests passed; `npm run build`: passed |

Front-End revision `689cafa` was pushed to `origin/main`. Back-End revision
`dc2e712` was already synchronized with `origin/main`; no new source commit
was created.

## Release-gate status

`SPR25-007` remains `WAITING_MANUAL`. This handoff records local build/test
verification and repository synchronization only; it does not claim a new
production deployment or completion of the human-only 10.000 VND payment UAT.
