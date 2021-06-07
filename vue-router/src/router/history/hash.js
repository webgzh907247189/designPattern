import Base from './base';

/**
 * history.length 最大为50 有大小限制 -> react-router 视频第一节  lenght 一直是50
 */

function ensureSlash() {
    if(window.location.hash){
        return
    }
    window.location.hash = '/'
}

function getHash() {
    return window.location.hash.slice(1);
}


// vue-router 导航守卫的核心原理就是组成一个数组进行匹配
export default class HashHistory extends Base{
    constructor(router){
        const path = getHash();
        super(router, path)

        // 默认加个 hash 模式
        ensureSlash();
    }

    setupListener(){
        window.addEventListener('hashchange',() => {

            // hash 值 发生了变化， 执行这个逻辑
            this.transitionTo(getHash());
        })
    }

    getCurrentLocation(){
        return getHash();
    }

    push(location){
        window.location.hash = location;
    }
}