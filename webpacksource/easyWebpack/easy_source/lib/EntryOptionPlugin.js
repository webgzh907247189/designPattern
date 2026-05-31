const SingleEntryPlugin = require('./SingleEntryPlugin')
module.exports = class EntryOptionPlugin {
    apply(compiler){
        compiler.hooks.entryOption.tap('EntryOptionPlugin',(context, entry) => {
            itemToPlugin(context, entry, 'main').apply(compiler)
        })
    }
}

function itemToPlugin(context, item, name){
    // 单入口 插件
    return new SingleEntryPlugin(context, item, name)
}