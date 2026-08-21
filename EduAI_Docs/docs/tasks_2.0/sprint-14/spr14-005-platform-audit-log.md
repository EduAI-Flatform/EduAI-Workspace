# SPR14-005 — Platform Audit Log

## Sprint

Sprint 14

## Category

Backend / Database / Frontend

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

## Objective

Create an immutable audit trail for sensitive platform actions and an admin-only viewer.

## Deliverables

- AuditLog schema and migration
- Reusable audit writer
- Coverage for login, role/status changes, publishing, grading, certificate actions, and moderation
- Searchable admin audit UI

## Acceptance Criteria

- [ ] Audit records are append-only through application code
- [ ] Actor, action, target, timestamp, and metadata are captured
- [ ] Secrets and raw tokens are excluded
- [ ] Only platform_admin can read audit logs
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR14-005 — Platform Audit Log

Before implementation:
1. Inspect the current main branches in both repositories.
2. Reuse current services, DTO patterns, guards, components, tests, and coding conventions.
3. Do not rebuild screens that already use live APIs.
4. Treat the current source code as the source of truth when it differs from old planning docs.

Required context:
- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Create an immutable audit trail for sensitive platform actions and an admin-only viewer.

Deliverables:
- AuditLog schema and migration
- Reusable audit writer
- Coverage for login, role/status changes, publishing, grading, certificate actions, and moderation
- Searchable admin audit UI

Acceptance criteria:
- Audit records are append-only through application code
- Actor, action, target, timestamp, and metadata are captured
- Secrets and raw tokens are excluded
- Only platform_admin can read audit logs

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
