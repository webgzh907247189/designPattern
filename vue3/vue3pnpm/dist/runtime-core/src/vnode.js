import { isArray, isString } from "@vue/shared";
export const TEXT = Symbol('text');
export const isSameVnode = (oldVnode, newVnode) => {
    return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type;
};
// vue2 vue3 vnode 有什么区别 ，没有 shapeFlag的时候怎么做的 ???
export const createVnode = (type, props, children = null) => {
    debugger;
    // 组合方案 shapeFlag
    let shapeFlag = isString(type) ? 1 /* ShapeFlags.ELEMENT */ : 0;
    // shapeFlag 标识 自己 和 children 的 类型(多个儿子还是一个儿子)
    // a|b = c 
    // c&b > 0 有 b  
    // c&b == 0 没有b
    const vnode = {
        _v_isVnode: true,
        shapeFlag,
        type,
        props,
        children,
        key: props === null || props === void 0 ? void 0 : props.key,
        el: null, // 虚拟节点上对应的 真实的节点 ， 服务于后续 diff 算法
    };
    // 用新的 props 更新老的 vnode.props 之后，在批量更新到 vnode.el 上面
    // const newVode = {props: 'xx', el: 'xx'}
    // const oldVode = {props: 'yy', el: 'yy'}
    // a|b = c 
    // c&b > 0 有 b  
    // c&b == 0 没有b
    if (children) {
        let type = 0;
        if (isArray(children)) {
            type = 16 /* ShapeFlags.ARRAY_CHILDREN */;
        }
        else {
            children = String(children);
            type = 8 /* ShapeFlags.TEXT_CHILDREN */;
        }
        vnode.shapeFlag = vnode.shapeFlag | type;
        // vnode.shapeFlag |= type
    }
    return vnode;
};
export const isVnode = (value) => {
    return !!(value && value._v_isVnode);
};
//# sourceMappingURL=vnode.js.map