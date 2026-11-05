# Version Roadmap

GDS refinement `PAYW-03-004` released2026-11-05: compact balance, lifetime
deposit/payment/withdrawal totals and full filtered activity pagination.
See [handoff](../docs/handoffs/gds-wallet-history.md).

GDS overview `PAYW-03-003` released2026-11-05: mobile/desktop redesign, snapshot
lifetime metrics and copy cleanup; main/production checks PASS. See
[handoff](../docs/handoffs/gds-wallet-redesign.md).

GDS enhancement `PAYW-03-002`: full searchable bank catalogue, beneficiary proof
and protected payout QR on dev. Provider rights/UAT and a new schema-first release
gate precede mandatory lookup. See [handoff](../docs/handoffs/gds-bank-verification.md).

Project-owned compatibility overlay. Canonical Phase 3 commerce/payment source: `.ai-dos/records/roadmap.json`.

- Target version: 3.0.0
- Production target: https://eduai.giaoducso.org.vn
- Phase 3 lifecycle: `DRAFT`
- Baseline: EduAI 2.0 and Sprint 22 complete.

## Phase 3 commerce/payment lane

1. `SPRINT:23` — Commerce Foundation
2. `SPRINT:24` — Membership and Entitlements
3. `SPRINT:25` — Payment and Fulfillment
4. `SPRINT:26` — Advanced Analytics
5. `SPRINT:27` — Affiliate
6. `SPRINT:28` — Phase 3 Release

Exact payment/reconciliation state remains canonical in `.ai-dos/records/*`; do not infer current financial truth from this summary alone.

## Parallel Admin UI program

A separate CongDongNgonNgu-style phase orchestration track now exists for Admin UI completion. It does **not** replace the Phase 3 AI-DOS lane or authorize payment mutations.

Authoritative human-readable Admin roadmap: [`../phases/ADMIN-UI-ROADMAP.md`](../phases/ADMIN-UI-ROADMAP.md).

Sequence:

`ADM-00 → ADM-01 → ADM-02 → ADM-03 → ADM-04 → ADM-05 → ADM-06 → ADM-07`

ADM-00 is READY for owner start; creating the dossiers does not itself start implementation.

Human-authored Phase 3 details remain at `EduAI_Docs/docs/tasks_3.0/20-phase-3-development-roadmap.md`.
