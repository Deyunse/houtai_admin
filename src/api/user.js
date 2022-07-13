import request from '@/utils/request'

/**
 * 登录
 * @param {*} param
 * @returns
 */
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username, password
    }
  })
}
/**
 * 获取左侧菜单权限
 * @returns
 */
export const getMeanus = () => {
  return request({
    url: 'menus'
  })
}
/**
 * 获取用户列表
 * @param {*} param0
 * @returns
 */
export const getUsers = ({ query, pagenum = 1, pagesize = 5 }) => {
  return request({
    url: 'users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}
/**
 * 修改用户状态
 * @param {*} uId
 * @param {*} type
 * @returns
 */
export const updatedState = (uId, type) => {
  return request({
    method: 'PUT',
    url: `users/${uId}/state/${type}`
  })
}
/**
 * 添加用户
 * @param {*} param0
 * @returns
 */
export const addUsers = ({ username, password, email, mobile }) => {
  return request({
    method: 'POST',
    url: 'users',
    data: {
      username, password, email, mobile
    }
  })
}
/**
 * 修改用户数据
 * @param {*} param0
 * @returns
 */
export const updatedUser = ({ id, email, mobile }) => {
  console.log(id, email, mobile)
  return request({
    method: 'PUT',
    url: `users/${id}`,
    data: {
      email, mobile
    }
  })
}
/**
 * 删除用户
 * @param {用户的id} id
 * @returns
 */
export const delUser = (id) => {
  return request({
    method: 'DELETE',
    url: `users/${id}`
  })
}
/**
 * 获取所有权限列表
 * @param {类型} type
 * @returns
 */
export const getExtent = (type) => {
  return request({
    url: `rights/${type}`
  })
}
/**
 * 获取角色列表
 * @returns
 */
export const getRole = () => {
  return request({
    url: 'roles'
  })
}
