import { emojiXLoader, LanguageXCode } from './data/loader.js';
export type { LanguageXCode };
export type ConversionMode = 'CONVERT_EMOJI' | 'CONVERT_DESCRIPTION';

// Map keys and matches are compared without U+FE0F and with no-break spaces as regular spaces
const normalize = (text: string): string => text.replace(/\uFE0F/g, '').replace(/[\u00A0\u202F]/g, ' ');

// Unicode still treats an emoji as qualified when U+FE0F is dropped anywhere but right after its first code point
const toPattern = (key: string): string =>
  [...key]
    .map((char, index) => {
      if (char === '\uFE0F' && index > 1) {
        return '\uFE0F?';
      }
      if (char === ' ') {
        return '[ \u00A0\u202F]';
      }
      return char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('');

export class EmojiXConverter {
  private static readonly instances = new Map<string, EmojiXConverter>();
  public id: LanguageXCode;
  private readonly map: Record<string, string>;
  private readonly regex: RegExp;

  private constructor(id: LanguageXCode, direction: ConversionMode) {
    this.id = id;
    const entries = Object.entries(emojiXLoader[id]).map(([emoji, description]) =>
      direction === 'CONVERT_DESCRIPTION' ? [`:${description}:`, emoji] : [emoji, description]
    );
    this.map = Object.fromEntries(entries.map(([key, value]) => [normalize(key), value]));

    // Longest keys first so multi-codepoint emojis/descriptions win over their prefixes
    const keys = entries.map(([key]) => key).sort((a, b) => b.length - a.length);
    this.regex = new RegExp(keys.map(toPattern).join('|'), 'g');
  }

  public static getInstance(id: LanguageXCode, direction: ConversionMode = 'CONVERT_EMOJI'): EmojiXConverter {
    if (!Object.hasOwn(emojiXLoader, id)) {
      throw new Error(`Language map for "${id}" not found. Available IDs: ${Object.keys(emojiXLoader).join(', ')}`);
    }

    const key = `${id}-${direction.toLowerCase()}`;
    let instance = this.instances.get(key);
    if (!instance) {
      instance = new EmojiXConverter(id, direction);
      this.instances.set(key, instance);
    }
    return instance;
  }

  public convertText(input: string): string {
    return input.replace(this.regex, (match: string): string => this.map[normalize(match)] ?? match);
  }
}
