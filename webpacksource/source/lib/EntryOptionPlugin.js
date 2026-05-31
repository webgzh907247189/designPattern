const SingleEntryPlugin = require('./SingleEntryPlugin')

// 单页入口
const itemToPlugin = (context, entry, name) => {
    return new SingleEntryPlugin(context, entry, name)
}

class EntryOptionPlugin {
    apply(compile){
        compile.hooks.entryOption.tap('EntryOptionPlugin', (context, entry) => {
            console.log('EntryOptionPlugin 注册')
            if (typeof entry === 'string') {
                itemToPlugin(context, entry, 'main').apply(compile)
            } else {
                for (const entryName in entry) {
                    itemToPlugin(context, entry[entryName], 'main').apply(compile)
                }
            }
        })
    }
}

module.exports = EntryOptionPlugin