import request from '@/utils/request'

export const getNatureList = (params) => {
  return request({
    method: 'GET',
    url: `categories/${params.id}/attributes`,
    params
  })
}
/**
 * 获取分类数据列表
 * @returns
 */
export const getCateGories = () => {
  return request({
    url: 'categories'
  })
}
/**
 * 添加，静态或动态属性
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const editAttributes = (id, data) => {
  return request({
    method: 'POST',
    url: `categories/${id}/attributes`,
    data
  })
}
export const editPut = (id, data) => {
  return request({
    method: 'PUT',
    url: `categories/${id}/attributes/${data.attr_id}`,
    data
  })
}
