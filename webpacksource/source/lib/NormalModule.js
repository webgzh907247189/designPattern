const path = require('path');
const types = require('babel-types');
const generate = require('babel-generator').default;
const traverse = require('babel-traverse').default;

// 1. webpack5 + vite 
// 2. ts + vue3  formily  tailwind
// 3. 发布私包
// 4. pnpm
// 5. jsconfig
// 6. 抽离组件

module.exports = class NormalModule {
    constructor({ name, context, rawRequest, resource, parser, moduleId }) {
        this.name = name
        this.context = context
        this.rawRequest = rawRequest
        this.resource = resource // 入口的绝对路径
        this.parser = parser

        // 此模块对应的源代码
        this._source

        // 此模块对应的 ast 抽象语法树
        this._ast

        this.dependencies = []

        this.moduleId = moduleId
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
                        node.callee.name = '__webpack__require__' // 把 require 变为 __webpack__require__

                        let moduleName = node.arguments[0].value
                        // 处理后缀名
                        let extName = moduleName.split(path.posix.sep).pop().indexOf('.') ? '' : '.js';

                        // 获取依赖模块的绝对路径  使用 path.posix.join('a','b') -> a/b 在 windows 上面也是这个结果
                        // resource  入口的绝对路径   a/b/c + d + .js
                        let depResource = path.posix.join(path.posix.dirname(this.resource), moduleName + extName)

                        // 拿到 模块id
                        let depModuled = './' + path.posix.relative(this.context, depResource)
                        node.arguments = [types.stringLiteral(depModuled)] // 把依赖的路径改为相对于根目录的路径

                        this.dependencies.push({
                            name: this.name, // main
                            context: this.context, // 根目录
                            rawRequest: moduleName, // 模块的相对路径
                            moduleId: depModuled, // 模块 id 它是一个相当于根目录的相对路径 以 ./ 开头
                            resource: depResource, // 依赖模块的绝对路径
                        })
                    }
                }
            })

            let { code } = generate(this._ast)
            this._source = code
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
