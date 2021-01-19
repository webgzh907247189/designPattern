import { reactive } from './reactive';
import { isObject, isSysmbol, isArray, isInterger, hasOwnKey, hasChanged } from '../shared/index';
import { track, trigger } from './effect';

// 为了预制参数
const createSetter = () => {
    return (targer, key, value, receiver) => {
        const oldValue = Reflect.get(targer, key);

        // 是数组，直接修改的数组的下标 判断 key 和 length -> 新增元素
        const hasKey = isArray(targer) && isInterger(key) ? Number(key) < targer.length : hasOwnKey(targer, key);

        // 这样写， 设置不成功 返回 false，常规的 赋值 不会返回 false
        const result = Reflect.set(targer, key, value);

        if(!hasKey){
            console.log('新增属性')
            trigger(targer, 'add', key, value);
        } else if(hasChanged(value, oldValue)){
            console.log('修改属性')
            trigger(targer, 'set', key, value, oldValue);
        }

        return result;
    }
}

// 为了预制参数 
// receiver 代理之后的值
const createGetter = () => {
    return (targer, key, receiver) => {
        const res = Reflect.get(targer, key);

        // 判断是不是 sysbmol -> 内置方法是 sysbmol
        if(isSysmbol(key)){
            return res;
        }

        // 收集依赖
        console.log(key, 'keykey')
        track(targer, key);

        // 取值 是 对象的时候 在进行深度代理  ->   使用到这个数据的时候才进行代理，懒代理模式
        if(isObject(res)){
            return reactive(res);
        }
        return res;
    }
}

export const mutableHandlers = {
    get: createGetter(),
    set: createSetter()
}