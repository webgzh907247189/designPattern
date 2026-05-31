const path = require('path');
const types = require('babel-types');
const generate = require('babel-generator').default;
const traverse = require('babel-traverse').default;
const neoAsync = require('neo-async')
const { runLoaders } = require('./loader-runner')

// 1. webpack5 + vite 
// 2. ts + vue3  formily  tailwind
// 3. 发布私包
// 4. pnpm
// 5. jsconfig
// 6. 抽离组件

module.exports = class NormalModule {
    constructor({ name, context, rawRequest, resource, parser, moduleId, async }) {
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

        // 依赖的异步代码块
        this.blocks = []
        this.async = async // 当前的代码块是异步还是同步
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
                        node.callee.name = '__webpack_require__' // 把 require 变为 __webpack__require__

                        let moduleName = node.arguments[0].value
                        console.log(moduleName, 'moduleNamemoduleName')

                        let depResource
                        if(moduleName.startsWith('.')){
                            // 处理后缀名
                            let extName = moduleName.split(path.posix.sep).pop().indexOf('.') ? '' : '.js';

                            // 获取依赖模块的绝对路径  使用 path.posix.join('a','b') -> a/b 在 windows 上面也是这个结果
                            // resource  入口的绝对路径   a/b/c + d + .js
                            depResource = path.posix.join(path.posix.dirname(this.resource), moduleName + extName)
                        }else{
                            depResource = require.resolve(path.posix.join(this.context, 'node_modules',moduleName))
                            depResource = depResource.replace(/\\/g, '/') // 把 windos \\ 转位 /
                        }

                        // 拿到 模块id
                        let depModuled = './' + path.posix.relative(this.context, depResource)
                        debugger
                        // let depModuled = '.' + depResource.slice(this.context.length)

                        node.arguments = [types.stringLiteral(depModuled)] // 把依赖的路径改为相对于根目录的路径

                        this.dependencies.push({
                            name: this.name, // main
                            context: this.context, // 根目录
                            rawRequest: moduleName, // 模块的相对路径
                            moduleId: depModuled, // 模块 id 它是一个相当于根目录的相对路径 以 ./ 开头
                            resource: depResource, // 依赖模块的绝对路径
                        })
                    }else if(types.isImport(node.callee)){
                        // 1. 拿到模块的名字
                        let moduleName = node.arguments[0].value
                        // 2. 处理后缀名
                        let extName = moduleName.split(path.posix.sep).pop().indexOf('.') ? '' : '.js';
                        // 3. 获取依赖模块的绝对路径  使用 path.posix.join('a','b') -> a/b 在 windows 上面也是这个结果
                        // resource  入口的绝对路径   a/b/c + d + .js
                        let depResource = path.posix.join(path.posix.dirname(this.resource), moduleName + extName)
                        // 4. 拿到 模块id
                        let depModuled = './' + path.posix.relative(this.context, depResource)

                        let chunkName = '0'
                        if(Array.isArray(node.arguments[0].leadingComments) && node.arguments[0].leadingComments.length > 0){
                            let leadingComments = node.arguments[0].leadingComments[0].value
                            let regexp = /webpackChunkName: \s*['"]([^'"]+)['"]/
                            chunkName = leadingComments.match(regexp)[1]
                        }
                        
                        nodePath.replaceWithSourceString(`__webpack_require__.e("${chunkName}").then(__webpack_require__.t.bind(null, "${depModuled}", 7))`)
                        this.blocks.push({
                            context: this.context,
                            entry: depModuled,
                            name: chunkName,
                            async: true,
                        })
                    }
                }
            })

            let { code } = generate(this._ast)
            this._source = code

            // 先编译 import(), 在编译 同步 import 的
            // 先编译 依赖的 import(),在编译 自己
            neoAsync.forEach(this.blocks, (block, done) => {
                let {context, entry, name, async} = block
                // 每次编译完成就调用 done，所有的都完成了调用 cb
                compilation._addModuleChain(context, entry, name, async, done)
            }, cb)
            // cb()
        })
    }
    doBuild(compilation, cb){
        this.getSource(compilation, (err, source) => {
            let { module: { rules } } = compilation.options
            let loaders = []
            for (let index = 0; index < rules.length; index++) {
                const rule = rules[index];
                if(rule.test.test(this.resource)){
                    loaders.push(...rule.use)
                }
            }
            const resolveLoader = (loader) => { 
                return require.resolve(path.posix.join(this.context, './webpackBase/myloader', loader))
            }
            //  拿到 loaders 的绝对路径的数组
            loaders = loaders.map(resolveLoader)
            if(loaders.length > 0){
                runLoaders({
                    resource: this.resource, 
                    loaders,
                },(err, { result }) => {
    
                    // 读取到原始代码， 赋值到 _source 上
                    this._source = result.toString()
                    cb()
                })
            }else{
                this._source = source
                cb()
            }
        })
    }
    getSource(compilation, cb){
        console.log(this.resource, '(this.resource')
        debugger
        compilation.inputFileSystem.readFile(this.resource, 'utf8',cb)
    }
};
