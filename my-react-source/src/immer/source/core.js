import * as is from './is';


export let INTERNAL= Symbol('INTERNAL')
export const produce = (baseState, producer) => {
    let proxyState = toProxy(baseState)
    producer(proxyState)

    const internal = proxyState[INTERNAL]

    return internal.mutated ? internal.draftState : internal.baseState
}

export const toProxy = (baseState, callParentCopy) => {
    // key 被映射 之后的 key 的对象集合
    let keyToProxy = {}

    let internal = {
        baseState,
        draftState: createDraftState(baseState),
        keyToProxy,
        mutated: false, // 标示这个对象 有没有 被更改
    }

    return new Proxy(baseState, {
        get(target, key){
            // 访问的 key 是 INTERNAL 直接返回 internal
            if (key === INTERNAL) {
                return internal;
            }

            let value = target[key]
            if(is.isObject(value) || is.isArray(value)){
                // 判断 keyToProxy 有没有 key
                if(key in keyToProxy){
                    return keyToProxy[key]
                } else {
                    // keyToProxy[key] = toProxy(value)

                    // children 改变了， 自己也会发生改变
                    keyToProxy[key] = toProxy(value, () => {
                        internal.mutated = true
                        const proxyChild = keyToProxy[key]

                        // 拿到 child的 INTERNAL对象下的 draftState
                        let { draftState } = proxyChild[INTERNAL]
                        internal.draftState[key] = draftState
                        callParentCopy && callParentCopy()
                    })
                }
                return keyToProxy[key];
            } else if(is.isFunction(value)){
                internal.mutated = true
                callParentCopy && callParentCopy()
                return value.bind(internal.draftState)
            }

            return internal.mutated ? internal.draftState[key] : baseState[key]
        },
        set(target, key, value){
            // set 不修改 baseState ，修改 draftState
            internal.mutated = true
            const { draftState } = internal
            draftState[key] = value

            // 改变自己的值之后，还没有结束。
            // 还需改变 这个值 对应的 父亲  ->   联想 immutable 的子数据节点发生变化
            callParentCopy && callParentCopy()
            return true;
        }
    })
}

export const createDraftState = (baseState) => {
    if(is.isObject(baseState)){
        return Object.assign({}, baseState)
    } else if(is.isArray(baseState)){
        return [...baseState]
    } else {
        return baseState
    }
}