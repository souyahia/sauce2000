import TelegramBot, { Message } from 'node-telegram-bot-api';
import { Logger } from './logger';
import { getBadMentionResponse, getHelpCommandResponse } from './responses';

const HELP_CMD = '/help';

export interface Sauce2000TelegramBotOptions {
  telegramSecret: string,
  telegramUsername: string,
}

export class Sauce2000TelegramBot {
  private readonly telegram: TelegramBot;
  private readonly telegramUsername: string;
  private startingTime: number;

  constructor(options: Sauce2000TelegramBotOptions) {
    Logger.info(options.telegramSecret);
    this.telegram = new TelegramBot(options.telegramSecret, { polling: true });
    this.telegramUsername = options.telegramUsername;
  }

  start(): void {
    Logger.info('Starting the Telegram Bot...');
    this.startingTime = Date.now() / 1000;
    this.telegram.on('message', (message) => this.onMessage(message));
  }

  private onMessage(message: Message): void {
    if (this.isNewMessage(message)) {
      if (message.chat.type === 'private') {
        this.onPrivateMessage(message);
      } else if (message.chat.type === 'group' || message.chat.type === 'supergroup') {
        this.onGroupMessage(message);
      }
    }
  }

  private onPrivateMessage(message: Message): void {
    if (message.text && message.text.startsWith(HELP_CMD)) {
      this.onHelpCommand(message);
    } else if (this.messageContainsPhoto(message)) {
      this.onSauceNeeded(message, message);
    }
  }

  private onGroupMessage(message: Message): void {
    if (this.messageContainsMention(message)) {
      if (message.reply_to_message && this.messageContainsPhoto(message.reply_to_message)) {
        this.onSauceNeeded(message.reply_to_message, message);
      } else {
        this.onBadMention(message);
      }
    }
  }

  private onHelpCommand(message: Message): void {
    Logger.debug(`Help command received : message #${message.message_id} in chat #${message.chat.id}.`);
    this.replyToMessage(message, getHelpCommandResponse());
  }

  private onBadMention(message: Message): void {
    Logger.debug(`Bad mention received : message #${message.message_id} in chat #${message.chat.id}.`);
    this.replyToMessage(message, getBadMentionResponse());
  }

  private onSauceNeeded(messageWithPhoto: Message, replyTo: Message): void {
    Logger.debug(`Sauce asked in message #${replyTo.message_id} for photos #${messageWithPhoto.message_id} in chat #${replyTo.chat.id}.`);
    this.replyToMessage(replyTo, 'TODO : Implement the sauce finding.');
  }

  private replyToMessage(replyTo: Message, markdownText: string): void {
    this.telegram.sendMessage(
      replyTo.chat.id,
      markdownText,
      {
        reply_to_message_id: replyTo.message_id,
        disable_web_page_preview: true,
        parse_mode: 'Markdown',
      },
    ).then(() => Logger.debug(`Reply sent to message #${replyTo.message_id} in chat #${replyTo.chat.id}.`))
      .catch((err) => Logger.error(err));
  }

  private isNewMessage(message: Message): boolean {
    return message.date && message.date >= this.startingTime;
  }

  private messageContainsPhoto(message: Message): boolean {
    return message.photo && message.photo.length > 0;
  }

  private messageContainsMention(message: Message): boolean {
    return message.text && message.text.includes(`@${this.telegramUsername}`);
  }
}

