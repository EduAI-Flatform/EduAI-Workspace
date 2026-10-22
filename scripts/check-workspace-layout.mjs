import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const exists = (path) => existsSync(resolve(root, path));
const read = (path) => readFileSync(resolve(root, path), 'utf8');

const required = [
  'AGENTS.md',
  'README.md',
  'state/PROJECT-STATE.md',
  'state/DEPENDENCY-GRAPH.md',
  'state/BLOCKERS.md',
  'state/DECISIONS.md',
  'docs/engineering/CODEX-WORKING-RULES.md',
  'docs/engineering/PHASE-AUTOPILOT.md',
  'docs/archive/README.md',
  'phases/README.md',
  'phases/ADMIN-UI-ROADMAP.md',
  'phases/PAYMENT-WALLET-ROADMAP.md',
  'phases/PAYW-00-PAYMENT-WALLET-ARCHITECTURE-AUDIT/README.md',
  '.ai-dos/records/evidence.json',
  '.ai-dos/records/manual-actions.json',
  '.ai-dos/records/project.state.json',
  '.ai-dos/records/tasks.json',
  'core/conformance.js',
];

for (const path of required) assert.ok(exists(path), `Required Workspace path missing: ${path}`);

const retired = [
  'EduAI_Docs/docs/tasks',
  'EduAI_Docs/AI',
  'EduAI_Docs/Prompt',
  'EduAI_Docs/demo',
];
for (const path of retired) {
  const trackedContentRemains = exists(path) &&
    readdirSync(resolve(root, path), { recursive: true, withFileTypes: true })
      .some((entry) => entry.isFile());
  assert.ok(!trackedContentRemains, `Retired legacy entry was reintroduced: ${path}`);
}

const manifest = JSON.parse(read('.ai-dos/manifest.json'));
for (const entry of manifest.entries) {
  if (entry.required) assert.ok(exists(entry.path), `AI-DOS required manifest input missing: ${entry.path}`);
}

const state = read('state/PROJECT-STATE.md');
const rules = read('docs/engineering/CODEX-WORKING-RULES.md');
const agents = read('AGENTS.md');
for (const marker of [
  'ONE_PROMPT_PER_MAJOR_PHASE=YES',
  'AUTO_SUBPHASE_CHAINING=AUTHORIZED_AFTER_OWNER_START',
  'MAJOR_PHASE_BOUNDARY_HUMAN_STOP=REQUIRED',
  'PAYW_NEXT_MAJOR_PHASE_AUTHORIZED=NO',
  'PAYW_PRODUCTION_PAYMENT_ACTIVATION_AUTHORIZED=NO',
]) assert.ok(state.includes(marker), `Missing state boundary: ${marker}`);

assert.match(agents, /One owner prompt starts one major phase/);
assert.match(rules, /One owner prompt is enough/);
assert.match(read('README.md'), /PHASE-AUTOPILOT\.md/);
assert.ok(readdirSync(resolve(root, 'phases')).some((name) => name.startsWith('ADM-00-')));

console.log('WORKSPACE_LAYOUT=PASS; canonical financial records and one-prompt phase controls preserved');
