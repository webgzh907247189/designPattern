/**
 * 尽可能减少操作
 */

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');


const sourceCode = `const add = (a, b)  => {
    console.log(this);
    return a + b
}`

let ast = parser.parse(sourceCode);

// path.node 当前 AST 节点
traverse(ast, {
    ArrowFunctionExpression(path){
        if(types.isArrowFunctionExpression(path)){
            path.node.type = 'FunctionExpression'
        }
        hoistFcuntionEnvironment(path);


        //  enter
        // if(path.node.kind === 'const'){
        //     path.node.kind = 'var'
        // }
        // if(types.isVariableDeclaration(path) && path.node.kind === 'const'){
        //     path.node.kind = 'var'
        // }
    },
    VariableDeclaration(path){
        if(types.isVariableDeclaration(path) && path.node.kind === 'const'){
            path.node.kind = 'var'
        }
    }
})
const result = generate(ast);
console.log(result.code, 'result');


function hoistFcuntionEnvironment(path) {
    const thisEnvFn = path.findParent((f) => {
        return (f.isFunction() && !f.isArrowFunctionExpression()) || f.isProgram()
        // return (types.isFcuntion(f) && !types.isArrowFunctionExpression(f)) || types.isProgram(f)
    })

    let thisPaths = getScopeIncode(path)

    if(thisPaths.length > 0){
        let thisBinding = '_this'
        let _thisIdentifier = types.identifier(thisBinding)

        // var newNode = types.variableDeclaration(_thisIdentifier, types.thisExpression())

        thisEnvFn.scope.push({
            type: 'VariableDeclaration',
            id: _thisIdentifier,
            init: types.thisExpression(),
        })
        thisPaths.forEach((thispath) => {
            thispath.replaceWith(_thisIdentifier)
        })
    }
}

function getScopeIncode(node){
    let thisPaths = []
    node.traverse({
        ThisExpression(thisPath){
            thisPaths.push(thisPath)
        }
    })
    return thisPaths
}