// class Watcher {
//     constructor(vm, exp, callback) {
//         this.vm = vm;
//         this.exp = exp;
//         this.callback = callback;

//         // 更改前的值
//         this.value = this.get();
//     }
//     get() {
//         // 将当前的 watcher 添加到 Dep 类的静态属性上
//         Dep.target = this;

//         // 获取值触发数据劫持
//         console.log(this.exp,'Watcher-----')
//         let value = CompileUtil.getVal(this.vm, this.exp);

//         // 清空 Dep 上的 Watcher，防止重复添加
//         Dep.target = null;
//         return value;
//     }
//     update() {
//         // 获取新值
//         let newValue = CompileUtil.getVal(this.vm, this.exp);
//         // 获取旧值
//         let oldValue = this.value;

//         // 如果新值和旧值不相等，就执行 callback 对 dom 进行更新
//         if(newValue !== oldValue) {
//             this.callback(newValue);
//         }
//     }
// }





// 用react或vue 实现一个分页组件
// 要求：

// 需要支持两种模式：总数已知（有尾页）和总数未知（只有上一页和下一页）
// 组件支持内部直接跳转到目标页
// 组件支持外部跳转到目标页
// 组件拥有修改每页数量的下拉框
// 组件样式可以支持自定义
// 点击每个按钮都需要有回调
// 尽可能地减少接入方的接入成本




let uid = 0;

class Watcher {
    constructor (vm, exp, callback) {
        this.id = ++uid;

        this.vm = vm;
        this.exp = exp;
        this.callback = callback;

        // 更改前的值
        this.value = this.get();
    }

    get() {
        // 将当前的 watcher 添加到 Dep 类的静态属性上
        Dep.target = this;

        // 获取值触发数据劫持
        console.log(this.exp,'Watcher-----')
        let value = CompileUtil.getVal(this.vm, this.exp);

        // 清空 Dep 上的 Watcher，防止重复添加
        Dep.target = null;
        return value;
    }

    update () {
        console.log('watch' + this.id + ' update');

        // 1. 判断 has {}  是否 包含这个 watch.id
        // 2. 把 watch push 进 queue 数组
        // 3. nextTick(flushSchedulerQueue)  进行 批量 更新

        // 4. nextTick(cb)  ->  callbacks.push(cb) ->  setTimeout(flushCallbacks, 0)
        // 5. flushCallbacks()  ->  深拷贝 callbacks[]  得到 copies  ->  copies[i]()  (cb 开始执行) 

        // 6. flushSchedulerQueue   循环 queue 队列 -> 找到每个 watch  ->  找到 watch.id  ->  清空  has[id] = null  ->  执行 watch.run()
        queueWatcher(this);
    }

    run () {
        console.log('watch' + this.id + '视图更新啦～');

        let newValue = CompileUtil.getVal(this.vm, this.exp);
        // 获取旧值
        let oldValue = this.value;

        // 如果新值和旧值不相等，就执行 callback 对 dom 进行更新
        if(newValue !== oldValue) {
            this.callback(newValue);
        }
    }
}



let callbacks = [];  // 存放 批量 更新函数  flushSchedulerQueue
let pending = false;

function nextTick (cb) {
    callbacks.push(cb);
    console.log(queue,'queue111')

    if (!pending) {
        pending = true;
        console.log(queue,'queue22')

        setTimeout(flushCallbacks, 0);
    }
}

function flushCallbacks () {
    console.log(queue,'queue333')
    pending = false;

    // 复制 callbacks(存放 批量 更新函数  flushSchedulerQueue)   数组
    const copies = callbacks.slice(0);
    callbacks.length = 0;

    for (let i = 0; i < copies.length; i++) {
        console.log(i,'flushCallbacks 的 i')
        copies[i]();
    }
}






let has = {};    // 标识这个 watch 有没有被 queue push 进去
let queue = [];  // 存放 watch 的数组
let waiting = false;

function queueWatcher(watcher) {
    const id = watcher.id;
    if (has[id] == null) {
        has[id] = true;
        queue.push(watcher);

        if (!waiting) {
            waiting = true;
            // nextTick是Vue实现的微任务机制（在不支持微任务的情况下，回退到宏任务）,flushSchedulerQueue 则是用来执行queue中的观察者,并清空queue
            nextTick(flushSchedulerQueue); 
        }
    }
}

function flushSchedulerQueue () {
    let watcher, id;

    for (index = 0; index < queue.length; index++) {
        console.log(index,'flushSchedulerQueue 的 index')
        watcher = queue[index]
        id = watcher.id;
        has[id] = null;
        watcher.run();
    }

    waiting = false;
}


/**
 * https://juejin.im/post/5c204ce36fb9a049d975363d
 * 
 * vue 解析
 */