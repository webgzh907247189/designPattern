// 混入全局方法
export default function initGlobalApi(Vue){
    Vue.options = {} // Object.create(null);

    Vue.mixin = function(mixin){
        this.options = mergeOptions(this.options, mixin)
        return this;
    }


    Vue.options._base = Vue;
    Vue.options.components = {} // 存放组件的定义
    Vue.component = function(id, definition){
        definition.name = definition.name || id;
        // 产生一个构造函数
        definition = this.options._base.extend(definition);

        this.options.components[id] = definition;
    }


    let cid = 0;
    Vue.extend = function(options){
        const Super = this;
        const Sub = function(){
            console.log(options, 'options')
            this._init(options);
        }

        Sub.cid = cid++;
        // 直接通过 Vue 来继承
        Sub.prototype = Object.create(Super.prototype)
        Sub.prototype.constructor = Super;

        Sub.component = Super.component;

        Sub.options = mergeOptions(Super.options, options)
        return Sub;
    }
}


export const isObject = (val) => {
    return typeof val === 'object' && val !== null;
}

const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted'
]
const strate = Object.create(null);

LIFECYCLE_HOOKS.forEach((hook) => {
    strate[hook] = mergeHook
})
strate['components'] = function(parentVal, childVal){
    const res = Object.create(parentVal)
    if(childVal){
        for (const key in childVal) {
            res[key] = childVal[key];
        }
    }
    return res;
}

console.log(strate, 'strate')

function mergeHook(parentVal, childVal){
    if (childVal) {
        if(parentVal){
            return [...parentVal, childVal]
        } else {
            // 儿子有， 父亲没有
            return [childVal]
        }
    } else {
        return parentVal
    }
}



export function mergeOptions(parent, child){
    const options = {}

    for (let key in parent) {
        mergeField(key)
    }

    for (let key in child) {
        // console.log(parent.hasOwnProperty, 'parent',key)
        if(!parent.hasOwnProperty(key)){
            mergeField(key)
        }
    }

    function mergeField(key){
        // 策略模式
        if(strate[key]){
            return options[key] = strate[key](parent[key], child[key])
        }

        if(isObject(parent[key]) && isObject(child[key])){
            options[key] = { ...parent[key], ...child[key] }
        } else {
            if(child[key]){
                options[key] = child[key]
            }else {
                options[key] = parent[key]
            }
        }
    }
    return options
}