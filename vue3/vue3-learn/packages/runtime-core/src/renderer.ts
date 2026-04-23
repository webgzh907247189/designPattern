import { ShapeFlags } from '@vue/shared'
import { container } from 'webpack';
import { isSameVnode } from './createVode';

export function createRenderer(renderOptions) {
    const {
        insert: hostInsert,
        // 删除节点
        remove: hostRemove,
        // 文本节点
        // 元素节点动态变更
        setElementText: hostSetElementText,
        setText,hostSetText,
        parentNode: hostParentNode,
        nextSibiling: hostNextSibiling,
        createElement: hostCreateElement,
        createText: hostCreateText,
        patchProps: hostPatchProps
    } = renderOptions

    const mountChildren = (children, container) => {
        for (let index = 0; index < children.length; index++) {
            const element = children[index];
            patch(null, element, container)
        }
    }

    const mountElement = (vnode, container, anchor) => {
        const { type, children, shapeFlag, props } = vnode

        let el = hostCreateElement(type)
        // vnode 对象挂载真实的 dom ----> el
        vnode.el = el

        if(props){
            for (const key in props) {
                hostPatchProps(el, key, null, props[key])
            }
        }

        // 9 & 8 > 0 -->  说明是文本
        if(shapeFlag & ShapeFlags.TEXT_CHILDREN){
            hostSetElementText(el, children)
        }else if(shapeFlag & ShapeFlags.ARRAY_CHILDREN){
            mountChildren(children, el)
        }
        
        hostInsert(el, container, anchor)
    }
    const processElement = (n1, n2, container, anchor) => {
        // 第一次渲染
        if(n1 === null){
            mountElement(n2, container, anchor)
        }else{
            patchElement(n1, n2 ,container)
        }
    }

    // 第一次渲染走这里，后续更新也是走这个方法
    const patch = (n1, n2, container, anchor = null) => {
        if(n1 === n2) return

        if(n1 && !isSameVnode(n1, n2)){
            unmount(n1)
            n1 = null
        }
        processElement(n1, n2, container, anchor)
    }

    const render = (vnode, container) => {
        console.log(vnode, container)
        // debugger
        if(vnode === null){
            // 移除当前容器中的dom元素
            if(container._vnode){
                console.log(container._vnode, 'container._vnode')
                unmount(container._vnode)
            }
        }
        patch(container._vnode ?? null, vnode, container)
        container._vnode = vnode
    }

    const unmount = (vnode) => {
        return hostRemove(vnode.el)
    }

    const patchElement = (n1, n2 ,container) => {
        let el = n2.el = n1.el // 对 dom 进行复用

        let oldProps = n1.props ?? {}
        let newProps = n2.props ?? {}

        patchProps(oldProps, newProps, el)
        patchChildren(n1, n2, el)
    }

    const patchProps = (oldProps, newProps, el) => {
        for (const key in newProps) {
            hostPatchProps(el, key, oldProps[key], newProps[key])
        }

        for (const key in oldProps) {
            if(!(key in newProps)){
                hostPatchProps(el, key, oldProps[key], null)
            }
        }
    }

    const patchChildren = (n1, n2, el) => {
        // children 三种情况 text array null
        const c1 = n1.children
        const c2 = n2.children

        const prevFlag = n1.shapeFlag
        const shapeFlag = n2.shapeFlag


        // 3 * 3 = 9 一共9种情况
        // 新       旧          操作
        // 文本     数组        删除老的 chilren，设置文本内容
        // 文本     文本        更新文本内容
        // 文本     空          更新文本内容
        // 数组     数组        diff 算法
        // 数组     文本        清空文本，进行挂载
        // 数组     空          进行挂载
        // 空       数组        删除所有的 children
        // 空       文本        清空文本
        // 空       空          无需处理

        // 文本 + 数组 -> 删除老的vnode 所有的 子节点
        // 文本 + 文本
        // 文本 + 空
        if(shapeFlag & ShapeFlags.TEXT_CHILDREN){
            // debugger
            // 老的是数组
            // 先删除，在给之前的节点的 父节点上面挂载 newChildren 
            if(prevFlag & ShapeFlags.ARRAY_CHILDREN){
                unmountChildren(c1) // 删除所有的子节点
            }

            // 先删除，在给之前的节点的 父节点上面挂载 newChildren 
            if(c1 !== c2){
                hostSetElementText(el, c2)
            }
        }else{
            // 进入到了 else， 说明新节点现在 为 空 或者 数组的情况

            // 新     老
            // 数组 + 数组
            // 空   + 数组
            // 文本 + 数组 (这种情况，上面已经处理过了)
            
            if(prevFlag & ShapeFlags.ARRAY_CHILDREN){
                if(shapeFlag & ShapeFlags.ARRAY_CHILDREN){
                    // debugger
                    // diff 算法
                    patchKeydChildren(c1, c2, el)
                }else{
                    // 之前是数组， 现在不是数组 (现在的可能性: 空)
                    unmountChildren(c1)
                    // hostSetElementText(el, newChildren)
                }
            }else{
                // debugger
                // 新      老
                // 数组  +  空
                // 数组  +  文本
                // 空    +  文本
                if(prevFlag & ShapeFlags.TEXT_CHILDREN){
                    hostSetElementText(el, '') // 清空文本
                }
                // 挂载 新的数组
                if(shapeFlag & ShapeFlags.ARRAY_CHILDREN){
                    mountChildren(c2, el)
                }
            }
        }

    }

    const patchKeydChildren = (oldChildren, newChildren, el) => {
        // 1. 减少对比范围，先从头开始对比，在尾部开始对比
        // 这个方法的 两个 while 都是尽可能复用 新老两个节点

        // diff 场景1
        // 到 c 的位置对比终止了，到 d 的位置终止
        // [a,b,c]
        // [a,b,d,e]
        // console.log(i, e1, e2) // 2 2 3

        let i = 0;
        let e1 = oldChildren.length - 1
        let e2 = newChildren.length - 1

        // 有任何一方循环结束了，就要终止对比
        while(i <= e1 && i <= e2){
            const n1 = oldChildren[i]
            const n2 = newChildren[i]
            if(isSameVnode(n1, n2)){
                patch(n1, n2, el) // 递归比较当前节点的属性和 children 
            }else{
                break;
            }
            i++;
        }
        console.log(i, e1, e2) // 2 2 3



        // 有任何一方循环结束了，就要终止对比
        // diff 场景2
        // 到 a 的位置对比终止了，到 d 的位置终止
        // [a,b,c]
        // [d,e,b,c]
        // console.log(i, e1, e2) // 0 0 1

        // [a,b,c]
        // [d,a,b,c]
        // console.log(i, e1, e2) // 0 -1 0
        while(i <= e1 && i <= e2){
            const n1 = oldChildren[e1]
            const n2 = newChildren[e2]
            if(isSameVnode(n1, n2)){
                patch(n1, n2, el) // 递归比较当前节点的属性和 children 
            }else{
                break;
            }
            e1--
            e2--
        }
        console.log(i, e1, e2) // 0 0 1


        // [a, b]
        // [a, b, c]
        // i: 2; e1: 1; e2: 2;
        
        // [   a, b]
        // [c, a, b]
        // i: 0; e1: -1; e2: 0;

        // 新增case
        if(i > e1){
            if(i <= e2){ // 有插入的部分
                let nextPos = e2 + 1 // 查看当前下一个元素是否存在
                let anchor = newChildren[nextPos]?.el

                // 新增节点的情况
                while(i <= e2){
                    patch(null, newChildren[i], el, anchor)
                    i++
                }
            }
        }



        // [a, b, c]
        // [a, b]
        // i: 2; e1: 2; e2: 1;  ----> i>e2  i<=e1

        // [c, a, b]
        // [   a, b]
        // i: 0; e1: 0; e2: -1;  ----> i>e2  i<=e1
        // 删除case
        else if(i>e2){  
            if(i<=e1){
                while(i<=e1){
                    unmount(oldChildren[i])
                    i++
                }
            }
        }else{
            console.log(i, e1, e2)

            let s1 = i;
            let s2 = i;

            // 做一个映射表用于快速查找，看老的是否在新的里面还存在，没有就删除，有的话就更新
            const keyToNewIndexMap = new Map();
            for (let i = s2; i <= e2; i++) {
                const vnode = newChildren[i];
                keyToNewIndexMap.set(vnode.key, i)
            }

            for (let i = s1; i <= e1; i++) {
                const vnode = oldChildren[i];
                const newIndex = keyToNewIndexMap.get(vnode.key)

                // 如果新的map 里面找不到老的，需要删除老的vnode
                if(newIndex === undefined){
                    unmount(vnode)
                }else{
                    patch(vnode, newChildren[newIndex], el)
                }
            }

            // 经过上面的运算， 新旧节点对比之后，----> 老的节点中不需要的节点都已经被删除了
            // 调整顺序，倒叙插入
            // [a, b,   c, d, e,    f, g] 
            // [a, b,   e, c, d, h, f, g] 
            // console.log(i, e1, e2) ------>  2 4 5
            let toBePatch = e2 - s2 + 1 // 倒叙插入的个数
            debugger
            for (let i = toBePatch - 1; i >= 0; i--) {
                let newIndex = s2 + i;
                let anchor = newChildren[newIndex+1]?.el
                const vnode = newChildren[newIndex]

                if(!vnode.el){
                    patch(null, vnode, el, anchor)
                }else{
                    hostInsert(vnode.el, el, anchor)
                }
            }
        }

    }

    const unmountChildren = (oldChildren) => {
        for (let index = 0; index < oldChildren.length; index++) {
            const elementVnode = oldChildren[index];
            unmount(elementVnode);
        }
    }

    return {
        render
    }
}