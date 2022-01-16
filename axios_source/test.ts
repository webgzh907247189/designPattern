import axios, { AxiosRequestConfig, AxiosResponse } from "./src/index";

type User = Record<'name' | 'age' ,string>
let user: User = {name: '111', age: '222'}


const cancelToken = axios.cancelToken
const source = cancelToken.source();
const isCancel = axios.isCancel;
axios({
    url: 'xxx',
    method: 'GET',
    params: user,
    timeout: 1000,
    cancelToken: source.token,
}).then((data: AxiosResponse<User>) => {
    return data.data
}).then((data) => {
    return data.name
}).catch((err) => {
    console.log(err);
})
source.cancel('用户取消了请求');

// axios as  造成的问题
// axios<User>({
//     url: 'xxx',
//     method: 'GET',
//     params: user
// }).then((data: User) => {
//     return data.name
// }).catch((err) => {
//     console.log(err);
// })


axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers.name += '1'
    return config
})
let request = axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers!.name += '2'
    return config
})
axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            config.headers!.name += '3'
            resolve(config)
        })
    })

    // return Promise.reject('拦截失败')
})
axios.interceptors.request.eject(request)


axios.interceptors.response.use((data: AxiosResponse): AxiosResponse => {
    data.data.name += '1'
    return data
})
axios.interceptors.response.use((data: AxiosResponse): AxiosResponse => {
    data.data.name += '2'
    return data
})
let response = axios.interceptors.response.use((data: AxiosResponse): AxiosResponse => {
    data.data.name += '3'
    return data
})
axios.interceptors.response.eject(response)



