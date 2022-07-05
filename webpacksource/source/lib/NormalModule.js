const path = require('path');
const types = require('babel-types');
const generate = require('babel-generator').default;
const traverse = require('babel-traverse').default;


module.exports = class NormalModule {
    constructor({ name, context, rawRequest, resource, parser }) {
        this.name = name
        this.context = context
        this.rawRequest = rawRequest
        this.resource = resource // 入口的绝对路径
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

            traverse(this._ast, {
                // 遍历到 CallExpression 进入到这个方法
                CallExpression: (nodePath) => {
                    const node = nodePath.node
                    if(node.callee.name === 'require'){
                        let moduleName = node.arguments[0].value
                        // 处理后缀名
                        let extName = moduleName.split(path.posix.sep).pop().indexof('.') ? '.js' : '';

                        // 获取依赖模块的绝对路径  使用 path.posix.join('a','b') -> a/b 在 windows 上面也是这个结果
                        // resource  入口的绝对路径   a/b/c + d + .js
                        let depResource = path.posix.join(path.posix.dirname(this.resource), moduleName + extName)

                        // 拿到 模块id
                        let depModuled = './' + path.posix.relative(this.context, depResource)

                    }
                }
            })
            // cb()
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
