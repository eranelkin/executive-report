import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import json from '@rollup/plugin-json';
import image from '@rollup/plugin-image';
import sourcemaps from 'rollup-plugin-sourcemaps';
import external from 'rollup-plugin-peer-deps-external';

const pkg = require('./package.json');

export default [
  {
    input: 'src/index.ts', // INFO: entry point
    output: [
      // INFO: different output formats
      {
        file: pkg.main,
        format: 'cjs', // INFO: commonJS
        sourcemap: true,
        name: 'react-ts-lib'
      },
      {
        file: pkg.module,
        format: 'esm', // INFO: modules
        sourcemap: true
      }
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss(),
      json(),
      image(),
      sourcemaps()
    ],
    external: ['react', 'react-dom']
  },
  {
    input: './dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.(css|scss)$/],
    plugins: [dts()]
  }
];
