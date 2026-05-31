const types = require('babel-types');
const generate = require('babel-generator').default
const traverse = require('babel-traverse').default
const path = require('path');

module.exports = class NormalModle{
    constructor({ name, context,rawRequest,resource, parser, moduleId }){
        this.name = name
        this.context = context
        this.rawRequest = rawRequest // 模块的相对路径 原始路径
        this.resource = resource // 拼接的资源 绝对路径  (context+ entry)
        this.parser = parser

        // 此模块对应的代码块
        this._source

        // 此模块对应的 ast
        this._ast

        // 当前模块依赖的信息
        this.dependencies = []

        this.moduleId = moduleId
    }
    // 1. 用 fs 读出来内容
    // 2. 可能不是一个js模块，要走 loader 转换，最终得到一个 js 模块
    // 3. 把 js 模块 经过parser 处理，转成 抽象语法树
    // 4. 分析 ast 依赖，找到 import 和 require 节点
    // 5. 递归编译依赖的模块
    // 6. 依次递归执行上面5步，直到所有的模块都编译完成
    build(compilation, cb){
        this.doBuild(compilation, err => {
            this._ast = this.parser.parse(this._source)
            traverse(this._ast, {
                CallExpression: (nodePath) => {
                    let node = nodePath.node
                    if(node.callee.name === 'require'){
                        // 把方法名 require 改为 __webpack_require__
                        node.callee.name = '__webpack_require__'

                        let moduleName = node.arguments[0].value
                        // 添加扩展名
                        let extName = moduleName.split(path.posix.sep).pop().indexOf('.') === -1 ? '.js' : ''

                        // 获取依赖模块的绝对路径
                        let depResource = path.posix.join(path.posix.dirname(this.resource), moduleName + extName)
                        let depModuleId = './' + path.posix.relative(this.context, depResource)
                        // console.log(depModuleId, depResource)

                        // 把参数改了, 把模块id 从 ./title.js  改为 ./src/title.js
                        node.arguments = [types.stringLiteral(depModuleId)]

                        // console.log(this.name, 'name')
                        this.dependencies.push({
                            name: this.name, // main
                            context: this.context, //根目录
                            rawRequest: moduleName, // 模块的相对路径 原始路径
                            moduleId: depModuleId, // 模块ID 它是一个相对于 根目录的相对路径， 以 ./ 开头
                            resource: depResource, // 依赖模块的 绝对路径
                        })
                    } else if(types.isImport(node.callee)){
                        let moduleName = node.arguments[0].value
                        // 添加扩展名
                        let extName = moduleName.split(path.posix.sep).pop().indexOf('.') === -1 ? '.js' : ''

                        // 获取依赖模块的绝对路径
                        // this.resource   ->  拼接的资源 绝对路径  (context+ entry)
                        let depResource = path.posix.join(path.posix.dirname(this.resource), moduleName + extName)
                        let depModuleId = './' + path.posix.relative(this.context, depResource)

                        // 把参数改了, 把模块id 从 ./title.js  改为 ./src/title.js
                        node.arguments = [types.stringLiteral(depModuleId)]
                    }
                }
            })
            let { code } = generate(this._ast)
            this._source = code
            cb()
        })
    }
    doBuild(compilation, cb){
        this._source = this.getSource(compilation)
        cb()
    }
    getSource(compilation){
        return compilation.inputFileSystem.readFileSync(this.resource, 'utf8')
    }
}
