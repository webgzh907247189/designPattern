import { vnode } from "./create-element"

export default function h(tag, props, ...children){
    let key = props.key
    delete props.key

    children = children.map((item) => {
        // debugger
        // if( typeof item === 'object') {
        if( typeof item === 'object') {
            // console.log(item, '1111')
            // return vnode(undefined, undefined, undefined, undefined, JSON.stringify(item))
            return item
        } else {
            // 文本节点
            return vnode(undefined, undefined, undefined, undefined, item)
        }
    })

    return vnode(tag, props, key, children)
}