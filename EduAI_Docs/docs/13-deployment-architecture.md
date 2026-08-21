# 13-deployment-architecture.md

# Deployment Architecture

## MVP Deployment Strategy

Frontend:

- Vercel

Backend:

- Render

Database:

- Neon PostgreSQL

Redis:

- Upstash Redis

Storage:

- Cloudflare R2

AI:

- OpenAI API

Live Classroom:

- Jitsi

Monitoring:

- Sentry

## Environments

### Local

Developer machine.

### Staging

For QA and UAT.

### Production

For real users.

## Branch Strategy

```text
main      -> production
develop   -> staging
feature/* -> development
```

## Frontend Deployment

Platform:

- Vercel

Reasons:

- Good React/Next.js support
- CDN
- Preview deployments

Environment variables:

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_URL=
```

## Backend Deployment

Platform:

- Render

Runtime:

- Node.js

Health check:

```text
/health
```

Response:

```json
{
  "status": "ok"
}
```

## Database

Platform:

- Neon PostgreSQL

Rules:

- Enable backups.
- Use Prisma migrations.
- Do not modify production DB manually.

## Redis

Platform:

- Upstash Redis

Use cases:

- Rate limiting
- AI cache
- Temporary sessions

## Storage

Platform:

- Cloudflare R2

Folders:

```text
avatars/
documents/
videos/
certificates/
community/
```

## AI

Provider:

- OpenAI

Backend environment variables:

```env
OPENAI_API_KEY=
OPENAI_MODEL=
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
```

Default model:

- cost-efficient model for MVP

Rules:

- Use quotas.
- Use cache.
- Use token limits.

## Jitsi

MVP:

- Use Jitsi integration.

Future:

- Self-host Jitsi or LiveKit if needed.

## CI/CD

Pipeline:

1. Install dependencies
2. Lint
3. Test
4. Build frontend
5. Build backend
6. Deploy

Deployment blocked if:

- build fails
- tests fail
- lint fails

## CORS

Whitelist only:

- staging frontend
- production frontend

## Cost Expectation

MVP:

- 10-50 USD/month depending on AI and storage usage

Phase 2:

- 50-150 USD/month

Phase 3:

- 150+ USD/month depending on traffic

## Production Checklist

- Frontend deployed
- Backend deployed
- Database connected
- Redis connected
- Storage connected
- AI configured
- Monitoring enabled
- HTTPS enabled
- Backups enabled
- CI/CD passing
