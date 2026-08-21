# SPR12-005 — Production Deployment Checklist

## Sprint

Sprint 12

## Suggested Day

Day 50

## Category

DevOps

## Required Context

Read these docs before implementation:

- docs/13-deployment-architecture.md
- docs/12-security-requirements.md

## Objective

Verify production readiness.

## Deliverables

- deployment checklist
- env var checklist
- release notes

## Acceptance Criteria

- [ ] Frontend deployed
- [ ] Backend deployed
- [ ] DB/Redis/R2 connected
- [ ] Sentry configured

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR12-005 — Production Deployment Checklist

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/13-deployment-architecture.md
- docs/12-security-requirements.md

Objective:
Verify production readiness.

Deliverables:
- deployment checklist
- env var checklist
- release notes

Acceptance criteria:
- Frontend deployed
- Backend deployed
- DB/Redis/R2 connected
- Sentry configured

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
