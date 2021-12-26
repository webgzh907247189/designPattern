function render(vnode, container) {
    // 初次渲染
    patch(container._vnode, vnode, container)


    // dom diff
    container._vnode = vnode;
}


// 后续diff 可以执行这个方法
function patch(oldVnode, newVnode, container) {
    // 组件的虚拟节点的 tag 是一个对象 ????
    if(typeof newVnode.tag === 'string'){
        // 标签
        precessElement(oldVnode, newVnode, container)
    }else if(typeof newVnode.tag === 'object'){
        // 组件渲染
        mountComponent(newVnode, container)
    }
}

function precessElement(oldVnode, newVnode, container) {
    // 初次渲染
    if(oldVnode == null){
        mountELement(newVnode, container)
    }else{
        // diff 操作
        patchElement(oldVnode, newVnode, container)
    }   
}

function patchElement(oldVnode, newVnode, container) {
    // debugger
    // tag 相同， 更新 props
    let el = newVnode.el = oldVnode.el
    const oldProps = oldVnode.props
    const newProps = newVnode.props

    pathchProps(el, oldProps, newProps)

    patchChildren(oldVnode, newVnode, container)    
    // 比对 children
}

function patchChildren(oldVnode, newVnode, container) {
    const oldVnodeChildren = oldVnode.children
    const newVnodeChildren = newVnode.children

    if(typeof newVnodeChildren == 'string'){
        if(oldVnodeChildren !== newVnodeChildren){
            nodeOps.hostSetElementText(container, newVnodeChildren)
        }
    }else{
        // newVnodeChildren 是数组
        if(typeof oldVnodeChildren == 'string'){
            // 先清空老的节点 dom， 在渲染 新的 newVnodeChildren
            nodeOps.hostSetElementText(container, '')
            mountChildren(newVnodeChildren, container)
        }else {
            patchKeyChildren(oldVnodeChildren, newVnodeChildren, container)
        }
    }
}

function patchKeyChildren(oldVnodeChildren, newVnodeChildren, container) {
    // 最长递增子序列 LIS

    // 根据新节点 生成一个 映射表
    // 新的比老的多，添加。 老的比新的多，删除
    // 两个vnode 的key 一样， 移动节点(复用)

    let oldVnodeChildrenEndIndex = oldVnodeChildren.length - 1
    let newVnodeChildrenEndIndex = newVnodeChildren.length - 1

    // 构建新的 newVnodeChildren 的索引映射
    const keyToNewIndexMap = new Map()
    for (let index = 0; index < newVnodeChildren.length; index++) {
        const newVnodeChildrenItem = newVnodeChildren[index];
        keyToNewIndexMap.set(newVnodeChildrenItem.props.key, index)
    }

    // 构建新的 字节点的map对象
    console.log(keyToNewIndexMap)

    // 新节点数组 构造 的全为 -1的数组
    const newIndexToOldIndexMap = Array.from({length: newVnodeChildren.length}, () => -1);


    for (let index = 0; index < oldVnodeChildren.length; index++) {
        const oldVnodeChildrenItem = oldVnodeChildren[index];
        let getNewVnodeFromMapIdx = keyToNewIndexMap.get(oldVnodeChildrenItem.props.key)

        // debugger
        // getNewVnodeFromMap 存在就可以复用(新的有， 老的也有，直接复用老的节点)
        if(getNewVnodeFromMapIdx === undefined){
            // 老的节点的 key 不在 新的map里面
            nodeOps.remove(oldVnodeChildrenItem.el)
        }else{
            newIndexToOldIndexMap[getNewVnodeFromMapIdx] = index // [0, 1 ,-1 ,2, -2]

            // 复用节点 -> 更新属性
            patch(oldVnodeChildrenItem, newVnodeChildren[getNewVnodeFromMapIdx], container)
        }
    }

    // 从后往前 进行 插入
    // 先将最后一个节点插入 容器里面
    for (let index = newVnodeChildren.length - 1; index >= 0; index--) {
        let currentEle = newVnodeChildren[index].el;

        // 拿到兄弟元素 
        // // 插入前 的 一个元素 (newVnodeChildren[index + 1].el)
        const anchor = index + 1 <= newVnodeChildren.length - 1 ? newVnodeChildren[index + 1].el : null; // ????

        // 新元素，创建出来
        if(newIndexToOldIndexMap[index] === -1){
            
        }

        nodeOps.insert(currentEle, container, anchor)
    }
}

function pathchProps(el, oldProps, newProps) {
    if(oldProps !== newProps){
        for(let itemKey in newProps){
            const newPropsItem = newProps[itemKey]
            const oldPropsItem = oldProps[itemKey]
            if(newPropsItem !== oldPropsItem){
                nodeOps.hostPatchProps(el, itemKey, oldPropsItem, newPropsItem)
            }
        }

        for(let itemKey in oldProps){
            if(!newProps.hasOwnProperty(itemKey)){
                // 老的里面多的 删除
                nodeOps.hostPatchProps(el, itemKey, null, newPropsItem)
            }
        }
    }
}

function mountComponent(vnode, container) {
    // 根据组件创建一个实例
    const instance = {
        vnode,
        render: null, // setup的返回值
        subTree: null, // 组件返回的结果
    }

    const Component = vnode.tag 

    // 每个组件都有一个自己的effect 默认应用有一个大的 effect
    instance.render = Component.setup(vnode.props, instance)
    effect(() => {
        instance.subTree = instance.render && instance.render()

        // 初始化组件
        patch(null, instance.subTree, container)
    })
}


function mountELement(vnode, container) {
    const { tag, children, props } = vnode

    // 虚拟节点 和 真实节点 创造一个映射关系， 为后面 diff 准备
    let el = vnode.el = nodeOps.createElement(tag)

    // 挂载 props
    if(props){
        for (let item in props) {
            nodeOps.hostPatchProps(el, item, {}, props[item])
        }
    }

    if(Array.isArray(children)){
        mountChildren(children, el)
    }else{
        nodeOps.hostSetElementText(el, children)
    }

    // 插入元素
    nodeOps.insert(el, container)
}


function mountChildren(children, container) {
    for (let index = 0; index < children.length; index++) {
        const childrenItem = children[index];

        patch(null, childrenItem, container)
    }
}

const nodeOps = {
    insert(child, parent, anchor){
        if(anchor){
            parent.insertBefore(child, anchor)
        }else {
            parent.appendChild(child)
        }
    },
    remove(child){
        let parent = child.parentNode
        parent && parent.removeChild(child)
    },
    createElement(tag){
        return document.createElement(tag)
    },
    hostSetElementText(el, text){
        el.textContent = text
    },
    hostPatchProps(el, key, oldValue, newValue){
        // 事件
        if(/^on[^a-z]/.test(key)){
            const eventName = key.slice(2).toLowerCase()

            oldValue && el.removeEventListener(eventName, oldValue)
            newValue && el.addEventListener(eventName, newValue)
        }else{
            if(newValue == null){
                return el.removeAttribute(key)
            }
            if(key === 'style'){
                // debugger
                for(let item in newValue){
                    el.style[item] = newValue[item]
                }

                for(let item in oldValue){
                    if(!newValue.hasOwnProperty(item)){
                        el.style[item] = null;
                    }   
                }
            }else {
                el.setAttribute(key, newValue)
            }
        }
    }
}






let activeEffect
function effect(fn) {
    // 默认 effect 需要先执行一次

    // 数据变了，重新调用 fn
    activeEffect = fn;
    fn()

    activeEffect = null
}

// 默认只代理第一层
function reactive(target) {
    return new Proxy(target, {
        get(target, key, reciver){
            const res = Reflect.get(target, key)

            // 依赖收集
            track(target, key)
            return res;
        },
        set(target, key, val, reciver){
            // 给 原值 设置 值
            // debugger
            const res = Reflect.set(target, key, val)

            // 触发更新
            trigger(target, key);
            // res && activeEffect()
            return res
        }
    })
}

const weakMap = new WeakMap();
// 依赖收集
function track(target, key) {
    let desmap = weakMap.get(target)

    if(!desmap){
        weakMap.set(target, (desmap = new Map()))
    }

    let deps = desmap.get(key)
    if(!deps){
        desmap.set(key, (deps = new Set()))
    }
    if(activeEffect && !deps.has(activeEffect)){
        deps.add(activeEffect)
    }

    console.log(weakMap, 'weakMap')
}

// 触发更新
function trigger(target, key) {
    const depsMap = weakMap.get(target)
    
    if(!depsMap) return;

    const effects = depsMap.get(key)
    effects && effects.forEach(effect => effect())
}