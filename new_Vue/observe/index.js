import Observe from './observe'

export function initState(vm){
    let opt = vm.$options;

    if(opt.data){
        initDate(vm)
    }

    if(opt.computed){
        initComputed()
    }

    if(opt.watch){
        initWatch()
    }
}

export function observe(date){
    if(typeof date !== 'object' || date === null){
        return
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
    observe(vm._data)
}

function initComputed(){

}

function initWatch(){

}