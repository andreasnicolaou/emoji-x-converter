# EmojiX Converter

EmojiX Converter enables conversion between emojis and their textual descriptions across different languages using customizable mappings, making it easier for developers and users to bridge the gap between these two forms of expression.

## Features

- Convert emojis to text descriptions and vice versa
- All emojis up to Emoji 18.0, including skin tones and ZWJ sequences, with names from Unicode CLDR
- 20 languages: `ar`, `de`, `el`, `en`, `es`, `fr`, `hi`, `id`, `it`, `ja`, `ko`, `nl`, `pl`, `pt`, `ru`, `sv`, `th`, `tr`, `vi`, `zh`
- Singleton pattern to optimize memory usage
- Easy integration for developers

## Installation

```bash
npm install @andreasnicolaou/emoji-x-converter
```

## Usage

### Importing the Library

```typescript
import { EmojiXConverter } from '@andreasnicolaou/emoji-x-converter';
```

CommonJS is supported too:

```javascript
const { EmojiXConverter } = require('@andreasnicolaou/emoji-x-converter');
```

In the browser, load the UMD build from a CDN and use the `emojiXConverter` global:

```html
<script src="https://cdn.jsdelivr.net/npm/@andreasnicolaou/emoji-x-converter"></script>
<script>
  const xConverter = emojiXConverter.EmojiXConverter.getInstance('en');
</script>
```

### Converting Emoji to Description

```typescript
const xConverter = EmojiXConverter.getInstance('en');
const result = xConverter.convertText('I love 🍣 and 🍕');
console.log(result); // "I love sushi and pizza"
```

### Converting Description to Emoji

```typescript
const xConverter = EmojiXConverter.getInstance('en', 'CONVERT_DESCRIPTION');
const result = xConverter.convertText('I love :sushi: and :pizza:');
console.log(result); // "I love 🍣 and 🍕"
```

## Contributing

Contributions are welcome! If you encounter issues or have ideas to enhance the library, feel free to submit an issue or pull request.

### Updating the emoji data

The files in `src/data` are generated from Unicode's `emoji-test.txt` and CLDR's emoji names. To move to a newer release, bump `EMOJI_VERSION` and `CLDR_VERSION` in `generate-emoji-data.mjs` and run:

```bash
npm run generate:emoji
```

To add a language, create an empty `src/data/<code>.ts`, register it in `src/data/loader.ts`, and run the generator.
