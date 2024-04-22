import { isString } from "@vue/shared";
import { createVnode, isSameVnode, TEXT } from "./vnode";
export const createRenderer = (renderOptions) => {
    const { insert: hostInsert, 
    // 删除节点
    remove: hostRemove, 
    // 文本节点
    // 元素节点动态变更
    setElementText: hostSetElementText, setText: hostSetText, querySelector: hostQuerySelector, parentNode: hostParentNode, nextSibiling: hostNextSibiling, createElement: hostCreateElement, createText: hostCreateText, patchProps: hostPatchProps } = renderOptions;
    // 替换老的 vnodelist
    const normalise = (children, idx) => {
        if (isString(children[idx])) {
            let vnode = createVnode(TEXT, null, children[idx]);
            children[idx] = vnode;
        }
        return children[idx];
    };
    const mountChildren = (children, container) => {
        for (let index = 0; index < children.length; index++) {
            // const elementVnode = children[index];
            let child = normalise(children, index);
            patch(null, child, container);
        }
    };
    // 1. 创造自己 元素
    // 2. 挂载 props
    // 3. 创建 children (children 两种，1. 文本 2.数组)
    // 4. 把自己挂载到 父元素
    const mountElement = (vnode, container, anchor) => {
        console.log(vnode, 'vnode');
        // debugger
        // vue2 是 tag, vue3 是 type
        let { type, props, children, shapeFlag } = vnode;
        // 把 真实的 dom 节点挂载到虚拟节点上， 后续用于复用节点
        let el = vnode.el = hostCreateElement(type);
        if (props) {
            for (const key in props) {
                hostPatchProps(el, key, null, props[key]);
            }
        }
        // 17 数组children;  9 字符串children
        //  8 & 17 (16 + 1 -> 8+x) -> 0b01000 & 0b10001 -> 0b 00000  0
        // 16 & 17 (16 + 1) -> 0b10000 & 0b10001 -> 0b 10000  16
        //  8 & 9 (8 + 1) -> 0b01000 & 0b01001 -> 0b 01000  8
        // 16 & 9 (8 + 1 -> 9+x) -> 0b10000 & 0b01001 -> 0b 00000  0
        if (8 /* ShapeFlags.TEXT_CHILDREN */ & shapeFlag) { // 文本
            hostSetElementText(el, children);
        }
        else if (16 /* ShapeFlags.ARRAY_CHILDREN */ & shapeFlag) { // 数组
            mountChildren(children, el);
        }
        // 子元素创建完成，在挂载 父元素
        hostInsert(el, container, anchor);
    };
    const patchProps = (oldProps, newProps, el) => {
        for (const key in newProps) {
            hostPatchProps(el, key, oldProps[key], newProps[key]);
        }
        for (const key in oldProps) {
            if (!newProps[key]) {
                hostPatchProps(el, key, oldProps[key], undefined);
            }
        }
    };
    const unmountChildren = (oldChildren) => {
        for (let index = 0; index < oldChildren.length; index++) {
            const elementVnode = oldChildren[index];
            unmount(elementVnode);
        }
    };
    // 使用下面这种方案，尽可能减少比较的内容
    // 先把特殊情况的拆出来， 尽可能减少比较多内容
    const patchKeydChildren = (oldChildren, newChildren, el) => {
        let i = 0;
        let oldChildrenLength = oldChildren.length - 1;
        let newChildrenLength = newChildren.length - 1;
        // ['a','b','c'] -> ['a','b','e', 'd'] 
        // 0  1  2
        // 0  1  2  3  
        // console.log(i, oldChildrenLength, newChildrenLength) 2 2 3
        // 从 2 -> 3 区间 是新增的
        // 谁先遍历结束， 以最先结束的为准
        // 使用下面这种方案，尽可能减少比较多内容
        while (i <= oldChildrenLength && i <= newChildrenLength) {
            const oldChildrenItem = oldChildren[i];
            const newChildrenItem = newChildren[i];
            if (isSameVnode(oldChildrenItem, newChildrenItem)) {
                patch(oldChildrenItem, newChildrenItem, el);
            }
            else {
                break;
            }
            i++;
        }
        // console.log(i, oldChildrenLength, newChildrenLength)
        // ['a','b','c'] -> ['d', 'a', 'b', 'c'] 
        // console.log(i, oldChildrenLength, newChildrenLength) 0  -1  1
        // 从 0 -> 1 区间 是新增的
        // 谁先遍历结束， 以最先结束的为准
        while (i <= oldChildrenLength && i <= newChildrenLength) {
            const oldChildrenItem = oldChildren[oldChildrenLength];
            const newChildrenItem = newChildren[newChildrenLength];
            if (isSameVnode(oldChildrenItem, newChildrenItem)) {
                patch(oldChildrenItem, newChildrenItem, el);
            }
            else {
                break;
            }
            oldChildrenLength--;
            newChildrenLength--;
        }
        console.log(i, oldChildrenLength, newChildrenLength);
        // i 比 oldChildrenLength 大   说明是需要新增的
        // i 和 newChildrenLength 之间 为新增的内容
        // ['a','b','c'] -> ['d', 'a', 'b', 'c'] 
        //   0  1  2
        //0  1  2  3  
        // i = 0;  oldChildrenLength = -1;  newChildrenLength = 0;
        // 新增逻辑
        if (i > oldChildrenLength) {
            if (i <= newChildrenLength) {
                while (i <= newChildrenLength) {
                    const nextPos = newChildrenLength + 1;
                    const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null;
                    // 创建新节点
                    patch(null, newChildren[i], el, anchor);
                    i++;
                }
            }
        }
        else if (i > newChildrenLength) {
            // ['a','b','c'] -> ['b', 'c'] 
            //0  1  2
            //0  1   
            // i = 0;  oldChildrenLength = 0;  newChildrenLength = -1; 
            // i 比 newChildrenLength  大   说明是需要卸载的
            // i 和 oldChildrenLength 之间   为卸载的内容
            if (i <= oldChildrenLength) {
                while (i <= oldChildrenLength) {
                    unmount(oldChildren[i]);
                    i++;
                }
            }
        }
        let s1 = i;
        let s2 = i;
        const keyToNewIndexMap = new Map();
        // a b  c d e    f g
        // a b  e c d h  f g
        // 2 4 5 ->  console.log(i, oldChildrenLength, newChildrenLength)
        for (let index = s2; index <= newChildrenLength; index++) {
            keyToNewIndexMap.set(newChildren[index].key, index);
        }
        // {'e' => 2, 'c' => 3, 'd' => 4, 'h' => 5} 
        console.log(keyToNewIndexMap, 'keyToNewIndexMap');
        // 需要处理的节点 数组 长度
        const tobePatched = newChildrenLength - s2 + 1;
        const newIndexToOldIndexMap = new Array(tobePatched).fill(0);
        // 循环老的元素 看一下新的里面有没有 ， 有就比较差异，没有就添加到列表， 老的有新的没有要删除
        for (let index = s1; index <= oldChildrenLength; index++) {
            const oldElement = oldChildren[index];
            let newIdx = keyToNewIndexMap.get(oldElement.key); // 用老的孩子去新的map 里面找
            if (!!newIdx) {
                unmount(oldElement);
            }
            else {
                // newIdx 是 新元素组成的 map (key, idx)  取值(取 老的 key) 返回 新元素 在新数组的 下标
                // newIdx - s2 从 0 开始算 ，和 map 对应上
                newIndexToOldIndexMap[newIdx - s2] = index + 1; // +1 防止 从 0开始
                patch(oldElement, newChildren[newIdx], el);
            }
        }
        console.log(newIndexToOldIndexMap); // [5,3,4,0]
        // 上面比对，下面移动位置  先 diff 在 remove
        // 倒叙插入
        for (let index = tobePatched - 1; index >= 0; index--) {
            const idx = s2 + tobePatched - 1; // i + s2 // ???
            let current = newChildren[idx]; // 找到 h
            let anchor = idx + 1 < newChildren.length ? newChildren[idx + 1].el : null; // 找到需要被插入的节点的 容器节点
            // current 没有 el 就是新增的节点
            // 新增的元素
            if (newIndexToOldIndexMap[index] === 0) {
                patch(null, current, el, anchor);
            }
            else { // 不是0 说明是patch 的元素
                // 此时是patch 阶段 current.el  肯定存在
                hostInsert(current.el, el, anchor);
            }
        }
    };
    const patchChildren = (oldValue, newVnode, el) => {
        const oldChildren = oldValue && oldValue.children;
        const newChildren = newVnode && newVnode.children;
        const prevFlag = oldValue.shapeFlag;
        const shapeFlag = newVnode.shapeFlag;
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
        if (shapeFlag & 8 /* ShapeFlags.TEXT_CHILDREN */) {
            // 老的是数组
            if (prevFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
                unmountChildren(oldChildren); // 删除所有的子节点
            }
            // 先删除，在给之前的节点的 父节点上面挂载 newChildren 
            if (oldChildren !== newChildren) {
                hostSetElementText(el, newChildren);
            }
        }
        else {
            // 进入到了 else， 说明现在 为 空 或者 数组的情况
            // 之前为数组
            // 数组 + 数组
            // 空  +  数组
            if (prevFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
                if (shapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
                    debugger;
                    // diff 算法
                    patchKeydChildren(oldChildren, newChildren, el);
                }
                else {
                    // 之前是数组， 现在不是数组 (现在的可能性: 空)
                    unmountChildren(oldChildren);
                    // hostSetElementText(el, newChildren)
                }
            }
            else {
                // 数组 + 文本
                // 空   + 文本
                // 数组  + 空
                if (prevFlag & 8 /* ShapeFlags.TEXT_CHILDREN */) {
                    hostSetElementText(el, ''); // 清空文本
                }
                // 挂载 新的数组
                if (shapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
                    mountChildren(newVnode, el);
                }
            }
        }
    };
    // 先复用节点， 在比较属性， 在比较 children
    const patchElement = (oldValue, newVnode, container) => {
        debugger;
        let el = newVnode.el = oldValue.el;
        let oldProps = oldValue.props;
        let newProps = newVnode.props;
        // 对比属性， 复用 vnode的 el 属性
        patchProps(oldProps, newProps, el);
        // 对比 children
        patchChildren(oldValue, newVnode, el);
    };
    const processText = (oldValue, newVnode, container) => {
        if (oldValue == null) {
            newVnode.el = hostCreateText(newVnode.children);
            hostInsert(newVnode.el, container);
        }
        else {
            // 文本内容变了， 复用老的 vnode.el
            const el = newVnode.el = oldValue.el;
            if (newVnode.children !== oldValue.children) {
                hostSetText(el, newVnode.children); // 文本更新
            }
        }
    };
    const processElement = (oldValue, newVnode, container, anchor) => {
        if (oldValue == null) {
            mountElement(newVnode, container, anchor);
        }
        else {
            // 元素对比
            patchElement(oldValue, newVnode, container);
        }
    };
    // 无论是更新 还是 创建  都走 patch
    // 在 patch 里面调用 processElement or processText， 在这两个方法里面区分更新和创建
    const patch = (oldValue, newVnode, container, anchor = null) => {
        // console.log(oldValue, newVnode)
        if (oldValue === newVnode)
            return;
        // 判断老元素和新元素 是不是相同的，之后把 老元素 置为空， 调用后续的方法(相当于新创建)
        if (oldValue && !isSameVnode(oldValue, newVnode)) {
            // 删除的逻辑
            unmount(oldValue);
            oldValue = null;
        }
        // 初次渲染和更新流程 统一放到 processElement 处理
        // if(oldValue == null){
        // 初次渲染
        // 初次渲染也需要区分 文本类型 和 非 文本类型
        // 直接渲染的文本节点
        // render(h(TEXT, '444'), container)
        const { type, shapeFlag } = newVnode;
        switch (type) {
            case TEXT:
                processText(oldValue, newVnode, container);
                break;
            default:
                // 元素节点走此 创建方法
                // 17 & 1   1
                //  9 & 1   1
                if (shapeFlag & 1 /* ShapeFlags.ELEMENT */) {
                    processElement(oldValue, newVnode, container, anchor);
                }
        }
        // }else{
        //     // 更新流程
        // }
    };
    const unmount = (vnode) => {
        hostRemove(vnode.el);
    };
    const render = (vnode, container) => {
        console.log(vnode, container, '11');
        if (vnode == null) {
            // 卸载逻辑, 渲染过了，才会卸载
            if (container._vnode) {
                // 没有直接传入 container._vnode.el， 因为传入的可能是 组件 可能是文本，不直接使用 el
                unmount(container._vnode);
            }
        }
        else {
            // 既有初始化，也有更新的逻辑
            patch(container._vnode || null, vnode, container);
        }
        // 初始化的时候，patch 传入的是null，执行完成之后，在 container 上挂载 _vnode
        // 第二次渲染的时候，传入上次的 vnode(container._vnode) 和 这次的 vnode 进行对比，同时更新 container._vnode 为后续渲染服务
        container._vnode = vnode;
    };
    return {
        render
    };
};
//# sourceMappingURL=render.js.map