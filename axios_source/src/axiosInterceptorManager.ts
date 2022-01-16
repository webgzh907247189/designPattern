interface OnFulfilled<T>{
    (value: T): T | Promise<T>
}

interface OnRejected{
    (error: any): any
}

export interface Interceptor<T, K = T>{
    onFulfilled?: (value: T) =>  T | Promise<K>
    onRejected?: OnRejected
}

export default class AxiosInterceptorManager<T> {
    public interceptors: Array<Interceptor<T> | null> = []

    // 调用 use 的时候，向拦截器管理添加 拦截器
    use(onFulfilled?: OnFulfilled<T>, onRejected?: OnRejected): number{
        let id = this.interceptors.push({
            onFulfilled,
            onRejected
        })
        return id
    }

    eject(id){
        if(this.interceptors[id]){
            this.interceptors[id] = null
        }
    }
}