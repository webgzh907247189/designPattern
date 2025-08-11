import { DirtyLevels } from "./constance"

// 1. 必包的场景 解决 请求顺序的问题

export const effect = (fn, options) => {
    // 创建一个 响应式的 effect   数据变化后重新执行
    const _effect = new ReactiveEffect(fn, () => {
        _effect.run()
    })
   _effect.run()

   // 用户传的 覆盖默认的 (用户的 scheduler 覆盖默认的 scheduler)
   if(options){
    Object.assign(_effect, options)
   }

   const runner = _effect.run.bind(_effect)

   // 外面可以在 run 上 获取 effect 的引用
   runner.effect = _effect

   // 外界可以手动 run
   return runner
}


// {flag: {effect}, name: {effect}}
// {flag: {effect}, age: {effect}}
// dep (new Map) 里面删掉 effect
// name 整个 map 都删掉
const cleanEffect = (oldDep, effect) => {
    oldDep.delete(effect)

    if(oldDep.size === 0){
        oldDep.cleanup(); // 删除这个属性
    }
}

const postCleanEffect = (effect) => {
    // 以前: [flag, name, xxx, yyy]
    // 之后: [flag]
   if(effect.deps.length > effect._depsLength){
        // 从 第二位开始删除
        for (let index = effect._depsLength; index < effect.deps.length; index++) {
            cleanEffect(effect.deps[index], effect)
        }
        // 更新依赖列表的长度
        effect.deps.length = effect._depsLength
   }
}

const preCleanEffect = (effect) =>{
    effect._depsLength = 0;
    effect._trackId++ // 同一个 effect 执行， id 是 相同的
}

export let activeEffect;
export class ReactiveEffect {
    // 记录 当前的 effect 执行了 几次
    _trackId = 0;

    deps =[]
    _depsLength = 0;
    _running = 0

    public active = true;

    // 默认脏值
    _dirtyLevel = DirtyLevels.DIRTY

    // fn 用户编写的函数
    // 如果 fn 中依赖的数据发生变更，需要重新执行 _effect.run()
    constructor(public fn, public scheduler){}


    public get dirty(){
        return this._dirtyLevel === DirtyLevels.DIRTY
    } 
    public set dirty(value){
        this._dirtyLevel = value ?  DirtyLevels.DIRTY :  DirtyLevels.NODIRTY
    }


    run(){
        // 每次 运行后 effect 变为 不脏
        this._dirtyLevel = DirtyLevels.NODIRTY

        debugger
        if(!this.active){
            // 非 激活 状态，执行后，什么都不需要做
            return this.fn()
        }

        let parentEffect = activeEffect
        try{
            activeEffect = this

            // effect 重新执行前， 清空上一次的 依赖 (条件渲染)
            preCleanEffect(this);

            // 通过 running 来判断当前是否在运行
            // 处理 循环调用的 问题
            this._running++;

            // 依赖收集
            return this.fn()
        }finally{
            // 通过 running 来判断当前是否在运行
            this._running--;

            // 最终渲染完 会保证 effect.deps.length === effect._depsLength
            postCleanEffect(this)
            activeEffect = parentEffect
        }  
    }

    stop(){
        if(this.active){
            this.active = false;
            preCleanEffect(this)
            postCleanEffect(this)
        }
    }
}

// _trackId 用于记录执行几次 (防止一个属性 在 当前 effect 多次收集)， 一个 effect 只收集一次属性 (属性在一个 effect 反复使用的话)
// 拿到上一次的依赖的 最后一个 和 这次的 比较
// {flag, name}
// {flag, age}
export const trackEffect = (effect, dep)=> {
    // 优化了多余的 依赖收集 (历史版本是 Set 所以没有这个问题)
    debugger

    // 场景: state.flag + state.flag + state.flag, 
    // 第一次执行完更新了  effect._trackId， 后续在 dep.get(effect) 没办法进入 if 判断
    // 第一次 进入到了 if 里面

    // 每一次 取值 都触发 trackEffect

    // 场景: state.flag + state.flag + state.flag, 
    // 第一次 undefined 1  (这里是1 因为每次清理都走了 preCleanEffect， 重置了 _depsLength)
    // 第二次 1 1
    // 第三次 1 1
    if(dep.get(effect) !== effect._trackId){  // -> 这一行 规避 重复收集依赖 (同一个属性被 反复收集)
        dep.set(effect, effect._trackId) // 更新 id


        const oldDep = effect.deps[effect._depsLength]
        // 没有存过
        if(oldDep !== dep) {

            // {nameEffect, ageEffect}
            // {nameEffect, sexEffect}
            // 解决这种场景
            if(oldDep){
                // 删除老的
                cleanEffect(oldDep, effect)
            }
            effect.deps[effect._depsLength++] = dep
        }else{
            effect._depsLength++;
        }

    }

    // 最原始的写法 -> 成为 上面的写法
    // dep.set(effect, effect._trackId)
    // // effect 和 dep 进行关联
    // effect.deps[effect._depsLength++] = dep
}

export const triggerEffects = (dep) => {
    for (const effect of dep.keys()) {

        // 服务于 computed
        // 当前这个值不脏，但是需要更新 把它 变成 脏值
        if (effect._dirtyLevel < DirtyLevels.DIRTY) {
            effect._dirtyLevel = DirtyLevels.DIRTY
        }
        // 服务于 computed


        // 当前effect 正在运行，不需要触发
        // 处理 循环调用的 问题 (虽然规避了 死循环的问题，但是有点 反理解)
        if(!effect._running){
            if(effect.scheduler){
                effect.scheduler() // ->触发 effect.run()
            }
        }
    }
}