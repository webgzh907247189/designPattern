import { proxyRefs, reactive } from "@vue/reactivity";
import { isFunction, ShapeFlags } from "@vue/shared";

export let currentInstancce = null
export const setCurrentInstance = (i) => {
    currentInstancce = i
}
export const getCurrentInstance = () => {
    return currentInstancce
}


export const createComponentInstance = (initialVnode, parentComponent) => {
    // const { data = () => ({ }), props: propsOptions } = initialVnode.type;

    const instance = {
        state: {},
        isMounted: false, // 组件有没有 挂载
        subTree: null, // 组件的虚拟节点

        vnode: initialVnode, // 组件的虚拟节点

        update: null,

        attrs: {},
        props: {},

        propsOptions: initialVnode.type.props || {},

        // 实列 上的 代理属性
        proxy: null,
        render: null,

        exposed: {},
        slots: {}, // 存在当前组件的插槽

        parent: parentComponent,
        providers: parentComponent ? parentComponent.providers : Object.create(null) // 所有组件都有一个 providers 对象, 复用父组件的 providers
    }

    return instance
}


const publicProperties = {
    $attrs: i => i.attrs,
    $slots: i => i.slots
}

const initSlots = (instance, children) => {
    if(instance.vnode.shapeFlag & ShapeFlags.SLOTS_CHILDREN){
        instance.slots = children // instance.vnode.shapeFlag
    }
}

export const setupComponent = (instance) => {
        // 对于组件来说，组件保存的不是 el， 而是组件的 实列 ，后面复用组件的实列 
        instance.vnode.component = instance

        // 用户传递给 虚拟节点的props -> initialVnode.props
        // 实列 上的 props -> initialVnode.type.props
        initProps(instance, instance.vnode.props)

        initSlots(instance, instance.vnode.children)

        // 这里代理的目的: 在 render模版中 可以直接取到 date 属性，也可以取到 props 属性
        instance.proxy = new Proxy(instance, {
            get(traget, key, receiver){
                const { state, props, setupState } = traget

                // setup 函数返回的值 -> setupState
                if(key in setupState){
                    return setupState[key]
                }

                if(state && key in state){
                    return state[key]
                }else if(key in props){
                    return props[key]
                }

                let getter = publicProperties[key]
                if(getter){
                    // 业务在实际项目使用: proxy.$attrs.xxx ---> 通过这种方式来使用 (自动完成了 $attrs() 调用)
                    return getter(instance)
                }
            },
            set(traget, key, value, receiver){
                const { state, props, setupState } = traget

                // setup 函数返回的值 -> setupState
                if(state && key in setupState){
                    setupState[key] = value
                    return true
                }

                if(state && key in state){
                    state[key] = value
                    return true
                }else if(key in props){
                    console.log('不允许修改props')
                    return false;
                }
                return true
            }
        })

        const { data, setup, render } =  instance.vnode.type
        if(isFunction(setup)){

            // 在上面已经完成了 initProps 执行，组件已经赋值了 props & attrs
            const context = {
                attrs: instance.attrs, // 这里的 instance.attrs 是基于 instance.vnode.props 计算出来的 (组件排除 props 之后 得到的就是 attrs)
                emit(eventName, ...args){
                    const bindName = `on${eventName[0]?.toUpperCase()}${eventName.slice(1)}`
                    const hander = instance.attrs[bindName]

                    if(hander){
                        let handers = Array.isArray(hander) ? hander : [hander]
                        handers.forEach((hander) => hander(...args))
                    }
                },

                // 主要用于 ref， vue2中通过 ref 只能获取组件实列， vue3 可以拿到事件(通过 exposed)
                expose(exposed){
                    instance.exposed = exposed
                },

                slots: instance.slots
            }

            setCurrentInstance(instance)
            // 这里的 instance.props 是基于 instance.vnode.props 计算出来的 (组件排除 attrs 之后 得到的就是 props)
            const setupResult = setup(instance.props, context)
            setCurrentInstance(null)

            if(isFunction(setupResult)){
                instance.render = setupResult
            }else {
                // 把 setup 函数的返回值进行 拆包 处理，不需要使用 .value 取值
                instance.setupState = proxyRefs(setupResult)
            }
        }

        // 上面没有产生 render 函数，采用 组件vnode 的 render 函数
        if(!instance.render){
            // ???? 
            // render 函数来自于 组件虚拟节点
            instance.render = render // instance.vnode.type.render
        }

        if (isFunction(data)) {
            // 把 组件的 数据变为 响应式的
            instance.state = reactive(data.call(instance.proxy))
        }
}


// props 是一个浅响应式的，使用 shallowReactive ( {a: 1, b: 2, c: { test: 'c' } }, 深层 c 属性 不是响应式的，  更改 a、b 会触发视图更新，改 c 不会触发视图更新 )
// 属性分为两种: 第一种:props & 第二种: attrs (开发环境下是 响应式的， 生产环境下 非响应式的)
// attrs = 用户传递的 props - propsOptions (用户传递的 props 没有被消费的都放到了 attrs 中)
const initProps = (instance, userProps) => {
    const attrs = {}
    const props = {}

    const propsOptions = instance.propsOptions ?? {}

    if(userProps){
        for (const key in userProps) {
            const value = userProps[key]

            if(key in propsOptions){
                props[key] = value
            }else{
                attrs[key] = value
            }
        }
    }

    if(instance.vnode.shapeFlag & ShapeFlags.FUNCTIONAL_COMPONENT){
        // 函数式 组件的 props 就是 attrs (因为函数式 组件没办法声明 props)

        // 函数式 instance.props 应该是 响应式的，先简写
        instance.props = attrs
    }else{
        instance.attrs = attrs

        // 源码这里用的 shallowReactive， 这里使用 reactive 模拟代替下
        instance.props = reactive(props)
    }
}