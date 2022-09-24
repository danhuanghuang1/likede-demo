// 实现对axios
import axios from 'axios'
// 通过axios.create创建axios实例
const request = axios.create({
  baseURL: '/dec',
  timeout: 5000
})
export default request
