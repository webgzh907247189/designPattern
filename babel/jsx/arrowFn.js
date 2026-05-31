const babel = require('@babel/core');

const code = `const sum1 = (a,b) => { return a + b }
const sum2 = (a,b) =>  a + b
`;

const arrowFunctionPlugin = ({ types }) => {
    return {
        visitor: {
            ArrowFunctionExpression(astPath, state){
                const fnParams = astPath.get('params').toString()
                
                const fnBody = astPath.get('body')
                const fnBodyString = fnBody.toString()

                // ast.parent 拿到父节点 node
                // const fnName = astPath.parent.id.name

                // ast.parentPath 拿到父节点 path
                const fnName = astPath.parentPath.get('id').toString()

                if(types.isBinaryExpression(fnBody)){
                    astPath.replaceWithSourceString(`function ${fnName} ( ${fnParams} ){ return ${fnBodyString} }`)
                }else{
                    astPath.replaceWithSourceString(`function ${fnName} ( ${fnParams} ) ${fnBodyString} `)
                }   
            }
        }
    }
}

// babel 本身只是一个引擎， 并不 转换代码， plugin 转换代码， presets 是 plugin 的集合
const ast1 = babel.transform(code, {
    plugins: [arrowFunctionPlugin]
})

console.log(ast1.code)
