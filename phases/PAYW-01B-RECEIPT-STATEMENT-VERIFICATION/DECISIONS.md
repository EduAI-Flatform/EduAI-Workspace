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

B runtime names (source only): BANK_RECEIPT_SANDBOX_ENABLED=false by default; BANK_RECEIPT_SYNTHETIC_BUYER_IDS synthetic UUID list; BANK_RECEIPT_STORAGE_ROOT optional absolute private local path; BANK_RECEIPT_OCR_DATA_PATH absolute local eng/vie model directory. Existing BANK_TRANSFER_SANDBOX_ENABLED and BANK_TRANSFER_SANDBOX_OPERATOR_IDS still gate testing. Do not set these on production; production refuses this path independently.

## 2026-10-23 D implementation decision: immutable quota lineage

Receipt early access uses full existing course-learning and membership resources, with separate `UNVERIFIED_RECEIPT_ACCESS` generations and immutable exact effects. Default OFF, development/test only, explicit synthetic buyer AND seller allowlists. No settlement, PAID order or monetary posting from OCR. Revoke affects only the linked generation; re-upload cannot restore it. Admin restore requires reason, idempotency and expected generation, creates new terminal-resource identities and retains original windows. Canonical settlement conversion is transactional with paid fulfillment and preserves existing dual approvals.

Service consumption remains attached to original immutable usage records. A new `(orderLineId, definitionId)` quota pool shares original plan/window facts across revoked, restored and paid grants, avoiding quota refill. Legacy null-pool behavior remains. SQL validates the snapshot and serializes pool consumption. Disabling early access does not disable paid quota accounting.

Owner clarification: the owner views incoming company MB transactions in the banking app only and handles bank reconciliation operations; Admin checking remains required. This does not authorize a financial approval bypass or a new one-operator mechanism. Production collection authority/source acceptance and release gates remain separate. Source PR17 is VERIFYING; E/F UI/browser evidence remains pending.