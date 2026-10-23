# PAYW-01B — Dependency-ordered tasks

Owner explicitly started **safe implementation planning on 2026-10-23**. Autonomous implementation/PR/CI/merge may proceed only for source/sandbox changes; stop before any live-money activation, risky schema migration, real DB writes, env/secrets change, production deploy/restart or financial/security guard bypass. Existing `PAYW-01-LIVE` remains blocked.

| Subphase | Scope and deliverable | State |
| --- | --- | --- |
| PAYW-01B-QRP | Isolated Admin-only VietQR recipient preview: bank and beneficiary from Backend env, guarded read-only QR API, no payment/order/entitlement/DB writes, defaults OFF. Real receiving-account values excluded from GitHub and set by owner on VPS. | DONE (source only): Backend PR #12 merged; CI #224 PASS; deployment and production use not enabled |
| PAYW-01B-A | Fresh Backend/Frontend/Workspace source, PR/CI and production drift audit; bank-origin source/owner authority fact-check; threat model; exact API/DB contracts; new Admin/checkout Stitch if material | PLANNED |
| PAYW-01B-B | Upload pipeline isolated and secure (type/signature, image size, antivirus where available, storage ACL/TTL, PII retention, rate limits); OCR claim normalization, duplicate detection, never financial proof; support/appeal case and ownership/RBAC | PLANNED |
| PAYW-01B-C | Verified *incoming receiving-account* statement ingest/review adapter with explicit provenance and read-only manual source evidence; exact order/reference/amount/account/tx-id/time and concurrency/replay checks. Keep existing two-person settlement restriction unless approved independent control redesign | PLANNED — blocked on bank-source clarification for final adapter |
| PAYW-01B-D | Revocable entitlement provenance model for owner-requested full-access-before-verification scenario **synthetic/disabled by default**; lifecycle `CLAIM_SUBMITTED → ACCESS_UNVERIFIED → VERIFIED_PAID` or `REVOKED/DISPUTED`; no payment settlement from OCR; audit, rollback/restore and consumed-benefit limits | PLANNED — real-user launch not authorized |
| PAYW-01B-E | Admin queue/action design: see evidence; view bank-source reference; `Xác nhận đã thanh toán` (only on valid verified-source acceptance); `Thu hồi quyền truy cập` (only applicable early entitlement), reasons, double-check, audit, notifications, appeals. Stitch-first UX, seven widths | PLANNED |
| PAYW-01B-F | Unit/DB race/security, forged/reused images, false positives, statement mismatches, repeat/reverse actions, PayOS/VNPay/TMI regression, browser/a11y; full gates, PR/CI/merge SHA, observed evidence and cleanup | PLANNED |
| PAYW-01B-LIVE | Validate company rights, *incoming* statement source, operator controls, seller/model legal scope, `SPR25-007`, release design and signed go/no-go; explicit bounded activation and rollback authorization | **BLOCKED_EXTERNAL / NO-GO** |

One owner prompt may drive A–F autonomously with no artificial subphase pauses; only genuinely protected operations or missing authority block. Source work must not be represented as public GO-LIVE.
