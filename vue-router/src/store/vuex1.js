let Vue

class ModucleCollection{
    constructor(options){
        this.register([],options)
    }
    register(path,rowModule){
        let newModule = {
            _raw: rowModule,
            _children: {}, // 包含的模块
            state: rowModule.state //自己模块的状态
        }

        if(path.length === 0){
            this.root = newModule
        }else{
            // 儿子挂载到_children
            let parent = path.slice(0,-1).reduce((result,item)=>{
                return result._children[item]
            },this.root)
            parent._children[ path[path.length - 1] ] =  newModule
        }

        // 存在子模块
        if(rowModule.modules){
           forEach(rowModule.modules,(childName,module)=>{
                this.register(path.concat(childName),module)
           })
        }
    }
}

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

        // 把模块的关系进行管理
        this.modules = new ModucleCollection(options)
        console.log(this.modules,'???')

        installModules(this,state,[],this.modules.root)


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
    }

    get state(){
        // 返回响应式 数据
        return this._vm.state

        // return this.options.state
    }

    commit(type){
        this.mutations[type].forEach((itemFn)=>{
            itemFn()
        })
    }

    dispatch(type){
        this.actions[type].forEach((itemFn)=>{
            itemFn()
        })
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

// rootModule 是构造的对象
function installModules(store,rootState,path,rootModule){
    if(path.length > 0){
        let parent = path.slice(0,-1).reduce((result,item)=>{
            return result[item]
        },rootState)

        Vue.set(parent,path[path.length - 1],rootModule.state)
    }

    if(rootModule._raw.getters){
        forEach(rootModule._raw.getters,(getterName,getterFn)=>{
            Object.defineProperty(store.getters,getterName,{
                get(){
                    return getterFn(rootModule.state)
                }
            })
        })
    }

    if(rootModule._raw.actions){
        forEach(rootModule._raw.actions,(actionName,actionFn)=>{
            let entry = store.actions[actionName] || (store.actions[actionName] = [])
            entry.push(()=>{
                actionFn.call(store,store)
            })
        })
    }

    if(rootModule._raw.mutations){
        forEach(rootModule._raw.mutations,(mutationName,mutationFn)=>{
            let entry = store.mutations[mutationName] || (store.mutations[mutationName] = [])
            entry.push(()=>{
                mutationFn.call(store,rootModule.state)
            })
        })
    }

    forEach(rootModule._children,(childName,module)=>{
        installModules(store,rootState,path.concat(childName),module)
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