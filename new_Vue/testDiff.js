import { compileToFunction } from './compile'
import Vue from './index'
import { createEle, patch } from './vdom/patch'
import { patch as newPatch } from './vdom/newPatch'

let vm1 = new Vue({
    data(){
        return {
            name: '111'
        }
    }
})

const render1 = compileToFunction('<div style="color: red;">{{name}}</div>')

const vnode1 = render1.call(vm1)
let el1 = createEle(vnode1)
document.body.appendChild(el1)


let vm2 = new Vue({
    data(){
        return {
            name: '222'
        }
    }
})

const render2 = compileToFunction('<div style="background: yellow;">{{name}}</div>')
const vnode2 = render2.call(vm2)
let el2 = createEle(vnode2)

// let newEl = patch(vnode1,vnode2)
setTimeout(() => {
    debugger
    let newEl1 = newPatch(vnode1,vnode2)
}, 2000)
// console.log(newEl, 'newEl')




// 图片 性能 
// webpack5  不编译， babel loose
// css 问题