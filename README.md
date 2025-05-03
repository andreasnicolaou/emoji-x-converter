# EmojiX Converter

EmojiX Converter enables conversion between emojis and their textual descriptions across different languages using customizable mappings, making it easier for developers and users to bridge the gap between these two forms of expression.

## Features

- Convert emojis to text descriptions and vice versa
- Support for multiple languages through customizable mappings
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
