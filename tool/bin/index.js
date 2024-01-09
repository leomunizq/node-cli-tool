#!/usr/bin/env node
import arg from 'arg'
import chalk from 'chalk'
import { readPackageUp } from 'read-package-up'

async function main() {
  const result = await readPackageUp({ cwd: 'package.json' })
  return result
}

try {
  const args = arg({
    '--start': Boolean,
    '--build': Boolean
  });

  if (args['--start']) {
    // Agora esperamos que a promessa seja resolvida antes de continuar.
    const pkgPath = await main();

    if (!pkgPath) {
      throw new Error('Could not find package.json');
    }

    // Atribua packageJson a pkg para acessar seus campos.
    const pkg = pkgPath.packageJson;

    if (pkg.tool) {
      console.log('Found configuration', pkg.tool);
      // TODO: do something with configuration
    } else {
      console.log(chalk.yellow('Could not find configuration, using default'));
      // TODO: get default configuration
    }

    console.log(chalk.bgMagentaBright(`Starting ${pkg.name} v${pkg.version}`));
    console.log(chalk.bgCyanBright('starting the app'));
  }
} catch (e) {
  console.log(chalk.yellow(e.message));
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStarts the app
  ${chalk.greenBright('--build')}\tBuilds the app`);
}
