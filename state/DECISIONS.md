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
