# Compact wallet and complete activity — PAYW-03-004

Owner direction2026-11-05: remove total balance and redundant history-scroll
action, retain deposit/withdrawal buttons, show holds only when positive, and add
lifetime deposited/paid/withdrawn totals. Browse all activity under every filter,
instead of a20-row window with separately paginated withdrawals.

## Data contract
Summary adds totalDepositedMinor=sum(TOPUP_CREDIT), totalPaidMinor=sum(CAPTURE).
These are gross lifetime amounts, not net after refunds. Holds/releases/revenue
are excluded; paid withdrawals retain their separate existing total. Existing
summary fields, including settledMinor/recentTransactions, remain compatible.

GET /wallet/gds/transactions accepts filter=all|incoming|outgoing|payments|
withdrawals, limit1..50(default20), optional cursor(max512characters). Returns
items,nextCursor,hasMore; monetary values remain integer VND strings. A single SQL
statement scopes both sources to the authenticated owner. Cursor version/owner/
filter are validated; parameters cannot select another owner or inject SQL.

Keyset order uses exact epoch microseconds plus source-prefixed UUID under C
collation. Cursor precision does not depend on JavaScript Date milliseconds.
Requests use immutable creation time so processing updates do not reorder pages.
New activity appears on refresh; pagination is a live feed, not a frozen export.
Incoming=credited deposit/revenue; outgoing=captured payment/revenue reversal/
paid withdrawal. Neutral holds/releases are not incoming/outgoing. Each owned
withdrawal request appears once; linked ledger effects are excluded. Orphan
legacy postings are retained without invented request details. Accounts are
masked in SQL; holder, bank transfer proof and internal references are not exposed.

## UI and recovery
Available balance remains primary; zero holds do not occupy space. Three totals
form one strip; TMI/instructor income remain separate. All filters use the same
Show more control, keeping prior rows on a next-page error. Generation guards
discard stale responses on filter/refresh/unmount; synchronous request guard
prevents duplicate append. Creating/cancelling a withdrawal reloads the selected
feed. Removed the obsolete first20 component/instruction and withdrawal-only
history pagination. No money/lookup/limit policy change or schema migration.

## Verification and rollout
Local107wallet/withdrawal/revenue cases,12PostgreSQL SQL cases, backend build and
311-route authorization audit PASS. Frontend542tests/118files,build,bundle budget
and39Chromium wallet scenarios across320/375/390/412/768/1024/1440 PASS. Includes
45rows across3pages, filter selection, explicit503retry preserving rows, stale
response suppression, linked-request masking, timestamp ties and neutral effects.
Source/test review checked owner bounds, cursor validation, duplicate lifecycle
effects and existing payment evidence invariants. No authenticated production
financial mutation or external payout is part of release verification.

Backend dev eefe3fa165bfe2901e56bdfccbbb07652c71cef7: CI42011270280 and real
PostgreSQL replay42011270229 PASS. PR30 merged as21906fdce2b09950251c258582aae70c4e35ec5c.
Frontend dcc716f8cf547911039373d56447cdcd708b88a1 also refreshes the feed when
wallet available/held/debt changes, preserving topup result visibility and rejecting
late next-page responses. One additional regression covers refresh while append
is pending. Dev CI42012611862 and PR CI42012621929 PASS; PR30 merged as
b3c6c04585ace31b3e38dfcd70a47f1f5f7b653c. Exact-main verification follows below.
Backend production42012060030 PASS at exact main21906fdce2b09950251c258582aae70c4e35ec5c:
migrationPostflight PASS,financialRowsChanged0,runtimeFinancialGuardPrivilegesBlocked
and runtimeMembershipPrivilegesGranted true. Health200; unauthenticated activity401.
Backend main CI42012059796 and PostgreSQL replay42012059833 PASS.
Exact frontend main:542tests/118files,build and39browser scenarios PASS.
Frontend production42013424409 PASS; deployedFrontendSha equals main
b3c6c04585ace31b3e38dfcd70a47f1f5f7b653c. Public wallet200, entry
index-CvT8ZPxk.js;10linked chunks expose all four new history/totals labels and
no obsolete total-balance label. API health200 and protected activity401.
Frontend main CI42013424399 all three jobs PASS, including checkout/receipt
regressions and PWA browser smoke checks.
Backend deploys first;
rollback is source-only, no database rollback or data reset. Persistent dev retained.
