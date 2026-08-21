import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const directory = fileURLToPath(new URL('.', import.meta.url));
const vocabulary = JSON.parse(readFileSync(`${directory}/vocabulary.json`, 'utf8'));
const registry = JSON.parse(readFileSync(`${directory}/contract-schemas.json`, 'utf8'));
const compatibility = JSON.parse(readFileSync(`${directory}/compatibility.json`, 'utf8'));

function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

export const CONTRACT_SCHEMA_VERSION = vocabulary.schemaVersion;
export const CONTRACT_KINDS = Object.freeze([...vocabulary.kinds]);
export const APPLICABILITY = Object.freeze([...vocabulary.applicability]);
export const TASK_STATUSES = Object.freeze([...vocabulary.taskStatuses]);
export const MANUAL_ACTION_STATUSES = Object.freeze([...vocabulary.manualActionStatuses]);
export const PROJECT_STATUSES = Object.freeze([...vocabulary.projectStatuses]);
export const EVIDENCE_RESULTS = Object.freeze([...vocabulary.evidenceResults]);
export const EVIDENCE_CHECK_KINDS = Object.freeze([...vocabulary.evidenceCheckKinds]);
export const CAPABILITY_KINDS = Object.freeze([...vocabulary.capabilityKinds]);
export const CAPABILITY_ENTRY_TYPES = Object.freeze([...vocabulary.capabilityEntryTypes]);
export const CAPABILITY_ENTRY_STATUSES = Object.freeze([...vocabulary.capabilityEntryStatuses]);
export const CAPABILITY_TRUST_LEVELS = Object.freeze([...vocabulary.capabilityTrustLevels]);
export const PERMISSION_ACCESS = Object.freeze([...vocabulary.permissionAccess]);
export const COMPATIBILITY_MATRIX = deepFreeze(compatibility);

export function getSchema(kind) {
  if (!Object.hasOwn(registry.schemas, kind)) {
    throw new Error(`Unknown contract kind: ${kind}`);
  }

  return structuredClone(registry.schemas[kind]);
}
