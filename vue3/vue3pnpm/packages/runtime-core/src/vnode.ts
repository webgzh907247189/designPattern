import { isArray, isString, ShapeFlags } from "@vue/shared"
export const TEXT = Symbol('text')


export const isSameVnode = (oldVnode, newVnode) => {
    return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type
}


// vue2 vue3 vnode 有什么区别 ，没有 shapeFlag的时候怎么做的 ???

// 1. 先用 shapeFlag 表示自己元素的类型
// 2. 在拿到 children 的 类型
// 3. 通过 children的类型 & 自己的元素类型进行运算， 拿到最终的 shapeFlag 代表 (自己 + children)
export const createVnode = (type, props, children = null) => {
    debugger
    // 组合方案 shapeFlag
    let shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0

    // shapeFlag 标识 自己 和 children 的 类型(多个儿子还是一个儿子)
    // a|b = c 
    // c&b > 0 有 b  
    // c&b == 0 没有b
    const vnode = {
        __v_isVnode: true,
        shapeFlag,
        type,
        props,
        children,
        key: props?.key,
        el: null, // ******** 虚拟节点上对应的 真实的节点 ， 服务于后续 diff 算法 ********
    }
    // 用新的 props 更新老的 vnode.props 之后，在批量更新到 vnode.el 上面
    // const newVode = {props: 'xx', el: 'xx'}
    // const oldVode = {props: 'yy', el: 'yy'}

    // a|b = c 
    // c&b > 0 有 b  
    // c&b == 0 没有b
    if(children){
        let type = 0
        if(isArray(children)){
            type = ShapeFlags.ARRAY_CHILDREN
        }else{
            children = String(children)
            type = ShapeFlags.TEXT_CHILDREN
        }

        vnode.shapeFlag = vnode.shapeFlag | type
        // vnode.shapeFlag |= type
    }
    return vnode
}


export const isVnode = (value) => {
    return !!(value && value.__v_isVnode)
}   