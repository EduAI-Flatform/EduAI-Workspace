# Task State Schema

Allowed phase/task states:

- `PLANNED` — dossier exists but execution is not yet eligible/authorized.
- `READY` — dependencies satisfied; owner start may still be required.
- `IN_PROGRESS` — implementation or verification is active.
- `VERIFYING` — implementation exists but one or more required gates remain.
- `BLOCKED_INTERNAL` — blocker is within source/repository/control surface.
- `BLOCKED_EXTERNAL` — blocker depends on credentials/provider/human/external service.
- `DONE` — every applicable implementation, verification, evidence, Git and CI gate passed.
- `DEFERRED` — intentionally postponed with reason.
- `CANCELLED` — intentionally abandoned with reason.

Never mark `DONE` from local tests alone. A task that requires push/CI/runtime evidence remains `VERIFYING` until those gates are observed.
