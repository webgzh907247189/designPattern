const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');
const webpack = require('webpack');

// cross-env 拿到的值
console.log(process.env.NODE_ENV, 'be');
module.exports = {
    // 当前工作目录
    context: process.cwd(),
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    devServer: {
        hot: true,

        port: 3001,
        progress: true,
        // 额外的静态文件根目录
        contentBase: '.',  // './dist', 这个值没有意义，默认就是output 输出的目录。 此配置一般是添加额外的目录作为 http-server 被访问 
        // 3. 在server 中启动webpack
        // 2. mock
        before(app){
            app.get('/user',(req,res) => {
                res.json({name: 'test'});
            })
        },
        // 1. 代理
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                pathRewrite: {
                    '/api': '',
                }
            }
        }
    },
    resolve: {
        // modules: [path.resolve(__dirname, '../node_modules')], //如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索
        // mainFiles: [], // 入口文件的名字 //解析目录时要使用的文件名   ->    .index.web.js  index.rn.js

        // mainFields的默认值和当前webpack配置的target属性有关：如果target为webworker或web（默认）

        // 在Web环境中，如果使用loader加载ESM（ES module），那么这三个配置的加载顺序是browser→module→main，如果使用require加载CommonJS模块，则加载的顺序为main→module→browser。​
        // mainFields: [] // 入口  // 针对Npm中的第三方模块优先采用jsnext:main中指向ES6模块化语法的文件  package的 browser/module/main 字段 browser module main
        // extensions: [], // 扩展名  ->   .js .css .vue
        alias: {
            // 加快 模块查找的速度  
        }
    },
    // 专门解析 loader
    resolveLoader: {
        alias: {
            loader1: path.resolve(__dirname, 'myLoader/index'),
            babelLoader: path.resolve(__dirname, 'myLoader/babelLoader'),
            bannerLoader: path.resolve(__dirname, 'myLoader/bannerLoader'),
            myUrlLoader: path.resolve(__dirname, 'myLoader/urlLoader'),
        },
        // 与上面的功能一样， 配置 loader 优先级
        // modules: [path.resolve(__dirname, 'myLoader'), 'node_modules'],
    },
    module: {
        // https://zhuanlan.zhihu.com/p/55682789
        // 文件中没有任何导入就可以使用noParse，noParse对于loader,plugin等等都没有任何影响
        // 一旦文件noParse了，那么externals也将不起作用了。

        // 与 expose-loader 冲突
        // noParse: /lodash|jquery/, 使用 noParse进行忽略的 模块文件里面不能使用 import require
        rules: [{
            oneOf: [
                {
                    test: require.resolve('jquery'),
                    use: {
                        loader: 'expose-loader',
                        options: {
                            exposes: ['$'],
                        },
                    }
                },
                {
                    test: require.resolve('./src/testExpose.js'),
                    use: {
                        loader: 'expose-loader',
                        options: {
                            exposes: ['testGzh'],
                        },
                    }
                },
                // @babel/core
                // babelCore.transform
                // 使用 babelCore 进行 transform code
                {
                    test: /\.js$/,
                    use: [{
                        // loader: 'bannerLoader',
                        // options: {
                            // text: 'gzh',
                        //     filename: path.resolve(__dirname, 'doc/bannerLoaderText.js'),
                        // },
                    // }, {
                        loader: 'babelLoader',
                        // loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ],
                            plugins: [
                                '@babel/plugin-transform-runtime'
                            ]
                        }
                    }],
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    // css loader 解析 @import 这种语法
                    // style-loader 把style 插入到 head 中
                    // loader 特点单一
                    // loader 顺序从右到左
                    // loader 可以写成对象
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                insertAt: 'top',
                            }
                        },
                        'css-loader',
                        'loader1'
                    ]
                },
                {
                    test: /\.(png|jpeg)/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 1,
                            outputPath: '/img/',
                        }
                    }
                },
                {
                    test: /\.gif/,
                    use: {
                        loader: 'myUrlLoader',
                        options: {
                            limit: 1000000,
                            outputPath: '/img/',
                        }
                    }
                },
            ]
        }]
    },
    externals: {
        // vue: 'Vue',
        'vue-router': 'VueRouter',
        // 'react': 'React',
    },
    // watch: true,
    // watchOptions: {
    //     poll: 1000,
    //     aggregateTimeout: 500, // 一直输入代码
    //     ignored: /node_modules/ // 不需要监控的
    // },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'mainfast.json')
        }),
        // 在每个模块进行注入
        new webpack.ProvidePlugin({
            '$1': 'jquery'
        }),
        new HtmlWebpackplugin({
            template: './index.html',
        }),

        new webpack.NamedModulesPlugin(), // 打印更新的模块路径
        new webpack.HotModuleReplacementPlugin(),
    ]
}




// webpack 默认0 配置，找的node_modules 下面的webpack-cli 配置