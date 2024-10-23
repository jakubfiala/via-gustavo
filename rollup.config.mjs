import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

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
    replace({
      'process.env.NODE_ENV': `"${process.env.ROLLUP_WATCH ? 'dev' : 'prod'}"`,
      preventAssignment: true,
    }),
    nodeResolve(),
  ],
};
