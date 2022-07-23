import { getOrder } from '@/api/orders'
const state = {
  orderlist: []
}
const mutations = {
  setOrder (state, payload) {
    state.orderlist = payload
  }
}
const actions = {
  async getOrder (context, payload) {
    try {
      const res = await getOrder(payload)
      // console.log(res)
      res.data.data.goods.forEach(item => {
        item.create_time = new Date(item.create_time * 1000).toJSON().substring(0, 10)
      }
      )
      context.commit('setOrder', res.data.data.goods)
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
