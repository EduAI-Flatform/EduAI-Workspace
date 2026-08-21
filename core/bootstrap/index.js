import {
  existsSync,
  mkdirSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';

import { createCapabilityInventory } from '../capabilities/index.js';
import { COMPATIBILITY_MATRIX } from '../contracts/index.js';
import { conformProject } from '../conformance/index.js';
import { isProjectWritablePath } from '../ownership/index.js';
import { createProjectState } from '../state/index.js';
import { validateRecord, validateRecords } from '../validation/index.js';

const EXECUTION_CAPABILITIES = Object.freeze({
  production_required: Object.freeze({
    deployment: 'REQUIRED',
    productionVerification: 'REQUIRED',
  }),
  deployment_optional: Object.freeze({
    deployment: 'OPTIONAL',
    productionVerification: 'OPTIONAL',
  }),
  not_applicable: Object.freeze({
    deployment: 'NOT_APPLICABLE',
    productionVerification: 'NOT_APPLICABLE',
  }),
});
const ID_PATTERN = /^[A-Z][A-Z0-9:_-]{2,63}$/;
const VERSION_PATTERN = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?$/;
const REPOSITORY_TYPES = new Set(['SINGLE_REPO', 'MONOREPO', 'MULTI_REPO']);

function json(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function projectKey(id) {
  return id.replace(/^PROJECT:/, '').replace(/[^A-Z0-9_-]+/gi, '_');
}

function diagnostic(code, path, details = {}) {
  return { code, path, ...details };
}

function validateOptions(options) {
  const diagnostics = [];
  if (typeof options.root !== 'string' || options.root.length === 0) {
    diagnostics.push(diagnostic('BOOTSTRAP_INPUT', 'root', { message: 'Project root is required.' }));
  }
  if (typeof options.name !== 'string' || options.name.trim().length === 0
    || options.name.length > 200 || /[\r\n]/.test(options.name)) {
    diagnostics.push(diagnostic('BOOTSTRAP_INPUT', 'name', { message: 'Project name must be one line.' }));
  }
  if (typeof options.id !== 'string' || !ID_PATTERN.test(options.id)) {
    diagnostics.push(diagnostic('BOOTSTRAP_INPUT', 'id', { value: options.id }));
  }
  if (typeof options.targetVersion !== 'string'
    || !VERSION_PATTERN.test(options.targetVersion)) {
    diagnostics.push(diagnostic('BOOTSTRAP_INPUT', 'targetVersion', {
      value: options.targetVersion,
    }));
  }
  if (!REPOSITORY_TYPES.has(options.repositoryType)) {
    diagnostics.push(diagnostic('BOOTSTRAP_INPUT', 'repositoryType', {
      value: options.repositoryType,
    }));
  }
  if (typeof options.primaryBranch !== 'string' || options.primaryBranch.length === 0
    || /[\r\n]/.test(options.primaryBranch)) {
    diagnostics.push(diagnostic('BOOTSTRAP_INPUT', 'primaryBranch', { message: 'Primary branch must be one line.' }));
  }
  if (!Object.hasOwn(EXECUTION_CAPABILITIES, options.executionProfile)) {
    diagnostics.push(diagnostic('BOOTSTRAP_INPUT', 'executionProfile', {
      value: options.executionProfile,
    }));
  }
  if (typeof options.now !== 'string' || Number.isNaN(Date.parse(options.now))
    || !options.now.includes('T')) {
    diagnostics.push(diagnostic('BOOTSTRAP_INPUT', 'now', { value: options.now }));
  }
  return diagnostics;
}

function createRecords(options) {
  const key = projectKey(options.id);
  const taskId = 'TASK:BOOTSTRAP_PLAN';
  const sprintId = 'SPRINT:01';
  const profile = {
    kind: 'project.profile',
    schemaVersion: '1.0',
    id: options.id,
    name: options.name.trim(),
    repositoryType: options.repositoryType,
    primaryBranch: options.primaryBranch,
    targetVersion: options.targetVersion,
    executionProfile: options.executionProfile,
    capabilities: EXECUTION_CAPABILITIES[options.executionProfile],
  };
  const roadmap = {
    kind: 'roadmap',
    schemaVersion: '1.0',
    id: `ROADMAP:${key}`,
    version: options.targetVersion,
    objective: `Define the verified delivery roadmap for ${profile.name}.`,
    scope: {
      inScope: ['Audit the project and replace the bootstrap planning skeleton.'],
      outOfScope: ['Modify reusable AI-DOS framework files with project facts.'],
    },
    sprintIds: [sprintId],
    releaseCriteria: ['Canonical roadmap and executable tasks pass conformance.'],
    status: 'ACTIVE',
  };
  const sprint = {
    kind: 'sprint',
    schemaVersion: '1.0',
    id: sprintId,
    name: 'Project bootstrap',
    goal: 'Replace the generated planning skeleton with audited project work.',
    entryCriteria: ['Project profile and canonical state are initialized.'],
    taskIds: [taskId],
    dependencies: [],
    exitCriteria: ['Project roadmap and tasks are specific, ordered and verifiable.'],
    status: 'PLANNED',
  };
  const task = {
    kind: 'task',
    schemaVersion: '1.0',
    id: taskId,
    title: 'Audit project and define roadmap',
    category: 'Planning',
    priority: 'HIGH',
    objective: 'Inspect the repository and replace generated skeletons with verified work.',
    dependencies: [],
    acceptanceCriteria: ['Roadmap and task records describe the actual project.'],
    verification: ['node core/conformance.js --manifest .ai-dos/manifest.json'],
    applicability: {
      tests: 'OPTIONAL',
      deployment: 'NOT_APPLICABLE',
      productionVerification: 'NOT_APPLICABLE',
    },
  };
  const state = createProjectState({
    projectId: profile.id,
    aiDosVersion: COMPATIBILITY_MATRIX.frameworkVersion,
    taskIds: [taskId],
    now: options.now,
  });
  const capabilityInventory = createCapabilityInventory({
    projectId: profile.id,
    entries: [],
    now: options.now,
  });
  return { profile, roadmap, sprint, task, state, capabilityInventory };
}

function createManifest(records) {
  const canonical = [
    ['project-profile', '.ai-dos/records/project.profile.json', 'project.profile'],
    ['roadmap', '.ai-dos/records/roadmap.json', 'roadmap'],
    ['sprint', '.ai-dos/records/sprint.json', 'sprint'],
    ['tasks', '.ai-dos/records/tasks.json', 'task'],
    ['manual-actions', '.ai-dos/records/manual-actions.json', 'manual_action'],
    ['project-state', '.ai-dos/records/project.state.json', 'project.state'],
    ['capability-inventory', '.ai-dos/runtime/capabilities.json', 'capability.inventory'],
  ].map(([id, path, recordKind]) => ({
    id,
    path,
    role: 'canonical_record',
    recordKind,
    required: true,
    rationale: `Canonical ${recordKind} source.`,
  }));
  const overlays = [
    ['project-info-overlay', '00-project/PROJECT_INFO.md'],
    ['manual-action-overlay', '05-operations/MANUAL_ACTION_QUEUE.md'],
    ['roadmap-overlay', '06-roadmap/ROADMAP.md'],
    ['sprint-overlay', '07-tasks/sprint-01/README.md'],
    ['task-overlay', '07-tasks/sprint-01/TASK-001.md'],
    ['task-status-overlay', '10-state/TASK_STATUS.md'],
  ].map(([id, path]) => ({
    id,
    path,
    role: 'handoff',
    required: true,
    rationale: 'Project-owned numbered Markdown compatibility overlay.',
  }));

  return {
    kind: 'read_order.manifest',
    schemaVersion: '1.0',
    id: `MANIFEST:${projectKey(records.profile.id)}`,
    outputDirectory: '.ai-dos/generated',
    entries: [...canonical, ...overlays],
  };
}

function createMarkdown(records) {
  const { profile, roadmap, sprint, task, state } = records;
  return {
    '00-project/PROJECT_INFO.md': [
      '# Project Information',
      '',
      'Project-owned compatibility overlay. Canonical source: `.ai-dos/records/project.profile.json`.',
      '',
      `- Project name: ${profile.name}`,
      `- Project ID: ${profile.id}`,
      `- Repository type: ${profile.repositoryType}`,
      `- Primary branch: ${profile.primaryBranch}`,
      `- Target version: ${profile.targetVersion}`,
      `- Execution profile: ${profile.executionProfile}`,
      '',
    ].join('\n'),
    '05-operations/MANUAL_ACTION_QUEUE.md': [
      '# Manual Action Queue',
      '',
      'Project-owned compatibility overlay. Canonical source: `.ai-dos/records/manual-actions.json`.',
      '',
      'No active manual actions.',
      '',
    ].join('\n'),
    '06-roadmap/ROADMAP.md': [
      '# Version Roadmap',
      '',
      'Project-owned compatibility overlay. Canonical source: `.ai-dos/records/roadmap.json`.',
      '',
      `- Version: ${roadmap.version}`,
      `- Objective: ${roadmap.objective}`,
      `- Sprint: ${sprint.id} — ${sprint.name}`,
      `- Release criterion: ${roadmap.releaseCriteria[0]}`,
      '',
    ].join('\n'),
    '07-tasks/sprint-01/README.md': [
      `# ${sprint.id} — ${sprint.name}`,
      '',
      `Goal: ${sprint.goal}`,
      '',
      `- ${task.id}: ${task.title} (TODO)`,
      '',
    ].join('\n'),
    '07-tasks/sprint-01/TASK-001.md': [
      `# ${task.id} — ${task.title}`,
      '',
      'Project-owned compatibility overlay. Canonical source: `.ai-dos/records/tasks.json`.',
      '',
      '- Status: `TODO`',
      `- Category: ${task.category}`,
      `- Priority: ${task.priority}`,
      '- Dependencies: None',
      '',
      '## Objective',
      '',
      task.objective,
      '',
      '## Acceptance Criteria',
      '',
      `- [ ] ${task.acceptanceCriteria[0]}`,
      '',
      '## Verification',
      '',
      `- ${task.verification[0]}`,
      '',
    ].join('\n'),
    '10-state/TASK_STATUS.md': [
      '# Task Status',
      '',
      'Compatibility view only. Canonical source: `.ai-dos/records/project.state.json`.',
      '',
      `- Project status: ${state.status}`,
      `- ${task.id}: ${state.taskStatuses[task.id]}`,
      '',
    ].join('\n'),
  };
}

function createFiles(options) {
  const records = createRecords(options);
  const manifest = createManifest(records);
  const markdown = createMarkdown(records);
  return {
    records,
    manifest,
    contents: new Map([
      ['.ai-dos/manifest.json', json(manifest)],
      ['.ai-dos/records/project.profile.json', json(records.profile)],
      ['.ai-dos/records/roadmap.json', json(records.roadmap)],
      ['.ai-dos/records/sprint.json', json(records.sprint)],
      ['.ai-dos/records/tasks.json', json([records.task])],
      ['.ai-dos/records/manual-actions.json', json([])],
      ['.ai-dos/records/project.state.json', json(records.state)],
      ['.ai-dos/runtime/capabilities.json', json(records.capabilityInventory)],
      ...Object.entries(markdown),
    ]),
  };
}

export function bootstrapProject({
  root,
  name,
  id,
  targetVersion,
  repositoryType = 'SINGLE_REPO',
  primaryBranch = 'main',
  executionProfile = 'deployment_optional',
  now = new Date().toISOString(),
}) {
  const options = {
    root,
    name,
    id,
    targetVersion,
    repositoryType,
    primaryBranch,
    executionProfile,
    now,
  };
  const inputDiagnostics = validateOptions(options);
  if (inputDiagnostics.length > 0) {
    return { ok: false, files: [], diagnostics: inputDiagnostics };
  }

  const generated = createFiles(options);
  const validation = validateRecords(Object.values(generated.records));
  const manifestValidation = validateRecord(generated.manifest);
  const diagnostics = [...validation.diagnostics, ...manifestValidation.diagnostics];
  for (const path of generated.contents.keys()) {
    if (!isProjectWritablePath(path)) {
      diagnostics.push(diagnostic('OWNERSHIP_VIOLATION', path));
    }
  }
  if (diagnostics.length > 0) return { ok: false, files: [], diagnostics };

  const projectRoot = resolve(root);
  const conflicts = [...generated.contents.keys()]
    .filter((path) => existsSync(resolve(projectRoot, path)))
    .map((path) => diagnostic('BOOTSTRAP_CONFLICT', path));
  if (conflicts.length > 0) return { ok: false, files: [], diagnostics: conflicts };

  const files = [];
  try {
    for (const [path, content] of generated.contents) {
      const target = resolve(projectRoot, path);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, content, { encoding: 'utf8', flag: 'wx' });
      files.push(target);
    }
  } catch (error) {
    for (const file of files.reverse()) unlinkSync(file);
    return {
      ok: false,
      files: [],
      diagnostics: [diagnostic('BOOTSTRAP_WRITE_ERROR', projectRoot, { message: error.message })],
    };
  }

  const conformance = conformProject({
    manifestPath: resolve(projectRoot, '.ai-dos/manifest.json'),
  });
  if (!conformance.ok) {
    for (const file of files.reverse()) unlinkSync(file);
    return {
      ok: false,
      files: [],
      diagnostics: conformance.diagnostics,
      summary: conformance.summary,
    };
  }
  return {
    ok: true,
    files,
    diagnostics: conformance.diagnostics,
    summary: conformance.summary,
  };
}
