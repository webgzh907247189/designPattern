import Axios from "./axios";
import { AxiosInterface } from "./types";
import { isCancel, CancelToken } from "./cancel";

// 创建一个 axios 实列
function createInstance(): AxiosInterface{
    let context: Axios<any> = new Axios();

    // request 方法里面的 this 永远指向 context 也就是 new Axios()
    let instance = Axios.prototype.request.bind(context)
 
    // 把 axios 类的实列和 类的原型上面的方法都拷贝到了 instance 上面
    instance = Object.assign(instance, Axios.prototype, context)

    return instance as AxiosInterface
}

let axios = createInstance()
axios.cancelToken = new CancelToken()
axios.isCancel = isCancel

export default axios

export * from './types'