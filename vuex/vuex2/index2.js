let _Vue;
class Store {
    constructor(options = {}, Vue) {
        _Vue = Vue
        Vue.mixin({
            beforeCreate: vuexInit
        })
        this.getters = {};
        this._mutations = {}; // 在私有属性前加_
        this._wrappedGetters = {};
        this._actions = {};

        // 初始化 module
        // this._modules.root = {
        //     _children: {},
        //     _rawModule: rawModule,
        //     state: rawModule.state
        // }
        this._modules = new ModuleCollection(options)
        console.log(this._modules, 'options')

        const {
            dispatch,
            commit
        } = this;
        this.commit = (type) => {
            return commit.call(this, type);
        }
        this.dispatch = (type) => {
            return dispatch.call(this, type);
        }
        const state = options.state;
        const path = []; // 初始路径给根路径为空
        installModule(this, state, path, this._modules.root);
        this._vm = new Vue({
            data: {
                state: state
            }
        });
    }

    get state() {
        // return this.options.state; // 无法完成页面中的双向绑定，所以改用this._vm的形式
        return this._vm._data.state;
    }
    commit(type) {
        this._mutations[type].forEach(handler => handler());
    }
    dispatch(type) {
        return this._actions[type][0]();
    }
}

class ModuleCollection {
    constructor(rawRootModule) {
        this.register([], rawRootModule)
    }
    register(path, rawModule) {
        const newModule = {
            _children: {},
            _rawModule: rawModule,
            state: rawModule.state
        }
        if (path.length === 0) {
            this.root = newModule;
        } else {
            const parent = path.slice(0, -1).reduce((module, key) => {
                return module._children(key);
            }, this.root);
            parent._children[path[path.length - 1]] = newModule;
        }
        if (rawModule.modules) {
            forEachValue(rawModule.modules, (rawChildModule, key) => {
                this.register(path.concat(key), rawChildModule);
            })
        }
    }
}

function installModule(store, rootState, path, module) {
    if (path.length > 0) {
        const parentState = rootState;
        const moduleName = path[path.length - 1];
        _Vue.set(parentState, moduleName, module.state)
    }
    const context = {
        dispatch: store.dispatch,
        commit: store.commit,
    }

    // local 的 getters 和 state 的 enumerable configurable 都为 false
    const local = Object.defineProperties(context, {
        getters: {
            get: () => store.getters
        },
        state: {
            get: () => {
                let state = store.state;
                return path.length ? path.reduce((state, key) => state[key], state) : state
            }
        }
    })

    if (module._rawModule.actions) {
        forEachValue(module._rawModule.actions, (actionFn, actionName) => {
            registerAction(store, actionName, actionFn, local);
        });
    }
    if (module._rawModule.getters) {
        forEachValue(module._rawModule.getters, (getterFn, getterName) => {
            registerGetter(store, getterName, getterFn, local);
        });
    }
    if (module._rawModule.mutations) {
        forEachValue(module._rawModule.mutations, (mutationFn, mutationName) => {
            registerMutation(store, mutationName, mutationFn, local)
        });
    }
    forEachValue(module._children, (child, key) => {
        installModule(store, rootState, path.concat(key), child)
    })

}

function registerMutation(store, mutationName, mutationFn, local) {
    const entry = store._mutations[mutationName] || (store._mutations[mutationName] = []);
    entry.push(() => {
        mutationFn.call(store, local.state);
    });
}

function registerAction(store, actionName, actionFn, local) {
    const entry = store._actions[actionName] || (store._actions[actionName] = [])
    entry.push(() => {
        return actionFn.call(store, {
            commit: local.commit,
            state: local.state,
        })
    });
}

function registerGetter(store, getterName, getterFn, local) {
    Object.defineProperty(store.getters, getterName, {
        get: () => {
            return getterFn(
                local.state,
                local.getters,
                store.state
            )
        }
    })
}

// 将对象中的每一个值放入到传入的函数中作为参数执行
function forEachValue(obj, fn) {
    Object.keys(obj).forEach(key => fn(obj[key], key));
}

function vuexInit() {
    const options = this.$options
    if (options.store) {
        // 组件内部设定了store,则优先使用组件内部的store
        this.$store = typeof options.store === 'function' ?
            options.store() :
            options.store
    } else if (options.parent && options.parent.$store) {
        // 组件内部没有设定store,则从根App.vue下继承$store方法
        this.$store = options.parent.$store
    }
}

var Vuex = {
    Store
}



// {
//     +function(){
//         alert(a)
//         a()

//         var a = function (){
//             console.log(1)
//         }

//         function a(){
//             console.log(2)
//         }

//         alert(a)
//         a()

//         var c = d = a
//     }();

//     alert(d)
//     alert(c)
// }


class Scheduler {
    constructor() {
        this.tasks = [];
        this.concurrent = 0;
    }
    add(promiseCreator) {
        return new Promise(resolve => {
            this.tasks.push(() => promiseCreator().then(resolve));
            this.runTask();
        });
    }
    runTask() {
        if (this.concurrent >= 2) return;
        let currentTask = this.tasks.shift();
        if (currentTask) {
            this.concurrent++;
            currentTask().then(() => {
                this.concurrent -= 1;
                this.runTask();
            });
        }
    }
}
const timeout = timer => new Promise(resolve => setTimeout(resolve, timer));
const scheduler = new Scheduler();
const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => {
        console.log(order);
    });
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

// output: 2 3 1 4