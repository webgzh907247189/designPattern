const Compile = require("./Compile")
const NodeEnvirenmentPlugin = require('./node/NodeEnvirenmentPlugin');
const WebpackOptionsApply = require('./WebpackOptionsApply');

const webpack = (options, cb) => {
    // 1. 校验配置文件是不是合法
    // 2. 得到compile。

    let compile = new Compile(options.context);
    compile.options = compile;

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