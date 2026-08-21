# SPR14-004 — Admin Course and Content Moderation

## Sprint

Sprint 14

## Category

Full-stack

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

## Objective

Implement administrative review and moderation for courses, community content, and library resources.

## Deliverables

- Moderation status and reason model
- Queues and detail views
- Hide, restore, reject, or archive actions as appropriate
- Audit history

## Acceptance Criteria

- [ ] All moderation actions preserve evidence and reason
- [ ] Public queries exclude moderated content
- [ ] Owners receive a consistent status response
- [ ] Ownership and admin authorization tests pass
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR14-004 — Admin Course and Content Moderation

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
Implement administrative review and moderation for courses, community content, and library resources.

Deliverables:
- Moderation status and reason model
- Queues and detail views
- Hide, restore, reject, or archive actions as appropriate
- Audit history

Acceptance criteria:
- All moderation actions preserve evidence and reason
- Public queries exclude moderated content
- Owners receive a consistent status response
- Ownership and admin authorization tests pass

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
