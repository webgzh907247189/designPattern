import { AxiosRequestConfig, AxiosResponse } from "./types";
import AxiosInterceptorManager, { Interceptor } from "./axiosInterceptorManager";
import parseHeaders from "parse-headers";

export default class Axios<T>{
    public interceptors = {
        request: new AxiosInterceptorManager<AxiosRequestConfig>(),
        response: new AxiosInterceptorManager<AxiosResponse<T>>()
    }
    request(config: AxiosRequestConfig): Promise<AxiosResponse<T> | AxiosRequestConfig>{
        // return this.dispatchRequest(config)

        // Interceptor<AxiosResponse<T> | AxiosRequestConfig>[]
        const chain: Array<Interceptor<AxiosRequestConfig> | Interceptor<AxiosResponse<T>> | Interceptor<AxiosRequestConfig, AxiosResponse<T>>> = [{
            onFulfilled: this.dispatchRequest
        }]

        this.interceptors.request.interceptors.forEach((requestInterceptor) => {
            requestInterceptor && chain.unshift(requestInterceptor)
        })

        this.interceptors.response.interceptors.forEach((responseInterceptor) => {
            responseInterceptor && chain.push(responseInterceptor)
        })
        '((value: AxiosRequestConfig | AxiosResponse<T>) => AxiosRequestConfig | PromiseLike<AxiosRequestConfig>) | null | undefined'.

        let promise: Promise<AxiosRequestConfig | AxiosResponse<T>> = Promise.resolve(config)
        while(chain.length > 0){
            const { onFulfilled, onRejected }  = chain.shift()! // 加个断言， 表示此处肯定有值
            promise = promise.then(onFulfilled, onRejected)
        }
        return promise
    }

    dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>{
        return new Promise((resolve,reject) => {
            let { method, url, params, timeout } = config
            let request  = new XMLHttpRequest()
            if(params && typeof params == 'object'){
                let query = this.getQueryStr(params)
                url += query
            }
            request.open(method, url, true)
            request.responseType = 'json'
            
            request.onreadystatechange = function (params) {
                if(request.readyState === 4 && request.status !== 0){
                    if(request.status >= 200 && request.status < 300){
                        let response: AxiosResponse<T> = {
                            data: request.response ? request.response : request.responseText,
                            status: request.status,
                            statusText: request.statusText,
                            headers: parseHeaders(request.getAllResponseHeaders()),
                            config,
                            request
                        }
                        resolve(response)
                    }else{
                        reject('请求失败了')
                    }
                }else{
                    reject('状态码错误')
                }
            }

            // 三种错误
            // 1. 网络错误
            // 2. 超时错误
            // 3. 状态码错误
            request.onerror = function () {
                reject('网络错误')
            }

            if(timeout){
                // 需要设置，不设置不生效
                request.timeout = timeout
                request.ontimeout = function () {
                    reject('超时错误')
                }
            }

            if(config.cancelToken){
                config.cancelToken.then((msg) => {
                    request.abort()
                    reject(msg)
                })
            }
            request.send()
        })
    }

    getQueryStr(params){
        const str = Object.keys(params).reduce((result, item) => {
            result += `${item}=${params[item]}&`
            return result
        }, '')
        return `?${str}`.slice(0, -1)
    }
}