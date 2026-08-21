# 11-coding-standards.md

# Coding Standards

## Purpose

Keep EduAI codebase consistent and maintainable.

## General Rules

- Use feature-based architecture.
- Keep controllers thin.
- Put business logic in services.
- Validate all inputs.
- Check permissions in backend.
- Keep code typed.
- Avoid duplicate logic.
- Avoid broad rewrites.

## Backend

Framework:

- NestJS

Language:

- TypeScript

ORM:

- Prisma

## Backend Folder Structure

```text
src/
├── modules/
├── common/
├── config/
├── prisma/
└── main.ts
```

## Module Structure

```text
courses/
├── courses.module.ts
├── courses.controller.ts
├── courses.service.ts
├── dto/
├── types/
└── tests/
```

## Controller Rules

Controllers should:

- Use DTOs
- Use guards
- Return consistent response format

Controllers must not:

- Contain business rules
- Access Prisma directly
- Call external APIs directly

## Service Rules

Services should:

- Apply business rules
- Use Prisma
- Validate ownership
- Use transactions where needed
- Throw typed exceptions

## DTO Rules

Use class-validator.

Every request body must have DTO validation.

## Database Rules

- Use UUID primary keys.
- Use Prisma migrations.
- Use soft delete for important records.
- Use transactions for multi-step business logic.

## Frontend

Framework:

- React or Next.js

Language:

- TypeScript

Styling:

- TailwindCSS
- Feature-owned CSS files for page/component-specific styling

UI:

- Shadcn UI

## Frontend Rules

- Use reusable components.
- Use feature folders.
- Use TanStack Query for server state.
- Use Zustand only for UI/client state.
- Use React Hook Form + Zod for forms.
- Do not call fetch directly inside components.
- Use central API client.
- Keep `src/styles/global.css` for Tailwind layers, resets, tokens, and app-wide primitives only.
- Put shared feature styles in `src/features/<feature>/<feature>.css`.
- Put component-specific styles beside the TSX file, for example `AuthPageShell.tsx` with `AuthPageShell.css`.
- Use semantic CSS class names in TSX; avoid long Tailwind utility chains inside feature components.
- Put variant and state styling in the narrowest owning CSS file, including small states like error, success, loading, active, disabled, selected, and hover.

## API Client

Recommended:

```text
services/
├── api-client.ts
├── auth.service.ts
├── course.service.ts
├── lesson.service.ts
├── enrollment.service.ts
├── classroom.service.ts
├── community.service.ts
├── ai.service.ts
└── certificate.service.ts
```

## Testing

Required tests for:

- Auth
- RBAC
- Course publish rules
- Enrollment rules
- Quiz scoring
- Certificate issuance
- AI quota logic

## Git

Branch naming:

```text
feature/auth-module
fix/login-validation
refactor/course-service
```

Commit naming:

```text
feat(auth): add login endpoint
fix(course): prevent duplicate enrollment
```

## Forbidden Practices

Do not:

- Store secrets in code
- Skip validation
- Skip authorization
- Access database from frontend
- Build custom WebRTC in MVP
- Add Phase 2/3 features during Phase 1
- Add mobile app code in Phase 1
