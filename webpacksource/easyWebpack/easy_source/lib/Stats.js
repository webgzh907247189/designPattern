module.exports = class Stats{
    constructor(compilation){
        this.entrys = compilation.entrys
        this.modules = compilation.modules
        this.chunks = compilation.chunks // 代码块
        this.files = compilation.files;
    }
    toJson(){
        return this
    }
}