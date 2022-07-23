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
/**
 *  添加 动态属性 或者静态属性
 * @param {*} data
 * @returns
 */
export const addcategories = (data) => {
  return request({
    method: 'POST',
    url: `categories/${data.cat_id}/attributes`,
    data
  })
}
export const delAtegor = (id, attrid) => {
  return request({
    method: 'DELETE',
    url: `categories/${id}/attributes/${attrid}`
  })
}
/**
 *  获取商品分类
 * @param {*} params
 * @returns
 */
export const getCategories = (params) => {
  return request({
    url: 'categories',
    params
  })
}
