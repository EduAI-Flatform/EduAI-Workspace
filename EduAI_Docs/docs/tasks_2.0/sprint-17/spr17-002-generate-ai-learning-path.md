# SPR17-002 — Generate AI Learning Path

## Sprint

Sprint 17

## Category

AI / Backend

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Generate a structured learning path from learner goals and real EduAI course, progress, quiz, and assignment data.

## Deliverables

- Versioned learning path schema
- Deterministic structured output validation
- OpenAI and mock provider support
- Quota, timeout, and failure handling

## Acceptance Criteria

- [ ] Only accessible courses are included
- [ ] AI output is validated before persistence
- [ ] Regeneration preserves history
- [ ] No private course content leaks into unauthorized prompts
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR17-002 — Generate AI Learning Path

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
Generate a structured learning path from learner goals and real EduAI course, progress, quiz, and assignment data.

Deliverables:
- Versioned learning path schema
- Deterministic structured output validation
- OpenAI and mock provider support
- Quota, timeout, and failure handling

Acceptance criteria:
- Only accessible courses are included
- AI output is validated before persistence
- Regeneration preserves history
- No private course content leaks into unauthorized prompts

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
