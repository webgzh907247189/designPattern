import { isString, ShapeFlags } from "@vue/shared"

export const createVnode = (type, props, children?) => {
    const shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0
    const vnode = {
        __v_isVnode: true,
        type,
        props,
        children,
        key: props?.key,
        el: null, // 虚拟节点对应的 真是节点 DOM
        shapeFlag
    }

    if(children){
        if(Array.isArray(children)){
            // vnode.shapeFlag = vnode.shapeFlag | ShapeFlags.ARRAY_CHILDREN
            vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
        }else{
            children = String(children)
            // vnode.shapeFlag = vnode.shapeFlag | ShapeFlags.TEXT_CHILDREN
            vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
        }
    }
    return vnode
}

export const isVnode = (value) => {
    return value?.__v_isVnode
}


export const isSameVnode = (n1, n2) => {
    return !!(n1.type === n2.type && n1.key === n2.key)
}
