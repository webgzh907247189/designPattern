export const Teleport = {
    __isTeleport: true,
    process(oldVnode, newVnode, container, anchor, internals){

        const { mountChildren, patchChildren, move } = internals
        if(!oldVnode){
            // 初始化 Teleport

            const target = newVnode.target = document.querySelector(newVnode.props.to)
            if(target){
                const children = Array.isArray(newVnode.children) ? newVnode.children : [newVnode.children]
                mountChildren(children, target)
            }
        }else{
            let oldChildren = Array.isArray(oldVnode.children) ?  oldVnode.children : [oldVnode.children]
            oldVnode.children = oldChildren


            let newChildren = Array.isArray(newVnode.children) ?  newVnode.children : [newVnode.children]
            newVnode.children = newChildren

            patchChildren(oldChildren, newChildren)


            if(oldVnode.props.to !== newVnode.props.to){
                const target = newVnode.target = document.querySelector(newVnode.props.to)

                newVnode.children.forEach(child => {
                    move(child, target)
                });
            }
        }
    },
    remove(vnode){
        vnode.target.innerHTML = ''
    }
}

export const isTeleport = (val) => {
    return !!val.__isTeleport
}