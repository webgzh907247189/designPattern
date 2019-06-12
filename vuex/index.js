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

class Store {
    constructor(options = {}, Vue) {
        this.options = options;
        Vue.mixin({ beforeCreate: vuexInit });
    }
    get state () {
        return this.options.state;
    }
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