module.exports = class Chunk{
    constructor(entryModule){
        this.entryModule = entryModule
        this.name = entryModule.name //代码块的名称

        this.files = [] //这个代码生成了哪些文件

        this.modules = [] // 这个代码块包含了哪些模块
    }
}