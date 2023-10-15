// 渲染需要使用 ，计算属性也要使用， vm.watch 也要使用
// watch id 主要为了 更新使用


// 一个属性更改了，其他属性没改，整个组件会重新更新(涉及 domDiff)，但是整个组件会更新
// vue2.0 一个组件就是一个 watcher
// 三类watcher -> 1.render watcher 2.用户watcher 3. computed watcher

// vue的 批量更新 算是一个亮点

// computed 返回函数 ？？
// computed 支持 set ？？
// computed 更新 dirty ？？/



/**
 * Vue data 中随意更改一个属性，视图都会被更新吗？
 * https://juejin.cn/post/7040733315791323143
 * 
 * template 会被编译成render函数，函数执行的时候，访问什么变量，就出触发相应变量的get，然后才会添加watcher。
 * 触发了 get，然后在 get里面 (每一个data 属性都有一个 dep 实列), 触发了dep.depend() ---> watcher.addDep ---> dep.addSub(dep 把 wacther 加进来)。 dep里面有 wacther， wacter 里面有dep
 * 
 * 
 *  同一个的 Watcher 在同一个 tick 的时候应该只被执行一次，也就是说队列 queue 中不应该出现重复的 Watcher 对象。
 */
let id = 0;
import Dep, { pushTarget, popTarget } from './dep'
import { util } from './util';
export default class Watcher {
    /**
     * 
     * @param {*} vm  this
     * @param {*} exprOrFn  用户传入的可能 是个表达式 也可能 传入是一个函数
     * @param {*} cb  用户传入的 回掉函数 vm.$watcher('nsg',cb)
     * @param {*} opts 
     */
    constructor(vm,exprOrFn,cb,opts = {}){
        this.vm = vm
        this.exprOrFn = exprOrFn;

        if(typeof exprOrFn === 'function'){
            this.getter = exprOrFn;
        }else{
            this.getter = function(){
                return util.getValue(vm, exprOrFn)
            }
        }

        // debugger
        if(opts.user){
            this.user = true
        }
        this.immediate = opts.immediate

        // computed
        // lazy 表示是 computed 的 watcher
        // dirty 表示是否需要重新取值

        this.lazy = opts.lazy
        this.dirty = this.lazy

        
        this.cb = cb;
        this.opts = opts;
        this.id = id++;

        this.deps = [];
        this.depsId = new Set();

        // this.value 老值
        // 所以用户的自定义 watcher 会 先执行一次 ， computed 不会立即执行
        this.value = this.lazy ? undefined : this.get()

        // console.log(opts, 'this.immediate')
        if(this.immediate){
            this.cb(undefined, this.value)
        }
    }

    get(){
        // 当用户自定义调用watcher 的时候， 这个时候 this 指向 用户自定义的 watch
        // Dep.target = userWatch
        // debugger
        pushTarget(this) // 渲染watcher Dep.target = watcher
        let val = this.getter.call(this.vm);
        popTarget()

        // if(this.immediate){
        //     this.cb(val, this.value)
        // }
        return val;
    }

    // 服务于 计算属性
    evaluate(){
        this.value = this.get()
        this.dirty = false // computed 值 求过了
    }

    run(){
        // debugger
        let val = this.get()

        // 用户自定义的 watch 开始执行
        // if(val !== this.value){
        // 区分用户自定义 watcher
        if(val !== this.value &&  this.opts.user){
            this.cb(val, this.value)
        }
    }

    // computed 依赖的依赖项 发生了变化，需要重新计算一次
    // 此时先判断 是不是 computed 属性， 需要重新重新 computed 值
    update(){
        // 如果是计算属性
        // 因为 computed 函数里面  依赖的data中的key ***属性*** 已经被 new Dep
        // 在 computed 函数里面 进行 取值的过程中，此时 Dep.target 指向 computed watcher
        // 触发了 observel 的 dep.depend()， 并且 向 computed watcher 中 添加了 当前依赖的 key 的 dep，
        // 并且也向 当前的 key 的dep 添加了 computed watcher

        // 此时 computed 的函数 依赖的 某一个 属性发生了变化，需要执行 watcher的 update
        if(this.lazy){
            // 计算属性依赖的值发生了变化
            // debugger
            this.dirty = true
        }else{
            // 每次更新放到 nextTick 里面
            queueWacther(this)
        }
        // this.get()
    }

    depend(){
        // debugger
        let dep = this.deps.length
        console.log(dep,'???',this.deps, Dep.target)
        // 把computedWatcher的 deps 给了 render watcher
        while(dep--){
            this.deps[dep].depend()
        }
    }

    addDep(dep){
        let id = dep.id;
        // 防止重复放入 dep
        if(!this.depsId.has(id)){
            this.deps.push(dep)
            this.depsId.add(id)
            dep.addSub(this)
        }
    }
}


let has = Object.create(null);
let queue = []

// 针对同样的 watcher 进行过滤操作，因为 vue2 就一个render watcher
// data 里面的属性 主要都是dep，每个 dep 都会保存watcher， 在执行 set操作的时候，
// 会触发 dep.notify() -> watcher.update() -> watcher.run() -> watcher.get() -> 执行 render watcher 的 update (updateCom的cb) 

let pedding = false;
function queueWacther(watcher){
    let id = watcher.id
    if(!has[id]){
        has[id] = true
        queue.push(watcher)

        // 延迟清空队列

        if(!pedding){
            pedding = true;
            nextTick(flushQueue)
        }
    }
}

function flushQueue(){
    queue.forEach((watcher) => {
        watcher.run();
    })

    // 等待下一轮更新
    has = Object.create(null);
    queue = []
    pedding = false
}



let waiting = false;
let callBacks = []
function flushCallBack(){
    callBacks.forEach((cb) => cb())
    waiting = false
    callBacks = []
}


// 注意有个场景
// data: {
//     a: 1
// }
// mounted(){
//     Vue.nextTick(() => {
//         console.log(app.innerHTML)
//     })
//     this.a = 100
// }
// 此时 拿到的 app.innerHTML 还是1 ，追踪源码发现
// callBacks 里面存放两个元素 [cb, flushQueue(queue -> [render watcher])] , cb 是用户传入的， 第二个是 flushQueue
// 所以执行顺序 还是 cb 先执行。 同步放入，异步执行


// waiting 的 作用
// nextTick 可以同时调用多次， 但是 在这 同时调用多次的过程中， 只能保证有一个 promise(setImmediate) 异步任务，因为在这些异步任务的 cb 里面 会去 挨个循环 nextTick 的 回掉函数
function nextTick(cb){
    callBacks.push(cb)

    if (!waiting) {
        waiting = true
        let timeFunc = () => {
            flushCallBack();
        }
    
        if(Promise){
            return Promise.resolve().then(() => {
                timeFunc()
            })
        }
    
        if(MutationObserver){
            let observe = new MutationObserver(timeFunc)
            let textNode = document.createTextNode(1)
            observe.observe(textNode, { characterData: true })
            textNode.textContent = 2
            return
        }
    
        if(setImmediate){
            return setImmediate(timeFunc,0);
        }
    
        setTimeout(timeFunc,0);
    }
}