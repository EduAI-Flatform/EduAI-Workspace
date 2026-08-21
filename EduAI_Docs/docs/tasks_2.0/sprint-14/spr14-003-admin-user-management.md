# SPR14-003 — Admin User Management

## Sprint

Sprint 14

## Category

Full-stack / Security

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

## Objective

Implement searchable and paginated user administration with safe account status and role management.

## Deliverables

- User list/detail APIs and UI
- Filter by role and status
- Suspend/reactivate account
- Assign or revoke supported roles with safeguards
- Audit events for mutations

## Acceptance Criteria

- [ ] Admin cannot remove the last platform administrator
- [ ] A user cannot bypass status restrictions with an existing session
- [ ] Sensitive fields are never returned
- [ ] Mutations require explicit confirmation
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR14-003 — Admin User Management

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
Implement searchable and paginated user administration with safe account status and role management.

Deliverables:
- User list/detail APIs and UI
- Filter by role and status
- Suspend/reactivate account
- Assign or revoke supported roles with safeguards
- Audit events for mutations

Acceptance criteria:
- Admin cannot remove the last platform administrator
- A user cannot bypass status restrictions with an existing session
- Sensitive fields are never returned
- Mutations require explicit confirmation

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
