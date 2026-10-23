# PAYW-00 — Decision Register

No entry below is assumed resolved merely by being documented.

| ID | Required business/legal fact | Needed before | Current decision |
| --- | --- | --- | --- |
| PAYW-D01 | Confirm MB account 1122883979 legal beneficiary, ownership/control and merchant authority to receive all course proceeds | PAYW-01 activation | OPEN — owner initially selected 'documents available', then requested clarification of what proof of account and collection authority means (2026-10-22); actual evidence inventory, authenticity and collection scope NOT CONFIRMED; both direct-sale and independent-seller models asserted |
| PAYW-D02 | Choose issuer/regulated wallet partner, scope, KYC/AML, safeguarding, linked accounts and signed API agreement | PAYW-05 | OPEN — no partner evidenced |
| PAYW-D03 | Is EduAI merchant of record or contracted collector for each seller? Determine invoicing and VAT/withholding duties | PAYW-02 | OPEN — owner reports both direct seller and third-party collection models (2026-10-22); mode-by-mode merchant/agency contracts, invoice/VAT/withholding and accounting signoff still required |
| PAYW-D04 | Allocation base after discounts, tax treatment, PSP/bank fees, affiliate precedence, treatment of self-sold membership | PAYW-02 | OPEN — product/finance owner |
| PAYW-D05 | Seller hold window, minimum withdrawal, payout cadence, dispute and refunds after payout | PAYW-03 | OPEN — product/finance owner |
| PAYW-D06 | Partner handling of wallet funding, failed captures, reversal, refunds, account restrictions and balances | PAYW-04/05 | OPEN — partner interface |
| PAYW-D07 | Whether MB API/VA and bank payout automation are contractually available to this business account | PAYW-06 | OPEN — bank agreement |
| PAYW-D08 | Release gate and owner approval for switching the default payment provider; reconciliation operator readiness | PAYW-01 activation | OPEN — two independent reconciliation operators not assigned (2026-10-22); official-statement custody, training and explicit release approval missing; `SPR25-007` remains separate |
| PAYW-D09 | Can learners withdraw unused Ví GDS funds to a bank account at will? | PAYW-04 scope and UX | **OWNER DECIDED 2026-10-22:** No discretionary cash-out; only policy-governed refunds |
| PAYW-D10 | Refund policy for Ví GDS: eligibility, legal exceptions, partial/full refunds, original payment route, processing time, duplicate/error deposits and handling failed refunds | PAYW-05 live activation | OPEN — product, finance and legal signoff; D09 does not resolve these details |

## Working design defaults (not live business configuration)

- One payment source per order in initial wallet launch. Partial tender/debit
  from several sources requires a separate ADR.
- Proposed version precedence: course > seller > global; always snapshot on
  order line and immutable allocation.
- Seller money is a payable, not independently spendable electronic money.
- Admin payout requires distinct approval and execution roles, immutable
  external reference and reconciliation.
- Learner Ví GDS balance may only be spent on eligible EduAI purchases; no learner-to-learner transfers or ad-hoc conversion to cash are assumed. Refunds must follow the approved policy and any mandatory legal rights.
- All new financial features default OFF and fail closed.

Owner approvals should cite these IDs in the future phase evidence, rather
than editing an old settled order or guessing policy values.

Owner updates reflect reported availability and business intent, **not** accepted legal evidence or authorization to collect live funds. See [PAYW-01 GO-LIVE readiness](../PAYW-01-MANUAL-VIETQR/GO-LIVE-READINESS.md).

## 2026-10-23 decision addendum (latest owner intent; existing OPEN gates remain)

| ID | Owner request or newly reported fact | Decision and release status |
| --- | --- | --- |
| PAYW-D11 | Accept student-uploaded transfer screenshot/OCR as trigger for immediate **full normal** course/membership access before proof of bank receipt, allowing later Admin revocation | **OWNER REQUESTED, NOT SECURITY/FINANCE OR GO-LIVE APPROVED.** A photo remains untrusted and cannot produce `PAID`. Any early access must have `UNVERIFIED_RECEIPT_ACCESS` provenance, audit, revocation/appeal and separately approved exposure limit; consumed content cannot be recovered. |
| PAYW-D12 | One person currently reconciles; Admin needs `Xác nhận đã thanh toán` and `Thu hồi quyền truy cập` | **OPEN.** Paid confirmation requires a verified incoming bank-origin source and appropriate approval; revocation must target only unverified entitlement. Existing two-distinct-admin control remains until a reviewed, independently approved alternate mechanism exists. |
| PAYW-D13 | Owner now reports seeing transactions inside a banking app | **PENDING FACT CHECK.** Determine whether it is company MB *incoming* ledger versus payer/outgoing view, access authorization, stable bank transaction ID/timestamp, retrieval/export and privacy custody. A claim of bank-app access is not itself verified bank receipt or documentary collection authority (D01). |

PAYW-01B safe source planning authorized; public financial collection and early entitlement activation **not accepted**; `SPR25-007` stays independent. See [PAYW-01B](../PAYW-01B-RECEIPT-STATEMENT-VERIFICATION/README.md).
