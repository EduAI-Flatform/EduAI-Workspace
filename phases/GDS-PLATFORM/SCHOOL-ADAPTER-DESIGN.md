# School integration adapter and education identity design

Status: provider-neutral design for original stage 5. No school is currently connected. This document defines boundaries and acceptance requirements, not a deployed external adapter or an API contract for an invented provider. No new endpoint, schema, credential or synchronization is activated by it.

## Existing implementation to reuse

- Partnership intake and Admin application review are implemented in platform-requests. Acceptance of an application is a commercial/onboarding decision, not technical authorization.
- The partners policy stores public catalog metadata and a separately recorded connection status. Neither `enabled`, `accepted` nor `connectionStatus=connected` can enable data ingestion, SSO, provisioning or points.
- BE `ActivityPointService.recordCourseCompletion(sourceId)` currently accepts only an existing internal enrollment, reloads server-owned completion facts, resolves the effective point policy at completion time and posts a unique receipt/ledger effect under Serializable isolation. Its unique key is the native `course.completed` event plus enrollment ID. `SUPPORTED_POINT_EVENTS` currently contains only that native event.
- Consequently, external payloads must never be passed to that method as if their IDs were internal enrollments, and Admin must not configure arbitrary executable event names. Existing purchased course rights and independently purchased quotas remain independent of partner connection state.

## Onboarding paths

1. A school submits organization/contact/needs/consent through the current partnership form; Admin reviews and contacts it.
2. For a school using the hosted GDS platform, provision approved organizational access through the existing account/course authorization workflow. Native enrollment/completion remains the source; a second external point adapter is unnecessary.
3. For an existing school system, record its actual API/SSO documentation, tenant/issuer, education-ID rules, course/completion semantics, data scope, authentication method, consent/authority, synchronization cadence, corrections and operational contacts in a private integration contract.
4. Implement and sandbox-test that provider's adapter against the contract. Enable each capability only after the contract, identity mapping, policies, operational review and release checks pass. A school does not need to arrive with an API to submit its initial application.

## Boundaries

| Responsibility | Allowed behavior | Must not do |
|---|---|---|
| Private connection registry | Identify one provider instance and school tenant, contract/schema version, capabilities and technical enable switches | Store credentials in public branding/partners policy or derive activation from application/catalog status |
| Provider transport adapter | Fetch/push only contracted resources, verify issuer/signature/service authentication, validate schema/size/time bounds and record a cursor | Trust caller-supplied user IDs, monetary amounts, point values or unconstrained fetch URLs |
| Education identity resolver | Resolve a verified external identity to an authorized GDS user under the same provider/school | Match by display name/email alone, cross tenants or accept caller-assigned roles |
| Verified learning source | Retain canonical source ID/version/time/completion evidence and map contracted course identity | Manufacture a GDS enrollment, course completion, certificate or purchased entitlement |
| Registered point adapter | Read verified persisted source facts and invoke supported point rules with immutable policy provenance | Accept a requested award amount or reuse the native enrollment adapter for an unverified external event |
| Reconciliation worker | Reconcile bounded batches, checkpoints, duplicates, rejects and missing evidence | Reset history, erase conflicting receipts or silently turn an outage into revoked purchased access |

An implementation should keep transport, identity resolution and verified-source evaluation separate inside the existing Nest feature-module architecture. The precise provider request/response DTOs, scopes and endpoints cannot be chosen before the first real contract. Use the current validation/error/authorization conventions and stable response envelope when an actual API is introduced.

## Education ID and SSO mapping

The identity namespace is `(provider instance, school tenant, external education ID)`, not a globally unique student number. Preserve the provider's documented case/normalization semantics; version that normalization. Mapping must be unique within this namespace, have verification provenance/status/time, and refer to one active GDS account. Reject conflicting or ambiguous mappings for review. Never log raw identity payloads or publish mappings with partner catalog metadata.

SSO `(issuer, subject)` is a distinct verified login identity. Link it to an existing GDS account only through an authenticated account-linking or authorized, audited onboarding flow that proves the binding. Email equality is insufficient proof. Upstream role claims do not automatically grant instructor/Admin roles. Unlinking or suspending an integration must not delete the GDS account or purchased learning access. School transfers and reused student numbers require explicit mapping review; do not repoint old receipts to a new person.

## Learning events, idempotency and policy provenance

Provider-neutral verified facts need a connection/tenant key, provider source event ID, source revision or immutable digest, mapped identity, external course/activity identity, occurrence time, completion/evidence state and contract version. This is a design vocabulary, not an existing accepted HTTP payload. Verify the transport and authoritative source before marking facts verified. Missing/unknown identity, unsupported activity, future timestamps, invalid completion semantics or a disabled connection fail closed or enter bounded review without an award.

The durable identity of an external source includes provider instance and school tenant; it must not collide with native enrollment IDs. Re-delivery of identical facts returns the existing outcome. Reuse of an event ID with different facts is a conflict to quarantine and reconcile, never a second award. Corrections and reversals retain original source/policy/ledger references and use explicit adjustment records; they do not overwrite the original receipt or automatically renew expired awards.

Before any external point capability ships, add a reviewed registered server event/source adapter and corresponding immutable source/uniqueness constraints. Select the approved point policy effective at verified occurrence time, apply the existing UTC daily cap/expiry semantics, and use the existing user locking/Serializable transaction and point ledger. Persist source provenance, policy revision and outcome atomically. Do not create a second balance ledger. Existing native course-completion replay remains unchanged. An eligible external activity with no approved rule or incomplete proof produces no points.

## Reconciliation and recovery

Process bounded, rate-limited batches with a last verified cursor. Persist batch ID, connection/contract version, source window/cursor, counts of fetched/verified/duplicate/rejected/quarantined/posted/adjusted events and references to retained evidence. Keep personal payloads out of ordinary operational logs. Provide Admin exception review and a repeatable comparison between provider facts, mappings, verified sources, point receipts and ledger effects before moving the checkpoint. A source outage pauses ingestion with retry/backoff; partial failures cannot advance past unverified work or duplicate posted effects.

Keep technical switches separate for read synchronization, SSO/account linking, provisioning and point processing. Suspending the affected capability stops new processing but preserves receipts, audit history, GDS account access and purchased rights. Resuming replays from verified checkpoints under the same deduplication rules. Never interpret a catalog status change as a destructive synchronization action.

## Acceptance before a real connection is enabled

- Approve the real provider contract, namespace/normalization, supported activities, policy and scope; confirm how the school uses hosted GDS or its own system.
- Verify valid/invalid authentication, issuer/audience/tenant separation, expired/replayed claims, duplicate IDs, conflicting mappings and account-linking ownership.
- Exercise valid/invalid/oversized events, unknown courses/users, out-of-order/replayed/corrected events, provider outages and resume from checkpoints.
- Prove exact-once point effects and compensation with real disposable PostgreSQL concurrency tests, effective policy/date/cap/expiry boundaries and unchanged native events/purchased grants/balances.
- Review least-privilege persistence and any additive migration; rehearse backup/reconciliation/rollback before production writes.
- Show Admin connectivity separately from application approval, make unconnected/paused states clear, and retain named per-capability release/disable controls.

Until these prerequisites exist, actual school synchronization stays off. This design satisfies the requested adapter/ID/event/reconciliation design deliverable while explicitly leaving provider-specific implementation conditional on the first real school contract.
