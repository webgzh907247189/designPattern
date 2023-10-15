import { isArray, isObject } from '@vue/shared'
import { createVnode, isVnode } from './vnode'

// 最终 h 创建出来的 children 就两种情况， 一种是 文本， 一种是 数组
export const h = function(type, propsOrChinlren, children){
    const l = arguments.length

    // h('div', { style: { color: 'red' } })
    // h('div', h('span'))
    // h('div', [h('span'), h('span')])
    // h('div', 'xxx') // 文本不需要包装
    if(l === 2){
        if(isObject(propsOrChinlren) && !isArray(propsOrChinlren)){
            if(isVnode(propsOrChinlren)){
                return createVnode(type, null, [propsOrChinlren])
            }
            return createVnode(type, propsOrChinlren)
        }else{
            return createVnode(type, null, propsOrChinlren)
        }
    }else{
        // debugger
        let child = [];
        if(l > 3){
            child = Array.from(arguments).slice(2)
        }else if(l === 3 && isVnode(children)){
            // 等于3个的情况
            child = [children]
        }else{
            // 文本节点
            child = children
        }
        // 其他情况

        return createVnode(type, propsOrChinlren, child)
    }
}