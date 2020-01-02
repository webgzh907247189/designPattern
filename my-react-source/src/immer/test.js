// import produce from "immer"
const {produce} = require('immer')

const state = {
  done: false,
  val: 'string',
  a: [],
  p: {
    x: 1,
    y: []
  },
}

const newState = produce(state, (draft) => {
  draft.done = true
})

console.log(state.done) // false
console.log(newState.done) // true

let nextState1 = produce(state, (draft) => {

})
console.log(state === nextState1); // true


/**
 * 对 draftState 的修改都会反应到 nextState 上，而 Immer 使用的结构是共享的，nextState 在结构上又与 currentState 共享未修改的部分
 */
let nextState2 = produce(state, (draft) => {
    draft.a.push(2);
})  
console.log(state.a === nextState2.a); // false
console.log(state.p === nextState2.p); // true



/**
 * Immer 还在内部做了一件很巧妙的事情，那就是通过 produce 生成的 nextState 是被冻结（freeze）的，
 * （Immer 内部使用Object.freeze方法，只冻结 nextState 跟 currentState 相比修改的部分），这样，当直接修改 nextState 时，将会报错。
 * 这使得 nextState 成为了真正的不可变数据。
 */
let nextState3 = produce(state, (draft) => {
    draft.p.y.push(2);
})
  
console.log(state === nextState3); // false




/**
 * 高阶函数的特点
 * 生成一个生产者 producer
 */
let producer = produce((draft,action) => {
    draft[action] = '我是actions'
});
let nextState4 = producer(state, 'add');
console.log(nextState4)


/**
 * recipe的返回值
 * recipe 是否有返回值，nextState 的生成过程是不同的：
 * recipe 没有返回值时：nextState 是根据 recipe 函数内的 draftState 生成的；
 * recipe 有返回值时：nextState 是根据 recipe 函数的返回值生成的；
 * 
 * recipe 函数内部的this指向 draftState ，也就是修改this与修改 recipe 的参数 draftState ，效果是一样的
 * recipe 函数不能是箭头函数，如果是箭头函数，this就无法指向 draftState 了
 */

// 此时，nextState 不再是通过 draftState 生成的了，而是通过 recipe 的返回值生成的。
let nextState5 = produce(state,(draftState) => {
    // draft === this; // true
    return {
      x: 2
    }
  }
)
console.log(nextState5)


console.log(Object.isFrozen(nextState5), '是否被冻结')
nextState5.x = '直接赋值'
console.log(nextState5)
