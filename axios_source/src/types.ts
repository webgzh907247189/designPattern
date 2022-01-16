export type Methos = 'GET' | 'get' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE'
import AxiosInterceptorManager from "./axiosInterceptorManager";

export interface AxiosRequestConfig {
    url: string
    method: Methos
    params: Record<string, any>
    headers?: Record<string, any>
    timeout?: number
    cancelToken?: any
}

// Axios.prototype.request 方法
export interface AxiosInterface  {
    // <T = any>(config: AxiosRequestConfig): Promise<T> // 代表 promise 变成成功状态之后 resolve 的值 ( resolve(value) )
   <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> // 代表 promise 变成成功状态之后 resolve 的值 ( resolve(value) )

   interceptors: {
       request: AxiosInterceptorManager<AxiosRequestConfig>
       response: AxiosInterceptorManager<AxiosResponse>
   }
   cancelToken?: any
   isCancel?: any
}

export interface AxiosResponse<T = any>{
    data: T
    status: number
    statusText: string
    headers?: Record<string, any>
    config?: AxiosRequestConfig
    request?: XMLHttpRequest
}