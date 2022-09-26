// 实现对axios
import axios from 'axios'
import { Message } from 'element-ui'
// 通过axios.create创建axios实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 响应了拦截器（在响应之后对数据进行一些处理）
request.interceptors.response.use(response => {
// 1,考虑把那些数据跑出去
// 2,接口成功并且业务成功
// 3,没有成功Promise,reject跑出错误
  const { message, data, success } = response.data
  if (success) { // 业务逻辑成功把解构后的data抛出返回到请求的结果中
    return data
  }
  // 业务逻辑没有成功
  Message.error(message)
  // 抛出返回数据里面的message提示
  return Promise.reject(new Error(message))
}, error => {
  Message.error(error.messsage)
  return Promise.reject(error)
})
export default request
