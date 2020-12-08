import server from 'rollup-plugin-server'

// rollup 目的: 打包es6 模块化语法
export default {
    input: './src/single-spa.js',
    output: {
        file: './lib/umd/single-spa.js',  // 打包到具体到目录
        format: 'umd', // 打包的格式  ->  挂到 window 上？
        name: 'singleSpa', // 挂到 window 上到名字
        sourcemap: true,
    },
    plugins: [
        // rollup -c -w   ->  -c 使用配置文件   -w 监控变化
        server({
            openPage: './index.html', // 打开的 html
            contentBase: '', // 目录以当前服务为基准， 所以这个 contentBase 要加。 可以配置在 某个目录下的 contentBase
            port: 3000
        })
    ]
}