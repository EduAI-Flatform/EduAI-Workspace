# PAYW-00 — Decision Register

No entry below is assumed resolved merely by being documented.

| ID | Required business/legal fact | Needed before | Current decision |
| --- | --- | --- | --- |
| PAYW-D01 | Confirm MB account 1122883979 legal beneficiary, ownership/control and merchant authority to receive all course proceeds | PAYW-01 activation | OPEN — supplied number only |
| PAYW-D02 | Choose issuer/regulated wallet partner, scope, KYC/AML, safeguarding, linked accounts and signed API agreement | PAYW-05 | OPEN — no partner evidenced |
| PAYW-D03 | Is EduAI merchant of record or contracted collector for each seller? Determine invoicing and VAT/withholding duties | PAYW-02 | OPEN — legal/accounting signoff |
| PAYW-D04 | Allocation base after discounts, tax treatment, PSP/bank fees, affiliate precedence, treatment of self-sold membership | PAYW-02 | OPEN — product/finance owner |
| PAYW-D05 | Seller hold window, minimum withdrawal, payout cadence, dispute and refunds after payout | PAYW-03 | OPEN — product/finance owner |
| PAYW-D06 | Partner handling of wallet funding, failed captures, reversal, refunds, account restrictions and balances | PAYW-04/05 | OPEN — partner interface |
| PAYW-D07 | Whether MB API/VA and bank payout automation are contractually available to this business account | PAYW-06 | OPEN — bank agreement |
| PAYW-D08 | Release gate and owner approval for switching the default payment provider; reconciliation operator readiness | PAYW-01 activation | OPEN — `SPR25-007` remains separate |

## Working design defaults (not live business configuration)

- One payment source per order in initial wallet launch. Partial tender/debit
  from several sources requires a separate ADR.
- Proposed version precedence: course > seller > global; always snapshot on
  order line and immutable allocation.
- Seller money is a payable, not independently spendable electronic money.
- Admin payout requires distinct approval and execution roles, immutable
  external reference and reconciliation.
- All new financial features default OFF and fail closed.

Owner approvals should cite these IDs in the future phase evidence, rather
than editing an old settled order or guessing policy values.
