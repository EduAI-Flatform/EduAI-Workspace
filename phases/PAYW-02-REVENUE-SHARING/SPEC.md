# PAYW-02 Specification

## Objective and boundaries

Admin controls the platform share and membership catalogue; sellers understand participation and can inspect their own accrued revenue. Prices and shares use integer VND and basis points (0-10000); no additional gateway fee or tax deduction is introduced. No payout or withdrawable-balance UI is included. Existing plans remain legacy until explicitly configured, and existing courses are not automatically opted in.

## Fee and allocation contract

Retail: platform = floor(discounted line total * fee basis points / 10000); seller receives the remainder. Membership: subtract platform share, then split the seller pool by positive integer weights. Largest fractional remainder wins leftover VND; course ID provides a stable tie-break. Aggregate by the snapshotted course owner, never the admin who published a membership product. Store fee version, course/seller/weight and money allocation at order creation. Do not reconstruct legacy snapshots.

## Membership participation and versioning

An owner accepts terms per course and can see all matching plans and allocation proportions before and after acceptance. Store immutable acceptance evidence with actor, course, terms version and time. No current match is a valid participation state and must be explicit in the UI. Rules use AND across category/level/price constraints; omitted constraints mean unrestricted. Within a plan the first rule by priority wins; a course can join all matching plans. A per-course override replaces its matched rule weight.

Only published, undeleted, moderation-clear courses qualify. Joining/leaving, eligibility changes and effective policy changes trigger reconciliation. Published catalogue snapshots are immutable; reconcile by creating a new published version and cloning unchanged durations/service benefits. Existing subscriptions and orders keep previous versions and financial terms. Seller exit removes the course from future-sale versions only.

## Effective changes and notification

Immediate mode rejects a notice-day value; delayed mode requires positive whole days and exposes its calculated effective instant. Notify every seller whose participation/share changes before activating the new catalogue, including dilution due to another course joining. Later terms/policy changes do not require a new acceptance, as disclosed in original participation terms. A pending change can be cancelled; cancelled changes cannot activate. At activation recalculate eligible courses using the announced configuration and current participation state, and publish atomically. Lock policy/participation/checkout boundaries consistently so simultaneous changes produce one coherent order snapshot.

## Recognition and refunds

Verified canonical collections alone authorize revenue accounting. Receipt upload, provisional receipt access, redirect and screenshots do not. Independent idempotent posting/recovery cannot erase or roll back financial settlement. Retail recognises after verification. Membership total is split into deterministic monthly amounts; recognise at each calendar-month end anchored to actual subscription start, including month-end clamping/leap years. Future renewals have no early recognised balance.

Append-only journal events identify their source so replay is harmless. A confirmed refund of the canonical fulfilling collection proportionally adjusts already recognised and pending amounts using original line allocation; cumulative rounding is bounded and full refunds exhaust the original allocation. Refunds of duplicate/late non-fulfilling collections do not reverse the order's canonical earnings. Access revocation alone does not mean refund. Reports distinguish pending, recognised and refund adjustment totals; ownership is enforced server-side.

## Interfaces and delivery

Extend admin membership capability with fee/terms/policy state, preview, schedule/cancel and reporting APIs; add seller-owned course preview, acceptance, exit and own-report APIs. Money is serialized as decimal strings and dates as ISO instants; list/report endpoints are bounded/paginated. Financial/policy inputs are validated at boundaries. Reuse NestJS, Prisma, existing auth/roles, calendar-month helper and notification mechanisms. Edit Prisma fragments and regenerate the merged schema through the existing script. Additive migration only; production application needs separate approval.
