import axios from 'axios'

// 创建 axios的实列，baseURL是基准路径
export default axios.create({
    baseURL: '/'
})