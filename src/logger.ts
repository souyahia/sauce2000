import bunyan, { LogLevelString } from 'bunyan';
import { Config, ConfigKey } from './config';

const level = Config.get(ConfigKey.LOGGER_LEVEL) as LogLevelString;

if (!['trace', 'debug', 'info', 'warn', 'error', 'fatal'].includes(level)) {
  throw new Error(`Unknown logger level "${level}"`);
}

export const Logger = bunyan.createLogger({ name: 'sauce-2000-logger', level });
