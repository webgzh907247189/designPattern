module.exports = class NormalModule {
    constructor({ name, context, rawRequest, resource, parser }) {
        this.name = name
        this.context = context
        this.rawRequest = rawRequest
        this.resource = resource
        this.parser = parser

        // 此模块对应的源代码
        this._source

        // 此模块对应的 ast 抽象语法树
        this._ast
    }

    // 编译一个模块
    /**
     * 1. 从硬盘上去读取文件内容
     * 2. 可能不是一个js 模块， 所以需要走 loader 转化， 最终得到一个 js 模块
     * 3. 把这个 js 模块经过 parser 处理转成 ast
     * 4. 分析 ast 的依赖，找到 require import 节点，分析依赖的 模块
     * 5. 递归编译依赖的模块
     * 6. 不停的重复上面5步， 直到所有的模块都编译完成为止
     * @param {*} compilation 
     * @param {*} cb 
     */
    build(compilation, cb){
        // 先执行 doBuild cb， 在 执行 build 的 cb
        this.doBuild(compilation, (err) => {
            this._ast = this.parser.parse(this._source)
            cb()
        })
    }
    doBuild(compilation, cb){
        this.getSource(compilation, (err, source) => {
            // 读取到原始代码， 赋值到 _source 上
            this._source = source
            cb()
        })
    }
    getSource(compilation, cb){
        compilation.inputFileSystem.readFile(this.resource, 'utf8',cb)
    }
};
