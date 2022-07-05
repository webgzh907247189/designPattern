const Compile = require("./Compile")
const NodeEnvirenmentPlugin = require('./node/NodeEnvirenmentPlugin');
const WebpackOptionsApply = require('./WebpackOptionsApply');

const webpack = (options, cb) => {
    // 1. 校验配置文件是不是合法
    // 2. 得到compile。

    let compile = new Compile(options.context);
    compile.options = options;

    // 让 compile 可以读写文件
    new NodeEnvirenmentPlugin().apply(compile);

    if(options.plugins && Array.isArray(options.plugins)){
        for (const plugin of options.plugins) {
            plugin.apply(compile)
        }
    }

    // 挂载内置插件
    new WebpackOptionsApply().process(options, compile);
    return compile;
}

exports = module.exports = webpack

// 初始化创建一个 compile， 并且把 options 都挂载上去
// 设置文件环境
// 执行所有的插件，执行插件的 apply 方法，让插件方法注册
// 注册 SingleEntryPlugin.make

// 执行： beforeRun -> run -> beforeCompile -> compile -> make (提前暴露了很多钩子 beforeRun、run、beforeCompile...， 让用户可以自定义添加)