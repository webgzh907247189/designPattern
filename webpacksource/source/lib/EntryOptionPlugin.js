const SingleEntryPlugin = require('./SingleEntryPlugin')

// 单页入口
const itemToPlugin = (context, entry, name) => {
    return new SingleEntryPlugin(context, entry, name)
}

class EntryOptionPlugin {
    apply(compile){
        compile.hooks.entryOption.tap('EntryOptionPlugin', (context, entry) => {
            console.log('EntryOptionPlugin 注册')
            itemToPlugin(context, entry, 'main').apply(compile)
        })
    }
}

module.exports = EntryOptionPlugin