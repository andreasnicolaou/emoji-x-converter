import { emojiXLoader, LanguageXCode } from './data/loader';
export type ConversionMode = 'CONVERT_EMOJI' | 'CONVERT_DESCRIPTION';

export class EmojiXConverter {
  private static readonly EMOJI_PREFIX = '\xA9\xAE\xE2\xE3\xF0';
  private static instances: Record<string, EmojiXConverter> = Object.create(EmojiXConverter.prototype);
  public id!: LanguageXCode;
  private map!: Record<string, string>;

  public static getInstance(id: LanguageXCode, direction: ConversionMode = 'CONVERT_EMOJI'): EmojiXConverter {
    const key = `${id}-${direction.toLowerCase()}`;
    if (!this.instances[key]) {
      this.instances[key] = this.createInstance(id, direction);
    }
    return this.instances[key];
  }

  private static createInstance(id: LanguageXCode, direction: ConversionMode): EmojiXConverter {
    if (!Object.keys(emojiXLoader).includes(id)) {
      throw new Error(`Language map for "${id}" not found. Available IDs: ${Object.keys(emojiXLoader).join(', ')}`);
    }

    const instance = Object.create(EmojiXConverter.prototype) as EmojiXConverter;
    instance.id = id;
    instance.map = emojiXLoader[id];

    if (direction === 'CONVERT_DESCRIPTION') {
      instance.map = Object.fromEntries(
        Object.entries(instance.map).map(([emoji, description]) => [`:${description}:`, emoji])
      );
    }

    return instance;
  }

  public convertText(input: string): string | false {
    const emojiKeys = Object.keys(this.map).sort((a, b) => b.length - a.length);
    const regex = new RegExp(emojiKeys.join('|'), 'g');
    const emojiPrefix = input.startsWith(Object.keys(this.map)[0]) ? ':' : EmojiXConverter.EMOJI_PREFIX;
    if (/^[\s\S]*$/u.test(input)) {
      return input.length === input.split('').findIndex((char) => emojiPrefix.includes(char))
        ? input
        : input.replace(regex, (match: string): string => this.map[match] || match);
    }
    return input;
  }
}
