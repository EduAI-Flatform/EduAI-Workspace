# PAYW-01B — VietQR receipt review, bank-source verification & controlled release

**Owner start:** 2026-10-23. **Safe engineering/planning: AUTHORIZED.** **Public GO-LIVE: BLOCKED_EXTERNAL / NO-GO.**
**Relationship:** a specifically authorized PAYW-01 follow-on lane; PAYW-01 sandbox remains delivered/live blocked, PAYW-02 has not started. Preserve independent `SPR25-007` AI-DOS financial gate and `.ai-dos/records/` without edits.

## Owner's desired temporary experience (recorded faithfully, not release-approved)

1. Public EduAI customer buys a real course or membership, transfers real VND to company-issued MB receiving account and uploads a screenshot of the successful-transfer display.
2. Image OCR/validation compares visible payee, amount and unique order reference. The owner requests **full ordinary entitlement immediately**, not limited demo content or a time-limited demo, even before an incoming bank credit is independently confirmed.
3. Admin checks company MB incoming transaction history later; if credited, click **Xác nhận đã thanh toán**; if not, click **Thu hồi quyền truy cập**. This temporary business workflow is intended to be superseded by company PayOS integration.
4. Owner states that account is provided by the company; they personally do not hold ownership documents. As of 2026-10-23, owner newly reports being able to view transactions **in a bank app**, but has not clarified whether this is **the corporate MB receiving account's incoming ledger** or their own bank app's outgoing payments. Treat provenance, completeness, account scope, access authority and review procedure as **PENDING VERIFICATION**, not proof accepted. One operator available, no independent second reviewer. Third-party seller contracts remain absent.

## Trust boundary and non-negotiable factual separation

- A payer-uploaded image, OCR score, transfer receipt, pasted code or customer notification is **claim evidence only**. It cannot prove beneficiary receipt and must never create canonical `PAID`, verified settlement, wallet funding, platform revenue, seller payable, refund eligibility or irreversible payout.
- **Early entitlement** (if ever explicitly approved) is a separately auditable, revocable *access decision*, not a verified payment decision. It may expose the entire actual course; its eventual revocation cannot erase lessons already read/downloaded or benefits already consumed. This is a deliberate business-loss/fraud risk, not merely a technical test.
- **Verified payment** requires independently checked, bank-origin *incoming* transaction for the authorized receiving account (or authenticated contracted provider notification), exact integer VND amount, order reference, bank transaction ID/time/account, idempotency, replay/duplicate safeguards and accepted approval controls. A bank-app screen viewed by a human may assist manual review only if it is demonstrably the company's incoming ledger and reviewer has permitted access.
- Customer terms must not label a claim as `Đã thanh toán` until payment verified. Display `Đã gửi chứng từ — đang đối soát` with clear caveat. Admin's `Xác nhận đã thanh toán` requires recording trusted source identity and exact match; cannot be an unconditional force-paid button. Revocation targets only the specific early-granted entitlement with appeal/reinstatement, reason and immutable audit.
- Screenshots can be forged or recycled. OCR matching does not authenticate money movement. A company receiving account name that appears in a QR likewise does not demonstrate collection authority. OWASP guidance: verify server-side gateway status before fulfillment; inspect file signatures, content and size for untrusted uploads.
- Public real-money collection is **not** a harmless test because the site is public. Until governance and live release are satisfied, all source/UI work must remain disabled in production, with synthetic money, images, orders and limited test identities.

## Prioritized viable architecture

**Preferred GO-LIVE path:** bank-origin statement/feed is validated on the server (authenticated provider API or independently sourced incoming corporate account statement). Match order/account/reference/amount/transaction/time; perform verified settlement idempotently and grant entitlement immediately after that. Screenshot/OCR can prefill support data but must never be the payment-authority input. If only manual app viewing is available, allow admin to record and independently review exact bank-origin details; existing dual-control guard remains until a separately approved redesign of controls.

**Owner-requested early-access variant:** implement behind separate default-OFF `receipt_early_access` capability only in isolated synthetic test or a separately approved risk-limited pilot. It grants ordinary functional entitlement with provenance `UNVERIFIED_RECEIPT_ACCESS`, not a paid financial status, and can be revoked. No public release merely by flipping a flag. Any future real-user launch demands a signed and evidenced exception to the current fulfillment invariant, defined monetary/abuse exposure, approved access and source review, customer disclosure, opt-out/kill-switch, legal/finance signoff and independent `SPR25-007` clearance. Do not silently override `bankTransferEnabled` production refusal or dual approval.

**Scope exclusions:** no Ví GDS real funding, no PayOS/VNPay behavior change, no third-party seller payouts/revenue split, no refunds triggered by image, no `PAYW-02`, no bank credential harvesting, no live production deploy or real-money test under this dossier.

## Project coordination

- [Tasks](TASKS.md), [Acceptance](ACCEPTANCE.md), [Source & launch gate](GO-LIVE-GATES.md).
- Apply root `AGENTS.md` + one-prompt-per-major-phase workflow. For materially changed checkout/Admin UI use Stitch first and verify 320/375/390/412/768/1024/1440.
- Backend owns evidence/source/settlement/access ledger; Frontend owns customer upload/status and Admin queues/actions; Workspace owns sanitized decisions, checklists, observed evidence. No secrets, full statements, customer images or sensitive IDs in Git.
