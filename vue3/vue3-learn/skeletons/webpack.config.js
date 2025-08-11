const path = require('path')
const HtmlWebapckPlugin = require('html-webpack-plugin')
const SkeletonPlugin = require('./skeleton/SkeletonPlugin')
// const SkeletonPlugin = require('page2-skeleton-webpack-plugin')


module.exports = {
    mode: 'development',
    devtool: false,
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"]
                        },
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        port: 9000
    },
    plugins: [
        new HtmlWebapckPlugin({
            template: './index.html'
        }),
        
        process.env.NODE_ENV === 'prod' && new SkeletonPlugin({
            staticDir: path.resolve(__dirname, './dist'),

            // 启动一个静态资源服务器 预览 dist 这个文件夹
            port: '8000',
            origin: 'http://localhost:8000',
            device: 'iPhone XR',
            button: {
                color: '#EFEFEF'
            },
            image: {
                color: '#EFEFEF'
            },
            rootNodeContainer: 'app'
        })

        // process.env.NODE_ENV === 'prod' && new SkeletonPlugin({
        //     // pathname: path.resolve(__dirname, `${customPath}`), // the path to store shell file
        //     staticDir: path.resolve(__dirname, './dist'), // the same as the `output.path`
        //     routes: ['/'], 
        // })

    ].filter(Boolean)
}