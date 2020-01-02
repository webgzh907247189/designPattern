const {produce, applyPatches} = require('immer')

let state = {
    x: 1
}
  
let replaces = [];
let inverseReplaces = [];
  
state = produce(state,draft => {
      draft.x = 2;
      draft.y = 2;
    },
    (patches, inversePatches) => {
        // [ { op: 'replace', path: [ 'x' ], value: 2 },{ op: 'add', path: [ 'y' ], value: 2 } ]
        // [ { op: 'replace', path: [ 'x' ], value: 1 },{ op: 'remove', path: [ 'y' ] } ]
        console.log(patches, '??' ,inversePatches);
        replaces = patches.filter(patch => patch.op === 'replace');
        inverseReplaces = inversePatches.filter(patch => patch.op === 'replace');
    }
)
console.log(state, 'init') 
state = produce(state, draft => {
    draft.x = 3;
})
console.log('state1', state); // { x: 3, y: 2 }
  
state = applyPatches(state, replaces);
console.log('state2', state); // { x: 2, y: 2 }
  
state = produce(state, draft => {
    draft.x = 4;
})
console.log('state3', state); // { x: 4, y: 2 }
  
state = applyPatches(state, inverseReplaces);
console.log('state4', state); // { x: 1, y: 2 }