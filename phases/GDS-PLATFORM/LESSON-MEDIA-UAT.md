# Actual private lesson media acceptance

Status: PASS for private upload, owner preview, access boundary and cleanup. Overall GDS plan remains VERIFYING. No course was published and no enrollment, progress, quiz attempt, point award, certificate or financial record was created by these checks.

## Actual storage/API pass

At 2026-11-14T01:55:51Z, the existing synthetic instructor created one private draft and obtained a scoped video upload authorization. A tiny browser-generated WebM was uploaded to real R2, finalized by the actual backend, and attached to a new non-preview video lesson. The real owner-preview page played the stored video to a trusted native end event. Anonymous lesson access returned404. The preview dialog/page fit320/375/390/412/768/1024/1440px without page exceptions. The owned lesson was deleted, its exact storage URL returned404, and the private course was archived.

This first case used an isolated API request context for the R2 PUT, carrying only the required Content-Type header. Application authorization was confined to same-origin application API requests. It did not establish browser upload CORS; the separate native UI pass below does. Temporary upload/download URLs remained in memory and were not printed or persisted. Existing opaque Playwright session files were reused without extracting their credentials.

Sanitized receipt: `.codex-artifacts/gds-production/lesson-media.json`; state: `lesson-media-pending.json` is cleaned. Six application write requests plus one storage PUT occurred. No business flag or application code changed.

## Actual browser file picker and CORS pass

At 2026-11-14T02:03:53Z, a separate private synthetic draft passed the native instructor lesson-management UI: open Create lesson, enter the title/slug, select a WebM through the file input, complete browser upload/preflight to real R2, finalize, and save the lesson. The new lesson then passed actual owner-preview playback, anonymous404 and the same seven responsive widths. Its lesson and storage object were deleted and its private course archived. The real browser performed its own PUT/CORS; it was not substituted with a Node-side upload response. Six application write requests, one storage PUT, zero refreshes and zero page exceptions occurred in the passing run. Receipt: `lesson-media-native.json`; `lesson-media-native-pending.json` is cleaned.

The first native probe timed out before upload because an exact Playwright label selector did not match the select's combined label/options text. Read-only inspection of that same owned archived course showed the form present, all other expected field selectors matching, and zero exact matches for the select label. A prefix label selector corrected the probe. No application permission, validation or upload behavior was changed. That interrupted run created/archived only its private draft, with two application write requests and zero R2 PUTs. A separate diagnostic initially waited for network-idle on a page with background connections; DOM-ready inspection resolved it. These diagnostic runs did not mutate course content.

Across both passing cases and the interrupted native probe, three private synthetic courses were created and archived, two lessons were soft-deleted, and both uploaded objects were verified removed. Aggregate application write requests:14; storage PUTs:2. Successful per-run receipts each report only their own requests. The failed probe's archived course ID is `c5bc7f59-dcba-49d7-a543-fc8f63a0e349` for traceability.

## Scope remaining

This accepts the existing native private lesson-video upload and preview path. It does not claim avatar/cover replacement, thumbnails/PDFs, public course publication, learner enrollment, quiz submission or a full production learner lifecycle. Progress correctness/database persistence and deployed-code fixture playback remain separate evidence in [video progress](VIDEO-PROGRESS.md). The existing GDS plan and business-policy/external-integration conditions remain in force.
