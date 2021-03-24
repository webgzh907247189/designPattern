import { h, render, patch } from './vdom/index'


// const oldVnode = h('div', { style: {color: 'red'} }, h('span',{ class: 'test11' }, 'test11'), 'test22')
// const newVnode = h('div', { style: {color: 'yellow'} }, h('span',{ class: 'test11' }, 'test333'), 'test22',h('div',{ class: 'divtest' }, 'testdiv'))
// const container = document.getElementById('app')
// render(oldVnode, container)


// setTimeout(()=> {
//     patch(oldVnode,newVnode)
// }, 5000)