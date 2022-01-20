type User = { name: string, age: number }
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';




axios({
    url: '/locals'
}).then((data: AxiosResponse<User>) => {
    return data.data
}).then((data) => {
    data.name
})



const request = axios.create()
request.get<User>('/locals').then((data) => {
    return data.data
}).then((data) => {
    data.age
})




const sendQuery = async <T>() => {
    const data = await request.request<T>({ url: 'xxx' })
    return data
}
sendQuery<User>().then((data) => {
    data.data.age
})



async function send<T>(config: AxiosRequestConfig) {
    return request.request<T>(config)
}
send<User>({url: '', timeout: 1000}).then((data) => {
    data.data.age
})
  

