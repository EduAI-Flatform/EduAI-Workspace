# Auth QA Checklist

Task: SPR2-010
Date: 15/06/2026

## Automated checks

- [x] Register endpoint validates input and returns sanitized user data.
- [x] Login endpoint returns access token, refresh token, user, and standard response wrapper.
- [x] Logout endpoint invalidates refresh-token flow through the controller contract.
- [x] Current-user endpoint rejects missing bearer token and accepts valid token.
- [x] Admin-only RBAC route rejects student role and accepts platform_admin role.
- [x] Backend auth service unit tests pass.
- [x] Backend auth guard unit tests pass.
- [x] Backend build passes.
- [x] Frontend build passes.

## Manual browser checklist

- [ ] Register a new student account from `/register`.
- [ ] Log in from `/login` and confirm redirect to `/dashboard`.
- [ ] Open `/dashboard` while logged out and confirm redirect to `/login?redirectTo=%2Fdashboard`.
- [ ] Log out from the header and confirm local session is cleared.
- [ ] Confirm dashboard layout is usable at mobile width.

## Notes

- Browser automation was blocked in this environment by the local browser sandbox, so manual browser checks remain open for human signoff.
- No API, database, or security architecture changes were made for this QA task.
