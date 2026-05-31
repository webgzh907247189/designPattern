module.exports = class SingleEntryPlugin{
    constructor(context, entry, name){
        this.context = context 
        this.entry = entry
        this.name = name
    }

    apply(compiler){
        compiler.hooks.make.tapAsync('SingleEntryPlugin', (compilation, cb) => {
            const { context, entry, name } = this
            // console.log('SingleEntryPlugin make', context, entry, name)
            compilation.addEntry(context, entry, name, cb)
        })
    }
}