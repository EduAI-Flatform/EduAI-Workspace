import { isAbsolute } from 'node:path';

const FRAMEWORK_ROOTS = new Set([
  'core', 'docs', 'test', '01-goal', '02-rules', '03-development',
  '04-quality', '09-prompts',
]);
const PROJECT_ROOTS = new Set([
  '.ai-dos', '00-project', '05-operations', '06-roadmap', '07-tasks',
  '08-qa', '10-state',
]);
const FRAMEWORK_FILES = new Set(['readme.md', 'package.json']);

function normalizedRelativePath(path) {
  if (typeof path !== 'string' || path.length === 0 || isAbsolute(path)) return undefined;
  const normalized = path.replaceAll('\\', '/').replace(/^\.\//, '');
  if (normalized.split('/').includes('..')) return undefined;
  return normalized;
}

export function classifyOwnedPath(path) {
  const normalized = normalizedRelativePath(path);
  if (!normalized) return 'unknown';
  const lower = normalized.toLowerCase();
  if (lower === '.ai-dos/generated' || lower.startsWith('.ai-dos/generated/')) {
    return 'generated';
  }
  if (FRAMEWORK_FILES.has(lower)) return 'framework';

  const root = lower.split('/')[0];
  if (FRAMEWORK_ROOTS.has(root)) return 'framework';
  if (PROJECT_ROOTS.has(root)) return 'project';
  return 'unknown';
}

export function isProjectWritablePath(path) {
  return classifyOwnedPath(path) === 'project';
}

export const OWNERSHIP_RULES = Object.freeze({
  frameworkRoots: Object.freeze([...FRAMEWORK_ROOTS].sort()),
  projectRoots: Object.freeze([...PROJECT_ROOTS].sort()),
  generatedRoot: '.ai-dos/generated',
  sourceOfTruth: Object.freeze({
    projectFacts: '.ai-dos/records',
    lifecycle: '.ai-dos/records/project.state.json',
    capabilityInventory: '.ai-dos/runtime/capabilities.json',
    numberedMarkdown: 'project_overlay',
  }),
});
