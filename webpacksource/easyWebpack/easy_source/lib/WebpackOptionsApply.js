const EntryOptionPlugin = require("./EntryOptionPlugin")

// 挂在内部处理的 各种插件
module.exports = class WebpackOptionsApply{
    process(options, compiler){
        // 先注册 entryOption 钩子，后面立即 触发钩子
        new EntryOptionPlugin().apply(compiler)

        // 触发 entryOption 钩子
        compiler.hooks.entryOption.call(options.context, options.entry)
    }
}