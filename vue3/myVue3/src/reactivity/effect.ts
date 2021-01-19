import { isArray, isInterger } from "../shared/index";

// 类似 vue2的 watch
export const effect = (fn, options: any = {}) => {
    const effect = createReactiveEffect(fn, options);

    if (!options.lazy) {
        effect()
    }

    return effect;
}

// 存贮 当前的 effect 函数, 把 activeEffect(effect) 和 effect 内部 依赖的熟悉进行绑定
let activeEffect;
let uid = 0;

/**
 * 防止出现 effect 嵌套的 情况
 */
const effectStack = [];

function createReactiveEffect(fn, options){
    const effect = function(){
        // 防止出现 effect 出现循环更新的情况
        if(!effectStack.includes(effect)){
            try{
                activeEffect = effect;
                effectStack.push(activeEffect)
                // 取值操作，进入 track
                return fn();
            }finally{
                effectStack.pop()
                activeEffect = effectStack[effectStack.length - 1];
                // activeEffect = null;
            }
        }
    }
    // effect 唯一 && effect 的依赖属性
    effect.id = uid++;
    effect.deps = []; // effect 中 依赖了那些属性
    effect.options = options;

    return effect;
}

// key 就是 对象 组成对 key
const targetMap = new WeakMap();
// { Object: Map }
// { Object: Map{ age: Set{ effect1, effect2, effect3 } } }

// 属性(key) 和 effect 做关联
export const track = (target, key) => {
    // 没有在 effect 里面进行任何取值，不需要进行任何 关联
    if(activeEffect === undefined){
        return;
    }

    let depsMap = targetMap.get(target);
    if(!depsMap){
        targetMap.set(target, (depsMap = new Map()))
    }

    let dep = depsMap.get(key)

    if(!dep){
        // 使用 Set 目的 ->  effect 去重 处理
        depsMap.set(key, (dep = new Set()))
    }

    if(!dep.has(activeEffect)){
        dep.add(activeEffect)

        // 双向记忆过程
        activeEffect.deps.push(dep);
    }
}

// 触发更新
export const trigger = (target, type, key, value, oldValue?) => {
    const depsMap = targetMap.get(target)
    // 这个对象没有做 依赖收集
    if(!depsMap){
        return
    }

    const run = (effects) => {
        // effects -> Set 集合
        effects && effects.forEach(effect => {
            effect();
        });
    }


    console.log(key, target, '~~~~~~', depsMap);
    // 针对数组的特殊情况
    if(key === 'length' && isArray(target)){
        depsMap.forEach((itemDep, key) => {
            // 改的 长度 小于 数组 原有的长度， 更新
            if(key === 'length' || String(key) >= value){
                run(itemDep)
            }
        });
    } else {
        // 修改了key
        if(key !== void 0){
            // 获取 key 对应的 effect
            run(depsMap.get(key))
        }

        switch(type){
            case 'add':
                // 修改数组的 索引
                if(isArray(target)){
                    
                    if(isInterger(key)){
                        // 新增元素，出发 length 变更
                        run(depsMap.get('length'));
                    }
                }
                break;
            default:
                break;
        }
    }
}