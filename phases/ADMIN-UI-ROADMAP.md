# EduAI Admin UI & Admin Completion Roadmap

**Program:** `ADMIN-UI`  
**Status:** PLANNED  
**Target:** `https://eduai.giaoducso.org.vn/admin/dashboard/*`  
**Execution model:** major-phase owner start; autonomous same-phase delivery thereafter

## Objective

Bring the existing EduAI Admin from a mixed set of polished and developer-looking screens to one coherent, professional, responsive and accessible administration experience without changing payment/authorization semantics accidentally.

## Roadmap

1. `ADM-00` — Admin UI Baseline & Inventory
2. `ADM-01` — Admin Design System & Shell
3. `ADM-02` — Shared Admin Component Foundation
4. `ADM-03` — Governance & Platform Operations
5. `ADM-04` — Commerce & Benefits Operations
6. `ADM-05` — Career & Mentor Operations
7. `ADM-06` — Mobile, Tablet & Accessibility Hardening
8. `ADM-07` — Admin Runtime UAT & Visual Acceptance

## Sequence

`ADM-00 → ADM-01 → ADM-02 → ADM-03 → ADM-04 → ADM-05 → ADM-06 → ADM-07`

ADM-00/01/02 are foundation gates and must not be skipped. ADM-06/07 are cross-surface closeout phases, not substitutes for page-level verification in ADM-03/04/05.

## Design principles

- Stitch MCP before any substantial new UI/redesign.
- Audit and preserve existing good Stitch surfaces; do not redesign for novelty.
- Build a shared Admin design language before page-by-page polish.
- Use existing EduAI token foundation: blue/navy/white, purple accent, semantic state colors.
- Prefer information hierarchy, readable density and predictable actions over decorative dashboard effects.
- Mobile is a deliberate composition, not desktop stacked vertically.
- Verify 320/375/390/412/768/1024/1440.

## Admin surface families

### Platform governance
Overview, Users, Moderation, Audit logs.

### Commerce and benefits
Commerce, Membership, Voucher, Scholarship, TMI Rewards.

### Career and mentor
Jobs, Job Applications, Mentor Approval.

## Program-level completion gates

```text
STITCH=PASS
IMPLEMENTATION=PASS
DESIGN_SYSTEM=PASS
DESKTOP=PASS
TABLET=PASS
MOBILE=PASS
ACCESSIBILITY=PASS
FUNCTIONAL_TESTS=PASS
REGRESSION=PASS
RUNTIME_UAT=PASS
PR_REVIEW=PASS
CI=PASS
REMOTE_MAIN_VERIFIED=PASS
BRANCH_CLEANUP=PASS
```

Missing an applicable gate means `VERIFYING`, not `DONE`.

## Financial boundary

Admin Commerce UI may display and operate only through existing authorized contracts. This roadmap does not authorize payment activation, settlement/reconciliation changes, real refunds or any mutation that conflicts with the active AI-DOS payment lane.
