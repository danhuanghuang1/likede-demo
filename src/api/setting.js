import request from '@/utils/request'
// 分页请求
export const getRoleListApi = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}
// 新增角色
export const addRole = (data) => {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
// 修改角色
export const updateRole = (data) => {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}
// 删除接口
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
/**
 * 获取公司信息
 * **/
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
