import { h, patch, render, createElement, createTextVnode } from './vdom';

export default function renderMinxin(Vue){
    // 元素虚拟节点
    Vue.prototype._c = function (...args) {
        return createElement(this, ...args)
    }

    // 文本虚拟节点
    Vue.prototype._v = function (text){
        return createTextVnode(text)
    }

    // 元素
    Vue.prototype._s = function (val) {
        debugger
        return val === null ? '' : typeof val === 'object' ? JSON.stringify(val) : val;
    }

    // _render 执行之后 拿到 vnode
    Vue.prototype._render = function(){
        debugger
        let vm = this;
        let render = vm.$options.render;
        // vNode
        return render.call(vm, h)
    }
}
