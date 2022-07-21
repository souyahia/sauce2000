import { SauceNao } from 'saucenao.js';
import { ResponseHeader } from 'saucenao.js/dist/typing';
import { Logger } from './logger';

export interface SauceNAO2000Result {
  certainty: string,
  source?: string;
  title?: string;
  part?: string;
  engName?: string;
  jpName?: string;
  artist?: string;
  author?: string;
  authorName?: string;
  characters?: string;
}

export class SauceNAO2000 {
  private sauce: SauceNao;
  private ticketsRemaining: number | null = null;
  private nextShortUptime: number | null = null;
  private nextLongUptime: number | null = null;

  constructor(apiKey: string, private maxResults: number, private ticketsWarningThreshold: number) {
    Logger.info(`SauceNAO2000 created with ${maxResults} maximum results`);
    this.sauce = new SauceNao({ api_key: apiKey });
  }

  find(imageUrl: string): Promise<SauceNAO2000Result[]> {
    if (!this.isUp()) {
      throw new Error('Call to find() made but too many requests at once.');
    }
    return this.sauce.find(imageUrl)
      .then((data) => {
        this.handleRemainings(data.header);
        return data.results.slice(0, this.maxResults).map((result) => ({
          certainty: result.header.similarity,
          source: result.data.source,
          title: result.data.title,
          part: result.data.part,
          engName: result.data.eng_name,
          jpName: result.data.jp_name,
          artist: result.data.artist,
          author: result.data.author,
          authorName: result.data.author_name,
          characters: result.data.characters,
        }));
      });
  }

  handleRemainings(header: ResponseHeader): void {
    this.ticketsRemaining = header.long_remaining;
    if (this.ticketsRemaining === 0) {
      this.nextShortUptime = Date.now() + 86400000;
    }
    if (header.short_remaining <= 1) {
      this.nextShortUptime = Date.now() + 30000;
    }
  }

  format(result: SauceNAO2000Result): string {
    let formatted = `*Certainty : ${result.certainty}%*`;

    let sauce = '';
    sauce = result.title ?? '';
    sauce = result.part ? `${sauce}${result.part}` : sauce;
    if (result.source) {
      sauce = sauce === '' ? result.source :
        result.source.startsWith('http') ? `${sauce} (${result.source})` : `${result.source} ${sauce}`;
    }
    sauce = sauce === '' ? 'Unknown 😞' : sauce;
    sauce = sauce !== '' ? `\n*• Sauce :* ${this.escapeMarkdownChars(sauce)}` : '';
    formatted = `${formatted}${sauce}`;

    const engName = result.engName ? `\n*• English Name :* ${this.escapeMarkdownChars(result.engName)}` : '';
    formatted = `${formatted}${engName}`;

    const jpName = result.jpName ? `\n*• Japanese Name :* ${this.escapeMarkdownChars(result.jpName)}` : '';
    formatted = `${formatted}${jpName}`;

    const artist = result.artist ? `\n*• Artist :* ${this.escapeMarkdownChars(result.artist)}` : '';
    formatted = `${formatted}${artist}`;

    let author = result.authorName ?? '';
    if (result.author) {
      author = author === '' ? result.author : `${author} (${result.author})`;
    }
    author = author !== '' ? `\n*• Author :* ${this.escapeMarkdownChars(author)}` : '';
    formatted = `${formatted}${author}`;

    const characters = result.characters ? `\n*• Characters :* ${this.escapeMarkdownChars(result.characters)}` : '';
    formatted = `${formatted}${characters}`;

    if (this.ticketsRemaining && this.ticketsRemaining < this.ticketsWarningThreshold) {
      formatted = `${formatted}\n\n**Warning : You have ${this.ticketsRemaining} Sauce Tickets™ remaining today.**`;
    }

    return formatted;
  }

  getTicketsRemaining(): number | null {
    if (this.nextLongUptime !== null && Date.now() > this.nextLongUptime) {
      this.nextLongUptime = null;
      this.ticketsRemaining = null;
    }
    return this.ticketsRemaining;
  }

  isUp(): boolean {
    if (this.nextShortUptime !== null && Date.now() > this.nextShortUptime) {
      this.nextShortUptime = null;
    }
    return this.nextShortUptime === null;
  }

  private escapeMarkdownChars(str: string): string {
    str = str.replace(/\\([`*_])/g, '$1');
    str = str.replace(/([`*_])/g, '\\$1');
    return str;
  }
}
