// https://segmentfault.com/a/1190000012840742
const { RawSource } = require('webpack-sources');
module.exports = class FileListplugin{
    constructor({filename}){
        this.filename = filename;
    }
    apply(compiler){
        // 文件准备好了，即将发射

        compiler.hooks.emit.tapAsync('FileListplugin', (complation, cb) => {
            // console.log(complation.assets,  Object.entries(complation.assets))


            // compilation.chunks 存放所有代码块，是一个数组
            complation.chunks.forEach(chunk => {
                // chunk 代表一个代码块
                // 代码块由多个模块组成，通过 chunk.modulesIterable 能读取组成代码块的每个模块
                for(const module of chunk.modulesIterable){
                    // module 代表一个模块
                    // module.fileDependencies 存放当前模块的所有依赖的文件路径，是一个数组
                    module.dependencies.forEach(function (filepath) {
                        // console.log(filepath, 'filepath');
                    });
                }

                // Webpack 会根据 Chunk 去生成输出的文件资源，每个 Chunk 都对应一个及其以上的输出文件
                // 例如在 Chunk 中包含了 CSS 模块并且使用了 ExtractTextPlugin 时，
                // 该 Chunk 就会生成 .js 和 .css 两个文件
                chunk.files.forEach((fileName) => {
                    // compilation.assets 存放当前所有即将输出的资源
                    // 调用一个输出资源的 source() 方法能获取到输出资源的内容
                    console.log(fileName, 'fileName');
                })
            })



            // 所有的资源
            const assets = complation.assets;

            let content = `## 文件名    资源大小 \r\n`;
            Object.entries(assets).forEach(([fileName, stats]) => {
                // console.log(fileName, stats.size)
                content += ` - ${fileName}    ${stats.size()}\r\n`
            })
            // assets[this.filename] = {
            //     source(){
            //         return content
            //     },
            //     size(){
            //         return content.length
            //     }
            // }

            assets[this.filename] = new RawSource(content);
            cb();
        })
    }
}