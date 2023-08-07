const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const {dts} = require('rollup-plugin-dts');
const postcss = require('rollup-plugin-postcss');
const {terser} = require('rollup-plugin-terser');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const image = require('@rollup/plugin-image');
const {default: preserveDirectives} = require('rollup-plugin-preserve-directives');

const packageJson = require('./package.json');

const production = !process.env.ROLLUP_WATCH; // Detect production mode

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true, // Enable sourcemaps for debugging
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({tsconfig: './tsconfig.json'}),
      postcss(),

      production && terser(), // Only minify in production
      image(),
    ],
    onwarn: function (warning, warn) {
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.indexOf('use client') !== -1) {
        return;
      }
      warn(warning);
    },
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{file: 'dist/index.d.ts', format: 'esm'}],
    plugins: [dts()],

    external: [/\.css$/], // Inform Rollup that .css files aren't part of type exports
    onwarn: function (warning, warn) {
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.indexOf('use client') !== -1) {
        return;
      }
      warn(warning);
    },
  },
];
