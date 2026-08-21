# SPR20-004 — End-to-End UAT and V2 Release Package

## Sprint

Sprint 20

## Category

QA / DevOps / Documentation

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Prepare a repeatable V2 acceptance package and release checklist across all supported roles.

## Deliverables

- Seeded UAT accounts and data
- Student, instructor, admin, career, mentor, AI, notification, and certificate journeys
- Deployment and rollback checklist
- Known limitations and release notes

## Acceptance Criteria

- [ ] All P0 defects are closed
- [ ] P1 defects are fixed or explicitly accepted
- [ ] Production build and migrations are verified
- [ ] Rollback instructions are tested or dry-run documented
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR20-004 — End-to-End UAT and V2 Release Package

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
Prepare a repeatable V2 acceptance package and release checklist across all supported roles.

Deliverables:
- Seeded UAT accounts and data
- Student, instructor, admin, career, mentor, AI, notification, and certificate journeys
- Deployment and rollback checklist
- Known limitations and release notes

Acceptance criteria:
- All P0 defects are closed
- P1 defects are fixed or explicitly accepted
- Production build and migrations are verified
- Rollback instructions are tested or dry-run documented

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
