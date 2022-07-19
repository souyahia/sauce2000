import path from 'path';
import nconf from 'nconf';

export enum ConfigKey {
  TELEGRAM_SECRET = 'TelegramSecret',
  TELEGRAM_USERNAME = 'TelegramUsername',
  SAUCE_NAO_SECRET = 'SauceNAOSecret',
  LOGGER_LEVEL = 'LoggerLevel',
}

const defaults: { [key in ConfigKey]?: string } = {
  [ConfigKey.LOGGER_LEVEL]: 'info',
};

class AppConfig {
  private config = nconf.env('__')
    .file({ file: path.join(__dirname, '../app-config.json') })
    .defaults(defaults);

  get(key: ConfigKey): string | undefined {
    return this.config.get(key) as (string | undefined);
  }

  getOrThrow(key: ConfigKey): string {
    const value = this.config.get(key) as (string | undefined);
    if (!value) {
      throw new Error(`Missing required config param "${key}"`);
    }
    return value;
  }
}
export const Config = new AppConfig();
