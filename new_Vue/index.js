import { initState } from './observe/index'
import Watcher from './observe/watcher'
import { compileToFunction } from './compile/index';
import renderMinxin from './render';
import lifeCycleMinxin, { mountComponent, callHook } from './lifeCycle'
import initGlobalApi, { mergeOptions } from './global-api/index';

function Vue(options){
    this._init(options)
}

lifeCycleMinxin(Vue);
renderMinxin(Vue);
initGlobalApi(Vue);

Vue.prototype._init = function(options){
    // vue 初始化，this.$options 标示的是vue中的参数
    let vm = this;
    vm.$options = mergeOptions(vm.constructor.options,options)

    callHook(vm, 'beforeCreate')
    // 数据初始化
    initState(vm)
    callHook(vm, 'created')

    // 开始渲染
    if(vm.$options.el){
        vm.$mount();
    }
}


Vue.prototype.$mount = function(){
    let vm = this;
    debugger
    let el = vm.$options.el;
    el = vm.$el = el && query(el);  // vm.$el 就是将要挂载的元素

    const options = vm.$options;
    // 编译模版
    if(!options.render){
        let template = options.template
        if(!template & el){
            // 查找规范，先找 template
            template = el.outerHTML
        }

        const render = compileToFunction(template)
        options.render = render;
    }

    mountComponent(vm)
}

Vue.prototype.$watch = function(key, handler, opts){
    new Watcher(this,key, handler, { user: true, ...opts }) // 用户自定义watcher
}

function query(el){
    return typeof el === 'string' ? document.querySelector(el) : el;
}
export default Vue;