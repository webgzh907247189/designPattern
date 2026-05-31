const path = require('path')
const async = require('neo-async')

class LibMainfestPlugin{
    constructor(options){
        this.options = options
    }

    apply(compiler){
        compiler.hooks.emit.tapAsync('LibMainfestPlugin',(compilation, cb) => {

            let content = {}
            async.forEach(compilation.chunks, (chunk, done) => {
                const targetPath = this.options.path
                const name =  this.options.name

                for (const module of chunk.modulesIterable) {
                    if(module.libIdent){
                        // module.libIdent() 返回 模块id
                        const ident = module.libIdent({context: compiler.options.context})
                        content[ident] = { id: module.id }
                    }
                }

                const mainfest = { name, content }
                compiler.outputFileSystem.mkdirp(path.dirname(targetPath), err => {
                    compiler.outputFileSystem.writeFile(
                        targetPath,
                        JSON.stringify(mainfest),
                        done
                    )
                })
            // 所有的 任务 都完成，才会 执行 cb 函数
            }, cb)
        })
    }
}

module.exports = LibMainfestPlugin