const babel = require('@babel/core');
// const generate = require('@babel/generator').default;

const code = `
    import {concat, xxx} from 'lodash'
    import {conca1t, xxx1} from 'lodash11'
`;

const babelPluginImport = ({ types, template }) => {
    return {
        visitor: {
            ImportDeclaration(path, state){
                // 新节点跳过遍历
                if(path.node.isNew){
                    console.log('new')
                    return
                }

                const specifiers = path.get('specifiers')//.toString()
                const source = path.get('source')
                const sourceString = source.toString()

                // console.log(sourceString, 'specifiers', source.node.value)
                // 'lodash' specifiers lodash
                // toString 之后就变成了字符串, 需要是一个变量，而不是字符串

                const newImportTemplateFn = template(
                    `import IMPORTFN from 'IMPORTPACKAGENAME'`
                );

                // 满足条件才进入 导入包名字一样 & 导入非 default 节点
                if(state.opts.options.name === source.node.value && !types.isImportDefaultSpecifier(specifiers[0])){
                    const newListAstNode = specifiers.map((specifier, idx) => {                 
                        const localName = specifier.get('imported').toString()
    
                        const newImportNodeAst = newImportTemplateFn({
                            IMPORTFN: types.identifier(localName),
                            IMPORTPACKAGENAME: types.stringLiteral(`${source.node.value}/${localName}`), // 
                        });
                        // 使用 toString 无效，可以考虑 使用  generate
                        // console.log('111',generate(newImportNodeAst).code) //.toString()
    
                        // 打个标识，跳过新节点
                        newImportNodeAst.isNew = true
                        return newImportNodeAst
                    })
    
                    path.replaceWithMultiple(newListAstNode)
    
                    // 跳过当前节点的子节点的遍历
                    // ********* 不是跳过新节点的遍历 *********
                    // path.skip()
                }
            }
        }
    }
}

// babel 本身只是一个引擎， 并不 转换代码， plugin 转换代码， presets 是 plugin 的集合
const ast1 = babel.transform(code, {
    plugins: [[babelPluginImport, { options: { name: 'lodash' } }]]
})

console.log(ast1.code)
