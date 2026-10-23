# PAYW-01B decisions — 2026-10-23

- Owner authorizes source, synthetic tests, PR/CI/merge for A–F, no production deployment, runtime env change, production migration or real transaction.
- Owner clarifies authorized view of incoming company MB transactions, app-only, no export asserted. This is reported source availability, not accepted financial evidence or collection authority.
- Latest scope: owner handles bank reconciliation operationally; do not build a new bank feed/statement-ingest adapter in C. Keep Admin inspection, OCR warnings, verified-payment and revoke controls. Preserve existing bank statement/dual-approval API and DB guards. No one-operator bypass is authorized.
- Receipts are claims. MATCHED_CLAIM never implies authentic image, incoming credit, PAID, settlement, wallet credit, payable or refund eligibility.
- Full early access is a separate synthetic-only grant with UNVERIFIED_RECEIPT_ACCESS provenance, not CommerceFulfillmentService. Revocation targets exact grant IDs. Restoration creates a new generation because existing grants have terminal revocation.
- Existing money wallet absent: TMI is noncash. Show GDS unavailable; never debit TMI for purchases. Real-money wallet implementation is outside this phase.
- Current bank migration locks checkout receiver to synthetic account. Keep this invariant. Admin env-configured recipient preview is separate and must not silently become the checkout receiver. Real receiver activation requires reviewed additive schema and protected release.
- Membership early access requires an explicit conversion design preserving consumed quota and purchased term on later verified fulfillment; cannot reuse sourceOrderLineId naively or refill benefits.
- Public GO-LIVE remains NO-GO; preserve SPR25-007 and canonical AI-DOS records.
