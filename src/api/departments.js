import request from '@/utils/request'
// 获取已有的角色列表
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
