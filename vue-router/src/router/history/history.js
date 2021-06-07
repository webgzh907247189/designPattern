import Base from './base';

/**
 * history.length 最大为50 有大小限制 -> react-router 视频第一节  lenght 一直是50
 */

function getHistoryLocation(){
    return window.location.pathname;
};
export default class BrowereHistory extends Base{
    constructor(router){
        const path = getHistoryLocation();
        super(router, path)
    }

    setupListener(){
        // 监听 popstate 事件
        window.addEventListener('popstate',() => {
            // path 值 发生了变化， 执行这个逻辑
            this.transitionTo(getHistoryLocation());
        })
    }

    push(location){
        this.transitionTo(location, ()=>{
            window.history.pushState({}, null, location)
        })   
    }

    getCurrentLocation(){
        return getHistoryLocation();
    }
}