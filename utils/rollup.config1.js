// import ts from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve'; // { nodeResolve } 
import replace from '@rollup/plugin-replace';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';


import pkg from './package.json';

// import rollup from 'rollup';

const platFormEnv = process.env.FORMAT;

const platFormMin = process.env.MIN;
const isMin = platFormMin === 'true';
const idDev = process.env.platForm === 'dev'

const banner =
  '/*!\n' +
  ` * shuxinInfo-FE-util.js v${pkg.version}\n` +
  ` * (c) 2021-${new Date().getFullYear()}\n` +
  ' * Released under the MIT License.\n' +
  ' */';

export default {
    input: 'src/index.js',
    output: {
        name: 'utils',
        format: platFormEnv, // 6种输出格式 umd cjs es iife amd system | 'commonjs' | 'esm' | 'module' | 'systemjs';
        // name: '', // 输出格式位 umd 或 iife 的时候必须提供，将会称为一个全局变量挂在window下面
        file: path.resolve(__dirname, `dist/utils.${platFormEnv}${isMin ? '.min' : ''}.js`), 
        sourcemap: true, 
        banner,

        // 需要和 external 配合使用
        // globals: {
        //     lodash: '_', // 告诉 rollup 去全局变量 _ 上取 lodash
        //     jquery: 'jQuery' // 告诉 rollup 去全局变量 jQuery上取 jquery
        // }
    },
    // external: ['lodash', 'jquery'],
    plugins: [
        commonjs(),
        resolve(),
        // getBabelOutputPlugin({
        //     configFile: path.resolve(__dirname, 'babel.config.js'),
        //     allowAllFormats: true,
        // }),
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-env'],
            // plugins: [
            //   [
            //     '@babel/plugin-transform-runtime',
            //     { useESModules: true /**, corejs: 3  */ },
            //   ],
            // ],

            babelHelpers: 'runtime',

            // skipPreflightCheck: true,
            // runtimeHelpers: true,
            // exclude: '**/node_modules/**',
            // presets: ['@babel/preset-env'],
            // plugins: [
            //   [
            //     '@babel/plugin-transform-runtime',
            //     { useESModules: true /**, corejs: 3  */ },
            //   ],
            // ]
        }),
        // nodeResolve({
        //     extensions: ['.ts', '.js'],
        // }),
        // ts({
        //     tsconfig: path.resolve(__dirname, 'tsconfig.json')
        // }),
        replace({
            preventAssignment: true,
            'process.browser': true,
        }),
        isMin ? terser() : '',


       
        idDev ? serve({
            port: 9000,
            open: true,
            contentBase: './dist'
        }) : '',
        postcss({
            // extract: true,
        }),
    ],
    // external:['lodash'] //告诉rollup不要将此lodash打包，而作为外部依赖
    // external: ['@babel/runtime']
    // external: (id) => {
    //     return id.includes('@babel/runtime');
    // }
}


// @rollup/plugin-node-resolve  --- rollup 无法识别 node_modules 中的包，帮助 rollup 查找外部模块，然后导入
// @rollup/plugin-commonjs   --- 将 CommonJS 模块转换为 ES6 供 rollup 处理
// @rollup/plugin-babel  --- ES6 转 ES5，让我们可以使用 ES6 新特性来编写代码
// rollup-plugin-terser  --- 压缩 js 代码，包括 ES6 代码压缩
// rollup-plugin-eslint  --- js代码检测


// --config  -c 效果一样
// rollup 只处理顶级变量(import export)和函数




// webpack 功能最全，但是比较臃肿， 需要把 esm 和 cjs 都转出来
// vite 不需要打包，全是原生的 ESM 模块，不需要打包，上线需要使用 rollup 构建
