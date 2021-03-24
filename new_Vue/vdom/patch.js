export function render(vnode,container){
    // console.log(vnode,container)
    let el = createEle(vnode)
    container.appendChild(el)
    return el;
}


function createEle(vnode){
    let {tag, props, key, children, text} = vnode
    if (typeof tag === 'string') {
        vnode.el = document.createElement(tag)
        updateProperties(vnode);
        children.forEach(item => {
            render(item,vnode.el)
        });
    } else {
        vnode.el =  document.createTextNode(text)
    }

    return vnode.el
}


function updateProperties(vnode, oldProps = {}){
    let newProps = vnode.props || {};
    let el = vnode.el

    let newStyle = newProps.style || {}
    let oldStyle = oldProps.style || {}

    for(let key in oldStyle){
        if(!newStyle[key]){
            el.style[key] = ''
        }
    }

    for(let key in oldProps){
        if(!newProps[key]){
            delete el[key]
        }
    }

    for(let key in newProps){
        if(key === 'style'){
            for(let styleItem in newProps['style']){
                el.style[styleItem] = newProps['style'][styleItem]
            }
        } else if(key === 'class'){
            el['className'] = newProps['class']
        } else {
            el[key] = newProps[key]
        }
    }
}

// 索引作为key？？
export function patch(oldVnode, newVnode){
    // 标签不一样，直接用新的换掉老的
    if(oldVnode.tag !== newVnode.tag){
        oldVnode.el.parentNode.replaceChild(createEle(newVnode), oldVnode.el)
    }

    // 此处是文本节点， 上面的条件已经保证了 tag 一致
    if(!oldVnode.tag){
        console.log(oldVnode.text, newVnode.text)
        if(oldVnode.text !== newVnode.text){
            oldVnode.el.textContent = newVnode.text
        }
    }

    let el = newVnode.el = oldVnode.el
    // 比较属性
    updateProperties(newVnode, oldVnode.props)

    // 比较孩子
    let oldChildren = oldVnode.children || []
    let newChildren = newVnode.children || []

    // 老的有孩子，新的有
    if(oldChildren.length > 0 && newChildren.length > 0 ){
        updateChildren(el, oldChildren, newChildren)
    // 老的有孩子，新的没有
    } else if(oldChildren.length > 0){
        el.innerHtml = ''
    // 老得没有，新的有
    } else if(newChildren > 0){
        for(let i = 0; i> newChildren.length; i++){
            let child = newChildren[i]
            // 转为 dom，插入
            el.appendChild(createEle(child))
        }
    }

    return el;
}

// 双指针比较
// 头头比较，尾巴尾巴比较
function updateChildren(parent, oldChildren, newChildren){
    // 老的节点
    let oldStartIndex = 0;
    let oldStartVnode = oldChildren[0]
    let oldEndIndex = oldChildren.length - 1
    let oldEndVnode = oldChildren[oldEndIndex]

    // 新的节点
    let newStartIndex = 0;
    let newStartVnode = newChildren[0]
    let newEndIndex = newChildren.length - 1
    let newEndVnode = newChildren[newEndIndex]

    function makeIndexByKey(children){
        let map  = {}
        children.forEach((item,idx) => {
            map[item.key] = idx
        })
    }
    let map = makeIndexByKey(oldChildren)

    // 双指针
    while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex){
        if(!oldStartVnode){
            oldStartVnode = oldChildren[++oldStartIndex]
        }else if(!oldEndVnode){
            oldEndVnode = oldChildren[--oldEndIndex]
        }
        // 从前往后以后
        else if(isSameVnode(oldStartVnode, newStartVnode)){
            // 更新属性
            patch(oldStartVnode,newStartVnode) //用新的替换老的
            oldStartVnode = oldChildren[++oldStartIndex]
            newStartVnode = newChildren[++newStartIndex]
        // 从后往前移动
        } else if(isSameVnode(oldEndVnode, newEndVnode)){
            // debugger
            patch(oldEndVnode,newEndVnode) //用新的替换老的
            oldEndVnode = oldChildren[--oldEndIndex]
            newEndVnode = newChildren[--newEndIndex]
        // 倒叙(交叉比较)
        // ABCD
        // DCBA
        } else if(isSameVnode(oldStartVnode, newEndVnode)){
            patch(oldStartVnode,newEndVnode)
            parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling)
            oldStartVnode = oldChildren[++oldStartIndex]
            newEndVnode = newChildren[--newEndIndex]
        // 老的尾和新的头
        // ABCD
        // DABC
        }else if(isSameVnode(oldEndVnode, newStartVnode)){
            patch(oldEndVnode,newStartVnode)
            parent.insertBefore(oldEndVnode.el, oldStartVnode.el)
            oldEndVnode = oldChildren[--oldEndIndex]
            newStartVnode = newChildren[++newStartIndex]
        // 列表乱序，不复用
        // ABCD
        // EAFCN
        // 头头不一样，尾巴尾巴不一样 (拿新的节点去老的节点查找，没有的话把新的插入进来。有的话，复用一下)
        // 1. 先查找E有没有，没有，先把E插入到老的最前面
        } else {
            let moveIndex = map[newStartVnode.key]
            // 在老的里面没有找到
            if(!moveIndex){
                parent.insertBefore(createEle(newStartVnode), oldStartVnode.el)
            }else{
                // 把新的移走，原来的位置赋值为 undefined
                let moveNode = oldChildren[moveIndex]
                patch(moveNode,newStartVnode)
                oldChildren[moveIndex] = undefined
                parent.insertBefore(moveNode.el,oldStartVnode.el)
            }
            // 新节点往后移动
            newStartVnode = newChildren[++newStartIndex]
        }
    }

    if(newStartIndex <= newEndIndex){
        for(let i = newStartIndex; i <= newEndIndex; i++){
            // insertBefore(xx, null) === appendChild
            let ele = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el 
            // parent.appendChild(createEle(newChildren[i]))

            // debugger
            parent.insertBefore(createEle(newChildren[i]), ele)
        }
    }

    if(oldStartIndex <= oldEndIndex){
        for(let i = oldStartIndex; i <= oldEndIndex; i++){
            let child = oldChildren[i]
            if(child != undefined){
                parent.removeChild(child.el)
            }
        }
    }
}


function isSameVnode(oldVnode, newVnode){
    return (oldVnode.tag === newVnode.tag) && (oldVnode.key === newVnode.key)
}