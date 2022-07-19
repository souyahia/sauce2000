process.env.NTBA_FIX_319 = '1';

import { Config, ConfigKey } from './config';
import { Logger } from './logger';
import { Sauce2000TelegramBot } from './telegram';

const bot = new Sauce2000TelegramBot({
  telegramSecret: Config.get(ConfigKey.TELEGRAM_SECRET),
  telegramUsername: Config.get(ConfigKey.TELEGRAM_USERNAME),
});

try {
  bot.start();
} catch (err) {
  Logger.error(err);
}
