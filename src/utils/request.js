// 实现对axios
import axios from 'axios'
import { Message } from 'element-ui'
// 通过axios.create创建axios实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
request.interceptors.response.use(response => {
  const { message, data, success } = response.data
  if (success) { // 业务逻辑成功
    return data
  }
  // 业务逻辑没有成功
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  Message.error(error.messsage)
  return Promise.reject(error)
})
export default request
