# SPR18-004 — AI Job Skill Matching

## Sprint

Sprint 18

## Category

AI / Full-stack

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Calculate explainable job-fit recommendations and course suggestions from structured skill data.

## Deliverables

- Matching service with deterministic baseline
- Optional AI explanation layer
- Skill gap UI
- Course recommendations from published catalog

## Acceptance Criteria

- [ ] Fit score is reproducible from stored inputs
- [ ] AI cannot alter application status
- [ ] Missing skills are explained
- [ ] Only accessible published courses are recommended
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR18-004 — AI Job Skill Matching

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
Calculate explainable job-fit recommendations and course suggestions from structured skill data.

Deliverables:
- Matching service with deterministic baseline
- Optional AI explanation layer
- Skill gap UI
- Course recommendations from published catalog

Acceptance criteria:
- Fit score is reproducible from stored inputs
- AI cannot alter application status
- Missing skills are explained
- Only accessible published courses are recommended

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
