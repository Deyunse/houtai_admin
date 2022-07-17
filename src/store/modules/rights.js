import { getExtent } from '@/api/rights'
const state = {
  extentTeer: []
}
const mutations = {
  serExtent (state, payload) {
    state.extentTeer = payload
  }
}
const actions = {
  async getExtent (context, type) {
    const res = await getExtent(type)
    res.data.data.forEach((item, index) => {
      item.index = index + 1
    })
    context.commit('serExtent', res.data.data)
    console.log(res)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
