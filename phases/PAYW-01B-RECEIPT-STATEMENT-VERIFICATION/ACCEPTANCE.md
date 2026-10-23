# PAYW-01B acceptance / test contract

All boxes are **not yet verified** for PAYW-01B. PAYW-01 sandbox tests do not automatically validate this new flow.

## Technical source/sandbox acceptance
- [ ] Reconstruct exact real Backend/Frontend/Workspace source, source `AGENTS.md`, PRs, CI and bank-provider integration baseline.
- [ ] A buyer's screenshot/OCR can only create a **claim** or separate `UNVERIFIED_RECEIPT_ACCESS` access record in approved isolated tests; never canonical `PAID`, monetary ledger/payout, or valid bank evidence. Artificial transactions and images only.
- [ ] Source reviewer proves incoming MB corporate account transaction provenance (not payer's outgoing screen), exact positive integer VND amount, uniquely bound content, account, stable transaction ID/time, time window, duplicate prevention and immutable receipt/evidence links.
- [ ] Existing two distinct approver enforcement not weakened inadvertently. A proposed one-operator alternative requires security/finance review and separate owner decision, not a silent config bypass.
- [ ] Claim upload MIME+magic/decoder validity, file size/pixel limits, malware isolation, private storage, least privilege, retention/delete, safe error messages, rate limiting, anti-enumeration, duplicate/fabricated/reused image detection.
- [ ] If designed: full functional access granted under *unverified* provenance in synthetic-only mode; per-order idempotent creation/revocation, no interference with already verified purchases, explicit notice that content already consumed cannot be recalled.
- [ ] Admin `Xác nhận đã thanh toán` checks actual verified bank-source evidence, server-side RBAC/approval and idempotency; `Thu hồi quyền truy cập` requires reason, evidence, actor and audit, and does not destroy a valid paid entitlement.
- [ ] Eligible direct-company catalog distinguished from contracted third-party seller listings and membership; ineligible or mixed carts fail closed for unsupported financial flows.
- [ ] Stitch UX, 320/375/390/412/768/1024/1440, a11y, no layout/role/status confusion; all relevant unit/integration/real PostgreSQL race/security/browser tests and repository CI green with observed run URLs and SHAs.
- [ ] No production bank transfer activation, actual incoming payment, provider switch, DB production mutation, secret change, real reconciliation, refund/payout, or `SPR25-007` write.

## Production GO-LIVE acceptance (separate release; ALL OPEN)
- [ ] D01 company/legal beneficiary and permitted collection rights inspected, acceptance evidence recorded outside Git.
- [ ] Owner clarifies **which bank app and which account's incoming ledger** they can see; verified trustworthy statement access with retention and transaction identity.
- [ ] D08 trained independent reconciliation reviewers OR separately authorized, reviewed equivalent control based on authenticated bank-origin data; cannot assert one-person manual screenshot approval is equivalent.
- [ ] D03/D04/D10 for enabled business model, course/membership terms, seller contracts if applicable, taxes, refunds and customer communications accepted.
- [ ] `SPR25-007` independently cleared by canonical owners, other payment provider guards preserved.
- [ ] Specific consented production-scope go/no-go, protected deployment/migration/env/real-money operation permissions, rollback rehearsal and operations owner on duty.
- [ ] If full unverified early access for public users is still requested, separately documented loss/fraud/privacy risk acceptance, exposure limit, monitoring, source SLA, right to appeal and kill switch plus revised explicit authorization invariant; no automatic `PAID` from image.
