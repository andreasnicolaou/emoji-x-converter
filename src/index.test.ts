import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { emojiXLoader, LanguageXCode } from './data/loader.js';
import { EmojiXConverter } from './index.js';

describe('EmojiXConverter to description', () => {
  test('should convert "Combine 🍕 with 🍚" in English', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en');
    const found = emojiTransliterator.convertText('Combine 🍕 with 🍚');
    expect('Combine pizza with cooked rice').toEqual(found);
  });

  test('should convert "Combine 🍕 with 🍚" in Greek', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('el');
    const found = emojiTransliterator.convertText('Συνδύασε 🍕 με 🍚');
    expect('Συνδύασε πίτσα με μαγειρεμένο ρύζι').toEqual(found);
  });

  test('should convert "I love 🍕 and 🍩" in English', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en');
    const found = emojiTransliterator.convertText('I love 🍕 and 🍩');
    expect('I love pizza and doughnut').toEqual(found);
  });

  test('should convert "I love 🍕 and 🍩" in Greek', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('el');
    const found = emojiTransliterator.convertText('Αγαπώ 🍕 και 🍩');
    expect('Αγαπώ πίτσα και ντόνατ').toEqual(found);
  });

  test('should handle an empty string', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en');
    const found = emojiTransliterator.convertText('');
    expect('').toEqual(found);
  });

  test('should return the same string when no emojis are present', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en');
    const found = emojiTransliterator.convertText('Hello, how are you?');
    expect('Hello, how are you?').toEqual(found);
  });

  test('should convert "I love 🍕, 🍔, and 🍟" in English', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en');
    const found = emojiTransliterator.convertText('I love 🍕, 🍔, and 🍟');
    expect('I love pizza, hamburger, and french fries').toEqual(found);
  });

  test('should handle special characters and emojis in sentence', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en');
    const found = emojiTransliterator.convertText('Happy coding! 😊 and a 💻');
    expect('Happy coding! smiling face with smiling eyes and a laptop').toEqual(found);
  });

  test('should convert mixed emojis and words in Greek', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('el');
    const found = emojiTransliterator.convertText('Καλό απόγευμα! 🍀, 🍂');
    expect('Καλό απόγευμα! τετράφυλλο τριφύλλι, πεσμένα φύλλα').toEqual(found);
  });

  test('should convert a complex emoji sentence in English', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en');
    const found = emojiTransliterator.convertText('I ate 🍕, 🍟, and 🍔 while watching 🏈');
    expect('I ate pizza, french fries, and hamburger while watching american football').toEqual(found);
  });

  test('should convert "J\'aime les 🍕" in French', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('fr');
    const found = emojiTransliterator.convertText("J'aime les 🍕");
    expect("J'aime les pizza").toEqual(found);
  });

  test('should handle emojis with punctuation in English', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en');
    const found = emojiTransliterator.convertText('What a day! 🍕, 🍔, 🍟');
    expect('What a day! pizza, hamburger, french fries').toEqual(found);
  });
});

describe('EmojiXConverter to emoji', () => {
  test('should convertText text to emoji', () => {
    const translator = EmojiXConverter.getInstance('en', 'CONVERT_DESCRIPTION');
    const found = translator.convertText('Combine :pizza: with :cooked rice:');
    expect(found).toEqual('Combine 🍕 with 🍚');
  });

  test('should return original text if no emoji exists', () => {
    const translator = EmojiXConverter.getInstance('en', 'CONVERT_DESCRIPTION');
    const found = translator.convertText('Hello world');
    expect(found).toEqual('Hello world');
  });

  test('should handle an empty string', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en', 'CONVERT_DESCRIPTION');
    const found = emojiTransliterator.convertText('');
    expect(found).toEqual('');
  });

  test('should convert "I love 🍕, 🍔, and 🍟" in English', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en', 'CONVERT_DESCRIPTION');
    const found = emojiTransliterator.convertText('I love :pizza:, :hamburger:, and :french fries:');
    expect(found).toEqual('I love 🍕, 🍔, and 🍟');
  });

  test('should handle mixed translations', () => {
    const translator = EmojiXConverter.getInstance('en', 'CONVERT_DESCRIPTION');
    const found = translator.convertText('I love :sushi: and :pizza:');
    expect(found).toEqual('I love 🍣 and 🍕');
  });

  test('should handle special characters and emojis in sentence', () => {
    const translator = EmojiXConverter.getInstance('en', 'CONVERT_DESCRIPTION');
    const found = translator.convertText('Happy Friday! :smiling face with smiling eyes: !*!*!');
    expect(found).toEqual('Happy Friday! 😊 !*!*!');
  });

  test('should convert mixed emojis and words in Greek', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('el', 'CONVERT_DESCRIPTION');
    const found = emojiTransliterator.convertText('Καλό απόγευμα! :τετράφυλλο τριφύλλι:, :πεσμένα φύλλα:');
    expect(found).toEqual('Καλό απόγευμα! 🍀, 🍂');
  });

  test('should convert a complex emoji sentence in English', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en', 'CONVERT_DESCRIPTION');
    const found = emojiTransliterator.convertText(
      'I ate :pizza:, :french fries:, and :hamburger: while watching :american football:'
    );
    expect(found).toEqual('I ate 🍕, 🍟, and 🍔 while watching 🏈');
  });

  test('should convert "J\'aime les 🍕" in French', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('fr', 'CONVERT_DESCRIPTION');
    const found = emojiTransliterator.convertText("J'aime les :pizza:");
    expect(found).toEqual("J'aime les 🍕");
  });

  test('should handle emojis with punctuation in English', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en', 'CONVERT_DESCRIPTION');
    const found = emojiTransliterator.convertText('What a day! :pizza:, :hamburger:, :french fries:');
    expect(found).toEqual('What a day! 🍕, 🍔, 🍟');
  });

  test('should convert descriptions containing regex special characters', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en', 'CONVERT_DESCRIPTION');
    const found = emojiTransliterator.convertText('Type :AB button (blood type): meets :Mrs. Claus:');
    expect(found).toEqual('Type 🆎 meets 🤶');
  });

  test('should treat "." in descriptions literally', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en', 'CONVERT_DESCRIPTION');
    const found = emojiTransliterator.convertText('Hello :MrsX Claus:');
    expect(found).toEqual('Hello :MrsX Claus:');
  });
});

describe('EmojiXConverter Unicode coverage', () => {
  const VARIATION_SELECTOR = String.fromCodePoint(0xfe0f);
  const NARROW_NO_BREAK_SPACE = String.fromCodePoint(0x202f);

  test('should convert emojis that contain a variation selector', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en');
    const found = emojiTransliterator.convertText('I ❤️ the ☀️ and 1️⃣ 🏳️‍🌈');
    expect(found).toEqual('I red heart the sun and keycap: 1 rainbow flag');
  });

  test('should convert skin tones and ZWJ sequences as a whole', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en');
    const found = emojiTransliterator.convertText('Nice 👍🏽 from the 👩‍⚕️');
    expect(found).toEqual('Nice thumbs up: medium skin tone from the woman health worker');
  });

  test('should convert minimally-qualified emojis', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en');
    const found = emojiTransliterator.convertText('👩‍⚕️'.replaceAll(VARIATION_SELECTOR, ''));
    expect(found).toEqual('woman health worker');
  });

  test('should leave unqualified text-style characters untouched', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en');
    const found = emojiTransliterator.convertText('I ❤️ NY'.replaceAll(VARIATION_SELECTOR, ''));
    expect(found).toEqual('I ❤ NY'.replaceAll(VARIATION_SELECTOR, ''));
  });

  test('should convert the newest emojis', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en');
    const found = emojiTransliterator.convertText('A 🫝 by the 🛙');
    expect(found).toEqual('A pickle by the lighthouse');
  });

  test('should convert skin tone and ZWJ descriptions back to emojis', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('en', 'CONVERT_DESCRIPTION');
    const found = emojiTransliterator.convertText(':thumbs up: medium skin tone: :rainbow flag:');
    expect(found).toEqual('👍🏽 🏳️‍🌈');
  });

  test('should accept regular and no-break spaces in descriptions', () => {
    const emojiTransliterator = EmojiXConverter.getInstance('fr', 'CONVERT_DESCRIPTION');
    const found = emojiTransliterator.convertText(`:drapeau : France: :drapeau${NARROW_NO_BREAK_SPACE}: France:`);
    expect(found).toEqual('🇫🇷 🇫🇷');
  });

  test('should cover the same emojis in every language', () => {
    // CLDR has no Indonesian or Swedish names for these keycaps
    const cldrGaps: Partial<Record<LanguageXCode, string[]>> = { id: ['#️⃣', '*️⃣', '🔟'], sv: ['#️⃣', '*️⃣', '🔟'] };
    const english = Object.keys(emojiXLoader.en);
    expect(english.length).toBeGreaterThan(3900);
    for (const [language, map] of Object.entries(emojiXLoader) as [LanguageXCode, Record<string, string>][]) {
      const expected = english.filter((emoji) => !cldrGaps[language]?.includes(emoji));
      expect({ language, emojis: Object.keys(map) }).toEqual({ language, emojis: expected });
    }
  });
});

describe('EmojiXConverter instances', () => {
  test('should reuse the instance per language and direction', () => {
    expect(EmojiXConverter.getInstance('en')).toBe(EmojiXConverter.getInstance('en', 'CONVERT_EMOJI'));
    expect(EmojiXConverter.getInstance('en')).not.toBe(EmojiXConverter.getInstance('en', 'CONVERT_DESCRIPTION'));
  });

  test('should throw for an unknown language', () => {
    expect(() => EmojiXConverter.getInstance('xx' as never)).toThrow('Language map for "xx" not found');
  });
});

describe('ESM compatibility', () => {
  test('should use explicit .js extensions for relative imports', () => {
    const sources = ['index.ts', 'data/loader.ts'].map((file) => readFileSync(join(__dirname, file), 'utf-8'));
    const relativeImports = sources.flatMap((source) =>
      [...source.matchAll(/from '(\.{1,2}\/[^']+)'/g)].map((m) => m[1])
    );
    expect(relativeImports.length).toBeGreaterThan(0);
    expect(relativeImports.filter((path) => !path.endsWith('.js'))).toEqual([]);
  });
});
