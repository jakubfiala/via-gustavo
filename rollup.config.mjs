import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const plugins = [];

if (!process.env.ROLLUP_WATCH) {
  plugins.push(terser())
}

export default {
  input: 'src/main.js',
  output: [
    {
      file: 'dist/index.js',
      sourcemap: true,
      plugins,
    },
  ],
  plugins: [
    nodeResolve(),
  ],
};
