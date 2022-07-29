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
const template = require('@babel/template').default;


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
        // if (types.isMemberExpression(path.node.callee) && path.node.callee.object.name === 'console' && ['log', 'info', 'debug', 'error'].includes(path.node.callee.property.name)) {
        //     const { line, column } = path.node.loc.start;
        //     // 1.
        //     // let newNode = types.stringLiteral(`filename, line: ${line}, column: ${column}`)
        //     // let oldNode = path.get('arguments.0').node;
        //     // path.node.arguments =  [newNode, oldNode]


        //     // 2
        //     let newNode = types.stringLiteral(`filename, line: ${line}, column: ${column}`)
        //     let oldNode = path.get('arguments.0').node;
        //     // path.get('arguments.0').replaceWithMultiple([newNode, oldNode])
        //     path.get('arguments.0').insertBefore(newNode)


        //     // 3
        //     // let newNode = types.stringLiteral(`filename, line: ${line}, column: ${column}`)
        //     // path.node.arguments.unshift(newNode)
        // }

        // 简化判断
        // const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);
        // if (types.isMemberExpression(path.node.callee) && targetCalleeName.includes(path.get('callee').toString())) {
        //     const { line, column } = path.node.loc.start;
        //     let newNode = types.stringLiteral(`filename, line: ${line}, column: ${column}`)
        //     path.node.arguments.unshift(newNode)
        // }



        // 需求变更
        // 新的节点替换了旧的节点之后，插入的节点也是 console.log，也会进行处理，这是没必要的，所以要跳过新生成的节点的处理
        if (path.node.isNew) {
            return;
        }
        
        const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);
        if (types.isMemberExpression(path.node.callee) && targetCalleeName.includes(path.get('callee').toString())) {
          
            const { line, column } = path.node.loc?.start;

            let newNode = template.expression(`console.log("filename: (${line}, ${column})")`)();
            newNode.isNew = true;

            if (path.findParent(path => path.isJSXElement())) {
                path.replaceWith(types.arrayExpression([newNode, path.node]))
                // path.skip 跳过新节点的遍历
                path.skip(); 
            } else {
                path.insertBefore(newNode);
            }
        }
    }
});

const { code, map } = generate(ast);
console.log(code);