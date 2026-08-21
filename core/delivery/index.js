const MANUAL_CODES = new Set([
  'ADAPTER_UNAVAILABLE',
  'ADAPTER_TRUST_REQUIRED',
  'ADAPTER_PERMISSION_REQUIRED',
]);

function event(stage, status, details = {}) {
  return { stage, status, ...details };
}

function finalResult(ok, status, fixAttempts, events, manualActions, details = {}) {
  return { ok, status, fixAttempts, events, manualActions, ...details };
}

function isValidInput(task, registry, handlers, maxFixAttempts) {
  return task && typeof task.id === 'string'
    && task.applicability && typeof task.applicability === 'object'
    && registry && typeof registry.invoke === 'function' && Array.isArray(registry.manifests)
    && handlers && typeof handlers === 'object'
    && Number.isInteger(maxFixAttempts) && maxFixAttempts >= 0;
}

const EVIDENCE_KIND_BY_STAGE = Object.freeze({
  VALIDATE: 'TEST',
  DETECT_DEPLOYMENT: 'DEPLOY',
  MONITOR_DEPLOYMENT: 'DEPLOY',
  VERIFY_PRODUCTION: 'PRODUCTION',
});
const EVIDENCE_STATUS = Object.freeze({
  PASS: 'PASS',
  FAIL: 'FAIL',
  NOT_APPLICABLE: 'NOT_APPLICABLE',
  OPTIONAL_UNAVAILABLE: 'SKIPPED',
});

export function createDeliveryEvidence({ id, taskId, delivery, now }) {
  const sourceEvents = delivery?.events?.length > 0
    ? delivery.events
    : [{ stage: 'DELIVERY', status: 'FAIL' }];
  return {
    kind: 'evidence',
    schemaVersion: '1.0',
    id,
    taskId,
    checks: sourceEvents.map(({ stage, status }) => ({
      kind: EVIDENCE_KIND_BY_STAGE[stage] ?? 'OTHER',
      name: stage.toLowerCase(),
      status: EVIDENCE_STATUS[status] ?? 'FAIL',
    })),
    result: delivery?.ok
      ? 'PASS'
      : delivery?.status === 'WAITING_MANUAL' ? 'BLOCKED' : 'FAIL',
    recordedAt: now,
  };
}

async function runHandler(handlers, name, context) {
  if (typeof handlers[name] !== 'function') {
    return { ok: false, code: 'DELIVERY_HANDLER_MISSING' };
  }
  try {
    const result = await handlers[name](structuredClone(context));
    if (!result || typeof result !== 'object' || typeof result.ok !== 'boolean') {
      return { ok: false, code: 'DELIVERY_HANDLER_RESULT_INVALID' };
    }
    return result.ok
      ? { ok: true }
      : { ok: false, code: result.code ?? 'DELIVERY_HANDLER_FAILED' };
  } catch {
    return { ok: false, code: 'DELIVERY_HANDLER_FAILURE' };
  }
}

function hasAdapter(registry, capability, operation) {
  return registry.manifests.some((manifest) => (
    manifest.capability === capability && manifest.operations.includes(operation)
  ));
}

function addManualAction(manualActions, action) {
  if (!action) return;
  const key = `${action.capability}:${action.operation}`;
  if (!manualActions.some((existing) => (
    `${existing.capability}:${existing.operation}` === key
  ))) {
    manualActions.push(action);
  }
}

async function runAdapterStage({
  registry,
  events,
  manualActions,
  stage,
  capability,
  operation,
  applicability = 'REQUIRED',
  context,
}) {
  if (applicability === 'NOT_APPLICABLE') {
    events.push(event(stage, 'NOT_APPLICABLE'));
    return { ok: true, skipped: true };
  }
  if (applicability === 'OPTIONAL' && !hasAdapter(registry, capability, operation)) {
    events.push(event(stage, 'OPTIONAL_UNAVAILABLE'));
    return { ok: true, skipped: true };
  }

  const result = await registry.invoke(capability, operation, context);
  if (result.ok) {
    events.push(event(stage, 'PASS', { adapterId: result.adapterId }));
    return { ok: true };
  }

  const manual = MANUAL_CODES.has(result.code);
  if (applicability === 'OPTIONAL' && manual) {
    addManualAction(manualActions, result.manualAction);
    events.push(event(stage, 'OPTIONAL_UNAVAILABLE', { code: result.code }));
    return { ok: true, skipped: true };
  }

  addManualAction(manualActions, result.manualAction);
  events.push(event(stage, 'FAIL', { code: result.code, adapterId: result.adapterId }));
  return { ok: false, manual, code: result.code };
}

export async function runDeliveryLoop({
  task,
  registry,
  handlers,
  maxFixAttempts = 2,
}) {
  const events = [];
  const manualActions = [];
  let fixAttempts = 0;

  if (!isValidInput(task, registry, handlers, maxFixAttempts)) {
    return finalResult(false, 'FAILED', fixAttempts, events, manualActions, {
      code: 'DELIVERY_INPUT_INVALID',
    });
  }

  const implementation = await runHandler(handlers, 'implement', {
    taskId: task.id,
    title: task.title,
  });
  events.push(event('IMPLEMENT', implementation.ok ? 'PASS' : 'FAIL', {
    ...(!implementation.ok ? { code: implementation.code } : {}),
  }));
  if (!implementation.ok) {
    return finalResult(false, 'FAILED', fixAttempts, events, manualActions, {
      code: implementation.code,
    });
  }

  while (true) {
    const attempt = fixAttempts + 1;
    const validation = await runHandler(handlers, 'validate', { taskId: task.id, attempt });
    events.push(event('VALIDATE', validation.ok ? 'PASS' : 'FAIL', {
      attempt,
      ...(!validation.ok ? { code: validation.code } : {}),
    }));
    if (!validation.ok) {
      return finalResult(false, 'FAILED', fixAttempts, events, manualActions, {
        code: validation.code,
      });
    }

    const commit = await runAdapterStage({
      registry,
      events,
      manualActions,
      stage: 'COMMIT',
      capability: 'git_provider',
      operation: 'commit',
      context: {
        taskId: task.id,
        attempt,
        message: `${task.id}: ${task.title ?? 'verified change'}`,
      },
    });
    if (!commit.ok) {
      return finalResult(false, commit.manual ? 'WAITING_MANUAL' : 'FAILED', fixAttempts, events, manualActions, {
        code: commit.code,
      });
    }

    const push = await runAdapterStage({
      registry,
      events,
      manualActions,
      stage: 'PUSH',
      capability: 'git_provider',
      operation: 'push',
      context: { taskId: task.id, attempt },
    });
    if (!push.ok) {
      return finalResult(false, push.manual ? 'WAITING_MANUAL' : 'FAILED', fixAttempts, events, manualActions, {
        code: push.code,
      });
    }

    const deploymentApplicability = task.applicability.deployment ?? 'NOT_APPLICABLE';
    const detect = await runAdapterStage({
      registry,
      events,
      manualActions,
      stage: 'DETECT_DEPLOYMENT',
      capability: 'deployment',
      operation: 'detect',
      applicability: deploymentApplicability,
      context: { taskId: task.id, attempt },
    });
    if (!detect.ok) {
      return finalResult(false, detect.manual ? 'WAITING_MANUAL' : 'FAILED', fixAttempts, events, manualActions, {
        code: detect.code,
      });
    }

    const monitor = await runAdapterStage({
      registry,
      events,
      manualActions,
      stage: 'MONITOR_DEPLOYMENT',
      capability: 'deployment',
      operation: 'monitor',
      applicability: deploymentApplicability,
      context: { taskId: task.id, attempt },
    });
    if (!monitor.ok) {
      return finalResult(false, monitor.manual ? 'WAITING_MANUAL' : 'FAILED', fixAttempts, events, manualActions, {
        code: monitor.code,
      });
    }

    const productionApplicability = task.applicability.productionVerification
      ?? 'NOT_APPLICABLE';
    const verification = await runAdapterStage({
      registry,
      events,
      manualActions,
      stage: 'VERIFY_PRODUCTION',
      capability: 'browser_e2e',
      operation: 'verify_production',
      applicability: productionApplicability,
      context: { taskId: task.id, attempt },
    });
    if (verification.ok) {
      events.push(event('COMPLETE', 'PASS', { attempt }));
      return finalResult(true, 'DONE', fixAttempts, events, manualActions);
    }
    if (verification.manual) {
      return finalResult(false, 'WAITING_MANUAL', fixAttempts, events, manualActions, {
        code: verification.code,
      });
    }
    if (String(verification.code).startsWith('ADAPTER_')) {
      return finalResult(false, 'FAILED', fixAttempts, events, manualActions, {
        code: verification.code,
      });
    }

    if (hasAdapter(registry, 'monitoring', 'inspect_logs')) {
      await runAdapterStage({
        registry,
        events,
        manualActions,
        stage: 'INSPECT_FAILURE_LOGS',
        capability: 'monitoring',
        operation: 'inspect_logs',
        applicability: 'OPTIONAL',
        context: { taskId: task.id, attempt, failureCode: verification.code },
      });
    }

    if (fixAttempts >= maxFixAttempts) {
      return finalResult(false, 'FAILED', fixAttempts, events, manualActions, {
        code: 'PRODUCTION_FIX_LIMIT_REACHED',
      });
    }
    const fix = await runHandler(handlers, 'fix', {
      taskId: task.id,
      attempt: fixAttempts + 1,
      failureCode: verification.code,
    });
    events.push(event('FIX', fix.ok ? 'PASS' : 'FAIL', {
      attempt: fixAttempts + 1,
      ...(!fix.ok ? { code: fix.code } : {}),
    }));
    if (!fix.ok) {
      return finalResult(false, 'FAILED', fixAttempts, events, manualActions, {
        code: fix.code,
      });
    }
    fixAttempts += 1;
  }
}
