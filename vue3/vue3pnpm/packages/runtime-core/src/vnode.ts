import { isArray, isFunction, isNumber, isObject, isString, ShapeFlags } from "@vue/shared"
import { isTeleport } from "./teleport"
export const TEXT = Symbol('text')
export const FRAGEMENT = Symbol('fragment')


export const isSameVnode = (oldVnode, newVnode) => {
    return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type
}


// 本质上 h 方法就是对 createVnode 的封装 --->  createVnode 一定需要三个参数, element props children
// 本质上 h 方法就是对 createVnode 的封装 --->  createVnode 一定需要三个参数, element props children
// 本质上 h 方法就是对 createVnode 的封装 --->  createVnode 一定需要三个参数, element props children


// vue2 vue3 vnode 有什么区别 ，没有 shapeFlag的时候怎么做的 ???

// 1. 先用 shapeFlag 表示自己元素的类型
// 2. 在拿到 children 的 类型
// 3. 通过 children的类型 & 自己的元素类型进行运算， 拿到最终的 shapeFlag 代表 (自己 + children)

// _createElementVNode 第4个参数 大于 0 都是动态节点
export const createVnode = (type, props, children = null, pathchFlag = 0) => {
    // debugger
    // 组合方案 shapeFlag
    // type 是对象 说明当前的 vnode 是 普通组件 (后续更新 -> 也可能是 Teleport 组件)
    // type 是函数 说明当前的 vnode 是函数式组件
    let shapeFlag = isString(type) ? ShapeFlags.ELEMENT : isObject(type) ? isTeleport(type) ? ShapeFlags.TELEPORT :  ShapeFlags.STATEFUL_COMPONENT : isFunction(type) ? ShapeFlags.FUNCTIONAL_COMPONENT : 0

    // shapeFlag 标识 自己 和 children 的 类型(多个儿子还是一个儿子)
    // a|b = c 
    // c&b > 0 有 b  
    // c&b == 0 没有b
    const vnode = {
        __v_isVnode: true, // 表示是不是一个虚拟节点
        shapeFlag,
        type,
        props,
        children,
        key: props?.key,
        el: null, // ******** 虚拟节点上对应的 真实的节点 ， 服务于后续 diff 算法 ********

        pathchFlag,
        dynamicChildren: null,
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
        }else if(isObject(children)){
            // children 是对象，表示是一个插槽
            type = ShapeFlags.SLOTS_CHILDREN
        }else{
            children = String(children)
            // vnode.children = children

            type = ShapeFlags.TEXT_CHILDREN
        }

        vnode.shapeFlag = vnode.shapeFlag | type
        // vnode.shapeFlag |= type
    }

    // currentBlock 有值，说明运行了 _openBlock() 函数 , 当前 currentBlock 应该收集 子节点
    if(currentBlock && pathchFlag > 0){
        currentBlock.push(vnode)
    }

    return vnode
}


// 表示是不是一个虚拟节点
export const isVnode = (value) => {
    return !!(value && value.__v_isVnode)
}   

/**
 * 位运算案例
 */


// 权限的组合可以使用 | 的方式
/**
 * 001 = 1  普通用户的权限
 * 010 = 2  管理员的权限
 * 100 = 4  超级管理员的权限
 * 
 * 
 * 一个角色的权限运算出来是: 011    (由 001 | 010 运算得来)
 * 
 * 011 & 001 > 0  说明包含   普通用户的权限
 * 011 & 010 > 0  说明包含   管理员的权限
 * 011 & 100 <= 0  说明不包含  超级管理员的权限
 */


export const _toDisplayString = (val) => {
    if(isObject(val)){
        return JSON.stringify(val)
    }

    if(isString(val)){
        return val
    }

    if(val === null){
        return ''
    }

    return String(val)
}


export let currentBlock = null
export const _openBlock = () => {
    currentBlock = [] // 收集动态节点
}


export const _createElementBlock = (type, props?, children?, patchFlag?) => {
    // 需要根据传入的参数 创建虚拟节点， 并在在 vnode 上增加 dynamicChildren 来收集
    const vnode = createVnode(type, props, children, patchFlag)
    vnode.dynamicChildren = currentBlock

    currentBlock = null
    return vnode
}

// 模版编译后， vue 内部做了 patchFlag优化，直接用 h() 不具备patchFlag优化的 (_openBlock() 优化就会失效) 
// 采用 就是想编写 vue 相关代码 不具备优化， 只有通过 .vue文件编写 template ---> 才享受到 patchFlag优化

export { createVnode as _createElementVNode }


export const enum PATCHFLAGS {
    TEXT = 1,
    CLASS = 1 << 1, // 2 动态class
    STYLE = 1 << 2, // 4 动态 style
    PROPS = 1 << 3, // 8 除了class | style 的动态属性
    FULL_PROPS = 1 << 4, // 16  有key 需要完整diff
}