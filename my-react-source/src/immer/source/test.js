import { produce } from './index'

const state = {
  done: false,
  val: 'string',
  a: [],
  p: {
    x: 1,
    y: []
  },
}


// debugger
// const newState = produce(state, (draft) => {
//     // debugger
//   draft.done = true
// })

// console.log(state.done) // false
// console.log(newState.done) // true


// debugger
const newState = produce(state, (draft) => {
    // debugger
  draft.a.push('??')
})

console.log(state.a) // false
console.log(newState.a) // true
