module.exports = class DonePlugin {
    apply(compiler){
        // 第一个参数无所谓， 一定在 aplly 方法里面
        // compiler.hooks.afterEmit.tap
        compiler.hooks.done.tap('DonePlugin', (stats) => {
            console.log( '编译完成～～');
        })
    }
}