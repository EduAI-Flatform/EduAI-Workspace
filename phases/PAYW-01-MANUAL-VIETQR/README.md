# PAYW-01 - Controlled bank VietQR

**Status:** BLOCKED_EXTERNAL for live/legal gates; sandbox technical implementation delivered and verified.
**Owner start:** 2026-10-22, explicit PAYW-01 request.

PAYW-00 remains VERIFYING. The owner explicitly authorizes maximum safe design, source, synthetic tests and docs while legal decisions remain OPEN. This scoped exception to the ordinary PAYW-00 DONE dependency does not accept ADR-006 or waive release gates.

Deliver separate bank_transfer requests, per-order integer-VND VietQR, authoritative checkout and two-person official-statement reconciliation. Preserve PayOS/VNPay webhook semantics, settlement/fulfillment separation, TMI and SPR25-007. No PAYW-02 work.

On 2026-10-22 the owner reports both EduAI-owned-course sales and collections for independent sellers. The owner initially marked MB account/collection-right documents as available, then asked what those proofs mean; evidence possession and scope must be reconfirmed, and none has been reviewed. Two independent reconciliation operators remain unassigned. PAYW-D01 evidence acceptance, mode-specific PAYW-D03/D04/D10 and PAYW-D08 operator/release approval remain OPEN. Proposed MB details are not verified runtime configuration. No real transfers, production activation/deploy/migration, secret changes, refunds or payouts are authorized. Tests use synthetic beneficiaries only.

Technical delivery requires actual tests, Stitch/browser/a11y review, CI, PR/merge remote SHA and branch cleanup. It cannot mean PASS production or GO-LIVE.

[Design](DESIGN.md) | [Tasks](TASKS.md) | [Acceptance](ACCEPTANCE.md) | [Tests](TEST-PLAN.md) | [Stitch](UI-STITCH.md) | [Evidence](EVIDENCE.md) | [Runbook](RUNBOOK.md) | [GO-LIVE readiness (NO-GO)](GO-LIVE-READINESS.md)
