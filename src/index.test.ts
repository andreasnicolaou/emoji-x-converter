import { EmojiXConverter } from './index';

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
});
