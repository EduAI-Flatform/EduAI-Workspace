# SPR17-001 — Learning Goals and Skill Profile

## Sprint

Sprint 17

## Category

Full-stack / Database

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Capture learner goals, target skills, current level, and weekly availability using the existing profile domain where appropriate.

## Deliverables

- Learning goal and skill gap schema
- Student setup/edit UI
- Validated APIs
- Privacy and ownership tests

## Acceptance Criteria

- [ ] Only the learner and authorized platform processes can modify goals
- [ ] Existing profile APIs remain compatible
- [ ] Inputs are bounded and normalized
- [ ] Empty onboarding is supported
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR17-001 — Learning Goals and Skill Profile

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
Capture learner goals, target skills, current level, and weekly availability using the existing profile domain where appropriate.

Deliverables:
- Learning goal and skill gap schema
- Student setup/edit UI
- Validated APIs
- Privacy and ownership tests

Acceptance criteria:
- Only the learner and authorized platform processes can modify goals
- Existing profile APIs remain compatible
- Inputs are bounded and normalized
- Empty onboarding is supported

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
