import { initState } from './observe/index'

function Vue(options){
    this._init(options)
}

Vue.prototype._init = function(options){
    // vue 初始化，this.$options 标示的是vue中的参数
    let vm = this;
    vm.$options = options

    // 数据初始化
    initState(vm)
}

export default Vue;