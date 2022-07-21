import path from 'path';
import nconf from 'nconf';

export enum ConfigKey {
  TELEGRAM_SECRET = 'TelegramSecret',
  TELEGRAM_USERNAME = 'TelegramUsername',
  SAUCE_NAO_API_KEY = 'SauceNAOApiKey',
  LOGGER_LEVEL = 'LoggerLevel',
  MAX_SAUCE_RESULTS = 'MaxSauceResults',
  SAUCE_TICKETS_WARNING_THRESHOLD = 'SauceTicketsWarningThreshold',
}

const defaults: { [key in ConfigKey]?: string } = {
  [ConfigKey.LOGGER_LEVEL]: 'info',
  [ConfigKey.MAX_SAUCE_RESULTS]: '3',
  [ConfigKey.SAUCE_TICKETS_WARNING_THRESHOLD]: '5',
};

class AppConfig {
  private config = nconf.env('__')
    .file({ file: path.join(__dirname, '../app-config.json') })
    .defaults(defaults);

  get(key: ConfigKey): string {
    const value = this.config.get(key) as (string | undefined);
    if (!value) {
      throw new Error(`Missing required config param "${key}"`);
    }
    return value;
  }

  getNumber(key: ConfigKey): number {
    const value = this.config.get(key) as (string | undefined);
    if (!value) {
      throw new Error(`Missing required config param "${key}"`);
    }
    if (parseInt(value, 10).toString() !== value) {
      throw new Error(`Expected param "${key}" to be an integer but instead found "${value}"`);
    }
    return Number(value);
  }
}
export const Config = new AppConfig();
