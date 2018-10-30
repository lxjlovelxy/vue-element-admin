import request from '@/utils/request'

export function getRoleList(roleCode, roleName, current, pageSize) {
  const data = {
    roleCode,
    roleName,
    current,
    pageSize
  }
  return request({
    url: '/api/role/list',
    method: 'post',
    data
  })
}

export function addRole(roleType, roleCode, roleName) {
  const data = {
    roleType,
    roleCode,
    roleName
  }
  return request({
    url: '/api/role/add',
    method: 'post',
    data
  })
}
