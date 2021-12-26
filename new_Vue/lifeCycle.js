import compile from './observe/util';
import Watcher from './observe/watcher'
import { patch } from './vdom/newPatch';
// import { h, patch, render } from './vdom';

export default function lifeCycleMinxin(Vue) {

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
    

    // Vue.prototype._update = function(vnode){
    //     debugger
    //     // 用户传入的数据去更新试图
    //     let vm = this;
    //     let el = vm.$el;

    //     let prevVnode = vm.prevVnode
    //     // 初次渲染
    //     if(!prevVnode){
    //         // 保存上一次的节点
    //         vm.prevVnode = vnode
    //         render(vnode, el)
    //     }else{
    //         vm.$el = patch(prevVnode, vnode)
    //     }
    // }


    Vue.prototype._update = function(vnode){
        debugger
        // 用户传入的数据去更新试图
        let vm = this;
        let el = vm.$el;

        // 渲染组件  ->  vm.$el 就是组件渲染的
        vm.$el = patch(el, vnode)
        console.log(vm, 'vm.$el');
    }
}

export function mountComponent(vm){
    // 渲染通过watcher
    // 渲染watcher 用于渲染的watcher
    // vue 2.0 组件级别的更新

    let updateCom = () => {
        console.log('更新组件') //第一次渲染，后面是更新
        vm._update(vm._render()) // 更新组件
    }

    new Watcher(vm,updateCom) // 渲染watcher
}

export function callHook(vm, hook){
    const handler  = vm.$options[hook]
    if(handler){
        handler.forEach(itemHandler => {
            itemHandler.call(vm)
        });
    }
}