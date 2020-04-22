// 渲染需要使用 ，计算属性也要使用， vm.watch 也要使用
let id = 0;
export default class Watcher {
    /**
     * 
     * @param {*} vm  this
     * @param {*} exprOrFn  用户传入的可能 是个表达式 也可能 传入是一个函数
     * @param {*} cb  用户传入的 回掉函数 vm.$watcher('nsg',cb)
     * @param {*} opts 
     */
    constructor(vm,exprOrFn,cb,opts){
        this.vm = vm
        this.exprOrFn = exprOrFn;

        if(typeof exprOrFn === 'function'){
            this.getter = exprOrFn;
        }
        
        this.cb = cb;
        this.opts = opts;
        this.id = id++;

        this.get()
    }

    get(){

    }
}