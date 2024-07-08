import axios from "axios";

// 跨域请求 携带 cookie
axios.defaults.withCredentials = true

const instance = axios.create({
  baseURL: '/'
})

export const get = (url, params) => {
  return axios.get(url, {
    params
  })
}