# PAYW-01 — VietQR production-readiness dossier (preparation only)

**Snapshot:** 2026-10-22 (owner-reported facts; not evidence acceptance).
**Disposition:** PREPARING / **NO-GO for production**. Sandbox technical delivery is complete; live acceptance has not started.
**Scope:** read-only diligence, runbook, release planning and synthetic verification. This document is neither an instruction nor approval to deploy, change guards/env/secrets, migrate production, collect real money, reconcile production, refund or release entitlements. No PAYW-02 start.

## 1. Decision update and remaining uncertainty

| Item | Owner input / current finding | Readiness result |
| --- | --- | --- |
| Business model | EduAI operates both (A) sales of its own courses and (B) collection for independent sellers. This is an owner assertion, not verified legal/tax authorization. | Both flows require separately mapped contracting, invoicing, beneficiary and ledger responsibilities. |
| Receiving evidence (PAYW-D01) | Owner reports documentary evidence of MB corporate account and collection authority **exists**. No documents have been furnished to/reviewed by this delivery; authenticity, scope and effective dates unverified. | **OPEN / PENDING DOCUMENT REVIEW**; never record as ACCEPTED merely because available. |
| Independent reconciliation (PAYW-D08) | Two independent people **not assigned**. No identity, authorization, training, source custody, alternate or release owner evidenced. | **OPEN / NO-GO**; two active, distinct authorized platform_admin operators required at runtime. |
| Other gates | PAYW-D03/D04/D10 and the independent SPR25-007 canonical release gate remain unresolved. | **OPEN / NO-GO**. |
| Implementation boundary | Backend only enables bank_transfer in isolated development/test with sandbox feature flag; receiver is synthetic 0000000000 and production refuses unconditionally. | **Not deployable as a real receiving flow**. Do not replace or bypass guard through configuration. |

The proposed MB recipient/name in PAYW-01 RUNBOOK is reference-only, not approved runtime configuration. Never attach unredacted company banking documents, signer IDs, actual bank statements, credentials or personal data to issues, Git commits or CI artifacts.

## 2. Operating models — separate acceptance tracks

| Control | A. Company-owned courses | B. Independent-seller courses |
| --- | --- | --- |
| Customer-facing contracting party and payee | Establish EduAI legal entity, course inventory ownership, invoice/receipt issuer and refund obligor. | Establish each seller's agreement and whether EduAI is merchant of record, disclosed collection agent or another legally reviewed role; no assumption from the label “both models”. |
| Authority to receive | Verify company bank holder and documentary authority to collect these sales. | Additionally verify authority to collect on the seller's behalf, consent/terms, seller identity and remittance obligations before offering this route. |
| Accounting | Approved ledger treatment for receipt, tax, fees and course revenue. | Separately trace seller payable, EduAI fee, tax/invoice responsibilities, payout hold, dispute and refund reversals; PAYW-02/03 not delivered. |
| Refund | Approved eligibility, customer communication, bank refund execution and audit. | Same, plus treatment of seller allocation, prior remittance and dispute liability. |
| Initial launch candidacy | **Only a possible bounded pilot**, after every common live gate and mode-A evidence is accepted through a separate authorized release. | **Do not activate** until model-B contractual, tax, allocation/payout and refund obligations are signed off and corresponding controlled system capabilities are actually delivered. |

Do not silently route a seller-course payment through model A to evade model B review. Orders must have immutable classification and a configuration-enforced allowlist; unapproved mixed carts, seller orders or membership products must remain unavailable for bank transfer. Exact launch catalog is an owner release decision, not chosen here. Ví GDS learner funds are non-cashout (policy-only refunds); they are a different workstream and must not be conflated with a bank-transfer receipt or treated as a regulated wallet approval.

## 3. Documentary evidence intake (restricted, read-only)

Use a restricted business-controlled repository/vault, never Git or test fixtures. A reviewer records only an opaque evidence identifier, issuer, issue date, validity, authorized entity, scope, reviewer identity/time and disposition in a sanitized gate sheet.

- **Bank account**: bank-issued ownership certificate / account confirmation; exact legal entity and account, current account control, permitted receiving usage; independently verify issuer/source. A bank-app screenshot alone is not conclusive.
- **Entity and signatory**: current enterprise registration and signatory/representation authority; match to beneficiary and effective dates.
- **Collection rights by model**: direct-sale invoice/terms and inventory ownership (A); signed seller collection/agency or merchant-of-record agreements, service terms, acceptance of receiving account and payment responsibility (B).
- **Finance/legal review**: invoice/VAT/withholding requirements, customer refunds, complaints, personal-data handling, source retention, payout limits, fees and internal authorization matrix for each model. These need competent legal/accounting sign-off; this dossier is not a legal opinion.
- **Decision record**: PAYW-D01 can move to VERIFIED only when authorized reviewers accept actual inspected evidence with owner signoff. D03/D04/D10 remain individually gated; do not batch-close them from D01.

## 4. Dual-control staffing (PAYW-D08 — NOT READY)

The owner must appoint **two named distinct persons** with separate active accounts and least-privilege platform_admin eligibility (subject to role-design review); record an authorized release owner and backup outside the approval pair where practical. Before live authorization:

1. Verify identities, employment/agency authority, separate MFA-protected accounts, current access, no shared logins and independent approver action. Account revocation must fail closed.
2. Assign official bank-statement retrieval and protected custody. A maker can submit a statement and may be one approver; they cannot be both approvals. Approval 2 must independently inspect the **bank-origin source**, not copy approval 1's assertion.
3. Train both on exact bank account, VND amount, unique transfer content, official bank transaction ID and occurredAt window, deduplication, cancellation/expiry, privacy, fraud, source SHA-256 integrity **versus** bank authenticity. Screenshots, user “paid” clicks or callbacks do not prove payment.
4. Record shift coverage, alternates, statement latency, support handoff, evidence retention, on-call incident contact and a rehearsed abstain/escalate path for ambiguity.
5. Prove with **synthetic** access-revocation, same-actor, wrong account/reference/amount, late transfer, duplicate, race and fulfillment-retry tests. No direct PAID mutation, no bypass to make a queue green.

**Stop condition:** until two independent operators are appointed, verified and trained and source custody approved, do not activate even model A.

## 5. Read-only preflight and engineering changes required BEFORE any future activation

| Gate | Evidence to collect or engineering deliverable | Current state |
| --- | --- | --- |
| Baseline | Lock reviewed Backend e4688c0, Frontend 67335ef and Workspace f370d9e; compare current main, relevant PRs, CI and production drift before making a release plan. | Historic sandbox evidence PASS; **fresh production inventory not asserted**. |
| Production code path | Separately designed and reviewed real-bank adapter/config boundary: fail-closed explicit production feature gate, validated approved legal receiver, immutable order snapshot, disabled-by-default methods, mode-aware catalog eligibility, anti-replay, webhook isolation and no synthetic receiver in live output. Keep sandbox fixture nondeployable. | **NOT IMPLEMENTED / NOT AUTHORIZED HERE**. Current NODE_ENV production block is intentional. |
| Financial correctness | Integer VND, per-order unique content, amount/account/beneficiary match, expiry/late transfer, bank timestamp authenticity, official-statement retention, two distinct approvals, DB isolation/idempotency, fulfillment exactly once and failed-job recovery. | Synthetic tests PASS; **live source contract unverified**. |
| Change/release safety | Migration diff and reversible plan, read-only schema/DB inventory, backups/restore rehearsal, runbook, monitoring and alert thresholds; explicit permission before any production migration/DB write, configuration/secret change, payment provider switch, deployment or restart. | **NOT APPROVED**. |
| Security | Reassess previously recorded Backend/Frontend dependency findings for actual release exposure and remediate or formally accept material risk; privacy/RBAC/abuse controls and branch/PR/main CI. | **OPEN** (see EVIDENCE.md). |
| Independent platform gate | Satisfy SPR25-007 via its own canonical AI-DOS process. Do not infer clearance from PAYW-01 or change .ai-dos financial records through this dossier. | **OPEN**. |
| Business/release | Document review (D01), signed model decisions (D03/D04/D10 as applicable), operator roster/source custody (D08), written activation/UAT owner authorization. | **OPEN**. |

Current production deployment workflows require explicit approval and may run migrations/restarts; they must not be triggered as a “read-only check.” Observe their definitions only. Do not edit production environment values to try to enable bank transfer; it is code-blocked.

### Synthetic verification matrix (safe to repeat in isolated test)

- Each eligible modeled order creates a unique VietQR content and immutable request; account is test-only, amount is exact positive integer VND.
- Ineligible mode B / mixed-catalog order stays disabled; an API cannot override the client UI gate.
- One verified source + one approver never settles; same approver twice, revoked roles, expired evidence and mismatched fields reject.
- Two distinct qualified approvals, official-source provenance, expected amount/reference/account/timestamp and replay-safe transaction ID settle once and grant course entitlement once.
- Concurrent approval/cancel and duplicate bank transaction across orders cannot double-settle; delayed bank notification remains support-only, not PAID.
- Cancelled/expired/wrong/under/over/late/suspected-fraud payments create review cases without automatic settlement or refunds; generic refund endpoint must not bypass policy.
- Backend production environment continues refusing current sandbox path irrespective of sandbox flags; front-end cannot display a working live bank transfer option from synthetic fixtures.

All tests must use synthetic bank records, no real customer/order/account funds.

## 6. Future controlled GO-LIVE sequence (PLAN ONLY — explicit separate approval required)

1. **Gate review**: evidence-backed D01 + model-specific D03/D04/D10, two-person D08 staffing/training, independent SPR25-007, security and operations acceptance. Produce named GO/NO-GO signatories and scope-specific record; any unknown = NO-GO.
2. **Separate engineering change**: approved code/config plan, tests, PR/CI, independent finance/security review, deploy/rollback rehearsal and protected release instructions. Production readiness is not attained by today's sandbox merges.
3. **Bounded release request**: owner explicitly specifies scope (initially consider model A only), exact course/order eligibility, max test amount and number of authorized payers, time window, involved operators, source access, authorized production deploy/migration/env changes and rescue/rollback authority. No implicit permission from this document.
4. **Go/no-go before action**: record accepted evidence references, fresh SHA/CI, monitoring and statement availability, backup and rollback, legal/finance approvals and signed separate authority for each protected operation.
5. **Later live UAT**, only after written authorization: one capped transaction at a time, verify official bank posting and two independent signoffs, one entitlement, receipt, support/exception path and daily bank-ledger tie-out; stop and investigate discrepancies.
6. **Observe and revert safely**: monitor unmatched/unsettled orders, statement delays, duplicate claims, unexpected authorizations, refund/support tickets and technical errors. Disable feature using a pre-approved fail-closed switch if anomalies; preserve evidence. Never rewrite paid history, fabricate statement evidence or initiate unapproved refunds.

## 7. Execution status and owner handoff

**Today:** documentation/preflight only; no production access change, bank API use, real payment, payout, refund, reconciliation mutation, migration or deployment. GO-LIVE = **NO-GO / BLOCKED_EXTERNAL**.

**Owner next inputs, without sending sensitive scans in chat or Git:**

1. Nominate two distinct reviewers, their roles, alternates and restricted official-bank source custodians.
2. Make corporate banking and collection-rights evidence available to authorized legal/finance reviewers through a controlled channel; provide only sanitized evidence IDs and acceptance outcomes for Workspace.
3. Identify course classes and seller agreements under models A/B; obtain written finance/tax/refund acceptance and a model-A-only pilot scope decision if appropriate.
4. Authorize a **new** reviewed production-readiness engineering phase only after business gates are ready. Actual deployment/real-money UAT requires further separate explicit approval.

**Invariant:** PAYW-01 sandbox DONE does not equal GO-LIVE PASS. PAYW-01-LIVE stays BLOCKED_EXTERNAL; PAYW-02 remains unstarted. Preserve existing payment-provider rollback and SPR25-007 boundaries.
