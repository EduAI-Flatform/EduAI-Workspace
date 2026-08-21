import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { findSensitiveMaterial } from '../capabilities/index.js';
import {
  CAPABILITY_KINDS,
  PERMISSION_ACCESS,
} from '../contracts/index.js';
import { validateRecord } from '../validation/index.js';

const directory = fileURLToPath(new URL('.', import.meta.url));
const registry = JSON.parse(readFileSync(`${directory}/policies.json`, 'utf8'));
const SAFE_TRUST = new Set(['BUNDLED', 'VERIFIED', 'TRUSTED']);
const TRUST_RANK = Object.freeze({ BUNDLED: 0, VERIFIED: 1, TRUSTED: 2, UNVERIFIED: 3 });

function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

function permissionKey(permission) {
  return `${permission.scope}:${permission.access}`;
}

function validatePolicies(value) {
  if (value?.schemaVersion !== '1.0' || !Array.isArray(value.policies)) {
    throw new TypeError('INVALID_ADAPTER_POLICY_REGISTRY');
  }
  const capabilities = value.policies.map(({ capability }) => capability);
  if (JSON.stringify(capabilities) !== JSON.stringify(CAPABILITY_KINDS)) {
    throw new TypeError('INCOMPLETE_ADAPTER_POLICY_REGISTRY');
  }
  for (const policy of value.policies) {
    if (!policy.operations || typeof policy.operations !== 'object') {
      throw new TypeError('INVALID_ADAPTER_POLICY');
    }
    for (const [operation, permissions] of Object.entries(policy.operations)) {
      if (!/^[a-z][a-z0-9_]{1,63}$/.test(operation) || !Array.isArray(permissions)) {
        throw new TypeError('INVALID_ADAPTER_OPERATION_POLICY');
      }
      const keys = new Set();
      for (const permission of permissions) {
        if (typeof permission?.scope !== 'string'
          || !PERMISSION_ACCESS.includes(permission.access)
          || keys.has(permissionKey(permission))) {
          throw new TypeError('INVALID_ADAPTER_PERMISSION_POLICY');
        }
        keys.add(permissionKey(permission));
      }
    }
  }
}

validatePolicies(registry);
deepFreeze(registry);

const policyByCapability = new Map(
  registry.policies.map((policy) => [policy.capability, policy]),
);

export const ADAPTER_POLICIES = registry.policies;

export function getAdapterPolicy(capability) {
  const policy = policyByCapability.get(capability);
  if (!policy) throw new TypeError(`Unknown adapter capability: ${capability}`);
  return policy;
}

function diagnostic(code, path, details = {}) {
  return { code, path, ...details };
}

function manualAction(capability, operation, reason, permissions = []) {
  return {
    title: `Enable ${capability}.${operation}`,
    capability,
    operation,
    reason,
    requiredAction: ['Approve or configure a trusted adapter with least privilege.'],
    requiredPermissions: permissions.map(permissionKey),
  };
}

function validateAdapter(adapter, index) {
  const path = `$.adapters[${index}]`;
  const diagnostics = [];
  if (!adapter || typeof adapter !== 'object' || typeof adapter.invoke !== 'function') {
    return [diagnostic('INVALID_ADAPTER', path)];
  }
  const validation = validateRecord(adapter.manifest);
  diagnostics.push(...validation.diagnostics.map((entry) => ({
    ...entry,
    path: entry.path.replace('$', `${path}.manifest`),
  })));
  diagnostics.push(...findSensitiveMaterial(adapter.manifest, `${path}.manifest`));
  if (!validation.ok) return diagnostics;

  const policy = getAdapterPolicy(adapter.manifest.capability);
  const declared = new Set(adapter.manifest.permissions.map(permissionKey));
  for (const operation of adapter.manifest.operations) {
    const required = policy.operations[operation];
    if (!required) {
      diagnostics.push(diagnostic('ADAPTER_OPERATION_UNKNOWN', `${path}.manifest.operations`, {
        adapterId: adapter.manifest.id,
        operation,
      }));
      continue;
    }
    for (const permission of required) {
      if (!declared.has(permissionKey(permission))) {
        diagnostics.push(diagnostic('ADAPTER_PERMISSION_UNDECLARED', `${path}.manifest.permissions`, {
          adapterId: adapter.manifest.id,
          operation,
          permission: permissionKey(permission),
        }));
      }
    }
  }
  return diagnostics;
}

export function createAdapterRegistry({ adapters = [], approvedPermissions = [] } = {}) {
  const diagnostics = [];
  const registered = [];
  const ids = new Set();

  adapters.forEach((adapter, index) => {
    const adapterDiagnostics = validateAdapter(adapter, index);
    if (ids.has(adapter?.manifest?.id)) {
      adapterDiagnostics.push(diagnostic('DUPLICATE_ADAPTER_ID', `$.adapters[${index}].manifest.id`, {
        id: adapter.manifest.id,
      }));
    }
    diagnostics.push(...adapterDiagnostics);
    if (adapterDiagnostics.length > 0) return;
    ids.add(adapter.manifest.id);
    registered.push({
      manifest: deepFreeze(structuredClone(adapter.manifest)),
      invoke: adapter.invoke,
    });
  });

  const approvals = new Set(approvedPermissions);

  return Object.freeze({
    ok: diagnostics.length === 0,
    diagnostics: Object.freeze(diagnostics),
    manifests: Object.freeze(registered.map(({ manifest }) => manifest)),
    async invoke(capability, operation, context = {}) {
      const policy = policyByCapability.get(capability);
      if (!policy || !policy.operations[operation]) {
        return { ok: false, code: 'ADAPTER_OPERATION_UNSUPPORTED', capability, operation };
      }

      const matching = registered
        .filter(({ manifest }) => (
          manifest.capability === capability && manifest.operations.includes(operation)
        ))
        .sort((left, right) => (
          TRUST_RANK[left.manifest.trust] - TRUST_RANK[right.manifest.trust]
          || left.manifest.id.localeCompare(right.manifest.id)
        ));
      const adapter = matching.find(({ manifest }) => SAFE_TRUST.has(manifest.trust));
      if (!adapter) {
        if (matching.length > 0) {
          return {
            ok: false,
            code: 'ADAPTER_TRUST_REQUIRED',
            manualAction: manualAction(capability, operation, 'Adapter trust is not approved.'),
          };
        }
        return {
          ok: false,
          code: 'ADAPTER_UNAVAILABLE',
          manualAction: manualAction(capability, operation, 'No adapter is registered.'),
        };
      }

      const missing = policy.operations[operation].filter((permission) => (
        !approvals.has(permission.scope) && !approvals.has(permissionKey(permission))
      ));
      if (missing.length > 0) {
        return {
          ok: false,
          code: 'ADAPTER_PERMISSION_REQUIRED',
          adapterId: adapter.manifest.id,
          manualAction: manualAction(
            capability,
            operation,
            'Required adapter permissions are not approved.',
            missing,
          ),
        };
      }

      try {
        const adapterContext = structuredClone(context);
        const result = await adapter.invoke(operation, adapterContext);
        if (!result || typeof result !== 'object' || typeof result.ok !== 'boolean') {
          return { ok: false, code: 'ADAPTER_RESULT_INVALID', adapterId: adapter.manifest.id };
        }
        if (findSensitiveMaterial(result).length > 0) {
          return { ok: false, code: 'ADAPTER_RESULT_REJECTED', adapterId: adapter.manifest.id };
        }
        if (!result.ok) {
          return {
            ok: false,
            code: result.code ?? 'ADAPTER_OPERATION_FAILED',
            adapterId: adapter.manifest.id,
          };
        }
        return { ok: true, adapterId: adapter.manifest.id, data: result.data };
      } catch (error) {
        const rawMessage = String(error?.message ?? 'Adapter failed').slice(0, 256);
        const message = findSensitiveMaterial(rawMessage).length > 0
          ? 'Adapter failed; sensitive details were redacted.'
          : rawMessage.replaceAll(/[\u0000-\u001f\u007f]/g, ' ');
        return {
          ok: false,
          code: 'ADAPTER_FAILURE',
          adapterId: adapter.manifest.id,
          error: {
            name: String(error?.name ?? 'Error').slice(0, 64),
            message,
          },
        };
      }
    },
  });
}
