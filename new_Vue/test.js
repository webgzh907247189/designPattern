import Vue from './index'

Vue.mixin({
    beforeCreate(){
        console.log('11')
    }
})

Vue.component('my-button', {
    template: '<div>my-button11</div>'
})

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
    beforeCreate(){
        console.log('22')
    },
    el: document.getElementById('root'),
    // render(h){
    //     return h('p',{}, this.name1)
    // },
    // template: '<my-button></my-button><div id="app" style="font-size: 22px; font-weight: 400;"> <div style="color: red;"><span><p>hello</p>111{{msg}}aa{{test}}很好</span></div> </div>',
    template: '<div><my-button></my-button><my-button></my-button><my-button></my-button></div>',
    components: {
        'my-button': {
            template: '<div>my-button22</div>'
        }
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
    window.vue =  vue;
    // vue.arr = ['ggg']
    console.log(vue)
}, 2000)
