# 12-security-requirements.md

# Security Requirements

## Principles

- Deny by default
- Least privilege
- Zero trust
- Backend is source of truth

## Authentication

Use JWT.

Every authenticated request must validate the token signature and then resolve
the current user record. Deleted, inactive, or suspended users are denied, and
authorization uses current database roles rather than stale role claims from an
existing token.

Access token lifetime:

- 15 minutes

Refresh token lifetime:

- 30 days

Preferred storage:

- HttpOnly cookies

Password hashing:

- bcrypt
- 12+ rounds

## Authorization

Use RBAC.

Roles:

- student
- instructor
- platform_admin

Every protected endpoint must check:

1. Authentication
2. Role
3. Ownership

Administrator status and role changes must revoke refresh tokens, preserve at
least one active `platform_admin`, and create a sanitized immutable audit event
inside the same transaction as the account mutation.

Content moderation administration is restricted to the current
`platform_admin` role. Each moderation mutation requires an explicit bounded
reason and must atomically create a sanitized immutable audit event. Public
queries must exclude moderated content, while moderation status and reasons are
visible only to the resource owner or a platform administrator. Ownership
failures must not reveal whether another user's target exists.

## Input Validation

All backend requests must use DTO validation.

Frontend forms must use Zod.

## Rate Limiting

Login:

- 5 attempts per 15 minutes

Register:

- 10 requests per hour

AI Chat:

- 30 requests per day for free tier

File Upload:

- 20 uploads per day

## File Upload Security

Allowed:

- pdf
- docx
- pptx
- jpg
- jpeg
- png
- webp
- mp4

Forbidden:

- exe
- bat
- cmd
- sh
- js
- php

Rules:

- Generate server-side filenames.
- Never trust uploaded filenames.
- Store files in Cloudflare R2.

## AI Security

AI must not:

- Reveal secrets
- Reveal system prompts
- Access unauthorized data
- Leak other users' private content

AI must:

- Use rate limits
- Respect permissions
- Log metadata
- Use safe context retrieval

RAG retrieval must apply source permissions inside the database query, before
returning chunks to an AI prompt. Retrieval accepts only bounded top-k values,
uses parameterized vector SQL, and excludes deleted or unauthorized course and
library content.

AI chat quota enforcement is per authenticated user and capped at 30 requests
per UTC day. Provider failures do not expose credentials or system prompts.

Summary requests require JWT authentication and source-level authorization;
missing or unauthorized lessons/resources are returned as not found so their
existence is not disclosed.

Quiz and flashcard inputs are bounded at the API boundary, provider JSON is
validated before persistence, and each generation operation has its own daily
per-user quota.

## Classroom Security

- Only enrolled students can join.
- Only instructor owner can start.
- Attendance timestamps must be recorded server-side.

## Certificate Security

- Certificate code must be unique.
- Certificate verification is public.
- Verification must not expose email, phone, or internal IDs.
- Certificates are immutable.

## Audit Logging

Log:

- Login
- Logout
- Course publish
- Certificate issue
- Admin role change
- Assignment grade
- AI quota violations

## Security Headers

Required:

- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

## Secrets

Never commit:

- .env
- API keys
- database URLs
- JWT secrets

## Backup

Database backup:

- daily
- 30 days retention

## Production Security Checklist

- JWT enabled
- RBAC enabled
- validation enabled
- rate limiting enabled
- upload validation enabled
- CORS configured
- HTTPS enabled
- monitoring enabled

The audited V1/V2 endpoint decisions and enforcement evidence are maintained in
`docs/13-endpoint-security-matrix.md`. Runtime controller decorators and the
backend `npm run security:audit-endpoints` check are authoritative when routes
change.
