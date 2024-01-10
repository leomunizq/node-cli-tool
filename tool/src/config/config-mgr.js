import chalk from 'chalk'
import { cosmiconfigSync, cosmiconfig } from 'cosmiconfig'
// const pkgUp = require('pkg-up');

import { readPackageUp } from 'read-package-up'

export async function getPkgFile() {
  const result = await readPackageUp({ cwd: 'package.json' })
  return result
}

export const getConfig = async () => {
  const configLoader = cosmiconfigSync('tool')
  const result = configLoader.search()

  const pkgPath = await getPkgFile()
  const pkg = pkgPath.packageJson
  if (!pkgPath) {
    throw new Error('Could not find package.json')
  }

  if (pkg.name) {
    console.log(chalk.bgMagentaBright(`Starting ${pkg.name} v${pkg.version}`))
  }

  if (result ) {
    console.log('Found configuration', result.config)
    console.log(chalk.bgCyanBright('starting the app'))
    return result.config
  }
  if (!result ) {
    console.log(chalk.yellow('Could not find configuration, using default'))
    return { port: 1234 }
  }
}

export default getConfig
