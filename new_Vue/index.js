import { initState } from './observe/index'
import Watcher from './observe/watcher'
import compile from './observe/util';
import { h, patch, render } from './vdom';

function Vue(options){
    this._init(options)
}

Vue.prototype._init = function(options){
    // vue 初始化，this.$options 标示的是vue中的参数
    let vm = this;
    vm.$options = options

    // 数据初始化
    initState(vm)

    // 开始渲染
    if(vm.$options.el){
        vm.$mount();
    }
}



// Vue.prototype._update = function(){
//     // 用户传入的数据去更新试图
//     let vm = this;
//     let el = vm.$el;

//     let node = document.createDocumentFragment()

//     let firstChild
//     while (firstChild = el.firstChild) {
//         node.appendChild(firstChild)
//     }

//     compile(node,vm)
//     el.appendChild(node)
//     // 需要使用 {{}} 的方式进行替换

// }
Vue.prototype._update = function(vnode){
    // debugger
    // 用户传入的数据去更新试图
    let vm = this;
    let el = vm.$el;

    let prevVnode = vm.prevVnode
    // 初次渲染
    if(!prevVnode){
        // 保存上一次的节点
        vm.prevVnode = vnode
        render(vnode, el)
    }else{
        vm.$el = patch(prevVnode, vnode)
    }
}


Vue.prototype._render = function(){
    let vm = this;
    let render = vm.$options.render;
    // vNode
    return render.call(vm, h)
}

Vue.prototype.$mount = function(){
    let vm = this;
    let el = vm.$options.el;
    el = vm.$el = query(el);  // vm.$el 就是将要挂载的元素

    // 渲染通过watcher
    // 渲染watcher 用于渲染的watcher
    // vue 2.0 组件级别的更新

    let updateCom = () => {
        console.log('更新组件') //第一次渲染，后面是更新
        vm._update(vm._render()) // 更新组件
    }

    new Watcher(vm,updateCom) // 渲染watcher
}

Vue.prototype.$watch = function(key, handler, opts){
    new Watcher(this,key, handler, { user: true, ...opts }) // 用户自定义watcher
}

function query(el){
    return typeof el === 'string' ? document.querySelector(el) : el;
}
export default Vue;