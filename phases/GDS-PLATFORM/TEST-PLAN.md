# GDS verification plan

| Layer | Meaningful coverage |
|---|---|
| Authentication/security | Independent devices, concurrent rotation, network failure, MFA/recovery-code replay, password-change revocation and owner boundaries |
| Policies/cards | Invalid and unauthorized changes, immutable versions, effective dates, threshold boundaries, settled-spend source/refunds and preserved historical access |
| Affiliate/wallet | Canonical settlement proof, platform-fee funding capacity, idempotency, hold periods, refunds, debt and shared finance-lock ordering |
| Database | Disposable PostgreSQL/PGlite invariants and real PostgreSQL migration replay from the historical 65-migration baseline through all pending migrations |
| UI | System localization/UGC boundary, profile/Billing/support/MFA, authorized draft preview and quiz after video |
| Browser | Seven responsive widths; all three account roles; controlled fixture data; overflow, dialog and error checks |
| Repository gates | Existing frontend/backend quality, payment/PWA regressions, new GDS browser coverage, Workspace conformance and final-head remote CI |

Observed local counts and CI run links are maintained in [the integration receipt](IMPLEMENTATION-RECEIPT.md). Do not replace failed tests with skipped assertions or describe planned checks as passed. Known historical purchase fixtures must exercise retained order access rather than offer retired package sales.
