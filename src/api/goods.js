import request from '@/utils/request'
export const getGoods = ({ query, pagenum, pagesize }) => {
  return request({
    url: `goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`
  })
}
export const getCateGories = () => {
  return request({
    url: 'categories'
  })
}
/**
 *  获取参数分类管理
 * @param {} id
 * @returns
 */
export const getSort = (id) => {
  return request({
    url: `categories/${id}/attributes?sel=many`
  })
}
/**
 *  获取商品属性
 * @param {*} id
 * @returns
 */
export const getProperty = (id) => {
  return request({
    url: `categories/${id}/attributes?sel=only`
  })
}
