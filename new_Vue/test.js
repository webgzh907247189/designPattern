import Vue from './index'

let vue = new Vue({
    data(){
        return {
            msg: 'msg',
            test: '111',
            school: {
                name: 'gzh'
            },
            arr: [{a:1}, 2, 3]
        }
    },
    watch: {
        // msg(newVal, oldVal){
        //     console.log(newVal, oldVal)
        // }
        // msg: {
        //     handler(newVal, oldVal){
        //         console.log(newVal, oldVal)
        //     },
        //     immediate: true 
        // }
    },
    computed:{
        name1: {
            get(){
                return this.msg +'--'+ this.test
            }
        }
    },
    el: document.getElementById('root'),
    render(h){
        return h('p',{}, this.name1)
    }
})


setTimeout(() => {
    // console.log(vue)
    // vue.school.name = 'gzh1'
    // vue.msg = '222'

    // 注意被无意中更新
    // vue.arr.push('444')
    // vue.arr[0].push('???')
    vue.msg = 'msgnew'
    // vue.arr = ['ggg']
    console.log(vue)
}, 2000)
