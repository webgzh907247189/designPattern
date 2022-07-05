class SingleEntryPlugin {
    constructor(context, entry, name){
        this.entry = entry
        this.context = context
        this.name = name
    }

    apply(compile){
        compile.hooks.make.tapAsync('SingleEntryPlugin', (compilation,cb) => {
            const {context, entry, name} = this;

            // 从此入口开始编译
            // console.log('addEntry');
            compilation.addEntry(context, entry, name,cb)
        })
    }
}

module.exports = SingleEntryPlugin;