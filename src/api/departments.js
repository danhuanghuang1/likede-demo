import request from '@/utils/request'
// 获取已有的部分列表
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
