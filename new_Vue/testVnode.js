import { h, render, patch } from './vdom/index'

/* 向后补充 */
// const oldVnode = h('div', {  },
//     h('li',{style: {background: 'red'} ,key: 'a'}, 'a'),
//     h('li',{style: {background: 'yellow'},key: 'b'}, 'b'),
//     h('li',{style: {background: 'blue'},key: 'c'}, 'c'),
//     h('li',{style: {background: 'pink'},key: 'd'}, 'd'),
// );
// const newVnode = h('div', {  }, 
//     h('li',{style: {background: 'red'},key: 'a'}, 'a'),
//     h('li',{style: {background: 'yellow'},key: 'b'}, 'b'),
//     h('li',{style: {background: 'blue'},key: 'c'}, 'c'),
//     h('li',{style: {background: 'pink'},key: 'd'}, 'd'),
//     h('li',{style: {background: 'purple'},key: 'e'}, 'e'),
// )

/** 向前补充 */
// const oldVnode = h('div', {  },
//     h('li',{style: {background: 'red'} ,key: 'a'}, 'a'),
//     h('li',{style: {background: 'yellow'},key: 'b'}, 'b'),
//     h('li',{style: {background: 'blue'},key: 'c'}, 'c'),
//     h('li',{style: {background: 'pink'},key: 'd'}, 'd'),
// );
// const newVnode = h('div', {  }, 
//     h('li',{style: {background: 'purple'},key: 'e'}, 'e'),
//     h('li',{style: {background: 'pink'},key: 'f'}, 'f'),
//     h('li',{style: {background: 'red'},key: 'a'}, 'a'),
//     h('li',{style: {background: 'yellow'},key: 'b'}, 'b'),
//     h('li',{style: {background: 'blue'},key: 'c'}, 'c'),
//     h('li',{style: {background: 'pink'},key: 'd'}, 'd'),
// )

// /** 交叉比较 */
// const oldVnode = h('div', {  },
//     h('li',{style: {background: 'red'} ,key: 'a'}, 'a'),
//     h('li',{style: {background: 'yellow'},key: 'b'}, 'b'),
//     h('li',{style: {background: 'blue'},key: 'c'}, 'c'),
//     h('li',{style: {background: 'pink'},key: 'd'}, 'd'),
// );
// const newVnode = h('div', {  }, 
//     h('li',{style: {background: 'pink'},key: 'd'}, 'd'),
//     h('li',{style: {background: 'blue'},key: 'c'}, 'c'),
//     h('li',{style: {background: 'yellow'},key: 'b'}, 'b'),
//     h('li',{style: {background: 'red'},key: 'a'}, 'a'),
// )

/** 交叉比较 */
const oldVnode = h('div', {  },
    h('li',{style: {background: 'red'} ,key: 'a'}, 'a'),
    h('li',{style: {background: 'yellow'},key: 'b'}, 'b'),
    h('li',{style: {background: 'blue'},key: 'c'}, 'c'),
    h('li',{style: {background: 'pink'},key: 'd'}, 'd'),
);
const newVnode = h('div', {  }, 
    h('li',{style: {background: 'pink'},key: 'd'}, 'd'),
    h('li',{style: {background: 'blue'},key: 'a'}, 'a'),
    h('li',{style: {background: 'yellow'},key: 'b'}, 'b'),
    h('li',{style: {background: 'red'},key: 'c'}, 'c'),
)

const container = document.getElementById('app')
render(oldVnode, container)


setTimeout(()=> {
    patch(oldVnode,newVnode)
}, 5000)