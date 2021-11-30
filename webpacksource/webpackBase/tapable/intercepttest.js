const { SyncHook } = require('./index');
// const { SyncHook } = require('tapable');


const hook = new SyncHook(['name', 'age'])
hook.intercept({
    // 每次添加一个新的事件函数就会触发
    register(tapInfo){
        console.log('拦截器1 register开始', tapInfo.name);
        return tapInfo
    },
    // 每当一个事件函数执行了就会触发
    tap(){
        console.log('拦截器1 tap 开始')
    },
    // 每次调用call 就会触发
    call(name, age){
        console.log('拦截器1 call 开始', name, age);
    }
})
hook.intercept({
    // 每次添加一个新的事件函数就会触发
    register(tapInfo){
        console.log('拦截器2 register开始', tapInfo.name);
        return tapInfo
    },
    // 每当一个事件函数执行了就会触发
    tap(){
        console.log('拦截器2 tap 开始')
    },
    // 每次调用call 就会触发
    call(name, age){
        console.log('拦截器2 call 开始', name, age);
    }
})

hook.tap('node', (name, age) => {
    console.log('node', name, age);
})
hook.tap('react', (name, age) => {
    console.log('react', name, age);
})
hook.call('吃饭', '27');

// 拦截器1 register开始 node
// 拦截器2 register开始 node
// 拦截器1 register开始 react
// 拦截器2 register开始 react
// 拦截器1 call 开始 吃饭 27
// 拦截器2 call 开始 吃饭 27
// 拦截器1 tap 开始
// 拦截器2 tap 开始
// node 吃饭 27
// 拦截器1 tap 开始
// 拦截器2 tap 开始
// react 吃饭 27


// 拦截器1 register开始 node
// 拦截器2 register开始 node
// 拦截器1 register开始 react
// 拦截器2 register开始 react
// 拦截器1 call 开始 吃饭 27
// 拦截器2 call 开始 吃饭 27
// 拦截器1 tap 开始
// 拦截器2 tap 开始
// node 吃饭 27
// 拦截器1 tap 开始
// 拦截器2 tap 开始
// react 吃饭 27