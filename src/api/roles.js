import request from '@/utils/request'
export const delRole = (roleId, rightId) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}
export const roleAuthorization = (data, roleId) => {
  return request({
    method: 'POST',
    url: `roles/${roleId}/rights`,
    data: data
  })
}
