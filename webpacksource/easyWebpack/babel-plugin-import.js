// babel-plugin-import
// https://astexplorer.net/
// https://segmentfault.com/a/1190000016459270

// import { concat } from "lodash";
// -> 转为
//import concat from "lodash/concat";


const types = require('babel-types');

const visitor = {
    ImportDeclaration: {
        // path 是遍历过程中的路径，会保留上下文信息，有很多属性和方法
        enter(path, state){
            // path.node 指向当前 AST 节点

            const specifiers = path.node.specifiers
            const source = path.node.source

            // console.log(types.isImportDefaultSpecifier(specifiers[0]), 'types.isImportDefaultSpecifier(specifiers[0])');
            if(state.opts.libraryName === source.value && !types.isImportDefaultSpecifier(specifiers[0])){
                const declarations = specifiers.map((specifier, idx) => {
                    // 把普通导入变成默认导入
                    return types.importDeclaration([types.importDefaultSpecifier(specifier.local)], types.stringLiteral(`${source.value}/${specifier.local.name}`))
                })
                // path.replaceWithMultiple这个方法来替换多个Node节点
                path.replaceWithMultiple(declarations);
            }
        }
    }
}

module.exports = function(babel){
    return {
        visitor
    }
}