# SPR21-030 — Final Integrated Regression and UAT

## Result

The Sprint 21 final release gate passed for the approved Neon test dataset and the deployed production frontend. The final demo dataset was not seeded or mutated in production.

## Local final-dataset matrix

- `npm.cmd run db:verify:final-demo`: PASS — 10 course metadata records, Voucher, Scholarship, TMI reward/ledger/redemption/entitlement registry.
- `playwright/sprint21-final-demo.spec.ts`: PASS 8/8 with fresh student and administrator sessions.
- Coverage: student course detail, price-bearing course, voucher preview, scholarship list/preview, TMI rewards/wallet/history, administrator read APIs, 320px and 1440px overflow checks.
- Frontend Vitest: 56 files / 151 tests PASS.
- Frontend build: PASS; existing Vite chunk-size warning remains non-blocking.

## Production deployment and UAT

- Frontend commit `b41e713`.
- Frontend CI run `32122696883`: PASS.
- VPS deployment run `32122696864`: PASS.
- Production UAT: 16/16 PASS using fresh student, instructor, and administrator sessions at 320px and 1440px.
- Verified role-boundary redirects, student/instructor route matrices, administrator dashboard, and audit viewer.
- `https://eduai.giaoducso.org.vn/`: HTTP 200.
- `manifest.json`: HTTP 200, `application/json`, `display=standalone`, two icons.
- `https://api.eduai.giaoducso.org.vn/api/docs`: HTTP 200.

## Known limits and rollback

- The original broad local smoke wrapper timed out after 300 seconds; deterministic fresh-server targeted checks were used instead and passed. The timeout is retained as a harness limitation, not treated as product success.
- Native iOS/Android install prompts and Safari/Firefox install UI were not executed in this run: `NOT_APPLICABLE`, not PASS. Chrome installability diagnostics and service-worker runtime were verified in SPR21-026.
- No production seed, migration, redemption, application, or other production write was performed.
- Rollback: redeploy the previous frontend commit through `Deploy Frontend Production`; final-demo cleanup remains `db:reset:final-demo` on the authorized Neon test target only.
