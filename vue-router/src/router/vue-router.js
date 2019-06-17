class HistoryRoute{

}

class VueRouter{
    constructor(options){
        this.options = options
        this.mode = options.mode || 'hash'
        this.routes = options.routes || []
        this.routesMaps = this.createMap(this.routes)
        console.log(this.routesMaps,'this.routesMaps')

        this.history = {current: null}
    }

    createMap(list){
        return list.reduce((result,item)=>{
            result[item.path] = item.component
            return result
        },Object.create(null))
    }
}

 // 使用vue.use()  会调用install 方法
 VueRouter.install = function(Vue){

 }

 export default VueRouter