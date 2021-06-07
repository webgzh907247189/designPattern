/**
 * history.length 最大为50 有大小限制 -> react-router 视频第一节  lenght 一直是50
 */
class HistoryRoute{
    constructor(){
        this.current = null
    }
}

class VueRouter{
    constructor(options){
        this.options = options
        this.mode = options.mode || 'hash'
        this.routes = options.routes || []

        // 收敛数组
        this.routesMaps = this.createMap(this.routes)

        this.history = new HistoryRoute()
        this.init()
    }

    createMap(list){
        return list.reduce((result,item)=>{
            result[item.path] = item.component
            return result
        },Object.create(null))
    }

    hashLoad(){
        window.addEventListener('load',()=>{
            // console.log('zzz')
            this.history.current = location.hash.slice(1)
        })
    }

    hashChange(){
        window.addEventListener('hashchange',()=>{
            this.history.current = location.hash.slice(1)
        })
    }

    pathLoad(){
        window.addEventListener('load',()=>{
            this.history.current = location.pathname
        })
    }
    go(){
        // 只有前进后退才能触发popstate，pushState不会触发popstate
        window.addEventListener('popstate',()=>{
            this.history.current = location.pathname
        })
    }

    init(){
        if(this.mode == 'hash'){
            //判断用户打开时有没有hash，没有跳到/#/
            location.hash ? '' : location.hash = '#/'
            this.hashLoad()
            this.hashChange()
        }else{
            location.pathname ? '' : location.pathname = '/'
            this.pathLoad()
            this.go()
        }
    }
}

 // 使用vue.use()  会调用install 方法
 VueRouter.install = function(Vue){
    // 每个组件都有 this.$router 和 this.$route
    Vue.mixin({
        beforeCreate(){

            // vue组件渲染顺序 ->  先序深度遍历 渲染
            if(this.$options && this.$options.router){ //根组件
                this._root = this
                this._router = this.$options && this.$options.router

                // console.log(this._router.history,'this.$router')
                // 深度监控 (服务于  router-view的current)
                Vue.util.defineReactive(this,'xx',this._router.history)
            }else{
                // 深度先续遍历
                this._root = this.$parent && this.$parent._root
            }

            Object.defineProperty(this,'$router',{
                get(){
                    // 唯一的路由实列 得到 VueRouter 的实列(所以 this.$router 有go方法)
                    return this._root._router
                }
            })

            Object.defineProperty(this,'$route',{
                get(){
                    // this._root._router.history 是 HistoryRoute 的实列
                    return {
                        current: this._root._router.history.current
                    }
                }
            })
        }
    })

    Vue.component('router-link',{
        props: {
            to: String,
            tag: {
                default: 'a',
                type: String
            }
        },
        methods: {
            handleClick(){
                // href={mode === 'hash' ? `#${this.to}`: this.to}
            }
        },
        render(h){
            let mode = this._self._root._router.mode
            let Tag = this.tag
            return (<Tag on-click={this.handleClick}  href={mode === 'hash' ? `#${this.to}`: this.to}>{this.$slots.default}</Tag>)
        }
    })

    Vue.component('router-view',{
        // this._self 当前的组件
        // render 方法 里面的 this_self 指向 组件
        // this._self._root 指向 根组件
        // this._self._root._router 指向 根组件的 HistoryRoute 实例
        render(h){
            let current = this._self._root._router.history.current

            let routersMap = this._self._root._router.routesMaps
            console.log(current,'current')
            return h(routersMap[current])
        }
    })
 }

 export default VueRouter