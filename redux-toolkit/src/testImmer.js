let {produce} = require('immer')


let baseState = {
    list: [1,2],
    obj: {
        name: 'ss'
    }
}

let newState = produce(baseState, (draft) => {
    draft.list.push(3)
})

console.log(newState.list, 'newState.list', newState.list, newState.list === newState.list) // true
console.log('newState.obj', newState.obj === newState.obj) // true