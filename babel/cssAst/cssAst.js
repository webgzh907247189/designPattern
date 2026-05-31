const fs = require('fs')
const path = require('path')
const cssTree = require('css-tree')

let cssFilePath = path.posix.resolve(__dirname, 'input.css')


const transFormToRem = (cssFilePath) => {
    let cssString = fs.readFileSync(cssFilePath, 'utf8')

    let cssAstTree = cssTree.parse(cssString)

    // 遍历语法树的所有节点，并且对 每个节点调用函数，并传入node
    cssTree.walk(cssAstTree, (node) => {
        if(node.unit === 'px' && node.type === 'Dimension'){
            node.value = node.value / 75
            node.unit = 'rem'
        }
    })

    let output = cssTree.generate(cssAstTree)

    fs.writeFileSync(path.posix.join(__dirname, 'output.css'), output, ()=> {
        console.log('write success')
    })
}


transFormToRem(cssFilePath)