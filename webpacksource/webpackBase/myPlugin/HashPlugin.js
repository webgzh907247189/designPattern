// hash 每次编译 都会产生一个 hash 值 整个项目只要有一个文件发生了改变， hash 就会变
// chunkHash 代码块 hash

class HashPlugin{
    constructor(){

    }

    apply(compiler){
        compiler.hooks.compilation.tap('complation', (compilation) => {
            compilation.hooks.afterHash.tap('HashPlugin', () => {
                // webpack 把 hash 值 放在  compilation 上面，可以直接被修改
                compilation.hash = 'gzh'

                let chunks = compilation.chunks
                // console.log(compilation.assets, 'assets')
                // console.log(compilation, 'chunks')
                for (const chunk of chunks) {

                    // chunkhash 放在 chunk 的 renderedHash 这个属性
                    chunk.renderedHash = chunk.name + 'gzhchunkName'
                    console.log(chunk.contentHash, '11')

                    // 每个代码块的 contentHash 就放在 chunk.contentHash 里面
                    chunk.contentHash = {'css/mini-extract': 'gzhcontentHash'}
                }
            }) 
        })
    }
}

module.exports = HashPlugin