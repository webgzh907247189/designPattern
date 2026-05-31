const acorn = require('acorn');

let sourceCode = `import $ from 'jquery'`

// acorn 只负责把代码转为ast
const ast = acorn.parse(sourceCode, {
    locations: true,
    ranges: true,
    sourceType: 'module',
    ecmaVersion: 8
})

let ident = 0
const padding = () => ' '.repeat(ident)
ast.body.forEach(statement => {
    walk(statement, {
        enter(node, parent){
            if(node && node.type){
                console.log(padding() + node.type)
                ident += 2
            }
        },
        leave(node){
            if(node && node.type){
                ident -= 2
                console.log(padding() + node.type)
            }
        }
    })
});

// ImportDeclaration
//   ImportDefaultSpecifier
//   ImportDefaultSpecifier
//   Literal
//   Literal
// ImportDeclaration

function walk(statement, { enter, leave }){
    visit(statement, null ,enter, leave)
}

function visit(node, parent ,enter, leave){
    if(enter){
        enter(node)
    }

    // let keys = Reflect.ownKeys(node).filter(key => typeof node[key] === 'object')
    // let keys = Object.keys(node).filter(key => typeof node[key] === 'object')
    let keys = Object.keys(node).filter(key =>  key === 'source' || key === 'specifiers')
    keys.forEach((key) => {
        let children = node[key]
        if(Array.isArray(children)){
            children.forEach((child) => {
                visit(child,null, enter, leave)
            })
        }else if(children && children.type){
            visit(children, null, enter, leave)
        }
    })

    if(leave){
        leave(node)
    }
}