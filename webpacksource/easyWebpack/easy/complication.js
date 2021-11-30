const fs = require('fs');
const path = require('path');
const types = require('babel-types');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;


let baseDir = toUnixPath(process.cwd())
function toUnixPath(filePath) {
    return filePath.replace(/\\/g, '/')
}
module.exports = class complication{
    constructor(options){
        this.options = options
        this.modules = [] // 存放本次编译产生的 所有的模块
        this.chunks = []
        this.entrypoints = new Set()
        this.assets = {}
        this.files = []; // chunk 生成的输出文件名构成的数组。你可以从 compilation.assets 表中访问这些资源来源。
    }

    build(cb){
        // 5. 根据 entry 找到入口文件
        let entry = {}
        if(typeof this.options.entry === 'string'){
            entry.main = this.options.entry
        }else{
            entry = this.options.entry
        }

        for (const entryName in entry) {
            // 找到入口文件的绝对路径
            let entryFilePath = path.join(this.options.context || process.cwd(), entry[entryName])

            // 编译模块
            // 6. 从入口文件出发，调用所有配置的 loader 对模块进行编译
            let entryModule = this.buildModule(entryName, entryFilePath)
            // 8. 根据入口 和模块的联系，组装成一个包含多个模块的chunk
            let chunk = {
                name: entryName, // 代码块的名字就是入口的名字
                entryModule,
                modules: this.modules.filter(_ => _.name === entryName)
            }
            this.chunks.push(chunk)
            this.entrypoints.add(entryName, {
                name: entryName,
                chunks: [entryName]
            })
        }

        // 9. 再把每一个 chunk 转换为一个单独的文件加入到输出列表
        this.chunks.forEach((chunk) => {
            let filename = this.options.output.filename.replace('[name]', chunk.name)
            this.assets[filename] = getSource(chunk)
        })
        this.files = Object.keys(this.assets)
        // 10. 在确定好输出内容之后，根据配置明确输出路径和文件名，把文件内容写入到文件里面
        cb(null, {
            entrypoints: this.entrypoints,
            chunks: this.chunks,
            modules: this.modules,
            assets: this.assets,
            files: this.files,
        })
    }

    buildModule(entryName, modulePath){
        // 拿到源代码
        let sourceCode = fs.readFileSync(modulePath, 'utf8')

        let {rules} = this.options.module
        let loaders = [] // [loader1, loader2]
        rules.forEach(rule => {
            let { test } = rule
            if(modulePath.match(test)){
                loaders.push(...rule.use)
            }
        });

        sourceCode = loaders.reduceRight((result, loaderPath)=>{
            return require(loaderPath)(result)
            // return result
        }, sourceCode)

        // 当前模块的 模块 id
        let moduleId = './' + path.posix.relative(baseDir, modulePath)
        let module = { id: moduleId, dependencies:[], name: entryName}

        let ast = parser.parse(sourceCode, { sourceType: 'module' })
        console.log(ast, 'ast');
        traverse(ast, {
            CallExpression: ({ node })=>{
                if(node.callee.name === 'require'){
                    // 获取依赖模块的相对路径 (模块id都是相对于根目录进行的)
                    let depModuleName = node.arguments[0].value // 依赖的模块的名字
                    let dirname = path.posix.dirname(modulePath)

                    // 拿到文件的绝对路径
                    let depModulePath = path.posix.join(dirname, depModuleName)
                    // 添加后缀
                    let extensions = this.options?.resolve?.extensions ?? [];
                    depModulePath = tryExtensions(depModulePath, extensions)

                    // 生成此模块的模块 ID
                    let depModuleId = './' + path.posix.relative(baseDir, depModulePath)

                    // 替换ast 中的模块
                    node.arguments = [types.stringLiteral(depModuleId)] // ./title  -> ./src/title.js

                    //把此模块以来的模块id 和 模块路径都放到此模块的 依赖数组中
                    module.dependencies.push({depModuleId, depModulePath})
                }
            }
        })
        let { code } = generate(ast)
        module._source = code;

        // 7. 在找到该模块依赖的模块，在递归本步骤直到所有入口依赖的文件都经过了步骤的处理
        // 处理依赖
        module.dependencies.forEach(({ depModuleId, depModulePath }) => {
            let depModule = this.buildModule(entryName, depModulePath)
            this.modules.push(depModule)
        })
        return module;
    }
}

// 统一使用 linux的 / 来处理
// console.log(path.posix.sep); // /
// console.log(path.win32.sep); // \


function tryExtensions(modulePath, extensions) {
    extensions = ['', ...extensions]
    for (let index = 0; index < extensions.length; index++) {
        const extension = extensions[index];
        // let filePath = path.join(modulePath, extension)
        let filePath = modulePath + extension
        // console.log(filePath, 'filePath', modulePath);
        if(fs.existsSync(filePath)){
            return filePath
        }
    }
    throw new Error(`${modulePath}模块没找到`);
}


function getSource(chunk) {
    return `
        (function(modules){
            function require(moduleId){
                var module = {
                    i: moduleId,
                    exports: {},
                }
                modules[moduleId].call(module.exports, module, module.exports, require)
                return module.exports;
            }

            ${chunk.entryModule._source}
            return require("./src/index.js")
        })({
            ${chunk.modules.map((module) => {
                return `"${module.id}": function(module, exports, require){ ${module._source} } `
            })}
        })
    `    
}