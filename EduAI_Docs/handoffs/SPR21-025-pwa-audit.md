# SPR21-025 — EduAI PWA technical audit

## Decision

EduAI is currently a responsive web application, not an installable PWA.
Keep the implementation audit-only in SPR21-025 and defer manifest, icons,
service worker, install prompt, and standalone-mode work to SPR21-026.
Do not introduce Electron or cache authenticated API responses as part of this
task.

## Findings

| Area | Local build | Production | Decision |
| --- | --- | --- | --- |
| Web app manifest | `dist` has no manifest asset | No `link[rel=manifest]`; manifest URLs fall back to HTML | Implement in SPR21-026 |
| Service worker | No generated `sw.js` | `/sw.js` returns 404; no controller | Implement in SPR21-026 |
| Install prompt | No registration or prompt code found | Not available | Define browser/device QA in SPR21-026 |
| Standalone mode | Not configured | Not available | Add only with explicit start URL/scope |
| Scope/start URL | Not defined | Not defined | Keep `/` as the candidate start URL |
| Auth/offline cache | No PWA cache exists | No private data is cached by a service worker | Never cache authenticated API responses by default |

## Required SPR21-026 matrix

- Chromium desktop on Windows: manifest recognition, install affordance,
  standalone launch, icon sizes, update/reload behavior, sign-in redirect.
- Chrome Android: install prompt, start URL, scope, back navigation, network
  loss, authenticated-session behavior, and update recovery.
- iOS Safari: home-screen addition, standalone viewport, safe-area layout, and
  authentication behavior; document platform limitations.
- Regression: public routes remain available, private API responses are not
  cached, logout does not leave private shell data available offline, and a
  failed service-worker update can be rolled back.

## Evidence

- `npm.cmd run build` passed; the existing chunk-size warning remains.
- Local `dist`: manifest absent, service worker absent.
- Production: `manifest.webmanifest` and `manifest.json` returned the SPA HTML
  fallback, `/sw.js` returned 404, no manifest link was present, and there was
  no active service-worker controller.
