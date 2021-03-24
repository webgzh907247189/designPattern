// 渲染需要使用 ，计算属性也要使用， vm.watch 也要使用
// watch id 主要为了 更新使用


// 一个属性更改了，其他属性没改，整个组件会重新更新(涉及 domDiff)，但是整个组件会更新
// vue2.0 一个组件就是一个 watcher
// 三类watcher -> 1.render watcher 2.用户watcher 3. computed watcher

// vue的 批量更新 算是一个亮点

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
        if(val !== this.value){
            this.cb(val, this.value)
        }
    }

    // computed 依赖的依赖项 发生了变化，需要重新计算一次
    // 此时先判断 是不是 computed 属性， 需要重新重新 computed 值
    update(){
        // 如果是计算属性
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
// data 里面的属性 主要都是dep，每个 dep 都会保存watcher， 在执行 set操作的时候，会触发 dep.notify() -> watcher.update() -> watcher.get() -> 执行 render watcher 的 update (updateCom的cb) 
function queueWacther(watcher){
    let id = watcher.id
    if(!has[id]){
        has[id] = true
        queue.push(watcher)

        // 延迟清空队列
        nextTick(flushQueue)
    }
}

function flushQueue(){
    queue.forEach((watcher) => {
        watcher.run();
    })

    // 等待下一轮更新
    has = Object.create(null);
    queue = []
}




let callBacks = []
function flushCallBack(){
    callBacks.forEach((cb) => cb())
}
function nextTick(cb){
    callBacks.push(cb)

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