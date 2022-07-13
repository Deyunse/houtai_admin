import request from '@/utils/request'

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
