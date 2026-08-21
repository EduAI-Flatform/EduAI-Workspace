# 09-ui-ux-guidelines.md

# UI/UX Guidelines

## Design Philosophy

EduAI should feel:

- Modern
- Premium
- Educational
- Clean
- Trustworthy
- AI-powered

Avoid:

- Old Moodle-like UI
- Bootstrap admin template
- ERP-like interface
- Cluttered layout

## Design System

Use:

- TailwindCSS
- Shadcn UI
- Lucide Icons
- Framer Motion where useful

When implementing page body UI, also read `14-stitch-ui-reference.md` and match the closest Stitch reference screen for the target page.

## Responsive Requirement

The MVP must work on:

- Desktop browser
- Tablet browser
- Mobile browser

No separate mobile app in MVP.

## Language Requirement

Frontend user-facing UI must use Vietnamese by default.

- Use Vietnamese for page copy, navigation labels, buttons, form labels, placeholders, validation messages, loading states, empty states, success messages, error messages, modal titles/descriptions, and accessibility labels.
- Keep technical identifiers, route paths, API fields, enum values, HTTP headers, environment variable names, and code-level names in English unless a contract explicitly requires otherwise.
- When adding or updating frontend screens, verify that no new user-facing English text is introduced.

## Color Direction

Primary:

- Blue: #2563EB

Neutral:

- Slate scale
- White background
- Soft borders

Status:

- Success: #16A34A
- Warning: #F59E0B
- Error: #DC2626

## Frontend Folder Structure

Frontend code lives in `Front_End/`.

Current implemented structure:

```text
Front_End/
`-- src/
    |-- main.tsx
    |-- App.tsx
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

- Add new pages under `src/features/<feature>/`.
- Add feature-owned shared styles under `src/features/<feature>/<feature>.css`.
- Add component-owned styles beside the TSX file when a component needs its own CSS, for example `LoginPage.tsx` with `LoginPage.css`.
- Add shared components under `src/components/`.
- Add app shell/navigation components under `src/components/layout/`.
- Add API access code under `src/services/`.
- Keep `src/styles/global.css` limited to Tailwind layers, resets, tokens, and truly app-wide primitives.
- Keep shared feature primitives in the feature CSS file; keep component-specific layout, variants, and UI states in that component's CSS file.
- Even small states such as error, success, loading, active, disabled, selected, and hover variants should be expressed as named CSS classes instead of long inline utility strings.
- Add new folders only when the feature needs them; do not assume `layouts/`, `store/`, `hooks/`, `types/`, or `utils/` already exist.

Target growth structure, not a guarantee that every folder exists today:

```text
src/
├── assets/
│   ├── images/
│   ├── icons/
│   ├── illustrations/
│   └── certificates/
├── components/
│   ├── common/
│   ├── layout/
│   └── ai/
├── layouts/
│   ├── MainLayout.tsx
│   ├── InstructorLayout.tsx
│   ├── AdminLayout.tsx
│   └── AuthLayout.tsx
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

## Main Navigation

Public:

- Home
- Courses
- Library
- Community
- Login
- Register

Authenticated Student:

- Dashboard
- My Learning
- Library
- Community
- Certificates
- AI Assistant
- Profile

Instructor:

- Dashboard
- Courses
- Students
- Classrooms
- Library
- AI Assistant
- Profile

Admin:

- Dashboard
- Users
- Courses
- Reports
- Certificates
- Settings

## Key Screens

### Student Dashboard

Must show:

- Current courses
- Learning progress
- Upcoming live classes
- Recent certificates
- AI shortcut

### Instructor Dashboard

Must show:

- Active courses
- Students
- Upcoming sessions
- Assignment reviews
- AI tools

### Course Detail Page

Must show:

- Course title
- Description
- Instructor
- Lessons
- Enrollment button
- Certificate criteria

### Lesson Page

Must show:

- Lesson content
- Lesson navigation
- Mark complete action
- AI helper

### AI Tutor Page

Must resemble a clean chat interface.

The MVP chat page includes a message list, suggestion prompts, multiline input,
loading/error states, keyboard submission, and source cards below assistant
messages. The layout remains usable at mobile widths.

### Live Classroom Page

Must embed Jitsi.

Do not build custom video UI.

### Certificate Verification Page

Public page with:

- Certificate validity
- Student name
- Course title
- Issue date
- No sensitive personal data

## UX Requirements

Every async action needs:

- Loading state
- Error state
- Empty state when applicable

Every form needs:

- Validation
- Inline error messages
- Submit loading state
- Success feedback

## Codex UI Rules

- Do not use Bootstrap.
- Do not use Material UI.
- Use reusable components.
- Every screen must be responsive before done.
