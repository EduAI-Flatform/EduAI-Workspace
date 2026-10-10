# Task Status

Compatibility view only. Canonical source: `.ai-dos/records/project.state.json`.

- Project status: `IN_PROGRESS`
- Current sprint: `SPRINT:25`
- Current task: none (release gate remains `SPR25-007`)
- Last evidence: `EVIDENCE:SPR25-007:PROVIDER-ROLLBACK-RECHECK-20260918`
- Completed tasks: 81
- Phase 3 tasks: 15 `TODO`, 1 `WAITING_MANUAL`, 18 `DONE`
- Selected task: `SPR25-007` (`WAITING_MANUAL`).

`MANUAL:SPR20_003_NGINX_COMPRESSION` remains a nonblocking production
optimization. ADR-005 is accepted and amended so Commerce is a permanent
runtime capability while provider activation remains independent.
`MANUAL:PHASE3_COMMERCE_RUNTIME_DB_ROLE` and the bounded reconciled
`MANUAL:SPR23_005_DEPLOYMENT_UAT` are verified. Sprints 23 and 24 plus
SPR25-001 through SPR25-006 are complete. Backend main `d5972e5` passed exact
CI and production deployment. The applied-state-safe runner recognized the
existing migration exactly once from the expected checksum and hardened guard
state without reapplying it, and revoked only marker-table DML from
`eduai_runtime`. Backend health is `200`, stable Redis health is `ok`, the
historical ambiguous case remains unchanged, and four OPEN cases remain
(`PROVIDER_OUTAGE=2`, `PROVIDER_FACT_MISMATCH=2`) with no financial mutation.
Supported reconciliation writes remain correctly unused because all four cases
lack an evidence-gated transition. Existing bounded Course/Membership
settlement and fulfillment evidence was revalidated without duplicate charges;
provider rollback remains incomplete because the disabled-state webhook check
returned HTTP 400 instead of HTTP 503. The targeted closed-payment Cart
regression remains passing.
See `.ai-dos/generated/TASK_STATUS.md` for the deterministic full projection.
