# ADM-00 — Admin UI Baseline & Inventory

**Status:** READY — NOT STARTED  
**Dependency:** existing Admin implementation  
**Execution authorized:** NO

## Objective
Freeze the factual Admin UI baseline before redesign so later phases improve the right surfaces without destroying already-good Stitch work.

## Scope
Audit every `/admin/dashboard/*` route, source ownership, current visual quality, responsive behavior and critical interactions. Classify each surface as `STITCH_APPROVED`, `NEEDS_POLISH` or `RAW_UI`.

Expected current families include Overview, Audit logs, Users, Moderation, Voucher, Scholarship, TMI Rewards, Commerce, Membership, Jobs, Job Applications and Mentors.

## Required outputs
- Admin route/surface matrix.
- Existing Stitch evidence/reference inventory where discoverable.
- Per-page classification with factual reasons.
- responsive/interaction defect inventory.
- prioritized Stitch plan for ADM-01 and page-family phases.

## Out of scope
No broad visual implementation, design-system rewrite or payment behavior change.

## Entry gate
Owner explicitly starts ADM-00.

## Exit gate
Every Admin surface is inventoried and classified with reproducible evidence; no material route/page is unaccounted for; ADM-01 inputs are frozen.
