# PAYW-01 - Controlled bank VietQR

**Status:** BLOCKED_EXTERNAL for live/legal gates; sandbox technical implementation delivered and verified.
**Owner start:** 2026-10-22, explicit PAYW-01 request.

PAYW-00 remains VERIFYING. The owner explicitly authorizes maximum safe design, source, synthetic tests and docs while legal decisions remain OPEN. This scoped exception to the ordinary PAYW-00 DONE dependency does not accept ADR-006 or waive release gates.

Deliver separate bank_transfer requests, per-order integer-VND VietQR, authoritative checkout and two-person official-statement reconciliation. Preserve PayOS/VNPay webhook semantics, settlement/fulfillment separation, TMI and SPR25-007. No PAYW-02 work.

PAYW-D01 actual beneficiary/control/legal collection authority and PAYW-D08 operator readiness/release approval remain OPEN. Proposed MB details are not verified runtime configuration. No real transfers, production activation/deploy/migration, secret changes, refunds or payouts are authorized. Tests use synthetic beneficiaries only.

Technical delivery requires actual tests, Stitch/browser/a11y review, CI, PR/merge remote SHA and branch cleanup. It cannot mean PASS production or GO-LIVE.

[Design](DESIGN.md) | [Tasks](TASKS.md) | [Acceptance](ACCEPTANCE.md) | [Tests](TEST-PLAN.md) | [Stitch](UI-STITCH.md) | [Evidence](EVIDENCE.md) | [Runbook](RUNBOOK.md)
