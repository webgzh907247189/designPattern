// h(类型， 属性， 儿子)
// h(类型，儿子) ---> 两个参数的情况下，第二个参数可能是: 儿子, 可能是: 属性。 通过(__v_isVnode 来判断是不是 vnode)
// h(类型，[儿子1，儿子2，儿子3，儿子4])

import { isObject } from "@vue/shared"
import { createVnode, isVnode } from "./createVode"

// h(类型，属性1，儿子1，儿子2，儿子3，) 超过三个参数的情况下，第3个参数到第n个参数都属于 children
// h(类型，儿子1，儿子2，儿子3) -----> 非法参数，多个参数的情况下，第二个参数一定是 属性


export const h = (...args) => {
    const [type, propsOrChildren, children] = args
    let l = args.length

    if(l === 2){
        // h('div', { style: { color: 'red' } })
        // h('div', h('span'))
        // h('div', [h('span'), h('span')])
        // h('div', 'xxx') // 文本不需要包装

        // 这种情况:
        // h('div', { style: { color: 'red' } })
        // h('div', h('span'))
        if(isObject(propsOrChildren) && !Array.isArray(propsOrChildren)){
            if(isVnode(propsOrChildren)){
                return createVnode(type, null, [propsOrChildren])
            }
            return createVnode(type, propsOrChildren)
        }
            
        // 这种情况:
        // h('div', [h('span'), h('span')])
        // h('div', 'xxx') // 文本不需要包装
        return createVnode(type, null, propsOrChildren)
    }else{
        // debugger
        let child = [];
        if(l > 3){
            // h('div', { style: { color: 'red' } }, h('span'), h('span'), h('span')) 这种支持
            // h('div', h('span'), h('span'), h('span')) 这种不支持(多个 children 直接跟在后面的情况)， 必须做转换

            child = args.slice(2)
        }else if(l === 3 && isVnode(children)){
            // h('div', { style: { color: 'red' } }, h('span')) -> h('div', { style: { color: 'red' } }, [h('span')])
            // 等于3个的情况
            child = [children]
        }else{
            // 文本节点
            child = children
        }
        // 其他情况

        return createVnode(type, propsOrChildren, child)
    }
}
