import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const directory = fileURLToPath(new URL('.', import.meta.url));
const registry = JSON.parse(readFileSync(`${directory}/profiles.json`, 'utf8'));
const REQUIRED_FIELDS = [
  'id', 'name', 'mission', 'responsibilities', 'reviewFocus', 'preferredCapabilities',
];

function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

function validateRegistry(value) {
  if (value?.schemaVersion !== '1.0' || !Array.isArray(value.profiles)) {
    throw new TypeError('INVALID_AGENT_PROFILE_REGISTRY');
  }
  const ids = new Set();
  for (const profile of value.profiles) {
    if (REQUIRED_FIELDS.some((field) => !Object.hasOwn(profile, field))) {
      throw new TypeError('INVALID_AGENT_PROFILE');
    }
    if (typeof profile.id !== 'string' || ids.has(profile.id)) {
      throw new TypeError('DUPLICATE_AGENT_PROFILE');
    }
    if (typeof profile.name !== 'string' || typeof profile.mission !== 'string'
      || !Array.isArray(profile.responsibilities) || profile.responsibilities.length < 2
      || !Array.isArray(profile.reviewFocus) || profile.reviewFocus.length < 1
      || !Array.isArray(profile.preferredCapabilities)) {
      throw new TypeError('INVALID_AGENT_PROFILE');
    }
    ids.add(profile.id);
  }
}

validateRegistry(registry);
deepFreeze(registry);

const profilesById = new Map(registry.profiles.map((profile) => [profile.id, profile]));

export const AGENT_PROFILE_IDS = Object.freeze(registry.profiles.map(({ id }) => id));

export function listAgentProfiles() {
  return registry.profiles;
}

export function getAgentProfile(id) {
  const profile = profilesById.get(id);
  if (!profile) throw new TypeError(`Unknown agent profile: ${id}`);
  return profile;
}

const CATEGORY_ROUTES = Object.freeze([
  [/\b(security|threat|hardening)\b/, 'security-reviewer'],
  [/\b(ui.?ux|design|usability)\b/, 'ui-ux-reviewer'],
  [/\b(frontend|client|web ui)\b/, 'frontend-engineer'],
  [/\b(backend|server|database|data)\b/, 'backend-engineer'],
  [/\b(qa|quality|test)\b/, 'qa-engineer'],
  [/\b(devops|deployment|infrastructure|ci.?cd|operations)\b/, 'devops-engineer'],
  [/\b(architect|architecture|system design|api design|fullstack)\b/, 'architect'],
  [/\b(planning|project|product|management)\b/, 'project-manager'],
]);

export function selectAgentProfile(task = {}) {
  const explicit = task?.extensions?.agentProfileId;
  if (explicit !== undefined) return getAgentProfile(explicit);

  const category = String(task.category ?? '').trim().toLowerCase();
  const route = CATEGORY_ROUTES.find(([pattern]) => pattern.test(category));
  return getAgentProfile(route?.[1] ?? 'project-manager');
}
