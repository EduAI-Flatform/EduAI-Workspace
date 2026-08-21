import { selectAgentProfile } from '../agents/index.js';
import { validateRecords } from '../validation/index.js';

const PRIORITY_RANK = Object.freeze({ CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 });
const MANUAL_PENDING = new Set(['WAITING_USER']);
const MANUAL_RETEST = new Set(['USER_COMPLETED', 'RETEST_REQUIRED']);

function diagnostic(code, path, details = {}, severity = 'error') {
  return { code, path, severity, ...details };
}

function taskOrder(tasksById, left, right) {
  const leftTask = tasksById.get(left.taskId);
  const rightTask = tasksById.get(right.taskId);
  return PRIORITY_RANK[leftTask?.priority] - PRIORITY_RANK[rightTask?.priority]
    || left.taskId.localeCompare(right.taskId);
}

function runnableReason(status, hasRetest) {
  if (hasRetest) return 'MANUAL_ACTION_RETEST';
  if (status === 'BLOCKED_DEPENDENCY') return 'DEPENDENCY_RECHECK';
  if (status === 'FAILED') return 'RETRY_FAILED';
  if (status === 'TODO') return 'DEPENDENCIES_SATISFIED';
  return 'RESUME_ACTIVE';
}

export function selectRunnableTasks(records) {
  const validation = validateRecords(records);
  const diagnostics = validation.diagnostics.map((entry) => ({
    ...entry,
    severity: 'error',
  }));
  const tasks = records.filter((record) => record?.kind === 'task');
  const states = records.filter((record) => record?.kind === 'project.state');
  const actions = records.filter((record) => record?.kind === 'manual_action');
  const state = states[0];

  if (states.length === 0) diagnostics.push(diagnostic('MISSING_PROJECT_STATE', '$.records'));
  if (states.length > 1) diagnostics.push(diagnostic('DUPLICATE_PROJECT_STATE', '$.records'));

  const statuses = state?.taskStatuses ?? {};
  const tasksById = new Map(tasks.map((task) => [task.id, task]));
  const runnable = [];
  const blocked = [];
  const revisit = [];
  const skipped = [];

  for (const task of tasks) {
    const status = statuses[task.id];
    if (status === 'DONE') {
      skipped.push({ taskId: task.id, reason: 'DONE' });
      continue;
    }

    const unknownDependencyIds = (task.dependencies ?? [])
      .filter((dependencyId) => !tasksById.has(dependencyId))
      .sort();
    for (const dependencyId of unknownDependencyIds) {
      diagnostics.push(diagnostic('UNKNOWN_TASK_DEPENDENCY', `$.tasks.${task.id}.dependencies`, {
        taskId: task.id,
        dependencyId,
      }));
    }
    const dependencyIds = (task.dependencies ?? [])
      .filter((dependencyId) => statuses[dependencyId] !== 'DONE')
      .sort();
    const taskActions = actions
      .filter((action) => action.blocks?.includes(task.id))
      .sort((left, right) => left.id.localeCompare(right.id));
    const pendingActionIds = taskActions
      .filter((action) => MANUAL_PENDING.has(action.status))
      .map(({ id }) => id);
    const retestActionIds = taskActions
      .filter((action) => MANUAL_RETEST.has(action.status))
      .map(({ id }) => id);

    if (dependencyIds.length > 0) {
      blocked.push({
        taskId: task.id,
        status,
        reason: 'DEPENDENCIES_INCOMPLETE',
        dependencyIds,
        manualActionIds: pendingActionIds,
      });
      continue;
    }
    if (pendingActionIds.length > 0) {
      blocked.push({
        taskId: task.id,
        status,
        reason: 'MANUAL_ACTION_PENDING',
        dependencyIds: [],
        manualActionIds: pendingActionIds,
      });
      continue;
    }

    if (status === 'WAITING_MANUAL' && taskActions.length === 0) {
      diagnostics.push(diagnostic(
        'UNDOCUMENTED_MANUAL_BLOCK',
        `$.tasks.${task.id}`,
        { taskId: task.id },
        'warning',
      ));
    }
    if (retestActionIds.length > 0) {
      revisit.push({ taskId: task.id, manualActionIds: retestActionIds });
    }

    let agentProfileId;
    try {
      agentProfileId = selectAgentProfile(task).id;
    } catch (error) {
      diagnostics.push(diagnostic('UNKNOWN_AGENT_PROFILE', `$.tasks.${task.id}.extensions`, {
        taskId: task.id,
        message: error.message,
      }));
    }
    runnable.push({
      taskId: task.id,
      status,
      reason: runnableReason(status, retestActionIds.length > 0),
      agentProfileId,
    });
  }

  runnable.sort((left, right) => taskOrder(tasksById, left, right));
  blocked.sort((left, right) => taskOrder(tasksById, left, right));
  revisit.sort((left, right) => left.taskId.localeCompare(right.taskId));
  skipped.sort((left, right) => left.taskId.localeCompare(right.taskId));

  return {
    ok: diagnostics.every(({ severity }) => severity === 'warning'),
    runnable,
    blocked,
    revisit,
    skipped,
    diagnostics,
  };
}
