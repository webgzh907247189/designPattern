
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');


const sourceCode = `class person{
    constructor(name){
        this.name = name
    }

    getName(){
        return this.name
    }
}`

let ast = parser.parse(sourceCode);

// path.node 当前 AST 节点
traverse(ast, {
    ClassDeclaration(path){
        let {id} = path.node;
        let node = path.node

        let classMethods = node.body.body
        const nodes = []
        classMethods.forEach((classMethod) => {
            if(classMethod.kind === 'constructor'){
                let constructorFn = types.functionDeclaration(id, classMethod.params, classMethod.body, classMethod.generator, classMethod.async)
                nodes.push(constructorFn)
            }else{
                let memberExpression = types.memberExpression(types.memberExpression(id, types.identifier('propertype')), classMethod.key)
                let functionExpression =  types.FunctionExpression(null, classMethod.params, classMethod.body, classMethod.generator, classMethod.async);
                const assignmentExpression = types.assignmentExpression('=', memberExpression, functionExpression)
                nodes.push(assignmentExpression)
            }
        })
        // 替换多个节点的操作
        path.replaceWithMultiple(nodes)
    }
})
const result = generate(ast);
console.log(result.code, 'result');
