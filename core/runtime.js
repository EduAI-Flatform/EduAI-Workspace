import { readFileSync } from 'node:fs';

import {
  discoverCapabilities,
  discoverLocalTools,
  writeCapabilityInventory,
} from './capabilities/index.js';
import {
  buildReadPlan,
  loadManifest,
  resolveManifestProjectRoot,
} from './manifest/index.js';
import { selectRunnableTasks } from './orchestration/index.js';

function option(args, name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function usage() {
  console.error('Usage: node core/runtime.js <discover|plan> --manifest <path> [--catalog <json>]');
}

function fail(code, message, exitCode = 2) {
  console.error(JSON.stringify({ ok: false, diagnostics: [{ code, message }] }, null, 2));
  process.exitCode = exitCode;
}

const args = process.argv.slice(2);
const command = args[0];
const manifestPath = option(args, '--manifest');

if (!['discover', 'plan'].includes(command) || !manifestPath) {
  usage();
  process.exitCode = 2;
} else {
  try {
    const loaded = loadManifest(manifestPath);
    if (!loaded.ok) {
      console.log(JSON.stringify(loaded, null, 2));
      process.exitCode = 1;
    } else {
      const projectRoot = resolveManifestProjectRoot(manifestPath);
      const plan = buildReadPlan(loaded.manifest, projectRoot);
      const records = [];
      for (const entry of plan.entries.filter(({ role, exists }) => (
        role === 'canonical_record' && exists
      ))) {
        const parsed = JSON.parse(readFileSync(entry.absolutePath, 'utf8'));
        if (Array.isArray(parsed)) records.push(...parsed);
        else records.push(parsed);
      }
      const profileEntry = plan.entries.find((entry) => (
        entry.role === 'canonical_record'
        && entry.recordKind === 'project.profile'
        && entry.exists
      ));
      if (!plan.ok || (command === 'discover' && !profileEntry)) {
        console.log(JSON.stringify({
          ok: false,
          diagnostics: [
            ...plan.diagnostics,
            ...(command === 'discover' && !profileEntry
              ? [{ code: 'MISSING_PROJECT_PROFILE' }]
              : []),
          ],
        }, null, 2));
        process.exitCode = 1;
      } else if (command === 'plan') {
        const result = selectRunnableTasks(records);
        console.log(JSON.stringify(result, null, 2));
        process.exitCode = result.ok ? 0 : 1;
      } else {
        const profile = JSON.parse(readFileSync(profileEntry.absolutePath, 'utf8'));
        const catalogPath = option(args, '--catalog');
        const catalog = catalogPath
          ? JSON.parse(readFileSync(catalogPath, 'utf8'))
          : [];
        if (!Array.isArray(catalog)) {
          fail('INVALID_CAPABILITY_CATALOG', 'Capability catalog must be a JSON array.');
        } else {
          const discovered = discoverCapabilities({
            projectId: profile.id,
            inputs: [...discoverLocalTools(), ...catalog],
          });
          if (!discovered.ok) {
            console.log(JSON.stringify(discovered, null, 2));
            process.exitCode = 1;
          } else {
            const written = writeCapabilityInventory({
              projectRoot,
              inventory: discovered.inventory,
            });
            const result = {
              ok: written.ok,
              inventory: discovered.inventory,
              path: written.path,
              diagnostics: written.diagnostics,
            };
            console.log(JSON.stringify(result, null, 2));
            process.exitCode = result.ok ? 0 : 1;
          }
        }
      }
    }
  } catch (error) {
    fail('RUNTIME_INPUT_ERROR', error.message);
  }
}
