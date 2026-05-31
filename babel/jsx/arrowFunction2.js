/**
 * 尽可能减少操作
 */

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');
const template = require('@babel/template').default

// const sourceCode = `const add = (a, b)  => {
//     console.log(this);
//     return a + b
// }`

const sourceCode = `const add = function(a, b)  {
    console.log(this);

    const aa = () => {
        console.log(this)
    }
    return a + b
}`

let ast = parser.parse(sourceCode);

// path.node 当前 AST 节点
traverse(ast, {
    ArrowFunctionExpression(path) {
        let params = path.get('params')//.toString()
        let fnBody = path.get('body')//.toString()
        let fnName = path.parentPath.get('id')//.toString()


        let functionExpression = types.functionExpression(fnName, params, fnBody, false, false)

        // const newNode = template(
        //     `var _this = this`
        // );

        console.log(functionExpression, '222')

        // const newNode = types.variableDeclaration('var',
        //  [types.variableDeclaration(types.identifier('_this'), types.thisExpression())])
        // path.replaceWithMultiple([functionExpression])

        // path.replaceWith(functionExpression)

        // let node = path.node
        // let id = path.parent.id
        // let params = node.params

        // let functionExpression = types.functionExpression(id, params, node.body, false, false)
        // // console.log(functionExpression.toString(), '222')
        // path.replaceWithMultiple([functionExpression])

    },
    ThisExpression(path) {
        // if(types.isVariableDeclaration(path) && path.node.kind === 'const'){
        path.replaceWith(types.identifier('_this'))
        // }
    }
})
const result = generate(ast);
console.log(result.code, 'result');