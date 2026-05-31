const { parse } = require("acorn")
const MagicString = require('magic-string');
const analyse = require('./ast/analyse');

module.exports = class Module{
    constructor({code, path, bundle}){
        this.code = new MagicString(code, { fileName: path })
        this.path = path
        this.bundle = bundle
        this.ast = parse(code, {
            ecmaVersion: 8,
            sourceType: 'module'
        })
        this.imports = {}
        this.exports = {}
        this.definitions = {} // 存在所有变量定义的语句
        this.analyse()
    }

    expandAllStatements(){
        let allStatements = []
        this.ast.body.forEach(statement => {
            if(statement.type === 'ImportDeclaration'){
                return;
            }
            // allStatements.push(statement)

            let statements = this.expandAllStatements(statement)
            allStatements.push(...statements)
        });
        return allStatements
    }

    expandAllStatements(statement){
        statement._include = true
        let result = []
        const dependencies = Object.keys(statement.__dependsOn)
        dependencies.forEach((name) => {
            let definition = this.define(name)
            result.push(...definition)
        })
        result.push(statement)
        return result
    }
    define(name){
        // 外部导入的
        if(Object.hasOwnProperty(this.imports, name)){
            const { localName, source, importName } = this.imports[name]
            let importdModule = this.bundle.fetchModule(source, this.path)
            const { localName, exportName } = importdModules.exports[name]
            return importdModule.define(localName)
        }else{

        }
    }

    analyse(){
        this.ast.body.forEach((statement) => {
            // 先给 imports 赋值
            if(statement.type === 'ImportDeclaration'){
                let source = statement.source.value
                statement.specifiers.forEach((specifier) => {
                    let importName = specifier.imported.name
                    let localName = specifier.local.name
                    this.imports[localName] = { localName, source, importName }
                })
            }else if(statement.type === 'ExportNamedDeclaration'){
                let declaration = statement.declaration
                if(declaration.type === 'VariableDeclaration'){
                    const declarations = declaration.declarations

                    declarations.forEach((declarationItem) => {
                        let localName = declarationItem.id.name
                        this.exports[localName] = { localName, exportName: localName, expression: declaration }
                    })
                }
            }
        })
        analyse(this.ast, this.code, this)
        this.ast.body.forEach((statement) => {
            Object.keys(statement._defines).forEach((name) => {
                this.definitions[name] = statement
            })
        })
    }
}