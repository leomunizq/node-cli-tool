import chalk from 'chalk'

// const pkgUp = require('pkg-up');
import { readPackageUp } from 'read-package-up'

export async function getPkgFile() {
  const result = await readPackageUp({ cwd: 'package.json' })
  return result
}

export const getConfig = async () => {
  const pkgPath = await getPkgFile()
  const pkg = pkgPath.packageJson
  if (!pkgPath) {
    throw new Error('Could not find package.json')
  }

  if (pkg.tool) {
    console.log('Found configuration', pkg.tool)
    console.log(chalk.bgMagentaBright(`Starting ${pkg.name} v${pkg.version}`))
    console.log(chalk.bgCyanBright('starting the app'))
    return pkg.tool
  } else {
    console.log(chalk.yellow('Could not find configuration, using default'))
    return { port: 1234 }
  }
}

export default getConfig
