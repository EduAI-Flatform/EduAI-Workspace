# Task Status

Compatibility view only. Canonical source: `.ai-dos/records/project.state.json`.

- Project status: `IN_PROGRESS`
- Current sprint: `SPRINT:25`
- Current task: none (release gate remains `SPR25-007`)
- Last evidence: `EVIDENCE:SPR25-007:CART-CLOSED-PAYMENT-VERIFICATION`
- Completed tasks: 81
- Phase 3 tasks: 15 `TODO`, 1 `WAITING_MANUAL`, 18 `DONE`
- Selected task: `SPR25-007` (`WAITING_MANUAL`).

`MANUAL:SPR20_003_NGINX_COMPRESSION` remains a nonblocking production
optimization. ADR-005 is accepted and amended so Commerce is a permanent
runtime capability while provider activation remains independent.
`MANUAL:PHASE3_COMMERCE_RUNTIME_DB_ROLE` and the bounded reconciled
`MANUAL:SPR23_005_DEPLOYMENT_UAT` are verified. Sprints 23 and 24 plus
SPR25-001 through SPR25-006 are complete. The targeted post-fix production
Cart check passed: cancelled or expired payments no longer appear in the
pending-payment notice. SPR25-007 remains waiting for the broader structured
settlement, reconciliation, and provider-rollback evidence.
See `.ai-dos/generated/TASK_STATUS.md` for the deterministic full projection.
