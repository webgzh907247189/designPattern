const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');
const template = require('@babel/template');

const sourceCode = `
export class A{
    getname(){
        return 'name'
    }

    render() {
        return <div>{console.error(4)}</div>
    }
};
console.log(1);

export default function Test(){
    console.log('test')
};
`;

// parser 需要指定代码是不是包含 import、export 等，需要设置 moduleType 为 module 或者 script，我们干脆设置为 unambiguous，让它根据内容是否包含 import、export 来自动设置 moduleType。
const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['jsx']
});

// traverse(ast, {
//     CallExpression(path, state) {
//         // path.node 指向当前 AST 节点
//         if ( types.isMemberExpression(path.node.callee) && path.node.callee.object.name === 'console' && ['log', 'info', 'error', 'debug'].includes(path.node.callee.property.name) ) {
//             const { line, column } = path.node.loc.start;
//             // console.log(line, column, 'line, column');
//             path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`))
//         }
//     }
// });


// const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);
// traverse(ast, {
//     CallExpression(path, state) {
//         const calleeName = generate(path.node.callee).code;
//         console.log('calleeName', calleeName)

//         if (targetCalleeName.includes(calleeName)) {
//             const { line, column } = path.node.loc.start;
//             path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`))
//         }
//     }
// });


const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);
traverse(ast, {
    CallExpression(path, state) {
        if (path.node.isNew) {
            return;
        }
        const calleeName = generate(path.node.callee).code;
         if (targetCalleeName.includes(calleeName)) {
            const { line, column } = path.node.loc.start;
            const newNode = template.expression(`console.log("filename: (${line}, ${column})")`)();
            newNode.isNew = true;

            if (path.findParent(path => path.isJSXElement())) {
                path.replaceWith(types.arrayExpression([newNode, path.node]))
                path.skip();
            } else {
                // console.log(path, 'path');
                path.insertBefore(newNode);
            }
        }
    }
});

const { code, map } = generate(ast);
console.log(code);