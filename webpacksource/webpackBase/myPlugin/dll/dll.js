let DllEntryPlugin = require('./dllEntryPlugin')
let LibMainfestPlugin = require('./libMainfestPlugin')

class Dll {
    constructor(options){
        this.options = options
    }

    apply(compiler){
        compiler.hooks.entryOption.tap('Dll', (context, entry) => {
            Object.keys(entry).forEach((name) => {
                new DllEntryPlugin(context, entry[name], name).apply(compiler)
            })

            // 返回非 undefined 就停止运行代码
            // 这里一定要 返回 true， entryOption 是 syncBailHook
            // 这里走完 就结束掉
            return true
        })
        new LibMainfestPlugin(this.options).apply(compiler)
    }
}
module.exports = Dll