# SPR20-002 — Observability and Dependency Health

## Sprint

Sprint 20

## Category

DevOps / Full-stack

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Add production-grade tracing context, structured error reporting, and dependency health checks.

## Deliverables

- Request correlation IDs
- Structured logs
- Frontend/backend error reporting integration
- Health checks for database, Redis, R2, Firebase, and OpenAI with safe output

## Acceptance Criteria

- [ ] Health endpoints expose no secrets
- [ ] External dependency failures are distinguishable
- [ ] User-facing errors have correlation IDs where appropriate
- [ ] Monitoring is environment configurable
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR20-002 — Observability and Dependency Health

Before implementation:
1. Inspect the current main branches in both repositories.
2. Reuse current services, DTO patterns, guards, components, tests, and coding conventions.
3. Do not rebuild screens that already use live APIs.
4. Treat the current source code as the source of truth when it differs from old planning docs.

Required context:
- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

Objective:
Add production-grade tracing context, structured error reporting, and dependency health checks.

Deliverables:
- Request correlation IDs
- Structured logs
- Frontend/backend error reporting integration
- Health checks for database, Redis, R2, Firebase, and OpenAI with safe output

Acceptance criteria:
- Health endpoints expose no secrets
- External dependency failures are distinguishable
- User-facing errors have correlation IDs where appropriate
- Monitoring is environment configurable

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
