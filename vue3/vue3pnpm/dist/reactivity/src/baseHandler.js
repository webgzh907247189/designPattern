import { reactive } from "./index";
import { isObject } from "@vue/shared";
import { track, trigger } from ".";
export const baseHandler = {
    get(target, key, receiver) {
        // 第一次 代理之后， 第二次在代理 (用第一次代理成功之后的 返回值来充当 target)
        // 会触发 target[ReactiveFlags.IS_REACTIVE] (触发了 get)  (此时的target -> 第一次代理成功之后的 proxy)
        // 直接 返回 true， 返回 target (相当于上一次 proxy(target))
        if (key === "_v_isReactive" /* ReactiveFlags.IS_REACTIVE */) {
            return true;
        }
        track(target, 'get', key);
        // return target[key]
        let res = Reflect.get(target, key, receiver);
        // 深度代理，只有在取值 才会出发 深度代理，否则不会像 vue2 直接进行 深度 递归
        // let state = {address: { ad: '11' }}
        // 当出现 访问 对象套对象的子属性(state.address.ad), 初始化不会代理子对象 (ad 对象)
        // 当访问 子对象属性 (访问ad, 通过 state.address.ad) 才会触发 reactive, 首先访问的(state.address) 此时 reactiveMap 才会 set ad 对象
        // reactiveMap -> { state: proxystate, state.address: proxy state.address }
        if (isObject(res)) {
            return reactive(res);
        }
        return res;
    },
    set(target, key, value, receiver) {
        // target[key] = value
        // return true
        let oldValue = target[key];
        let result = Reflect.set(target, key, value, receiver);
        // 值一样，不触发 更新
        if (oldValue != value) {
            trigger(target, 'set', key, value, oldValue);
        }
        return result;
    }
};
//# sourceMappingURL=baseHandler.js.map