// 实现对axios
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
const TimeOut = 3600 // token过期的时间

function checkTime() {
  // 获取当前时间
  const nowDate = Date.now()
  // 当前时间-登入的时间
  const timeStamp = (nowDate - store.getters.hrasstime) / 1000
  // 返回是否大于设置的过期时间
  return timeStamp > TimeOut
}

// 通过axios.create创建axios实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
request.interceptors.request.use(config => {
  if (store.getters.token) {
    // 有token的情况下，如果token过期，就退回登录页
    if (checkTime()) {
      store.dispatch('user/layout')
      router.push('/login')
      return Promise.reject(new Error('token 超时'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
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
  if (error.response.status === 401) {
    store.dispatch('user/layout')
    router.push('/login')
    Message.error('token 超时')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})
export default request
