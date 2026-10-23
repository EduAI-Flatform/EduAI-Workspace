# EduAI Blockers

## Active cross-program constraint

`SPR25-007` remains the active AI-DOS Phase 3 release gate. Its exact status and evidence are owned by `.ai-dos/records/` and compatibility views under `10-state/`.

This is not a blanket blocker for Admin UI planning or non-financial UI implementation. It is a hard boundary for any Admin task that would require payment-provider activation, real financial writes, refunds, reconciliation mutation or unsafe production changes.

## Admin UI blockers

None recorded at planning time.

A phase may only mark a blocker after observing it. Do not invent missing credentials, runtime failures, Stitch failures, CI failures or production defects.

## PAYW decision gates (not asserted runtime blockers)

The user authorized PAYW-00 documentary audit on 2026-10-22. Later phases
must resolve [PAYW decision register](../phases/PAYW-00-PAYMENT-WALLET-ARCHITECTURE-AUDIT/DECISIONS.md)
for verified MB beneficiary/receiving authority, seller merchant-of-record
and tax policy, licensed learner wallet partner, payout holds and financial
release approvals. These are open policy decisions, not observed bank/API or
CI failures. Preserve `SPR25-007` and do not perform real-money writes.

## PAYW-01 scoped safe start - 2026-10-22

Owner authorizes safe source/sandbox implementation before PAYW-00 DONE. PAYW-00 remains VERIFYING; PAYW-D01 actual beneficiary/legal receiving authority and PAYW-D08 operators/release approval stay OPEN. Production is BLOCKED_EXTERNAL. This explicit scope exception does not waive SPR25-007, authorize real financial writes or start PAYW-02. No bank/API/CI runtime failure is inferred.

## PAYW-01 production-readiness update - 2026-10-22

Owner reports both direct-sale and third-party collection models. A preliminary answer marked MB/account and collection-rights documents available, followed by a request to clarify their meaning: actual document possession, suitability and scope remain unconfirmed; no evidence has been examined or signed off. Two independent bank-statement reconciliation operators are not yet assigned. Therefore PAYW-D01/D03/D08 (and applicable D04/D10) remain OPEN; [GO-LIVE readiness](../phases/PAYW-01-MANUAL-VIETQR/GO-LIVE-READINESS.md) is a no-go preparation dossier, not a provider/production release. Production still refuses the sandbox-only bank-transfer code path. SPR25-007 remains independent and unchanged.


## PAYW-01B new information and GO-LIVE constraint — 2026-10-23

The owner requests public real-money VietQR, upload of successful-transfer screenshots, OCR matching and immediate **full course/membership access** before bank verification; a single Admin would later click verified paid or revoke access. This is an explicit product request but **not an accepted verified payment flow**. User-submitted image authenticity cannot establish receipt. No source implementation of this path or production activation is claimed.

The owner further says they can **view transactions in a banking app**, clarifying earlier "no MB login". We must learn whether the authenticated view is **incoming transactions of corporate MB account 1122883979** (and owner authorized to see them) or outgoing transactions in an unrelated payer account. Bank-source provenance/cadence, legal account usage proof, dual-control or independently approved replacement, seller/membership scope and `SPR25-007` remain OPEN; production bank-transfer code currently rejects live mode. See [PAYW-01B](../phases/PAYW-01B-RECEIPT-STATEMENT-VERIFICATION/README.md). Safe source/sandbox work is owner-started, but **GO-LIVE=NO-GO** until real evidence and protected release acceptance.
