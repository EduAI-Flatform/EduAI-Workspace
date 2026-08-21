# SPR13-001 — Audit Live API Integration

## Sprint

Sprint 13

## Category

QA / Full-stack

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

## Objective

Audit the current main branches and produce a factual matrix of pages, actions, APIs, authorization rules, remaining static placeholders, dead navigation items, and incomplete flows.

## Deliverables

- docs/v2/01-git-baseline-audit.md
- docs/v2/02-api-ui-coverage-matrix.md
- A prioritized defect and gap list with P0/P1/P2 severity
- No implementation outside critical build-blocking fixes

## Acceptance Criteria

- [ ] Home, course pages, student dashboard, and instructor dashboard already using live APIs are marked complete and are not rebuilt
- [ ] Every visible route and sidebar item is mapped to a working page or explicitly listed as incomplete
- [ ] Every frontend service call is mapped to an existing backend endpoint
- [ ] Build and current tests are run in both repositories
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR13-001 — Audit Live API Integration

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
Audit the current main branches and produce a factual matrix of pages, actions, APIs, authorization rules, remaining static placeholders, dead navigation items, and incomplete flows.

Deliverables:
- docs/v2/01-git-baseline-audit.md
- docs/v2/02-api-ui-coverage-matrix.md
- A prioritized defect and gap list with P0/P1/P2 severity
- No implementation outside critical build-blocking fixes

Acceptance criteria:
- Home, course pages, student dashboard, and instructor dashboard already using live APIs are marked complete and are not rebuilt
- Every visible route and sidebar item is mapped to a working page or explicitly listed as incomplete
- Every frontend service call is mapped to an existing backend endpoint
- Build and current tests are run in both repositories

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
