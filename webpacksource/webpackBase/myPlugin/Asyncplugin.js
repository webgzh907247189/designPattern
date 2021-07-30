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
    }
}


