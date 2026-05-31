
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

export default walk;