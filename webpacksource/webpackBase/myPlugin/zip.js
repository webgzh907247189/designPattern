let Jszip = require('jszip');
module.exports = class ZipPlugin {
    apply(compiler){
        // 第一个参数无所谓， 一定在 aplly 方法里面
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation,cb) => {
            let jszip = new Jszip();
            // console.log(compilation.assets, '....')

            let assets = compilation.assets
            for (const filename in assets) {
                // 调用 source() 可以获取 源码
                let source = assets[filename].source();
                // console.log(source, 'source');
                jszip.file(filename, source);
            }

            jszip.generateAsync({ type: 'nodebuffer' }).then((content) => {
                assets['test.zip'] = {
                    source(){
                        return content
                    },
                    // 没有报错
                    size(){
                        return content.length
                    }
                }
                cb();
            })
        })
    }
}