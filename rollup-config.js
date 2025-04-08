import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-import-css';
// import vue from 'rollup-plugin-vue';
import dotenv from 'dotenv';

const environment = process.env.NODE_ENV || 'development';
const env = dotenv.config({ path: `.env.${environment}` }).parsed;
const outputPlugin = environment === 'production' ? [terser()] : [];

export default {
  input: 'src/js/app.js',
  output: [
    {
      format: 'iife',
      sourcemap: false,
      file: 'dest/assets/js/app.js',
      plugins: outputPlugin
    },
  ],
  plugins: [
    css({
      inject: true,
    }),
    nodeResolve(),
    commonjs(),
    alias({
      entries: []
    }),
    // for importing vue
    // https://v2.ja.vuejs.org/v2/guide/installation.html
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(environment),
        'process.env.VUE_APP_API_URL': JSON.stringify(env.VUE_APP_API_URL),
      }
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',  // バンドルに含めないファイル
      presets: ['@babel/preset-env'],
    }),
  ]
};
