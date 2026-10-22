# PAYW-00 Test Plan

PAYW-00 is documentary and read-only. No production write UAT is permitted.

1. Validate Markdown links/references point to existing Workspace files.
2. Verify IDs `PAYW-00–06` do not replace existing AI-DOS `SPRINT:26`.
3. Run Workspace conformance/contract checks when an executable checkout is
   available:
   `node core/conformance.js --manifest .ai-dos/manifest.json` and
   `npm run test:contracts`. Record actual exit codes; do not invent PASS.
4. Inspect PR diff and assert **zero changes** under `.ai-dos/records/`,
   Backend/Frontend runtime, credentials, payment APIs and Prisma migrations.
5. Confirm design requirements cover: duplicate verified bank events; unknown
   transfer; wrong amount/reference; late payment; wallet double spend; callback
   retry/out-of-order; partial/full refund; policy changes; multi-seller order;
   overlapping payout requests; failed/uncertain transfer; replay-safe
   entitlement and earnings posting.
6. Observe required GitHub PR checks; mark phase VERIFYING until CI/merge and
   remote-main evidence are available.

For later PAYW-01/PAYW-04 new UI, perform Stitch design before code and
responsive/a11y checks at 320/375/390/412/768/1024/1440.
