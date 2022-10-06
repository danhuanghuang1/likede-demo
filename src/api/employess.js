import request from '@/utils/request'
// 获取已有的角色列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
/**
 *  新增部门接口
 *
 * ****/
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
