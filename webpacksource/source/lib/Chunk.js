module.exports = class Chunk {
    constructor(entryModule){
        this.entryModule = entryModule // 入口模块
        this.name = entryModule.name // 代码块的名字

        this.files = [] // 这个代码块生成了哪些文件

        this.modules = [] // 这个代码块包含了哪些模块
    }
}