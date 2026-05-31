module.exports = class TestVue {
    constructor() {

    }

    apply(compiler) {
        // compiler.hooks.compilation.tap('test', compilation => {
        //     console.log(compilation.compiler.options.module.rules ,'compilation')
        // })

        compiler.hooks.entryOption.tap('ADDjs', (ctx, entry) => {
            console.log(entry, 'entry', Array.isArray(entry))
            // entry.push('./src/gzh.js')
            entry['./src/gzh.js'] = './src/gzh.js'
        })
    }
}