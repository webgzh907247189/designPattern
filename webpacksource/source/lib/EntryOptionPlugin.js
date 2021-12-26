// 单页入口
const itemToPlugin = (context, entry, name) => {
    return new SingleEntryPlugin(context, entry, name)
}

class EntryOptionPlugin {
    apply(compile){
        compile.hooks.entryOption.tag('EntryOptionPlugin', (context, entry) => {
            itemToPlugin(context, entry, 'main').apply(compile)
        })
    }
}

module.exports = EntryOptionPlugin