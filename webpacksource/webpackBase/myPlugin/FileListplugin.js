module.exports = class FileListplugin{
    constructor({filename}){
        this.filename = filename;
    }
    apply(compiler){
        // 文件准备好了，即将发射

        compiler.hooks.emit.tapAsync('FileListplugin', (complation, cb) => {
            // console.log(complation.assets,  Object.entries(complation.assets))

            const assets = complation.assets;

            let content = `## 文件名    资源大小 \r\n`;
            Object.entries(assets).forEach(([fileName, stats]) => {
                // console.log(fileName, stats.size)
                content += ` - ${fileName}    ${stats.size()}\r\n`
            })
            assets[this.filename] = {
                source(){
                    return content
                },
                size(){
                    return content.length
                }
            }

            cb();
        })
    }
}