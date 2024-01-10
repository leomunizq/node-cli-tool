import createLogger from '../logger.js'
const logger = createLogger('commands:start');
const start = (config) => {
  logger.highlight('  Starting the app  ');
  logger.debug('Received configuration', config);
}

export default start;