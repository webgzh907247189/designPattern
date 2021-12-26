import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
import pkg from './package.json';

const banner =
  '/*!\n' +
  ` * shuxinInfo-FE-util.js v${pkg.version}\n` +
  ` * (c) 2021-${new Date().getFullYear()} zhonghao.ge\n` +
  ' * Released under the MIT License.\n' +
  ' */';


const useRuntimePlugins = [
    babel({
        // https://github.com/JDFED/drip-form/blob/dev/rollup.base.config.js
        exclude: 'node_modules/**',
        extends: './babel.config.js',
        presets: [['@babel/preset-env', { modules: false }]],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            { useESModules: true /**, corejs: 3  */ },
          ],
        ],
        babelHelpers: 'runtime',
    }),
]

const useBundledPlugins = [
    babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env'],
        babelHelpers: 'bundled',
    }),
]

export default {
    input: 'src/index.js',
    output: [
        {
            format: 'cjs',
            file: path.resolve(__dirname, `dist/utils.cjs.js`), 
            sourcemap: true, 
            banner,
            plugins: [
                ...useBundledPlugins
            ]
        },
        {
            format: 'esm',
            file: path.resolve(__dirname, `dist/utils.esm.js`), 
            sourcemap: true, 
            banner,
            extend: true,
            plugins: [
                ...useRuntimePlugins
            ]
        },
        {
            name: 'utils',
            format: 'umd',
            file: path.resolve(__dirname, `dist/utils.umd.js`), 
            sourcemap: true, 
            banner,
            plugins: [
                ...useBundledPlugins
            ]
        },
        {
            name: 'utils',
            format: 'iife',
            file: path.resolve(__dirname, `dist/utils.iife.js`), 
            sourcemap: true, 
            banner,
            plugins: [
                ...useBundledPlugins
            ]
        },

        {
            format: 'esm',
            file: path.resolve(__dirname, `dist/utils.esm.min.js`), 
            sourcemap: true, 
            banner,
            plugins: [
                terser(),
                ...useRuntimePlugins
            ],
        },
        {
            name: 'utils',
            format: 'umd',
            file: path.resolve(__dirname, `dist/utils.umd.min.js`), 
            sourcemap: true, 
            banner,
            plugins: [
                terser(),
                ...useBundledPlugins
            ],
        },
        {
            format: 'cjs',
            file: path.resolve(__dirname, `dist/utils.cjs.min.js`), 
            sourcemap: true, 
            banner,
            plugins: [
                terser(),
                ...useBundledPlugins
            ],
        },
        {
            name: 'utils',
            format: 'iife',
            file: path.resolve(__dirname, `dist/utils.iife.min.js`), 
            sourcemap: true, 
            banner,
            plugins: [
                terser(),
                ...useBundledPlugins
            ],
        },
    ],
}