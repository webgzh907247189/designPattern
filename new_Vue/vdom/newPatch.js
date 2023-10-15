import { vnode } from "./create-element";
import { createEle, updateProperties, updateChildren } from "./patch";

// 第一次渲染 和 第二次渲染都是走的这个办法 (第二次是 diff 对比)
// vue 和 react 的对比， 理解成一个班级， vue 设置了很多小组长(watcher)，小组长管组员，react 没有小组长，直接自己管
export function patch(oldVnode,newVnode){
    // 组件的渲染
    if(!oldVnode){
        return createEle(newVnode)
    }

    // 判断是否存在 nodeType， 存在为真实节点
    const isRealEle = oldVnode.nodeType;

    if(isRealEle){
        const oldEle = oldVnode
        const parentEle = oldEle.parentNode

        let el = createEle(newVnode);

        // 将原有的节点插入到原来到节点下一个
        parentEle.insertBefore(el, oldEle.nextSibling)
        // 删除原来的节点
        parentEle.removeChild(oldEle)
        return el;
    } else {
        // 标签类型不一样，直接删掉 替换
        if (oldVnode.tag !== newVnode.tag) {
            return oldVnode.el.parentNode.replaceChild(createEle(newVnode), oldVnode.el)
        }

        // 标签相同 而且 是 文本
        if(!oldVnode.tag){
            if(oldVnode.text !== newVnode.text){
                return oldVnode.el.textContent = newVnode.text
            }
        }

        // 元素相同， 复用老节点，更新属性(把老的dom 给新的虚拟节点的 el 属性)
        let el = newVnode.el = oldVnode.el
        updateProperties(newVnode, oldVnode.props)

        // 更新 children

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
}