import { activeEffect, trackEffect, triggerEffects } from "./effect"


export const createDep = (cleanup, key) => {
    const dep = new Map() as any;
    
    dep.cleanup = cleanup
    dep.name = key

    return dep
} 

const targetMap = new WeakMap();

// 通过 activeEffect 判断是不是活跃的 effect， 非 活跃的 effect 不需要进行收集
export const track = (target, key) => {
    if(activeEffect){
        
        let depsMap = targetMap.get(target);
        if(!depsMap){
            targetMap.set(target, (depsMap = new Map()));
        }

        let dep = depsMap.get(key);
        if(!dep){
            // 方便 后续 直接清理掉 依赖的 属性的 dep 集合 (直接删除 age ｜ name 依赖的 dep 集合)
            // 添加 key 目的  方便调试
            depsMap.set(key, (dep = createDep(() => depsMap.delete(key), key) ));
        }

        
        // 把 当前 effect 放到 dep 里面，后续可以 触发 dep 存放的 effect
        trackEffect(activeEffect, dep)
    }
}



// 最终收集的效果 -> WeakMap -> { obj: {name: Map(effect1, effect2), age: Map(effect1, effect2)}} }
// {name: 1 ,age: 2} : {
//     age: {
//         effect1, effect2
//     },
//     name: {
//         effect1
//     }
// }

// age 和 name 对应的  Map 上分别具有 cleanup 方法





export const trigger = (target, key, value, oldValue) => {
    
    const depsMap = targetMap.get(target);

    // 没找到依赖的 effect 直接 return
    if(!depsMap){
        return
    }

    // dep 是 一个 new Map, 里面存放的是 effect  -> new Map({effect, effect._trackId})
    let dep = depsMap.get(key);
    if(dep){
        triggerEffects(dep);
    }
}