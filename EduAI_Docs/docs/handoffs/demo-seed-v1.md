# Demo seed v1 handoff

## Scope

- Demo seed giữ nguyên cơ chế upsert, UUID ổn định và bảo vệ production.
- Catalog có đúng 10 khóa học AI public/published; mỗi khóa có 4 bài gồm video, bài đọc và PDF preview.
- Fixture phủ enrollment/progress/review, quiz có attempt đạt và trượt, assignment có hạn tương lai và quá hạn, library có PDF/video/link ngoài, community, certificate và classroom.
- Classroom dùng enrollment làm authorization: học viên đã đăng ký được xem/join session live; học viên chưa đăng ký nhận not found. Không có bước admin approval trong luồng hiện tại.

## Verification

- `npm.cmd run prisma:validate` — passed with `AI_PROVIDER=mock`, `NODE_ENV=development`.
- `npm.cmd run prisma:generate` — passed.
- `npm.cmd run build` — passed for backend and frontend.
- `npm.cmd test` — passed: backend 299 tests, frontend 40 tests.
- `npm.cmd run test:demo-data` — passed: 13 tests.
- Runtime verification completed on the explicitly authorized Neon demo database with process overrides `NODE_ENV=development`, `AI_PROVIDER=mock`, and a configured demo-account secret.
- `npm.cmd run db:seed:demo` passed with the expected 10-course fixture contract.
- A second `npm.cmd run db:seed:demo` plus verify produced the same counts, confirming idempotency.
- `npm.cmd run db:verify:demo` passed; all expected counts matched and password hash rounds were valid.
- Frontend `npm.cmd run test:e2e` passed: 49 tests, including student, instructor, public, responsive, quiz, assignment, and classroom flows.

## Run locally

Set `DATABASE_URL` to a confirmed local/demo database, `NODE_ENV=development`, `AI_PROVIDER=mock`, and provide the demo-account secret through the approved runtime channel. Then run:

```text
npm run db:seed:demo
npm run db:verify:demo
```

The frontend demo assets are under `EduAI-Front-End-Web/public/demo-assets/course-ai-*.svg`.

For the frontend E2E run, set `VITE_API_BASE_URL=/api/v1` and `VITE_DEMO_AUTH=true`; Playwright proxies to the local backend, which uses the configured Neon demo database. The demo secret is supplied through the approved runtime channel and is not stored in source control.
