import request from '@/utils/request'

export const getOrder = (params) => {
  return request({
    url: 'orders',
    params
  })
}
