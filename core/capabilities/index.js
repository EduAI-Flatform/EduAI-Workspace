import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

import { CAPABILITY_KINDS } from '../contracts/index.js';
import { isProjectWritablePath } from '../ownership/index.js';
import { validateRecord } from '../validation/index.js';

const ENTRY_FIELDS = new Set([
  'id', 'type', 'name', 'status', 'version', 'source', 'capabilities',
  'trust', 'permissions', 'installedAt',
]);
const SECRET_KEYS = new Set([
  'password', 'token', 'apikey', 'privatekey', 'credential', 'credentials',
  'secret', 'clientsecret', 'accesstoken', 'refreshtoken',
]);
const TRUST_RANK = Object.freeze({ BUNDLED: 0, VERIFIED: 1, TRUSTED: 2, UNVERIFIED: 3 });
const STATUS_RANK = Object.freeze({ INSTALLED: 0, AVAILABLE: 1, MISSING: 2 });
const SAFE_TRUST = new Set(['BUNDLED', 'VERIFIED', 'TRUSTED']);

const LOCAL_TOOLS = Object.freeze([
  {
    command: 'git', capability: 'git_provider',
    permissions: [
      { scope: 'repository', access: 'READ', required: true, approved: false },
      { scope: 'repository', access: 'WRITE', required: false, approved: false },
      { scope: 'network', access: 'NETWORK', required: false, approved: false },
    ],
  },
  {
    command: 'playwright', capability: 'browser_e2e',
    permissions: [{ scope: 'browser', access: 'EXECUTE', required: true, approved: false }],
  },
  {
    command: 'docker', capability: 'deployment',
    permissions: [{ scope: 'runtime', access: 'EXECUTE', required: true, approved: false }],
  },
  {
    command: 'psql', capability: 'database_inspection',
    permissions: [{ scope: 'database', access: 'READ', required: true, approved: false }],
  },
  {
    command: 'sentry-cli', capability: 'monitoring',
    permissions: [{ scope: 'monitoring', access: 'READ', required: true, approved: false }],
  },
]);

function diagnostic(code, path, details = {}) {
  return { code, path, ...details };
}

function normalizedKey(key) {
  return key.replaceAll(/[^a-z0-9]/gi, '').toLowerCase();
}

export function findSensitiveMaterial(value, path = '$', diagnostics = []) {
  if (typeof value === 'string') {
    if (/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(value)
      || /[?&](?:token|api[_-]?key|secret|password)=/i.test(value)) {
      diagnostics.push(diagnostic('SECRET_MATERIAL', path));
    }
    return diagnostics;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => findSensitiveMaterial(item, `${path}[${index}]`, diagnostics));
    return diagnostics;
  }
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      const childPath = `${path}.${key}`;
      if (SECRET_KEYS.has(normalizedKey(key))) {
        diagnostics.push(diagnostic('SECRET_MATERIAL', childPath));
      } else {
        findSensitiveMaterial(child, childPath, diagnostics);
      }
    }
  }
  return diagnostics;
}

function normalizeEntry(entry, index, diagnostics) {
  const path = `$.inputs[${index}]`;
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
    diagnostics.push(diagnostic('INVALID_CAPABILITY_ENTRY', path));
    return undefined;
  }
  const sensitive = findSensitiveMaterial(entry, path);
  diagnostics.push(...sensitive);
  if (sensitive.length > 0) return undefined;

  const unknown = Object.keys(entry).filter((key) => !ENTRY_FIELDS.has(key));
  if (unknown.length > 0) {
    diagnostics.push(...unknown.map((field) => diagnostic(
      'UNKNOWN_CAPABILITY_FIELD',
      `${path}.${field}`,
    )));
    return undefined;
  }
  return structuredClone(entry);
}

function inventoryId(projectId) {
  return `CAPABILITY:${projectId.replace(/^PROJECT:/, '')}`;
}

export function createCapabilityInventory({ projectId, entries = [], now }) {
  return {
    kind: 'capability.inventory',
    schemaVersion: '1.0',
    id: inventoryId(projectId),
    projectId,
    discoveredAt: now,
    entries: [...entries].sort((left, right) => left.id.localeCompare(right.id)),
  };
}

export function discoverCapabilities({ projectId, inputs = [], now = new Date().toISOString() }) {
  const diagnostics = [];
  const entries = [];
  const seen = new Set();

  inputs.forEach((input, index) => {
    const entry = normalizeEntry(input, index, diagnostics);
    if (!entry) return;
    if (seen.has(entry.id)) {
      diagnostics.push(diagnostic('DUPLICATE_CAPABILITY_ID', `$.inputs[${index}].id`, {
        id: entry.id,
      }));
      return;
    }
    seen.add(entry.id);
    entries.push(entry);
  });

  const inventory = createCapabilityInventory({ projectId, entries, now });
  const validation = validateRecord(inventory);
  diagnostics.push(...validation.diagnostics);
  return { ok: diagnostics.length === 0, inventory, diagnostics };
}

function cleanVersion(value) {
  const line = String(value ?? '').split(/\r?\n/)[0].replaceAll(/[\u0000-\u001f\u007f]/g, '').trim();
  return line.slice(0, 128) || undefined;
}

export function discoverLocalTools({ run = spawnSync } = {}) {
  return LOCAL_TOOLS.map(({ command, capability, permissions }) => {
    const result = run(command, ['--version'], {
      encoding: 'utf8',
      timeout: 3000,
      windowsHide: true,
    });
    const available = result?.status === 0;
    return {
      id: `tool:${command}`,
      type: 'TOOL',
      name: command,
      status: available ? 'AVAILABLE' : 'MISSING',
      ...(available && cleanVersion(result.stdout || result.stderr)
        ? { version: cleanVersion(result.stdout || result.stderr) }
        : {}),
      source: 'PATH',
      capabilities: [capability],
      trust: 'UNVERIFIED',
      permissions: structuredClone(permissions),
    };
  });
}

function missingPermissions(entry, approvedPermissions) {
  const approvals = new Set(approvedPermissions);
  return entry.permissions.filter((permission) => (
    permission.required
    && !permission.approved
    && !approvals.has(permission.scope)
    && !approvals.has(`${permission.scope}:${permission.access}`)
  ));
}

function bestEntry(entries) {
  return [...entries].sort((left, right) => (
    TRUST_RANK[left.trust] - TRUST_RANK[right.trust]
    || STATUS_RANK[left.status] - STATUS_RANK[right.status]
    || left.id.localeCompare(right.id)
  ))[0];
}

export function resolveCapability({
  capability,
  inventory,
  candidates = [],
  allowInstall = false,
  approvedPermissions = [],
}) {
  if (!CAPABILITY_KINDS.includes(capability)) {
    return { action: 'INVALID_REQUIREMENT', capability };
  }
  const validation = validateRecord(inventory);
  const inventorySensitive = findSensitiveMaterial(inventory);
  if (!validation.ok || inventorySensitive.length > 0) {
    return {
      action: 'INVALID_INVENTORY',
      capability,
      diagnostics: [...validation.diagnostics, ...inventorySensitive],
    };
  }

  const candidateDiscovery = discoverCapabilities({
    projectId: inventory.projectId,
    inputs: candidates,
    now: inventory.discoveredAt,
  });
  if (!candidateDiscovery.ok) {
    return {
      action: 'INVALID_CANDIDATE',
      capability,
      diagnostics: candidateDiscovery.diagnostics,
    };
  }
  const validCandidates = candidateDiscovery.inventory.entries;

  const existing = bestEntry(inventory.entries.filter((entry) => (
    ['AVAILABLE', 'INSTALLED'].includes(entry.status)
    && entry.capabilities.includes(capability)
  )));
  if (existing) {
    if (!SAFE_TRUST.has(existing.trust)) {
      return { action: 'TRUST_APPROVAL_REQUIRED', capability, entry: existing };
    }
    const missing = missingPermissions(existing, approvedPermissions);
    if (missing.length > 0) {
      return { action: 'PERMISSION_REQUIRED', capability, entry: existing, permissions: missing };
    }
    return { action: 'USE_EXISTING', capability, entry: existing };
  }

  const matchingCandidates = validCandidates.filter((entry) => entry.capabilities.includes(capability));
  const candidate = bestEntry(matchingCandidates.filter((entry) => SAFE_TRUST.has(entry.trust)))
    ?? bestEntry(matchingCandidates);
  if (!candidate) return { action: 'MANUAL_ACTION_REQUIRED', capability };
  if (!SAFE_TRUST.has(candidate.trust)) {
    return { action: 'TRUST_APPROVAL_REQUIRED', capability, entry: candidate };
  }
  if (!allowInstall) {
    return { action: 'INSTALL_APPROVAL_REQUIRED', capability, entry: candidate };
  }
  const missing = missingPermissions(candidate, approvedPermissions);
  if (missing.length > 0) {
    return { action: 'PERMISSION_REQUIRED', capability, entry: candidate, permissions: missing };
  }
  return { action: 'INSTALL', capability, entry: candidate };
}

export async function installCapability({
  decision,
  installer,
  approvedPermissions = [],
  now = new Date().toISOString(),
}) {
  if (decision?.action !== 'INSTALL' || !decision.entry) {
    return { ok: false, code: 'INSTALL_NOT_APPROVED', diagnostics: [] };
  }
  const checked = discoverCapabilities({
    projectId: 'PROJECT:INSTALLATION',
    inputs: [decision.entry],
    now,
  });
  if (!checked.ok) {
    return { ok: false, code: 'INSTALL_METADATA_INVALID', diagnostics: checked.diagnostics };
  }
  const [entry] = checked.inventory.entries;
  if (!SAFE_TRUST.has(entry.trust)) {
    return { ok: false, code: 'INSTALL_TRUST_REQUIRED', diagnostics: [] };
  }
  const missing = missingPermissions(entry, approvedPermissions);
  if (missing.length > 0) {
    return {
      ok: false,
      code: 'INSTALL_PERMISSION_REQUIRED',
      permissions: missing,
      diagnostics: [],
    };
  }
  if (typeof installer !== 'function') {
    return { ok: false, code: 'INSTALLER_UNAVAILABLE', diagnostics: [] };
  }

  try {
    const result = await installer(structuredClone(entry));
    if (!result || typeof result !== 'object' || typeof result.ok !== 'boolean') {
      return { ok: false, code: 'INSTALL_RESULT_INVALID', diagnostics: [] };
    }
    const sensitive = findSensitiveMaterial(result);
    if (sensitive.length > 0) {
      return { ok: false, code: 'INSTALL_RESULT_REJECTED', diagnostics: sensitive };
    }
    if (!result.ok) return { ok: false, code: 'INSTALL_FAILED', diagnostics: [] };

    const installedEntry = {
      ...entry,
      status: 'INSTALLED',
      ...(typeof result.version === 'string' && result.version.length > 0
        ? { version: result.version }
        : {}),
      installedAt: now,
    };
    const installed = discoverCapabilities({
      projectId: 'PROJECT:INSTALLATION',
      inputs: [installedEntry],
      now,
    });
    if (!installed.ok) {
      return { ok: false, code: 'INSTALL_RESULT_INVALID', diagnostics: installed.diagnostics };
    }
    return { ok: true, entry: installed.inventory.entries[0], diagnostics: [] };
  } catch {
    return { ok: false, code: 'INSTALLER_FAILURE', diagnostics: [] };
  }
}

export function writeCapabilityInventory({ projectRoot, inventory }) {
  const validation = validateRecord(inventory);
  const sensitive = findSensitiveMaterial(inventory);
  if (!validation.ok || sensitive.length > 0) {
    return {
      ok: false,
      diagnostics: [...validation.diagnostics, ...sensitive],
    };
  }
  const relativePath = '.ai-dos/runtime/capabilities.json';
  if (!isProjectWritablePath(relativePath)) {
    return { ok: false, diagnostics: [diagnostic('OWNERSHIP_VIOLATION', relativePath)] };
  }

  const target = resolve(projectRoot, relativePath);
  try {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, `${JSON.stringify(inventory, null, 2)}\n`, 'utf8');
    return { ok: true, path: target, diagnostics: [] };
  } catch (error) {
    return {
      ok: false,
      diagnostics: [diagnostic('CAPABILITY_WRITE_ERROR', join('.ai-dos', 'runtime'), {
        message: error.message,
      })],
    };
  }
}
