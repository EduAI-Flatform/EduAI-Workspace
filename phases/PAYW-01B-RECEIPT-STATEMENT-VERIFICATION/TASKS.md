# PAYW-01B — Dependency-ordered tasks

Owner explicitly started **safe implementation planning on 2026-10-23**. Autonomous implementation/PR/CI/merge may proceed only for source/sandbox changes; stop before any live-money activation, risky schema migration, real DB writes, env/secrets change, production deploy/restart or financial/security guard bypass. Existing `PAYW-01-LIVE` remains blocked.

| Subphase | Scope and deliverable | State |
| --- | --- | --- |
| PAYW-01B-QRP | Isolated Admin-only VietQR recipient preview: bank and beneficiary from Backend env, guarded read-only QR API, no payment/order/entitlement/DB writes, defaults OFF. Real receiving-account values excluded from GitHub and set by owner on VPS. | DONE (source only): Backend PR #12 merged; CI #224 PASS; deployment and production use not enabled |
| PAYW-01B-A | Fresh Backend/Frontend/Workspace source, PR/CI and production drift audit; bank-origin source/owner authority fact-check; threat model; exact API/DB contracts; new Admin/checkout Stitch if material | DONE (source contract only) — Backend #14 / Workspace #12 merged, exact main CI PASS, branches removed; terminal receipt in EVIDENCE.md |
| PAYW-01B-B | Secure private receipt intake, bounded image decode, local OCR/claim normalization, replay/rate/ownership/retention/audit | VERIFYING — Backend PR #15; local unit/SQL/OCR/build PASS; authoritative per-job CI pending |
| PAYW-01B-C | Compatibility checkpoint over existing incoming-statement/source/dual-approval routes. Owner operates bank-app reconciliation; new bank feed/ingest adapter deferred. Admin checks remain required. | PLANNED — after B gates; live source authority remains GO-LIVE gate |
| PAYW-01B-D | Revocable entitlement provenance model for owner-requested full-access-before-verification scenario **synthetic/disabled by default**; lifecycle `CLAIM_SUBMITTED → ACCESS_UNVERIFIED → VERIFIED_PAID` or `REVOKED/DISPUTED`; no payment settlement from OCR; audit, rollback/restore and consumed-benefit limits | PLANNED — real-user launch not authorized |
| PAYW-01B-E | Admin queue/action design: see evidence; view bank-source reference; `Xác nhận đã thanh toán` (only on valid verified-source acceptance); `Thu hồi quyền truy cập` (only applicable early entitlement), reasons, double-check, audit, notifications, appeals. Stitch-first UX, seven widths | PLANNED |
| PAYW-01B-F | Unit/DB race/security, forged/reused images, false positives, statement mismatches, repeat/reverse actions, PayOS/VNPay/TMI regression, browser/a11y; full gates, PR/CI/merge SHA, observed evidence and cleanup | PLANNED |
| PAYW-01B-LIVE | Validate company rights, *incoming* statement source, operator controls, seller/model legal scope, `SPR25-007`, release design and signed go/no-go; explicit bounded activation and rollback authorization | **BLOCKED_EXTERNAL / NO-GO** |

One owner prompt may drive A–F autonomously with no artificial subphase pauses; only genuinely protected operations or missing authority block. Source work must not be represented as public GO-LIVE.

## Owner scope clarification — 2026-10-23

Owner confirms app-only view of incoming corporate MB credits. Owner will handle bank reconciliation operationally; a new bank ingest/feed adapter is deferred. **Admin checking remains required**, including receipt/OCR/warnings, source inspection and guarded confirmation/revocation. Keep existing statement and two-person approval enforcement; no owner authorization for a one-person financial override was given. C becomes a compatibility/control-verification checkpoint over existing bank APIs, not a new provider integration. See DECISIONS.md and SOURCE-CONTRACTS.md. Source B/D/E/F may proceed only after their applicable prior gates; public GO-LIVE remains separately blocked.
