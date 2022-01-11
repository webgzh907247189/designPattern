// webpack
// https://astexplorer.net/


const fs = require('fs');
const path = require('path');

const types = require('babel-types') // 处理类型
const parser = require('@babel/parser'); // 把源代码转为抽象语法树

const traverse = require('@babel/traverse').default; // 遍历语法树
const generate = require('@babel/generator').default; // 把语法树生成 源代码


const baseDir = process.cwd();
const entry = path.join(baseDir, 'src/index.js')

let modules = [] // 里面放对是 被编译的所有模块
function buildModule(absolutePath){
    console.log(absolutePath, 'absolutePath');
    const body = fs.readFileSync(absolutePath, 'utf-8')

    // 把源代码转为抽象语法树
    const ast = parser.parse(body, {
        sourcetype: 'module'
    })
    // 从第一个参数的路径 到 第二个参数的 相对路径  -> webpack 里面模块 id 都是相对路径
    const moduleId = './' + path.relative(baseDir, absolutePath)
    const module = { id: moduleId, deps: []} // 模块对象

    traverse(ast, {
        CallExpression({ node }){
            if(node.callee.name === 'require'){
                node.callee.name = '__webpack_require__'
                let moduleName = node.arguments[0].value
                const dirname = path.dirname(absolutePath)
                const depPath = path.join(dirname, moduleName)
                const depModuleId = './' + path.relative(baseDir, depPath)
                // console.log(depModuleId, 'depModuleId');
                node.arguments = [types.stringLiteral(depModuleId)]
                module.deps.push(buildModule(depPath))
            }
        }
    })

    let { code } = generate(ast)
    module._source = code
    modules.push(module)
    return module
}

let entryModule = buildModule(entry)
let content = `
    (function(modules){
        function __webpack_require__(moduleId){
            var module = {
                i: moduleId,
                exports: {},
            }
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
            return module.exports;
        }

        return __webpack_require__("${entryModule.id}")
    })({
        ${
            modules.map((module) => {
                return `"${module.id}": function(module, exports, __webpack_require__){\r\n${module._source} \r\n}, \r\n`
            }).join('')
        }
    })
`

fs.writeFileSync('./dist/bundle.js', content)



// require('./title')
// {
//     "type": "Program",
//     "start": 0,
//     "end": 18,
//     "body": [
//       {
//         "type": "ExpressionStatement",
//         "start": 0,
//         "end": 18,
//         "expression": {
//           "type": "CallExpression",
//           "start": 0,
//           "end": 18,
//           "callee": {
//             "type": "Identifier",
//             "start": 0,
//             "end": 7,
//             "name": "require"
//           },
//           "arguments": [
//             {
//               "type": "Literal",
//               "start": 8,
//               "end": 17,
//               "value": "./title",
//               "raw": "'./title'"
//             }
//           ],
//           "optional": false
//         }
//       }
//     ],
//     "sourceType": "module"
//   }