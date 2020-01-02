// https://segmentfault.com/a/1190000013088373
const PROXY_FLAG = '@@SYMBOL_PROXY_FLAG';

class Store{
    constructor(state){
        this.source = state
        this.modified = false
        this.copy = null
    }

    get(key){
        if (!this.modified) return this.source[key]
        return this.copy[key]
    }

    set(key, value){
        if(!this.modified) this.modifing()
        this.copy[key] = value
    }

    modifing(){
        if (this.modified) return
        this.modified = true
        this.copy = Array.isArray(this.source)
        ? this.source.slice()
        : { ...this.source }
    }
}

const handler = {
    get(target,key){
        if(key === PROXY_FLAG) return target;
        return target.get(key)
    },
    set(target,key,value){
        return target.set(key, value);
    }
}
/**
 * 一个分割成 Store 构造函数，handler 处理对象和 produce 处理 state 这三个模块的最简版就完成了，
 * 将它们组合起来就是一个最最最 tiny 版的 immer
 */
function produce(state,producer) {
    const store = new Store(state)
    const proxy = new Proxy(store,handler)

    producer(proxy)

    const newState = proxy[PROXY_FLAG]
    if (newState.modified) return newState.copy
    return newState.source
}


const state = {
    done: false,
    val: 'string',
    a: [],
    p: {
      x: 1
    },
}

const newState = produce(state, (draft) => {
    draft.done = true
})

console.log(state.done) // false
console.log(newState.done) // true

const newState1 = produce(state, (draft) => {

})
console.log(newState1 === state) // true


let nextState2 = produce(state, (draft) => {
    draft.a.push(2);
})  
console.log(state.a === nextState2.a); // true 应为false
console.log(state.p === nextState2.p); // true