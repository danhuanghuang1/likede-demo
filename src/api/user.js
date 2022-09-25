import request from '@/utils/request'

// 更改验证码图片
export function changeCodeNum(clientToken) {
  return request({
    url: `/user-service/user/imageCode/${clientToken}`,
    responseType: 'blob'
  })
}
// 登录
export function login(data) {
  return request({
    url: '/user-service/user/login',
    method: 'POST',
    data
  })
}
