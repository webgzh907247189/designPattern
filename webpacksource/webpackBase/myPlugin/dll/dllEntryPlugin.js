const SingleEntryDependency = require('webpack/lib/dependencies/SingleEntryDependency')
const DllEntryDependency = require('./dependencies/dllEntryDependency')
const DllModuleFactory = require('./dllModuleFactory')

class DllEntryPlugin{
    constructor(context, entries, name){
        this.context = context
        this.entries = entries
        this.name = name
    }
    apply(compiler){
        // 普通的模块，都是由 normalModuleFactory 来生成
        compiler.hooks.compilation.tap('DllEntryPlugin', (compilation, { normalModuleFactory }) => {

            const dllModuleFactory = new DllModuleFactory()
            // 如果依赖是 DllEntryDependency， 交由 dllModuleFactory 来生产模块
            compilation.dependencyFactories.set(DllEntryDependency, dllModuleFactory)

            // 如果依赖是 SingleEntryDependency 交由 normalModuleFactory 来生产模块
            compilation.dependencyFactories.set(SingleEntryDependency, normalModuleFactory)
        })


        compiler.hooks.make.tapAsync('DllEntryPlugin', (compilation, callback) => {
            compilation.addEntry(
                this.context, 
                new DllEntryDependency(
                    this.entries.map(entry => new SingleEntryDependency(entry),
                    this.name
                )), 
                this.name, 
                callback
            )
        })
    }
}

module.exports = DllEntryPlugin