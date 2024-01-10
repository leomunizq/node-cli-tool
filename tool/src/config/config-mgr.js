import chalk from 'chalk'
import { cosmiconfigSync } from 'cosmiconfig'

import { readPackageUp } from 'read-package-up'
import schema from './schema.json' assert { type: 'json' };
import betterAjvErrors from 'better-ajv-errors'
import Ajv from 'ajv'



export async function getPkgFile() {
  const result = await readPackageUp({ cwd: 'package.json' })
  return result
}

export const getConfig = async () => {
  const ajv = new Ajv({ jsonPointers: true });
  const configLoader = cosmiconfigSync('tool');
  const result = configLoader.search()

  const pkgPath = await getPkgFile()
  const pkg = pkgPath.packageJson
  if (!pkgPath) {
    throw new Error('Could not find package.json')
  }

  if (pkg.name) {
    console.log(chalk.bgMagentaBright(`Starting ${pkg.name} v${pkg.version}`))
  }

  if (result) {
    const isValid = ajv.validate(schema, result.config);
    if (!isValid) {
      console.log(chalk.bgRedBright('Invalid configuration'))
      // console.log()
      console.log(betterAjvErrors(schema, result.config, ajv.errors));
      process.exit(1);
    }
    console.log('Found configuration', result.config)
    return result.config
  }
  if (!result) {
    console.log(chalk.yellow('Could not find configuration, using default'))
    return { port: 1234 }
  }
}

export default getConfig
