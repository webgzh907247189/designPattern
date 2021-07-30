// 注册内置插件
const EntryOptionPlugin = require('./EntryOptionPlugin')
class WebpackOptionsApply {
    process(options, compile){
        new EntryOptionPlugin().apply(compile);

        // 触发 entry 钩子
        compile.hooks.entryOption.call(options.context,options.entry)
    }
}

exports = module.exports = WebpackOptionsApply