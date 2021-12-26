export function vnode(tag, props, key, children, text, componentOptions){
    return {
        tag, 
        props, 
        key, 
        children, 
        text,
        componentOptions
    }
}