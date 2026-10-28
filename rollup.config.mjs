import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

const input = 'src/index.ts';

export default [
  {
    input,
    output: [
      { file: 'dist/index.js', format: 'es' },
      { file: 'dist/index.cjs', format: 'cjs', exports: 'named' },
      // Browser global for <script> tags: emojiXConverter.EmojiXConverter.getInstance('en')
      { file: 'dist/index.umd.js', format: 'umd', name: 'emojiXConverter', exports: 'named' },
    ],
    plugins: [typescript({ noEmitOnError: true }), terser({ format: { comments: false } })],
  },
  {
    input,
    output: [
      { file: 'dist/index.d.ts', format: 'es' },
      // CommonJS consumers need declarations with a .d.cts extension under "type": "module"
      { file: 'dist/index.d.cts', format: 'es' },
    ],
    plugins: [dts()],
  },
];
