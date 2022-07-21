import TelegramBot, { Message, PhotoSize } from 'node-telegram-bot-api';
import { Logger } from './logger';
import {
  getBadMentionResponse,
  getHelpCommandResponse, getRemainingCommandResponse,
  getSauceNotFoundResponse,
  getSauceResultsIntro, getTooManyRequestsResponse,
} from './responses';
import { SauceNAO2000 } from './sauceNAO';

enum Command {
  HELP = '/help',
  REMAINING = '/remaining',
}

export class Sauce2000TelegramBot {
  private readonly telegram: TelegramBot;
  private startingTime: number;

  constructor(
    private readonly telegramSecret: string,
    private readonly telegramUsername: string,
    private readonly sauce: SauceNAO2000,
  ) {
    this.telegram = new TelegramBot(this.telegramSecret, { polling: true });
    Logger.info(`Sauce2000 bot created with username @${this.telegramUsername}`);
  }

  start(): void {
    Logger.info('Starting the Telegram Bot...');
    this.startingTime = Date.now() / 1000;
    this.telegram.on('message', (message) => this.onMessage(message));
  }

  private onMessage(message: Message): void {
    if (this.isNewMessage(message) && !this.handleCommands(message)) {
      if (message.chat.type === 'private') {
        this.onPrivateMessage(message);
      } else if (message.chat.type === 'group' || message.chat.type === 'supergroup') {
        this.onGroupMessage(message);
      }
    }
  }

  private handleCommands(message: Message): boolean {
    if (!message.text) {
      return false;
    }
    if (message.text.startsWith(Command.HELP)) {
      this.onHelpCommand(message);
      return true;
    }
    if (message.text.startsWith(Command.REMAINING)) {
      this.onRemainingCommand(message);
      return true;
    }
    return false;
  }

  private onPrivateMessage(message: Message): void {
    if (message.text && message.text.startsWith(Command.HELP)) {
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

  private onRemainingCommand(message: Message): void {
    Logger.debug(`Remaining command received : message #${message.message_id} in chat #${message.chat.id}.`);
    this.replyToMessage(message, getRemainingCommandResponse(this.sauce.getTicketsRemaining()));
  }

  private onBadMention(message: Message): void {
    Logger.debug(`Bad mention received : message #${message.message_id} in chat #${message.chat.id}.`);
    this.replyToMessage(message, getBadMentionResponse());
  }

  private onSauceNeeded(messageWithPhoto: Message, replyTo: Message): void {
    Logger.debug(`Sauce asked in message #${replyTo.message_id} for photos #${messageWithPhoto.message_id} in chat #${replyTo.chat.id}.`);
    const photo = this.choosePhotoForSauce(messageWithPhoto);
    if (!this.sauce.isUp()) {
      Logger.debug('Sauce is not up (too many requests).');
      return this.replyToMessage(replyTo, getTooManyRequestsResponse());
    }
    if (this.sauce.getTicketsRemaining() === 0) {
      Logger.debug('No Sauce Tickets remaining.');
      return this.replyToMessage(replyTo, getRemainingCommandResponse(0));
    }
    this.getPhotoUrl(photo)
      .then((photoUrl) => this.sauce.find(photoUrl))
      .then((results) => {
        Logger.debug(`Results found for message #${messageWithPhoto.message_id} :`, results);
        let response = results.length === 0 ? getSauceNotFoundResponse() : getSauceResultsIntro(results.length);
        if (results.length > 0) {
          results.map((result) => this.sauce.format(result)).forEach((formatted) => {
            response = `${response}\n\n${formatted}`;
          });
        }
        Logger.debug(`Sending the following sauce to message #${replyTo.message_id} :`, response);
        return this.replyToMessage(replyTo, response);
      }).catch((err) => Logger.error(err));
  }

  private choosePhotoForSauce(messageWithPhoto: Message): PhotoSize {
    if (!messageWithPhoto.photo) {
      throw new Error(`Expected photos in message #${messageWithPhoto.message_id}.`);
    }
    return messageWithPhoto.photo.reduce((maxResPhoto, current) => {
      if (current.width > maxResPhoto.width && current.height > maxResPhoto.height) {
        return current;
      }
      return maxResPhoto;
    });
  }

  private getPhotoUrl(photo: PhotoSize): Promise<string> {
    return this.telegram.getFile(photo.file_id)
      .then((file) => `https://api.telegram.org/file/bot${this.telegramSecret}/${file.file_path}`);
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

