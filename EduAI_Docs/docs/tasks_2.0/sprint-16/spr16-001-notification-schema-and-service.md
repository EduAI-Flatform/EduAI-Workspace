# SPR16-001 — Notification Schema and Service

## Sprint

Sprint 16

## Category

Backend / Database

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Create the notification domain, delivery preferences, and idempotent event-to-notification service.

## Deliverables

- Notification, preference, and delivery models
- List, unread count, mark-read, mark-all-read APIs
- Event keys and deduplication rules
- Tests and Swagger

## Acceptance Criteria

- [ ] Notifications are scoped to the current user
- [ ] Duplicate domain events do not create duplicate notifications
- [ ] Pagination is supported
- [ ] Preferences have safe defaults
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR16-001 — Notification Schema and Service

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
Create the notification domain, delivery preferences, and idempotent event-to-notification service.

Deliverables:
- Notification, preference, and delivery models
- List, unread count, mark-read, mark-all-read APIs
- Event keys and deduplication rules
- Tests and Swagger

Acceptance criteria:
- Notifications are scoped to the current user
- Duplicate domain events do not create duplicate notifications
- Pagination is supported
- Preferences have safe defaults

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
