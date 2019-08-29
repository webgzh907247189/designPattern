import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
Vue.use(Vuex)

export default () => {
    let store = new Vuex.Store({
        state: {
            count: 100
        },
        getters: {
            getCount(state){
                return state.count + 1
            }
        },
        actions: {
            action({commit}){
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        // commit(为构造函数的commit) 的调用方 有问题，不修正的话是window，需要修正
                        commit('change')
                        resolve()
                    },1000)
                })
            }
        },
        mutations: {
            change(state){
                state.count += 10
            }
        }
    })

    // 浏览器执行到时候，用服务端设置的状态，替换掉客户端的state
    if(typeof window !== 'undefined' && window.__INITIAL_STATE__){
        store.replaceState(window.__INITIAL_STATE__)
    }

    return store
}