// 此处 导出的是一个 值的引用 (函数执行的返回值 esm 的特性)
export let activeEffect = undefined

const cleanupEffect = (effect) => {
    debugger
    const { deps } = effect

    deps.forEach(item => {
        item.delete(effect) // 解除 effect，重新进行 依赖收集
    })
    // for (let index = 0; index < deps.length; index++) {
    //     const dep = deps[index];
    //     dep.delete(effect)
    // }

    effect.deps.length = 0
}

export class ReactiveEffect{
    debugger
    // effect 记录 属性 (属性也要记录 effect)
    public deps = []
    public parent = null

    public active = true // 这个 effect 默认是 激活状态
    constructor(public fn, public scheduler){ // 相当于 this.fn = fn
        
    }

    run(){
        // 非 激活的情况， 只要执行函数，不需要收集依赖
        if(!this.active){
            return this.fn();
        }

        // effect(() => {
        //     state.name;
        //     effect(()=>{
        //         state.age;
        //     })
        //     state.address;
        // })
        // 第一个 effect -> e1
        // 第二个 effect -> e2
        // 初始化 this.parent = null; activeEffect = e1 ,执行 第一个 effect cb， 接着 执行 第二个 effect 的 cb
        // this.parent = e1; activeEffect = e2; 此时 第二个 effect 的 cb 执行完成。 activeEffect = e1; this.parent = null;
        // 接着回到 finally 执行逻辑 activeEffect = null; this.parent = null

        try{
            this.parent = activeEffect
            // 此处开始依赖收集， 核心就是把当前的 effect 和 稍后渲染的 属性进行绑定
            activeEffect = this

            // let state = { flag: true, name: '', age: 1 }
            // effect(() => {
            //     body.innerHTMl = state.flag ? state.name : state.age

            //     setTimeout(() => {
            //         state.flag = false

            //         setTimeout(() => {
            //             console.log('修改name，原则上不更新')
            //             state.name = '11'
            //         }, 1000)
            //     }, 1000)
            // })
            // 按照最开始的写法 条件渲染
            // 一开始 effect 只是收集了 flag 和 name，后面 flag 变了，渲染了 age 属性，后面 name 在变，应该不会 在触发更新
            // 在最后的  state.name = '11'，虽然 name 变了，也触发了 trigger 方法 (因为 name 属性在开始被依赖收集了，在 targetMap 里面)
            // 也触发了 triggerEffect方法 但是 name 对应的 effect 被清空了， 无法执行 triggerEffect 里面的 effect.run()
            
            // effect实列 的 deps 数组 里面存放的 都是 各个属性对应的 set集合 (name 对应的 Set 集合)
            // 每次执行用户函数之前，清空 此  effect实列 的 deps 数组 里面的 各个属性对应的 set集合， 保证后续 属性变了，触发 triggerEffect

            // 需要在执行用户函数之前 清空之前的 effect, 防止分支切换逻辑变更 引发的 重复渲染
            cleanupEffect(this)

            return this.fn() // 执行 fn， 拿到  activeEffect
        }finally{
            activeEffect = this.parent
            this.parent = null
        }
    }

    // 停止 effect 收集
    stop(){
        if(this.active){
            this.active = false
            cleanupEffect(this)
        }
    }
}

// runner.effect.fn 拿到传入的 fn 函数
export const effect = (fn, options) => {
    debugger
    const _effect = new ReactiveEffect(fn, options?.scheduler)

    _effect.run();// 默认先执行一次

    const runner = _effect.run.bind(_effect)
    runner.effect = _effect;
    return runner;
}

export const trackEffect = (dep) => {
    if(activeEffect){
        // 去重的逻辑 
        let shouldTrack = !dep.has(activeEffect)
        if(shouldTrack){
            dep.add(activeEffect)

            // { obj: { xxx: new Set(effect) } }
            // 上面的操作只是 让 属性记录了 effect， 下面这句 让 effect实列 也记录 属性 的 dep (互相记忆)
            activeEffect.deps.push(dep) // effect实列 记录住 dep (new Set) 
        }
    }
}

export const triggerEffect = (effects) => {
    // 深拷贝一下
    effects = new Set(effects);

    effects.forEach(effect => {
        // 避免出现 effect 的 fn 里面又继续修改 state， 造成 effect 重复执行问题
        if(effect != activeEffect){
            if(effect.scheduler){
                effect.scheduler()
            }else{
                effect.run();
            }
        }
    });
}


// key 只能是 对象
const targetMap = new WeakMap()
// 一个 effect 记录多个 属性， 一个属性记录多个 effect
// WeakMap = {
    // 对象： Map{ name: Set(), age: Set() }
// }

// 解决了 没有在 effect 里面执行 修改状态的 问题 (判断有没有 activeEffect)
export const track = (target, type, key) => {
    debugger
    // 没有激活的 effect 不需要收集
    // 没有在 effect 中使用的 不需要管 不需要收集
    if(!activeEffect){
        return
    }

    let depsMap = targetMap.get(target)    
    if(!depsMap){
        targetMap.set(target, (depsMap = new Map()))
    }

    let dep = depsMap.get(key)
    if(!dep){
        depsMap.set(key, (dep = new Set()))
    }

    trackEffect(dep)
}

export const trigger = (target, type, key, value, oldValue) => {
    debugger
    const depsMap = targetMap.get(target)

    // 触发的值不在模板中使用, 不需要更新
    // 触发的值不在模板中使用, 不需要更新
    // 触发的值不在模板中使用, 不需要更新

    if(!depsMap){
        return
    }

    let effects = depsMap.get(key) // 找到的都是 Set effects

    if(effects){
        // 执行 Set forEach 之前， 拷贝一份副本进行操作
        // 针对 Set 先删除元素，在添加进来同一份元素，造成死循环问题
       
        triggerEffect(effects)
    }
}