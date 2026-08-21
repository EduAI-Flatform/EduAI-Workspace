# CI Environment

## Purpose

Document non-secret and secret environment values used by Sprint 1 CI.

## Backend CI

The backend workflow uses placeholder CI-only values for build-time validation:

- `NODE_ENV=test`
- `DATABASE_URL=postgresql://ci_user:ci_password@localhost:5432/eduai_ci`
- `JWT_ACCESS_SECRET=ci-access-secret`
- `JWT_REFRESH_SECRET=ci-refresh-secret`

These values are not production secrets and are only used to satisfy build-time config validation. Production and staging deployment secrets must be configured in Render or GitHub environment secrets, not committed.

## Frontend CI

The frontend workflow uses:

- `VITE_API_BASE_URL=/api/v1`

Deployment environments should override this with the real backend base URL when needed.

## Secret Handling

Never commit real values for:

- database URLs
- JWT secrets
- Redis URLs
- Cloudflare R2 keys
- OpenAI API keys
