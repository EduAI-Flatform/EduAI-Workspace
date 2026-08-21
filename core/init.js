import { bootstrapProject } from './bootstrap/index.js';

function option(args, name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function usage() {
  console.error('Usage: node core/init.js --root <project> --name <name> --id <id> --target-version <version> [--execution-profile <profile>]');
}

const args = process.argv.slice(2);
const root = option(args, '--root');
const name = option(args, '--name');
const id = option(args, '--id');
const targetVersion = option(args, '--target-version');

if (!root || !name || !id || !targetVersion) {
  usage();
  process.exitCode = 2;
} else {
  const result = bootstrapProject({
    root,
    name,
    id,
    targetVersion,
    repositoryType: option(args, '--repository-type') ?? 'SINGLE_REPO',
    primaryBranch: option(args, '--primary-branch') ?? 'main',
    executionProfile: option(args, '--execution-profile') ?? 'deployment_optional',
  });
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.ok ? 0 : 1;
}
