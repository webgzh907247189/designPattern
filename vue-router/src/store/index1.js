import Vuex from './vuex1'
import Vue from 'vue'

Vue.use(Vuex)
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        a: {
            state: {
                count: 10
            },
            mutations: {
                change(state){
                    console.log('a 模块')
                    state.count += 10
                }
            },
            modules: {
                b: {
                    state: {count:300}
                }
            }
        }
    },
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
            setTimeout(()=>{
                // commit(为构造函数的commit) 的调用方 有问题，不修正的话是window，需要修正
                commit('change')
            },1000)
        }
    },
    mutations: {
        change(state){
            console.log('主模块')
            state.count += 10
        }
    }
})