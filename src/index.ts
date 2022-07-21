process.env.NTBA_FIX_319 = '1';

import { Config, ConfigKey } from './config';
import { Logger } from './logger';
import { SauceNAO2000 } from './sauceNAO';
import { Sauce2000TelegramBot } from './telegram';

const sauceNAO = new SauceNAO2000(
  Config.get(ConfigKey.SAUCE_NAO_API_KEY),
  Config.getNumber(ConfigKey.MAX_SAUCE_RESULTS),
  Config.getNumber(ConfigKey.SAUCE_TICKETS_WARNING_THRESHOLD),
);

const bot = new Sauce2000TelegramBot(
  Config.get(ConfigKey.TELEGRAM_SECRET),
  Config.get(ConfigKey.TELEGRAM_USERNAME),
  sauceNAO,
);

try {
  bot.start();
} catch (err) {
  Logger.error(err);
}
