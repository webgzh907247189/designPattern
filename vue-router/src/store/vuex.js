let Vue
class Store{
    constructor(options){
        this.options = options || {}
        this.getters = {}
        this.mutations = {}
        this.actions = {}

        // 把state 数据变为响应式
        let state = this.options.state
        this._vm = new Vue({
            data: {
                state
            }
        })

        // 处理getters，直接把getters 挂载到 this._vm.state 上面
        let getters = options.getters
        if(getters){
            forEach(getters,(getterName,getterFn)=>{
                Object.defineProperty(this._vm.state,[getterName],{
                    get:()=>{
                        return getterFn(state)
                    }
                })
            })
        }

        let mutations = options.mutations
        if(mutations){
            forEach(mutations,(mutationName,mutationFn)=>{
                this.mutations[mutationName] = ()=>{
                    // 修正this(防止出错)
                    mutationFn.call(this,state)
                }
            })
        }

        // 用户先调用这处的 commit(自己的commit)，然后调用原型链上的 commit
        // 解构原型上的 commit (此时自己的commit，dispatch) 还未生成，所以这些方法是原型上的
        let {commit,dispatch} = this
   
        this.commit = (type)=>{
            // 修正 actions里面的commit(commit 为原型上的)
            commit.call(this,type)
        }
        this.dispatch = function(type){
            dispatch.call(this,type)
        }

        let actions = options.actions
        if(actions){
            forEach(actions,(actionName,actionFn)=>{
                this.actions[actionName] = ()=>{
                    // 修正this(防止出错)
                    actionFn.call(this,this)
                }
            })
        }
    }

    get state(){
        // 返回响应式 数据
        return this._vm.state

        // return this.options.state
    }

    commit(type){
        this.mutations[type]()
    }

    dispatch(type){
        this.actions[type]()
    }
}


let install = function(_Vue){
    // 保留Vue的构造函数
    Vue = _Vue

    Vue.mixin({
        beforeCreate(){
            // 依赖 先续遍历，所以可以完成，$store每个组件都挂载
            if(this.$options && this.$options.store){
                this.$store = this.$options.store
            }else{
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

function forEach(obj,cb){
    Object.keys(obj).forEach((item)=>{
        cb(item,obj[item])
    })
}



// 这样写不会运行install，因为直接导出的是对象
// 或者不要install方法，会直接运行Store类
Store.install = function(_Vue){
    console.log('333')
}

export default {
    Store,
    install
}






{
    class A{
        constructor(){
            this.c = ()=>{
                console.log('1',this)
            }
        }
    
        c(){
            console.log('2')
        }
    }
    var a = new A()
    let {c} = a;
    a.c() // 1 A {c: ƒ}
    c() // 1 A {c: ƒ
}

{
    class A{
        constructor(){
            
        }
    
        c(){
            console.log('2',this)
        }
    }
    var a = new A()
    let {c} = a;
    a.c() // 2 A {}
    c()  // 2 undefined
}