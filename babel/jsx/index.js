// **********  遍历的时候只会遍历有 type 属性的节点  **********
// path 是一个对象，表示两个节点的连接

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');


const sourceCode = 'function ast(){}';

const ast = parser.parse(sourceCode);


// 进入 FunctionDeclaration 和 VariableDeclaration 节点时调用
// traverse(ast, {
//     'FunctionDeclaration|VariableDeclaration'(path, state) {}
// })

// path.node 指向当前 AST 节点
// path.parent 指向父级 AST 节点
// path.find 从当前节点向上查找节点
// path.scope 获取当前节点的作用域信息
// path.skip 跳过当前节点的子节点的遍历
// path.stop 结束后续遍历

let indent = 0;
const padding = () => "  ".repeat(indent)
traverse(ast, {
    enter(path){
        console.log(padding() + '进入', path.node.type)
        if(types.isFunctionDeclaration(path.node)){
            path.node.id.name = 'testBabel'
        }
        indent += 2
    },
    exit(path){
        indent -= 2
        console.log(padding() + '离开', path.node.type)
    }
})

const result = generate(ast);
console.log(result, 'result');
// { code: 'function testBabel() {}', map: null, rawMappings: undefined } result


// {
//     type: 'Program',
//     body: [
//         {
//             type: 'FunctionDeclaration',
//             id: {
//                 type: 'Identifier',
//                 name: 'ast'
//             },
//             body: {
//                 type: 'BlockStatement'
//             }
//         }
//     ]
// }