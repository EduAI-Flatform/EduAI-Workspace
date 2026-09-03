# Social OAuth QA Checklist

## Scope

The current release gate is Facebook-first validation on the current public
EduAI environment. Zalo remains disabled and is not an enablement or exit
criterion for this release. Google Firebase login and local password login are
regression paths and must remain unchanged.

The current public callback contract is:

- frontend: `https://eduai.giaoducso.org.vn/auth/callback`
- Facebook: `https://api.eduai.giaoducso.org.vn/api/v1/auth/oauth/facebook/callback`
- Zalo: `https://api.eduai.giaoducso.org.vn/api/v1/auth/oauth/zalo/callback`

Public legal URLs for the Meta app:

- privacy policy: `https://eduai.giaoducso.org.vn/privacy`
- data deletion instructions: `https://eduai.giaoducso.org.vn/data-deletion`

## Viewport and client matrix

Record pass/fail and a short note for each:

- 320 x 800: mobile layout and narrow callback form
- 375 x 812: iOS-sized mobile layout
- 390 x 844: Android/iOS common layout
- 412 x 915: large mobile layout
- 768 x 1024: tablet layout
- 1024 x 768: small desktop/tablet landscape
- 1440 x 900: desktop layout
- Chromium desktop, WebKit/Safari, iOS Safari, Android Chrome, installed PWA

## Preconditions

- Facebook app is configured in development mode with the exact current HTTPS
  callback URI and web domains, plus the public privacy and data-deletion URLs.
- Backend `FACEBOOK_OAUTH_ENABLED=true`, `ZALO_OAUTH_ENABLED=false`, complete
  Facebook credentials, the production frontend callback URL, and Redis are
  configured in the test environment.
- `OAUTH_STATE_SECRET` is distinct and at least 32 characters; provider
  secrets and `REDIS_URL` are server-only.
- Provider app is in the correct development/live mode for the test account.
- No provider access token, authorization code, or client secret appears in
  browser storage, network logs, application logs, or analytics payloads.

## Functional cases

- [ ] Disabled provider is absent from Login and Register.
- [ ] Capability response is `{ google: true, facebook: true, zalo: false }`.
- [ ] Enabled provider button has an accessible label, visible loading state,
      and cannot be double-submitted.
- [ ] Facebook Login returns to EduAI with a normal session.
- [ ] Facebook Register creates the selected role (student or instructor).
- [ ] Zalo remains absent and disabled throughout the Facebook-first gate.
- [ ] Existing provider identity signs into the existing account.
- [ ] Existing email collision shows the safe link-required result and does
      not merge accounts.
- [ ] Missing provider email shows the required email form; completion creates
      one linked account and a normal session.
- [ ] Cancel, deny, invalid code, provider outage, and malformed response
      show a safe error with no session.
- [ ] Expired, replayed, tampered, and cross-provider state/tickets are
      rejected.
- [ ] Refreshing or reopening the callback does not replay a session or
      profile ticket.
- [ ] Back navigation, direct callback deep link, and PWA launch behave
      predictably.

## Regression cases

- [ ] Google Login and Register still use Firebase and complete the existing
      EduAI JWT/refresh session flow.
- [ ] Local password Login/Register behavior is unchanged.
- [ ] Existing authenticated routes, logout, refresh, and role-based routing
      remain functional.

## Exit record

Environment:

Provider:

Build/version:

Tester/date:

Known failures and follow-up:

Zalo status: `DISABLED — separate future V4/PKCE gate`.
