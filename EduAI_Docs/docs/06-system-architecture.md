# 06-system-architecture.md

# System Architecture

## Architecture Style

EduAI uses a Modular Monolith architecture for MVP.

Do not use microservices in Phase 1.

## Tenant Model

Single Tenant.

There is one shared EduAI platform.

Do not implement tenant_id or organization_id in MVP.

## High Level Architecture

Frontend:

- Standalone Vite React app in `Front_End/`
- TypeScript
- TailwindCSS
- Shadcn UI
- Responsive desktop and mobile browser

Backend:

- NestJS
- TypeScript
- Prisma
- PostgreSQL
- Redis
- REST API

AI:

- OpenAI API
- RAG
- pgvector

Storage:

- Cloudflare R2

Realtime:

- Socket.IO for notifications and realtime events
- Jitsi for live classroom video

Deployment:

- Vercel for frontend
- Render for backend
- Neon PostgreSQL
- Upstash Redis
- Cloudflare R2

## Core Principles

1. Backend is source of truth.
2. Frontend never accesses database directly.
3. Business rules belong to backend.
4. API contract first.
5. Backend-first development.
6. Modular monolith before microservices.
7. Jitsi before custom WebRTC.
8. External AI API before self-trained model.

## Backend Modules

- auth
- users
- profiles
- courses
- lessons
- enrollments
- quizzes
- assignments
- classrooms
- library
- community
- certificates
- ai
- admin
- shared

## Backend Folder Structure

```text
src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── profiles/
│   ├── courses/
│   ├── lessons/
│   ├── enrollments/
│   ├── quizzes/
│   ├── assignments/
│   ├── classrooms/
│   ├── library/
│   ├── community/
│   ├── certificates/
│   ├── ai/
│   └── admin/
├── common/
├── config/
├── prisma/
└── main.ts
```

## Frontend Architecture

Frontend code lives in `Front_End/`.

Run frontend commands from `Front_End/`:

```bash
npm run dev
npm run build
npm run preview
```

Current implemented structure:

```text
Front_End/
|-- index.html
|-- package.json
|-- vite.config.ts
|-- tailwind.config.ts
|-- postcss.config.js
|-- tsconfig.json
`-- src/
    |-- main.tsx
    |-- App.tsx
    |-- vite-env.d.ts
    |-- routes/
    |   `-- index.tsx
    |-- features/
    |   `-- home/
    |       `-- HomePage.tsx
    |-- components/
    |   `-- layout/
    |       `-- header.tsx
    |-- services/
    |   `-- api-client.ts
    `-- styles/
        `-- global.css
```

Growth rules:

- Put feature pages and feature-specific UI under `src/features/<feature>/`.
- Put shared UI under `src/components/`.
- Put layout-level shared UI under `src/components/layout/`.
- Put API client and integration code under `src/services/`.
- Put global CSS under `src/styles/global.css`.
- Before changing routing, check both `src/App.tsx` and `src/routes/index.tsx`; both currently contain routing-related code.
- Do not create or modify frontend code inside `Back_End/`.

Target growth structure, not a guarantee that every folder exists today:

```text
src/
├── assets/
├── components/
├── layouts/
├── features/
│   ├── auth/
│   ├── profile/
│   ├── courses/
│   ├── learning/
│   ├── quizzes/
│   ├── assignments/
│   ├── classroom/
│   ├── library/
│   ├── community/
│   ├── certificates/
│   └── ai/
├── services/
├── store/
├── hooks/
├── routes/
├── types/
├── utils/
├── styles/
├── App.tsx
└── main.tsx
```

## AI Architecture

The backend uses an injectable `OpenAiService` as the single provider boundary.
It reads `OPENAI_API_KEY` and optional `OPENAI_MODEL` from backend environment
configuration, creates the client lazily, and never logs provider credentials.

`AiEmbeddingService` chunks lesson title/content and library title/description,
embeds batches through the provider, and stores source metadata with pgvector.
Only instructor-owned content or platform-admin content can enter the indexing
pipeline; unauthorized sources resolve as not found.

`AiRetrievalService` embeds a normalized query, performs parameterized pgvector
cosine-distance search with a bounded top-k, and formats each result with its
source type, source ID, title, chunk text, similarity, and stored metadata.
The SQL visibility predicate permits published public courses, active course
enrollments, resource owners, instructors, and platform admins only; deleted
or otherwise private sources are excluded before results reach the tutor.

`POST /ai/chat` uses those sources to build a bounded tutor prompt, generates an
assistant response through `OpenAiService`, persists both conversation messages,
and returns the source citations alongside the assistant message.

`POST /ai/summary` resolves an authorized lesson or library resource through
Prisma, sends only its title/content to the configured model, and returns a
stable summary response without exposing storage or ownership internals.

Quiz generation stores validated structured output in `ai_generated_quizzes`;
flashcard generation stores validated cards in `ai_flashcards` within one
transaction. Both flows share the authorized source resolver and provider
boundary.

RAG flow:

```text
Content Upload
↓
Text Extraction
↓
Chunking
↓
Embedding
↓
pgvector Storage
↓
Retrieval
↓
Prompt Builder
↓
LLM Response
```

## Live Classroom Architecture

EduAI owns:

- scheduling
- permissions
- attendance
- metadata
- recording links

Jitsi owns:

- video call
- screen share
- audio
- camera

## Future Expansion

Phase 2 and 3 modules should be added as new modules inside the same modular monolith.
