/**
 * https://juejin.im/post/5c62ea95e51d457ffe60c084
 * https://juejin.im/post/5c35432de51d45517d2f8bd8
 */


/**
 * 一.完成最简单的通过vuex定义全局变量，在任何一个页面可以通过this.$store.state.count可以直接使用
 * 二.vuex中的getter方法的实现
 * 三.mutation和commit方法的实现
 * 四.actions和dispatch方法的实现
 * 五.module方法的实现
 * 六.实现：Vue.use(Vuex)
 */


// this.$store 是 new Vuex.Store 的 实例, 代表store里面的this
class Store {
    constructor(options = {}, Vue) {
        Vue.mixin({ beforeCreate: vuexInit });
        this.options = options;
        this.getters = {}
        this.mutations = {}
        this.actions = {}

        this.commit = (type) => {
            return commit.call(this, type);
        }

        this.dispatch = (action) => {
            return dispatch.call(this, action)
        }

        forEachValue(options.getters,(fn,key) => {
            registerGetter(this,key,fn)
            // this.getters[key] = fn(this.options.state) // 也可以这样得到 gtters
        })

        forEachValue(options.mutations,(fn,key) => {
            registerMutations(this,key,fn)
        })

        forEachValue(options.actions,(fn,key) => {
            registerActions(this,key,fn)
        })

        this._vm = new Vue({  // 为state 服务
            data: {
                state: options.state
            }
        });
    }

    get state () {
        // return this._vm._data.state; // 无法完成页面中的双向绑定，所以改用this._vm的形式
        return this.options.state;
    }   
}

function dispatch(type){
    this.actions[type]()
}

function commit(type){
    this.mutations[type]()
}

function registerGetter(target,key,fn){
    Object.defineProperty(target.getters,key,{
        get(){
            return fn(target.state)
        }
    })
}

function registerMutations(target,key,fn){
    target.mutations[key] = function(){
        fn.call(target,target.state)
    }
}

function registerActions(target,key,fn){
    target.actions[key] = function(){
        fn.call(target,target)
    }
}

function forEachValue(obj,cb){
    Object.keys(obj).forEach(item => {
        cb(obj[item],item)
    })
}

function vuexInit () {
    const options = this.$options
    if (options.store) {
        // 组件内部设定了store,则优先使用组件内部的store
        this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
        // 组件内部没有设定store,则从根App.vue下继承$store方法
        this.$store = options.parent.$store
    }
}

var Vuex = {
    Store
}