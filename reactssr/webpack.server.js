const path = require('path')

// ssr中，node原生模块不需要打包的进行处理 
const nodeExternals = require('webpack-node-externals')

module.exports = {
    target: 'node',
    mode: 'development',
    entry: path.join(__dirname,'./server/server2.js'),
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname,'buildSsr')
    },
    // 负责检查所有引入的核心模块，并且告诉webpack，不要打包node自带的核心模块
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                    ],
                    plugins: [
                        "@babel/plugin-proposal-class-properties"
                    ]
                }
            },
            // 无法与client 公用loader，因为没有dom，style-loader是动态创建插入link
            {
                test: /\.css$/,
                use: [
                    'isomorphic-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    }
}