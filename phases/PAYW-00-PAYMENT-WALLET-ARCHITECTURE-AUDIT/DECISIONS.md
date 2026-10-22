# PAYW-00 — Decision Register

No entry below is assumed resolved merely by being documented.

| ID | Required business/legal fact | Needed before | Current decision |
| --- | --- | --- | --- |
| PAYW-D01 | Confirm MB account 1122883979 legal beneficiary, ownership/control and merchant authority to receive all course proceeds | PAYW-01 activation | OPEN — owner reports MB corporate account and collection-rights documents exist (2026-10-22), but neither evidence nor scope has been independently reviewed/accepted; both direct-sale and independent-seller collections asserted |
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