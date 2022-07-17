import request from '@/utils/request'
export const delRole = (roleId, rightId) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}
