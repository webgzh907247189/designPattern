module.exports = class Asyncplugin {
    apply(compiler){
        // 第一个参数无所谓， 一定在 aplly 方法里面
        compiler.hooks.emit.tapAsync('Asyncplugin', (complation,cb) => {
            setTimeout(()=>{
                console.log('Asyncplugin --tapAsync ---- 等一等');
                cb();
            }, 2000)
        })


        compiler.hooks.emit.tapPromise('Asyncplugin', (complation,cb) => {
            return new Promise((resolve,reject) => {
                setTimeout(()=>{
                    console.log('Asyncplugin --tapPromise ---- 等一等');
                    resolve()
                }, 1000)
            })
        })

        // 创建 compilation 时 触发这钩子
        compiler.hooks.compilation.tap('Assetplugin', (compilation,cb) => {
            // 每当往 chunks 路面 push 一个新的 file 触发 下面这个钩子
            compilation.hooks.chunkAsset.tap('Assetplugin',(chunk, filename) => {
                console.log(chunk.name, filename, 'gzh--compilation');
            })
        })
    }
}


