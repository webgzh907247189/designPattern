import { isArray, isObject } from '../shared/index';
import { mutableHandlers } from './baseHandlers'; 

// 同一个对象 可能 被反复代理，可能会重复代理，这个时候缓存一下
const proxyMap = new WeakMap();

export const reactive = (target: object) => {
    // 对象变成 响应式对象
    // 默认不会递归代理， 直接在在外面进行代理
    // 没有循环对象的问题
    return createReactiveObject(target, mutableHandlers);
}

function createReactiveObject(target, mutableHandlers){
    // 不是对象 或者数组 ，直接返回 ????

    if(!isObject(target) && !isArray(target)){
        return target;
    }

    // 针对重复代理的情况，重复代理，直接返回已经代理的对象
    const exisitingProxy = proxyMap.get(target);
    if(exisitingProxy){
        return exisitingProxy;
    }

    // 只能代理对象
    const proxy = new Proxy(target, mutableHandlers);
    proxyMap.set(target, proxy);
    console.log(proxyMap, 'proxyMap')
    return proxy;
}