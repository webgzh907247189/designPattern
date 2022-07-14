// const { codeFrameColumns } = require("@babel/code-frame");

// try {
//  throw new Error("xxx 错误");
// } catch (err) {
//   console.error(codeFrameColumns(`const name = guang`, {
//       start: { line: 1, column: 14 }
//   }, {
//     highlightCode: true,
//     message: err.message
//   }));
// }



const parser = require('@babel/parser');
const types = require('@babel/types');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const sourceCode = `
    console.log(1);

    function func() {
        console.info(2);
    }

    export default class Clazz {
        say() {
            console.debug(3);
        }
        render() {
            return <div>{console.error(4)}</div>
        }
    }
`;

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    // module：解析 es module 语法
    // script：不解析 es module 语法
    // unambiguous：根据内容是否有 import 和 export 来自动设置 module 还是 script

    plugins: ['jsx'] // 用到了 jsx 的语法，所以 parser 要开启 jsx 的 plugin
});

traverse(ast, {
    CallExpression(path, state) {
        if (types.isMemberExpression(path.node.callee) && path.node.callee.object.name === 'console' && ['log', 'info', 'debug', 'error'].includes(path.node.callee.property.name)) {
            const { line, column } = path.node.loc.start;
            let newNode = types.stringLiteral(`filename, line: ${line}, column: ${column}`)
            let oldNode = path.get('arguments.0').node;

            path.get('arguments.0').replaceWithMultiple([newNode, oldNode])
            // path.get('arguments.1').replaceWith(oldNode)

            // 2
            // let newNode = types.stringLiteral(`filename, line: ${line}, column: ${column}`)
            // let oldNode = path.get('arguments.0').node;

            // var s =path.get('arguments')
            // s.replaceWith(newNode)

            // 3
            // let newNode = types.stringLiteral(`filename, line: ${line}, column: ${column}`)
            // path.node.arguments.unshift(newNode)
        }
    }
});

const { code, map } = generate(ast);
console.log(code);