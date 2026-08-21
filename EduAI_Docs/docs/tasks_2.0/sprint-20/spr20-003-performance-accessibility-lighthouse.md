# SPR20-003 — Performance, Accessibility, and Lighthouse Pass

## Sprint

Sprint 20

## Category

Frontend / Backend / QA

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Optimize critical user flows for mobile performance, accessibility, and bounded API behavior.

## Deliverables

- Image resize/compression and lazy loading audit
- Route-level code splitting
- Pagination and query profiling
- Accessibility fixes and Lighthouse report

## Acceptance Criteria

- [ ] No critical image is unintentionally lazy-loaded
- [ ] List APIs are bounded
- [ ] Core pages are keyboard navigable
- [ ] Performance changes preserve behavior
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR20-003 — Performance, Accessibility, and Lighthouse Pass

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
Optimize critical user flows for mobile performance, accessibility, and bounded API behavior.

Deliverables:
- Image resize/compression and lazy loading audit
- Route-level code splitting
- Pagination and query profiling
- Accessibility fixes and Lighthouse report

Acceptance criteria:
- No critical image is unintentionally lazy-loaded
- List APIs are bounded
- Core pages are keyboard navigable
- Performance changes preserve behavior

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
