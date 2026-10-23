# EduAI Payment, Buyer Wallet & Seller Earnings Roadmap

**Program:** `PAYMENT-WALLET` (`PAYW`)  
**Owner instruction:** Start `PAYW-00` on 2026-10-22  
**Current:** PAYW-01 sandbox implementation delivered; phase BLOCKED_EXTERNAL for live/legal gates; PAYW-00 remains VERIFYING
**Canonical existing payment state:** `.ai-dos/records/*`, unchanged.

## Objective

Temporarily collect course/membership orders by per-order VietQR to MB Bank
account `1122883979` after verified beneficiary and reconciliation readiness;
build seller revenue allocation and a payable ledger; separately build a
learner-facing Ví GDS through a legally permitted wallet/payment partner.
Do not turn the existing TMI points wallet into money.

## Dependency-ordered major phases

| Phase | Scope | Activation boundary |
| --- | --- | --- |
| `PAYW-00` — Architecture & risk audit | Payment contracts, TMI separation, legal/payment decisions, architecture ADR, audit, acceptance and tests | Documentation only; user authorized start |
| `PAYW-01` — Manual MB VietQR | New `bank_transfer` provider, per-order amount/reference QR, evidence-controlled bank reconciliation, checkout UX | Bank beneficiary and merchant authority verified; live provider switch requires owner approval |
| `PAYW-02` — Revenue split | Policy versioning, seller/course overrides, settlement-scoped order-line allocation, immutable corrections | Merchant-of-record, tax, fees, affiliate precedence decided |
| `PAYW-03` — Seller payable & payout | Held/available seller earnings, payout request, dual approval and manual bank proof | Seller contracts and payout/hold/refund rules signed off |
| `PAYW-04` — Buyer Ví GDS sandbox | Partner adapter, mirror balance, reserve/capture/release/refund, frontend, failure-mode tests | Sandbox only; production wallet disabled |
| `PAYW-05` — Licensed partner & UAT | Partner/KYC/AML, funding, spending, refunds, reconciliation, production canary | Legal advice, contractual and technical evidence, explicit financial activation approval |
| `PAYW-06` — Optional bank automation | MB Bank Open API/Virtual Account and automated approved payouts | Bank-approved APIs, dual controls and separate UAT |

`PAYW-00 → PAYW-01 → PAYW-02 → PAYW-03`. Partner discovery may run
alongside, but the wallet money flow requires `PAYW-04 → PAYW-05`.
`PAYW-06` is optional. Starting a major phase does not authorize the next.

## Repository responsibilities

- **Backend:** payment provider adapters and canonical settlement, immutable
  allocation/payable journal, bank/partner evidence, idempotency, RBAC/audit.
- **Frontend:** checkout method selection, bank QR, learner Ví GDS and seller/
  Admin finance UX; Stitch before material new UX; seven responsive widths.
- **Workspace:** canonical cross-repo contracts, ADRs, phase dossiers, acceptance
  and observed evidence. Do not mutate `.ai-dos` Phase 3 financial records.

## Universal safety gates

- No frontend/screenshot/receipt-only paid confirmation.
- No double settlement, double entitlement, double earning or double payout.
- Monetary amounts use integer VND; policy snapshots survive later changes.
- Canonical financial settlement remains separate from fulfillment and finance
  posting, each idempotent and recoverable.
- Learners cannot cash out Ví GDS balance on demand. Any refund requires an approved policy, legal exceptions, verified financial evidence and a separately controlled refund flow.
- No self-issued stored-value wallet or production real-money funding/spending
  without legal/partner validation and owner approval.
- No unsupported claim that a static/per-order bank QR itself expires.
- Reconcile refunds, late money, provider outage and unknown external result.
- Preserve PayOS/VNPay history and accepted TMI points contracts.

## Existing lanes and non-interference

`SPRINT:26` already means Advanced Analytics inside AI-DOS, so **do not**
use `26A–26G` as canonical new task identifiers. Existing `SPR25-007`
payment release gate and `ADM-00–07` Admin UI program remain independent.

Read [the full architecture](../docs/finance/EDUAI_PAYMENT_WALLET_ARCHITECTURE_ROADMAP.md)
and [PAYW-00 dossier](PAYW-00-PAYMENT-WALLET-ARCHITECTURE-AUDIT/README.md).

## PAYW-01 owner start - 2026-10-22

[PAYW-01 dossier](PAYW-01-MANUAL-VIETQR/README.md) records explicit safe source/sandbox authorization while legal gates remain OPEN. No ADR acceptance, production activation or PAYW-02 authorization is inferred.


## 2026-10-23 prioritized PAYW-01B — temporary VietQR receipt/reconciliation approach

The owner explicitly prioritizes [PAYW-01B](PAYW-01B-RECEIPT-STATEMENT-VERIFICATION/README.md) safe engineering next, before PAYW-02 and before eventual business PayOS integration. Requested user flow: genuine VietQR transfer → screenshot upload → OCR fields → immediate **full** entitlement before confirmation → one Admin later confirms incoming bank credit or revokes entitlement. Record this as **OWNER REQUESTED / SECURITY AND RELEASE NOT ACCEPTED**, not as already deployed.

Preferred release design uses an authenticated incoming MB account statement/provider feed to decide `PAID` server-side and grant access; photo is support evidence. Separate financial truth from any unverified full-access experiment. Owner now says transactions can be viewed through a banking app; identity of the app, receiving ledger, authorization and statement-export/API path are not established. One reconciliation operator is available, so existing two-actor live acceptance remains blocked unless a reviewed compensating control is separately authorized. Real seller/membership collection remains gated by relevant PAYW-D decisions.

**Ordering:** PAYW-01B safe source A–F may proceed under the 2026-10-23 owner start and one-prompt autonomy. PAYW-01 production GO-LIVE remains BLOCKED_EXTERNAL; `SPR25-007`, production deploy/migration/env/real-money UAT and `PAYW-02` are not authorized by this paragraph. See [acceptance](PAYW-01B-RECEIPT-STATEMENT-VERIFICATION/ACCEPTANCE.md) and [GO-LIVE gates](PAYW-01B-RECEIPT-STATEMENT-VERIFICATION/GO-LIVE-GATES.md).
