import HashHistory from './history/hash';
import BrowereHistory from './history/history';
import { createMatcher } from './match';

class VueRouter{
    constructor(options){
        this.options = options
        this.mode = options.mode || 'hash'
        this.routes = options.routes || []

        // 构建映射表  ->  二级路有 不带有 /  因为这时 手动添加了  /
        this.matcher = createMatcher(this.routes)
        // debugger

        this.history = this.mode === 'hash' ? new HashHistory(this) : new BrowereHistory(this);
        // this.init(this)

        this.beforeEachHooks = [];
    }

    // 初始化渲染
    init(app){
        const history = this.history;

        // 跳转之后，再去监听 hash 变化
        const setupHashListener = () => {
            history.setupListener();// 监听 hash 变化
        }

        // history.getCurrentLocation() 拿到当前路径
        history.transitionTo(history.getCurrentLocation(), setupHashListener);
        history.listen((route) => {
            app._route = route;
        })
    }

    match(location){
        console.log(location, 'location')
        return this.matcher.match(location)
    }

    push(location){
        this.history.push(location)
    }

    beforeEach(fn){
        // to,form, next
        this.beforeEachHooks.push(fn)
    }
}

 // 使用vue.use()  会调用install 方法
 VueRouter.install = function(Vue){
    // 每个组件都有 this.$router 和 this.$route
    Vue.mixin({
        beforeCreate(){
            // debugger
            // vue组件渲染顺序 ->  先序深度遍历 渲染
            if(this.$options && this.$options.router){ //根组件
                this._routerRoot = this
                this._router = this.$options && this.$options.router

                // console.log(this._router.history,'this.$router')
                // 深度监控 (服务于  router-view的current)
                // return { path: 'xxx', machted: [] }
                Vue.util.defineReactive(this,'_route',this._router.history.current)
                // console.log(this._route, 'this._route')

                this._router.init(this)
            }else{
                // 深度先续遍历
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }

            Object.defineProperty(this,'$router',{
                get(){
                    // 唯一的路由实列 得到 VueRouter 的实列(所以 this.$router 有go方法)
                    return this._routerRoot._router
                }
            })

            Object.defineProperty(this,'$route',{
                get(){
                    // this._root._router.history 是 HistoryRoute 的实列
                    return this._routerRoot._route
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
                this.$router.push(this.to);
            }
        },
        render(h){
            let mode = this._self._routerRoot._router.mode
            let Tag = this.tag
            return (<Tag on-click={this.handleClick}  href={mode === 'hash' ? `#${this.to}`: this.to}>{this.$slots.default}</Tag>)
        }
    })

    Vue.component('router-view',{
        // this._self 当前的组件
        // render 方法 里面的 this_self 指向 组件
        // this._self._root 指向 根组件
        // this._self._root._router 指向 根组件的 HistoryRoute 实例
        functional: true,
        render(h, { data, parent }){
            let route = parent.$route
            let depth = 0;
            let records = route.machted
            data.routerView = true
            // debugger

            console.log(data, 'parent')

            while(parent){
                // console.log(parent)
                if(parent.$vnode && parent.$vnode.data.routerView){
                    
                    depth++
                }
                parent = parent.$parent
            }

            let record = records[depth]
            if(!record){
                return h();
            }
            // console.log(record, 'record',records)
            return h(record.component,data)
        }
    })
 }

 export default VueRouter