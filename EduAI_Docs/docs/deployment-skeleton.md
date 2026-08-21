# Deployment Skeleton

## Scope

Sprint 1 deployment skeleton for the EduAI MVP.

## Staging Path

Use the documented branch strategy:

- `develop` deploys to staging.
- `main` deploys to production later.

Staging setup:

1. Create the backend service on Render from `Back_End/render.yaml`.
2. Set Render environment variables from the staging secret store.
3. Create the frontend project on Vercel from `Front_End/vercel.json`.
4. Set `VITE_API_BASE_URL` in Vercel to the staging backend API base URL.
5. Verify backend health at `GET /health`.
6. Verify frontend loads and can reach the backend base URL.

## Backend Health

Render health check path:

```text
/health
```

The endpoint returns HTTP 200 when the backend process is healthy.

## Required Environment Variables

Backend Render variables:

- `NODE_ENV=production`
- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `REDIS_URL`
- `CORS_ALLOWED_ORIGINS`

Frontend Vercel variables:

- `VITE_API_BASE_URL`

Do not commit real secret values.

## CORS Plan

Backend CORS must allow only known frontend origins:

- staging Vercel URL
- production Vercel custom domain

Do not use wildcard origins in staging or production. Keep local development origins separate from deployed allowlists.
