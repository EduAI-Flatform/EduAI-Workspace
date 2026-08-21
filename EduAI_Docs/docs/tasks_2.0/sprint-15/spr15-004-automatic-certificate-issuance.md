# SPR15-004 — Automatic Certificate Issuance

## Sprint

Sprint 15

## Category

Backend / Frontend

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Issue a certificate automatically and idempotently when the authoritative completion policy is satisfied.

## Deliverables

- Completion event integration
- Unique idempotent issuance
- Revocation reason and status
- Updated student certificate state and verification page

## Acceptance Criteria

- [ ] A learner receives at most one active certificate per course policy
- [ ] Certificate verification never exposes private data
- [ ] Revoked certificates remain traceable
- [ ] Existing verification codes continue working
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR15-004 — Automatic Certificate Issuance

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
Issue a certificate automatically and idempotently when the authoritative completion policy is satisfied.

Deliverables:
- Completion event integration
- Unique idempotent issuance
- Revocation reason and status
- Updated student certificate state and verification page

Acceptance criteria:
- A learner receives at most one active certificate per course policy
- Certificate verification never exposes private data
- Revoked certificates remain traceable
- Existing verification codes continue working

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
