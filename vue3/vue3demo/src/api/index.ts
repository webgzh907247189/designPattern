import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.baseURL = '';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
    return config;
})

axios.interceptors.response.use((data: AxiosResponse) => {
    return data.data;
})