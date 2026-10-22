# PAYW-00 — Verified Source Audit (2026-10-22)

**Method:** Read-only inspection of the three GitHub repositories' default
`main` content and Workspace governance; no runtime, test or bank transaction
was performed. This is a baseline inventory, not a runtime certification.

## Payment & checkout

| Location | Observed fact | Implication |
| --- | --- | --- |
| Backend `src/modules/payments/payment-provider.ts` | `PaymentProviderName = 'payos' \| 'vnpay'`; create/retrieve/cancel/webhook/reconcile interface. | Bank transfer and wallet cannot be introduced by swapping an image; they need provider-specific contracts or a separate payment-instrument interface. |
| Backend `payment-provider.registry.ts` | Only PayOS/VNPay are recognized and can be enabled. | Feature flags/default selection and registry must be migrated atomically with tests. |
| Backend `payments.module.ts` | PayOS and VNPay implementations registered; payment activation is config-gated. | Preserve historical provider behavior; new method default off. |
| Backend `payment-request.service.ts` | One provider selected from default registry; idempotent attempt and ~15-minute request window; returns provider QR/URL. | User choice requires a controlled contract extension, existing open-attempt rules, and late bank transfer review. |
| Frontend `src/services/payment.service.ts` | Provider union `payos \| vnpay`; QR cache tied to supported provider. | UI needs typed method negotiation; no client-side status authority. |
| Frontend `src/features/payments/PaymentCheckout.tsx` | PayOS inline QR, VNPay hosted checkout, server polling every 3s, cancel endpoint. | Later Stitch checkout must preserve polling/cancel, expiry and late-payment semantics. |

## Commerce, TMI, reconciliation

- Prisma `CommerceOrderLine` includes `sellerId`, `finalAmountMinor` and
  immutable order-line pricing fields. Use it as the seller attribution
  basis for each line; don't infer seller from current course ownership later.
- Existing commerce models include `CommercePaymentAttempt`,
  `CommerceSettlement`, `CommerceReconciliationCase`, `CommerceRefund`.
  There is no dedicated seller earnings/payable ledger or payout record model
  in the audited schema.
- Existing TMI ledger uses `TmiLedgerEntry` and Workspace
  `EduAI_Docs/docs/decisions/ADR-004-tmi-wallet-and-immutable-ledger.md`;
  **TMI units must never become cash, bank balance or Ví GDS stored value**.
- Backend `docs/decisions/ADR-004-payos-financial-fulfillment-boundary.md`
  separates verified settlement commit from fulfillment, with idempotent
  recovery. New allocation belongs after verified settlement and must not
  roll back financial evidence when a downstream job fails.
- Workspace ADR-005 design excluded stored-value wallet, split settlement
  and automatic affiliate payout from Phase 3; the newly authorized PAYW
  program is an explicit additional design lane, not a reinterpretation of
  earlier accepted scope.

## Canonical governance

- Workspace `AGENTS.md` requires owner authorization before each major
  phase, same-phase full delivery cycle, Stitch for substantive UI, and explicit
  owner approval for provider activation and real financial writes.
- `.ai-dos/records/project.state.json` records
  `currentSprintId=SPRINT:25` and `SPR25-007=WAITING_MANUAL`.
- `SPRINT:26` is already **Advanced Analytics**, so use `PAYW-xx` IDs.
- Existing `ADM-00–07` UI program must remain independent. `PAYW` provides
  financial contracts to future ADM Commerce/Finance UI, not a silent
  rewrite of that program.
- Backend and Frontend root AGENTS.md were not listed in current repository
  trees; Workspace governance applies unless new target-specific rules appear.

## External-service facts and limits

- Attached screenshot describes MB account **1122883979**; beneficiary legal
  name/control and account authorization have not been independently verified.
- NAPAS VietQR can encode beneficiary bank/account, amount and transfer
  content, but scanning/transferring is not equivalent to an authenticated
  payment confirmation.
- MB Payment Hub documents partner callbacks, but only for registered eligible
  customers; no MB API access or webhook credential for this account has been
  demonstrated.
- Vietnamese payment intermediary regulations impose licensing/operational
  requirements for electronic wallet issuance. Partner and legal signoff is
  needed before learner stored-value production activation.

## Required review cases before any implementation

1. Bank QR payment after order expiry, duplicate incoming transfer, wrong
   reference, over/underpayment, duplicated statement import and pending order
   cancellation during money-in-flight.
2. One order with multiple seller lines, multiple discounts, partial refunds,
   later seller split-policy change and affiliate commission interactions.
3. Concurrent learner wallet debit, callback replay/out-of-order, lost ack,
   partial wallet refund, customer account suspension and chargeback.
4. Two simultaneous seller withdrawals, manual payout evidence mismatch,
   refund after payout, negative seller debt and dispute hold.
5. Outbox crash between confirmed settlement, entitlement fulfillment and
   revenue posting; each effect must be independently recoverable exactly once.

## Evidence / limitations

GitHub files were read on `main` on 2026-10-22; the exact PR and conformance
outcomes are not yet known. No source was modified in Backend/Frontend. No
payment provider, bank, wallet or legal advisor was contacted.
