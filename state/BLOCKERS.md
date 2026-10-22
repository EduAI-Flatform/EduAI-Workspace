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
