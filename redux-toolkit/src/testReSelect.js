const { createSelector } = require('reselect')

const select1 = state => state.a
const select2 = state => state.b

const select3 = createSelector([select1, select2], (a, b) => {
    console.log('执行了计算')
    return a + b
})
let state = {a: 'a', b: 'b'}
const result1 = select3(state)
const result2 = select3(state)

console.log(result1,'result', result2)
// 执行了计算
// ab result ab