import ts from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import path from 'path';
import serve from 'rollup-plugin-serve'

export default {
    input: 'src/index.ts',
    output: {
        name: 'VueReactivity', //  打包之后 window 上挂载 VueReactivity 这个变量
        format: 'umd', // 打包之后的格式
        file: path.resolve(__dirname, 'dist/vue.js'), //输出 文件
        sourceMap: true, // 映射文件
    },
    plugins: [
        nodeResolve({
            extensions: ['.js','.ts'],
        }),
        ts({
            tsconfig: path.resolve(__dirname, 'tsconfig.json')
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        serve({
            open: true,
            openPage: '/public/index.html',
            port: 3000,
            contentBase: '', //不给报错  // 表示基准目录，一定要给
        })
    ]
}