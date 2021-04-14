import Dep from './dep';
import Observe from './observe'
import Watcher from './watcher';

export function initState(vm){
    let opt = vm.$options;

    if(opt.data){
        initDate(vm)
    }

    if(opt.computed){
        initComputed(vm)
    }

    if(opt.watch){
        initWatch(vm)
    }
}

export function observe(date){
    if(typeof date !== 'object' || date === null){
        return
    }

    // console.log(date, '?????')
    // 已经被观测过了
    if(date.__ob__){
        return date.__ob__
    }
    return new Observe(date)
}

function proxy(vm,source,key){
    Object.defineProperty(vm,key, {
        get(){
            return vm[source][key]
        },
        set(newValue){
            vm[source][key] = newValue
        }
    })
}

// 用户传入的数据 用 
function initDate(vm){
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}

    // 代理取值 从 vm._date.xxx 直接 vm.xxx 代理成这样
    for(let key in data){
        proxy(vm,'_data',key)
    }
    // debugger
    observe(vm._data)
}

// 计算属性默认不执行，等用户取值才会执行，会缓存取过的值
// 依赖的值 发生了变化，会更新 dirty 属性，再次取值时，可以重新取值

// watch 不能放在模板 ({{}}) 里面
function initComputed(vm){
    // debugger
    let computed = vm.$options.computed
    let watchers = vm._watchersComputed =Object.create(null)
    for(let key in computed){
        const useDef = computed[key]
        // lazy => true 表示计算属性 ，不会立即执行
        watchers[key] = new Watcher(vm,useDef,() => {}, { lazy: true })
        Object.defineProperty(vm,key,{
            // 用户取值用到这个方法
            get: createComputedGetter(vm,key)
        })
    }
}

function initWatch(vm){
    let watch = vm.$options.watch
    for(let key in watch){
        let userDef = watch[key]
        
        // 可能会出现对象的情况，处理掉 对象里面掉  handler 情况
        let handler = userDef;
        if(userDef.handler){
            handler = userDef.handler
        }
        createWatcher(vm,key,handler, { immediate: userDef.immediate })
    }
}

function createWatcher(vm,key,handler, opts){
    return vm.$watch(key, handler, opts)
}

function createComputedGetter(vm,key){
    let watcher = vm._watchersComputed[key]
    // 用户取值调用下面的函数
    return function(){
        if(watcher){
            // dirty false 不需要重新计算val，返回上次
            if(watcher.dirty){
                watcher.evaluate()
            }
            // debugger
            console.log(Dep.target, 'Dep.target')
            // 计算属性 watcher
            if(Dep.target){
                // watcher 代表 计算属性 watcher
                watcher.depend()
            }
            return watcher.value;
        }
    }
}