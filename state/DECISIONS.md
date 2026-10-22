# EduAI Decisions

## EDUAI-D001 — Dual coordination model

**Status:** ACCEPTED  
**Decision:** Preserve `.ai-dos/records/` as canonical for the active Phase 3 commerce/payment lane. Use `phases/` + `state/` for CongDongNgonNgu-style major-phase orchestration beginning with Admin UI.  
**Reason:** Avoid destroying payment/reconciliation evidence while gaining reusable phase dossiers, dependency gates and Codex session recovery.

## EDUAI-D002 — Stitch-first Admin redesign

**Status:** ACCEPTED  
**Decision:** Any new Admin surface or substantial redesign must use Stitch MCP before implementation. Existing approved Stitch surfaces are audited first and preserved unless a factual defect justifies change.

## EDUAI-D003 — Shared Admin design language before page-by-page polish

**Status:** ACCEPTED  
**Decision:** Establish Admin shell/design system and shared primitives before broad page redesign. Avoid page-local visual divergence.

## EDUAI-D004 — Responsive behavior is a product requirement

**Status:** ACCEPTED  
**Decision:** Major Admin surfaces must be verified at 320, 375, 390, 412, 768, 1024 and 1440 px. Desktop tables may transform into mobile cards/record views when more usable than horizontal overflow.

## EDUAI-D005 — Admin UI cannot silently alter financial semantics

**Status:** ACCEPTED  
**Decision:** ADM phases may improve commerce/payment presentation but may not change settlement, provider verification, reconciliation, fulfillment, refund or financial authorization behavior unless separately authorized under the payment lane.

## EDUAI-D006 — Major phase boundary requires owner start

**Status:** ACCEPTED  
**Decision:** Once a major Admin phase is explicitly started, Codex may autonomously run safe dependency-valid subtasks through review, CI, merge and cleanup. Starting the next major phase requires new owner authorization.

## EDUAI-D007 — One prompt starts a full authorized major phase

**Status:** ACCEPTED — 2026-10-22
**Decision:** Adapt CongDongNgonNgu's one-prompt execution pattern for EduAI: one explicit owner start, then automatic dependency-ordered subphase execution, each with complete source/test/review/PR/CI/merge/remote-main/evidence/cleanup lifecycle. No manual prompt copy is needed at subphase boundaries. Optional confirmed relay may assist, but Workspace files remain sufficient to continue without it. All real financial, production, credentials, infrastructure and next-major-phase hard stops remain effective.

## EDUAI-D008 — Retire superseded MVP task prompts from active tree

**Status:** ACCEPTED — 2026-10-22
**Decision:** Remove 129 legacy Sprint 01–12 task cards/templates, ad hoc AI/Codex prompts and demo-seed instructions from current Git tree. Preserve them in Git history at baseline `d80338df814fc83d128672006685704123a3306e`, with [recovery index](../docs/archive/README.md). Never delete AI-DOS records, manifest-required 2.0/3.0 references, payment evidence, durable product/financial ADRs or current phase dossiers. Historical product docs cannot override live Codex working rules.
