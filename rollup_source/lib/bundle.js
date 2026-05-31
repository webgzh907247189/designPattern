const Module = require('./module')
const path  = require('path')
const fs = require('fs');
const MagicString = require('magic-string');


module.exports = class Bundle{
    constructor({ entry }){
        this.entryPath = path.resolve(entry) // 拿到文件的绝对路径
        this.modules = {} // 存放本地打包的所有的模块
    }
    build(outputFile){
        let entryModule = (this.entryModule = this.fetchModule(this.entryPath))

        this.statements = entryModule.expandAllStatements()
        const transformCode = this.generate()  
        fs.writeFileSync(outputFile, transformCode)
    }
    fetchModule(importPath){
        let route = importPath
        if(route){
            // 入口模块的实列
            let content = fs.readFileSync(route, 'utf8')
            const module = new Module({
                code: content,
                path: route,
                bundle: this
            })
            return module
        }
    }

    generate(){
        let transformCode = new MagicString.Bundle() // 字符串包
        this.statements.forEach((statement) => {
            // 顶级节点上添加 _source 属性，值是 MagicString 实列
            const content = statement._source.clone()
            transformCode.addSource({
                content,
                separator: '\n'
            })
        })
        return transformCode.toString()
    }
}