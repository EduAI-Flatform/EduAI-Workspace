# PAYW-01B test plan

Only synthetic images/orders/buyers/operators in isolated local or disposable CI databases. Never point these tests at production.

- A: reconstruct baseline/main/CI, test production refusal and identity opt-in; exact claim normalization and mismatch cases; inspect immutable SQL; preserve byte-exact financial migration fingerprint.
- B: actual JPEG/PNG decoder, corrupted/spoofed/pixel bomb/oversize input, OCR failure/timeouts, owner/RBAC, private retrieval/retention, attempts/idempotency, byte/canonical hash and transaction replay.
- C: owner-managed incoming-bank review, preserve existing two-approver and exact source constraints. New bank adapter deferred by owner; do not assert manual attestation authenticates feed.
- D: full ordinary course/membership access under unverified source only; no financial writes; order-bound repeat/race grant/revoke, paid source survives, restore generation, consumed quota and verified conversion.
- E: Stitch/native components; loading/error/empty/disabled states, Vietnamese status, reason/confirmation/audit; keyboard/focus/touch and no overflow at 320/375/390/412/768/1024/1440.
- F: full relevant Backend/Frontend/Workspace gates, real disposable PostgreSQL concurrency, PayOS/VNPay/TMI regression; exact PR head/CI/merge/main/cleanup evidence. Missing runs remain unverified.
