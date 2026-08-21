# SPR18-001 — Career Profile

## Sprint

Sprint 18

## Category

Full-stack / Database

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Create an employability profile derived from user profile, skills, portfolio, completed courses, and certificates.

## Deliverables

- Career preferences and availability fields
- Career profile API
- Student career profile UI
- Public/private visibility controls

## Acceptance Criteria

- [ ] Existing skills and portfolio are reused rather than duplicated
- [ ] Private fields are excluded from public views
- [ ] Completion and certificate data are read-only projections
- [ ] Ownership tests pass
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR18-001 — Career Profile

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
Create an employability profile derived from user profile, skills, portfolio, completed courses, and certificates.

Deliverables:
- Career preferences and availability fields
- Career profile API
- Student career profile UI
- Public/private visibility controls

Acceptance criteria:
- Existing skills and portfolio are reused rather than duplicated
- Private fields are excluded from public views
- Completion and certificate data are read-only projections
- Ownership tests pass

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
