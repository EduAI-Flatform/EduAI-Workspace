# ADR-001: Use PostgreSQL credentials for email/password login

## Status

Accepted

## Date

2026-08-11

## Context

The Frontend previously attempted Firebase password sign-in before calling the
EduAI Backend. Database-backed demo and seeded accounts therefore depended on an
unrelated Firebase account, while Firebase-created password accounts could be
stored in PostgreSQL without a local password hash. This created two competing
credential sources and made login behavior environment-dependent.

Email ownership verification is still required during password registration,
and Google authentication still relies on Firebase identity tokens.

## Decision

- PostgreSQL `passwordHash`, validated through the Backend `PasswordService`, is
  the single source of truth for normal email/password login.
- The Frontend always sends normal login to `POST /auth/login`; it does not call
  Firebase password sign-in or choose a login mechanism by environment.
- Firebase password authentication is used only to create and verify a pending
  registration. Registration completion exchanges a verified Firebase ID token
  and the original registration password through `POST /auth/firebase` with
  `mode=register`.
- The Backend derives email from the verified token, requires
  `email_verified=true`, hashes the password immediately, and never stores or
  returns plaintext credentials.
- The legacy direct `POST /auth/register` API is removed because it bypassed the
  required Firebase ownership proof.
- Google login continues to exchange a Firebase Google ID token through
  `POST /auth/firebase`; Google-only accounts may have no local password hash.

## Alternatives considered

### Firebase-first login with Backend fallback

Rejected because Firebase failures could prevent valid PostgreSQL accounts from
reaching the Backend and made ordinary login dependent on two credential stores.

### Keep two synchronized password stores

Rejected because password changes could drift between Firebase and PostgreSQL,
leaving users with inconsistent authentication behavior.

### Add a password-setup state for existing accounts

Rejected because the product contract does not include
`PASSWORD_SETUP_REQUIRED`. Accounts without a local hash receive the same safe
invalid-credentials response; real affected users require an explicit migration
or recovery workflow rather than an invented password.

## Consequences

- Seeded and registered email/password users share one Backend login path.
- Registration must preserve the original password only in transient Frontend
  memory until verified completion, then clear it.
- Existing Google-only users remain valid without a local password.
- A future forgot-password flow must update PostgreSQL `passwordHash` through
  `PasswordService`; a Firebase-only reset would be incomplete.
- Removing `/auth/register` is an intentional public API breaking change that
  prevents unverified registration.
- Returning `ACCOUNT_NOT_FOUND` intentionally reveals whether an email is
  registered, matching the requested product behavior but enabling account
  enumeration. The existing Sprint 20 security-hardening gate must add and
  verify abuse limits for authentication endpoints; this response contract
  should be reconsidered if the product no longer requires distinct guidance.
