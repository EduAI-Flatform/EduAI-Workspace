# PAYW-01 - Controlled runbook

Sandbox/synthetic use only. Production refusal is intentional. Do not configure proposed real MB details, change secrets, deploy/migrate production, activate providers or make real transfers. PAYW-D01/D08 stay OPEN; this runbook grants no legal or collection authority.

## Supplied receiving details - UNVERIFIED

The owner supplied MB Bank, account 1122883979, proposed beneficiary CONG TY CO PHAN GIAO DUC SO. These are unverified documentary inputs only. Neither account ownership/control nor legal course-sale collection authority has been verified. Never use these details as sandbox fixtures, runtime defaults or production configuration under PAYW-01. Actual beneficiary and receiving authority require PAYW-D01 evidence before any future separately authorized live collection.

## Synthetic review

1. Owner requests a server-enabled bank method for an unpaid synthetic order; inspect immutable snapshot/reference/expiry. Never reuse cancelled requests.
2. Authorized maker inspects official synthetic statement, records bank/account/transaction ID, exact VND amount/reference/time and immutable source/SHA-256. Buyer receipt is support context only.
3. Two distinct authorized admins independently open official source, verify provenance/every field and each submit an approval. Source entry alone is not approval; the maker may be one approver but cannot provide both. Digest proves integrity, not bank authenticity. Never approve from screenshot or customer claim.
4. Idempotent approval rechecks permission/state/expiry/evidence transactionally; one verified settlement precedes independent fulfillment. Check recoverable fulfillment separately.
5. Inspect audit/actor/time and uniqueness. Never edit evidence or force PAID to repair a case.

## Exceptions

- Under/overpayment, wrong account/content or suspicious evidence: NEEDS_SUPPORT; no settlement/access. Authorized finance staff investigate official source.
- Expired/cancelled order or late transfer: support case only; no automatic reopen/fulfillment. Refund/reallocation needs separate approved policy and authority.
- Customer says transferred but pending: record sanitized order/request/reference and trace, inspect official statement. Notification is not confirmation.
- Duplicate/replay: retain original evidence/result and reject reuse; never invent another transaction ID.
- Fulfillment failure: retain settlement and use idempotent recovery; never confirm twice or erase history.
- Unknown bank outcome/fraud: freeze affected acceptance, preserve audit, restrict artifacts and escalate; no financial retry.

Before real operation require approved source access/retention/privacy controls. Raw bank statements, customer bank data and credentials must not enter Git/logs. Evidence references/digests resolve to immutable reviewable artifacts; mutation is an incident.

## Future activation - not authorized

Resolve PAYW-D01 beneficiary/receiving rights and PAYW-D08 operators/release approval, independently satisfy SPR25-007 and obtain explicit production/migration/live UAT authority. Technical tests do not replace legal/financial evidence. Production guard changes are outside safe PAYW-01. Stop after PAYW-01; no PAYW-02.

## Implemented sandbox API

The process must use development/test NODE_ENV plus BANK_TRANSFER_SANDBOX_ENABLED=true; every reconciliation operator UUID must be explicitly allowlisted in BANK_TRANSFER_SANDBOX_OPERATOR_IDS and remain an active nondeleted platform_admin. Production always refuses even if flags are true. Configure only an isolated test process after approved local setup; do not edit existing secrets/environment files. Receiver is fixed synthetic account 0000000000, never the proposed real MB account.

- GET /payments/methods advertises enabled methods. POST /payments/orders/:orderId/request optionally selects provider bank_transfer; zero-payable orders preserve existing internal no-payment flow.
- GET /payments/orders/:orderId/request and POST /payments/orders/:orderId/cancel are owner-scoped; customer support POST /payments/orders/:orderId/bank-transfer/support accepts reason length 8..300 and Idempotency-Key, never confirms money.
- GET /admin/commerce/bank-transfers returns bounded requests; GET /admin/commerce/bank-transfers/:requestId includes immutable evidence, approvals and support reasons.
- POST /admin/commerce/bank-transfers/:requestId/statements requires Idempotency-Key and bankBin, accountNumber, canonical uppercase transactionId, integer-string amountMinor, transferContent, occurredAt, statementReference, statementSha256, source BANK_STATEMENT_CHECKED; suspicious=true forces support.
- POST /admin/commerce/bank-transfers/evidence/:evidenceId/approvals requires Idempotency-Key and independently reentered source BANK_STATEMENT_CHECKED, statementSha256, transactionId, amountMinor, accountNumber, transferContent. Two distinct current authorized admins must approve.

Raw statement artifacts belong in separately approved controlled immutable custody; source reference plus digest is not authentication. No screenshot upload path exists. Generic refund APIs reject bank_transfer; refunds require a separate authorized policy/workflow. Recover committed fulfillment through idempotent approval replay or bounded scheduler; never manufacture evidence.
