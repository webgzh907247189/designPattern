const path = require('path');

module.exports = {
    // 当前工作目录
    context: process.cwd(),
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    }
}
// webpack4 电子书
// https://webpack.eleven.net.cn/content/inline.html
// https://xieyufei.com/2020/07/30/Webpack-Optimize.html


// https://juejin.cn/post/6844903640533041159 (Webpack 中的 sideEffects 到底该怎么用)
// webpack5 三个重大更新
// 1. 持久化缓存(默认开启，默认启用内存缓存) 2. tree shaking (sideEffects: ['*.css'])  3. 模块联邦
// 处理资源的loader 内置了；  支持在请求中处理学医(URIs)；  deterministic 变更；   移除 node 核心模块的 polyfill(版本4 默认打包打进来，5不会打进去)



// 命令行提供的参数比  默认配置的参数 优先级更高，可以覆盖  默认配置的参数 (但是在配置里面 已经 覆盖默认配置参数的话，此时  覆盖的之后的参数优先级更高， 比命令行和默认的都高)


// https://www.cnblogs.com/dahe1989/p/11543832.html (动态加载)
// module： 每个文件都是一个 module
// chunk: 代码块  1. entry 2.import() 3. 通过 splitChunks 分割的块
// bundle： 文件 ，一般和 chunk 一一对应， bundle 就是 chunk 进行压缩打包之后的产出


// filename 决定了每个入口(entry) 输出 bundle 的名称。
// chunkFilename 决定了非入口(non-entry) chunk 文件的名称。


// tapable
// webpack 在构建过程中 去广播 事件，插件去监听这个事件
// 1. 初始化参数，从配置文件和 shell 语句拿到 合并参数，得到最终参数
// 2. 拿到 compiler (new Compiler(options))
// 3. 加载插件， 执行 插件 (执行 apply 方法)



// 一般情况下 ，dev： cheap-module-eval-source-map  prod: cheap-module-source-map
// source-map
// eval       系列    使用 eval 包裹的代码块
// source-map 系列    单独生成 .map 文件
// cheap      系列    不包含列信息 文件更小
// module     系列    包含loader的 sourcemap 比如 (jsx to js,babel的sourcemap)， 负责无法定于源文件
// inline     系列    将.map 文件嵌入，不单独产生.map文件



// webpack4 tree-shaking 三个条件 1. 生产模式下 2. @babel/preset-env 的 modules 为 false(告诉webpack 不要编译import语法)   3. 不产生 source-map ????




// 预加载的权重
// 1. higheset 最高
// 2. high 高
// 3. medium 中等
// 4. low 低
// 5. lowest 最低



// 可以通过 preload 提升优先级 (******)  默认情况下 异步脚本优先级最低
// webpack 容易混淆知识点
// https://www.cnblogs.com/skychx/tag/Webpack/
// webpackChunkName 是为预加载的文件取别名，webpackPrefetch 会在浏览器闲置下载文件，webpackPreload 会在父 chunk 加载时并行下载文件。
// preload(预加载，未来一定会用到的资源，加载优先级高) chunk 具有中等优先级，并立即下载。prefetch(预获取，未来可能会用到的资源，加载优先级不高) chunk 在浏览器闲置时下载。



// 分割代码
// 1. 拆分多入口 2. import() 3. cacheGroups


// img、font中是没有chunkHash的
// hash chunkHash contentHash
// 1. hash 每次编译产生新的 hash值， 只要改了
// 2. chunkHash 代码块的hash
// 3. contentHash 内容hash




// babel-import-plugin 按需加载的 babel 插件



// hmr
// 1. webpack 运行产生一个 compile， 通过 webpack(config) 生成 compile
// 2. 创建一个 webpack-dev-server
// 3. 添加 webpack-dev-middlerare 提供编译之后静态文件的服务， 返回静态文件
// 4. 启动一个 websocket 服务器
// 5. 发送 hash 事件，在发送 ok 事件
// 6. ok -> hotcheck() 



// 使用 noParse进行忽略的 模块文件里面不能使用 import require

// ** 匹配任意字符，包括路径分隔符;     * 匹配任意字符，不包括路径分隔符

//NPM7：preinstall -> install -> postinstall -> prepublish -> preprepare -> prepare -> postprepare



// https://www.cnblogs.com/skychx/p/webpack-module-chunk-bundle.html
// 直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle。



/******* webpack 的构建流程是什么 *******/

// 初始化参数：解析webpack配置参数，合并shell传入和webpack.config.js文件配置的参数,形成最后的配置结果；
// 开始编译：上一步得到的参数初始化compiler对象，注册所有配置的插件，插件 监听webpack构建生命周期的事件节点，做出相应的反应，执行对象的run方法开始执行编译；
// 确定入口：从配置的entry入口，开始解析文件构建AST语法树，找出依赖，递归下去；
// 编译模块：递归中根据文件类型和loader配置，调用所有配置的loader对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
// 完成模块编译并输出：递归完事后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据entry或分包配置生成代码块chunk;
// 输出完成：输出所有的chunk到文件系统；


/***********     loader 与 plugin 的区别       *************/
// Loader 就是将 Webpack 不认识的内容转化为认识的内容
// 插件（Plugin）可以贯穿 Webpack 打包的生命周期，执行不同的任务

// prefetch (预获取)：浏览器空闲的时候进行资源的拉取
// preload (预加载)：提前加载后面会用到的关键资源   因为会提前拉取资源，如果不是特殊需要，谨慎使用

// 所有文件都没有副作用，"sideEffects": false

// workbox -> workbox-webpack-plugin

// env
/**
 * 1. --mode  process.env.NODE_ENV 只能在前端使用，node 环境拿不到，并且 package.json 的优先级比 webpack.config.js 优先级更高
 * 2. --env node 取不到，前端也取不到，只能在webpack.config.js 函数 中当作参数拿到
 * 3. cross-env 设置的是 node 的变量
 * 4. webpack.definePlugin 设置的是前端的变量
 */