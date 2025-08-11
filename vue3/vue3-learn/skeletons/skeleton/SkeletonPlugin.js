
const path = require('path')
const fs = require('fs')
const Server = require('./server')
const Skeleton = require('./skeleton')
const {defaultOptions} = require('./config')

class SkeletonPlugin {
    constructor(options){
        // staticDir port origin
        this.options = options
        this.server = null

        this.skeletonOptions = { ...this.options, ...defaultOptions }
    }

    apply(compiler){
        compiler.hooks.done.tap('SkeletonPlugin', async() => {
            console.log('compiler')

            await this.startServer()

            this.skeleton = new Skeleton(this.skeletonOptions)
            await this.skeleton.initialize()
            const skeletonHTMl = await this.skeleton.genHTML(this.options.origin)

            const originPath = path.resolve(this.options.staticDir, 'index.html')
            const originHTML = fs.readFileSync(originPath, 'utf8')
            // console.log(skeletonHTMl, '???')
            // ??
            const finalHTMl = originHTML.replace('<!-- shell -->',skeletonHTMl)
            await fs.writeFileSync(originPath,finalHTMl)

            // console.log(skeletonHTMl)
            // await this.skeleton.destroy()

            // await this.server.close()
        })  
    }

    async startServer(){
        // 创建服务
        // 启动服务
        this.server = new Server(this.options)
        await this.server.listen()
    }
}

module.exports = SkeletonPlugin