# SPR13-002 — Complete Incomplete Navigation Flows

## Sprint

Sprint 13

## Category

Frontend / Backend

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Replace dead, fallback, or misleading dashboard navigation destinations with implemented role-appropriate pages backed by existing APIs or minimal new APIs.

## Deliverables

- Complete instructor students, certificates, and settings destinations
- Create a dedicated admin route placeholder only after role guard and page scope are defined
- Remove or hide any menu item that cannot be completed in this task
- Add loading, empty, error, and permission states

## Acceptance Criteria

- [ ] No menu item silently falls back to an unrelated dashboard page
- [ ] Instructor-only pages reject non-instructors
- [ ] All implemented pages use live APIs
- [ ] No unrelated visual redesign
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR13-002 — Complete Incomplete Navigation Flows

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
Replace dead, fallback, or misleading dashboard navigation destinations with implemented role-appropriate pages backed by existing APIs or minimal new APIs.

Deliverables:
- Complete instructor students, certificates, and settings destinations
- Create a dedicated admin route placeholder only after role guard and page scope are defined
- Remove or hide any menu item that cannot be completed in this task
- Add loading, empty, error, and permission states

Acceptance criteria:
- No menu item silently falls back to an unrelated dashboard page
- Instructor-only pages reject non-instructors
- All implemented pages use live APIs
- No unrelated visual redesign

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
