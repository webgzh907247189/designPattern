import Vuex from './vuex'
import Vue from 'vue'

Vue.use(Vuex)
Vue.use(Vuex)

export default new Vuex.Store({
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
            state.count += 10
        }
    }
})