const { SyncHook, AsyncParallelHook, HookMap } = require('./index');
// const { AsyncParallelHook, SyncHook, HookMap } = require('tapable');


// const hook = new SyncHook(['name'])
// hook.tap('node', (name) => {
//     console.log('node', name);
// })
// hook.tap('react', (name) => {
//     console.log('react', name);
// })
// hook.call('吃饭');

const hook = new SyncHook(['name'])
hook.tap({ name: 'node', stage: 3 }, (name) => {
    console.log('node', name);
})
hook.tap({ name: 'react', stage: 1 }, (name) => {
    console.log('react', name);
})
hook.tap({ name: 'vue', stage: 4 }, (name) => {
    console.log('vue', name);
})
hook.tap({ name: 'ng', stage: 2 }, (name) => {
    console.log('ng', name);
})
hook.call('吃饭');
// react 吃饭
// ng 吃饭
// node 吃饭
// vue 吃饭


// const hook = new SyncHook(['name'])
// hook.tap({ name: 'node' }, (name) => {
//     console.log('node', name);
// })
// hook.tap({ name: 'vue' }, (name) => {
//     console.log('vue', name);
// })
// hook.tap({ name: 'webpack', before: ['vue']}, (name) => {
//     console.log('webpack', name);
// })
// hook.tap({ name: 'ng' }, (name) => {
//     console.log('ng', name);
// })
// hook.call('吃饭');




// const hook = new AsyncParallelHook(['name'])
// hook.tapAsync('node', (name, cb) => {
//     setTimeout(() => {
//         console.log('node', name);
//         cb();
//     }, 1000)
// })

// hook.tapAsync('react', (name, cb) => {
//     setTimeout(() => {
//         console.log('react', name);
//         cb();
//     }, 1000)
// })

// hook.callAsync('吃饭', () => {
//     console.log('end');
// });

// hook.tapAsync('vue', (name, cb) => {
//     setTimeout(() => {
//         console.log('vue', name);
//         cb();
//     }, 1000)
// })
// hook.callAsync('吃饭', () => {
//     console.log('end');
// });





// const hook = new AsyncParallelHook(['name'])
// hook.tapPromise('node', (name) => {
//     return new Promise((reslove) => {
//         setTimeout(() => {
//             console.log('node', name);
//             reslove();
//         }, 1000)
//     })
// })

// hook.tapPromise('react', (name) => {
//     return new Promise((reslove) => {
//         setTimeout(() => {
//             console.log('react', name);
//             reslove();
//         }, 1000)
//     })
// })

// hook.promise('吃饭').then(() => {
//     console.log('end');
// });





// const hookMap = new HookMap(() => new SyncHook(['name']));
// hookMap.for('key1').tap('node', (name) => {
//     console.log('node', name);
// })
// hookMap.for('key1').tap('react', (name) => {
//     console.log('react', name);
// })
// let key1Hook = hookMap.get('key1');
// key1Hook.call('吃饭');





