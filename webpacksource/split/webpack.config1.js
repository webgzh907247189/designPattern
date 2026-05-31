const path = require('path')
module.exports = {
    mode: 'development',
    devtool: false,
    entry: {
        page1: './srcMaxRequest/page1.js',
        page2: './srcMaxRequest/page2.js',
        page3: './srcMaxRequest/page3.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist2'),
        filename: '[name].js',
    },
    optimization: {
        // 要分割的那些代码块， initial 同步  async 异步  all = initial + async
        splitChunks: {
            chunks: 'all', // 默认是只分割异步
            minSize: 0, // 被提供的代码块的最小尺寸  默认是 30kb
            // minChunks: 
            name: true, // 代码块的名字 代码块默认使用 ～ 作为分隔符
            automaticNameDelimiter: '~',
            maxAsyncRequests: 3, // 同一个入口分割出来的最大异步请求数
            maxInitialRequests: 5, // 同一个入口分割出来的最大同步请求数


            // 缓存组 设置不同的缓存组来抽取不同规则的 chunk
            cacheGroups: {
                venders1: {
                    // 下面的 chunks: 'all' 可以被注释， 因为 splitChunks 里面设置了 chunks: 'all'
                    // chunks: 'all',
                    test: /node_modules/, // 条件
                    priority: -10 // 如果不设置优先级的话， 下面的  commons 会覆盖上面的配置(生成3个文件)
                },
                default: {
                    // chunks: 'all',
                    minChunks: 2, // 这个模块被 2个 或 2个以上代码块引用了，就可以单独提取出来
                    minSize: 8, // 被提供的代码块大小 默认是 30kb
                    priority: -20 // 如果不设置优先级的话， commons 会覆盖上面的配置(生成3个文件)
                }
            }
        },
        runtimeChunk: true,
    }
}