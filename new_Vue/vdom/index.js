export { render, patch } from './patch'
export { default as h } from './h'
import { isObject } from '../global-api/index';

import { vnode } from './create-element';

export const createElement = (vm,tag,data = {},...child) => {
    debugger
    // 正常的标签
    if(isReservedTag(tag)){
        return vnode(tag,data,data.key,child,undefined)
    }else{
        // 组件
        const Ctor = vm.$options.components[tag]
        return createComponent(vm,tag,data,data.key,child,Ctor)
    }
}


// 组件的核心 最终 调用的是 Vue.extend()
function createComponent(vm,tag,data,key,child,Ctor){
    // console.log(Ctor, 'Ctor')
    if(isObject(Ctor)){
        Ctor = vm.$options._base.extend(Ctor)
    }
    data.hook = {
        // 初始化钩子
        init(vnode){
            // 对子组件进行 实列化操作
            debugger
            let child = vnode.componentInstance = new vnode.componentOptions.Ctor({})
            child.$mount();
        }
    }

    // console.log(Ctor, '222')
    // 组件虚拟节点拥有 hook 和当前组件的 componentOptions 存放的 构造函数
    return vnode(`vue-component-${tag}${Ctor.cid}`, data, key, child, undefined,{Ctor})
}


export const createTextVnode = (text) => {
    // console.log(vnode, '111')
    return vnode(undefined,undefined,undefined,undefined,text)
}

function makeUp(str){
    const map = {}

    str.split(',').forEach(tagName => {
        map[tagName] = true;
    });

    return (tag) => map[tag] || false
}

export const isReservedTag = makeUp('a,p,li,div,ul,span,input,button')