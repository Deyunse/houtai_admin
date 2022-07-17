import { getGoods } from '@/api/goods'
const state = {
  goodsList: {}
}
const mutations = {
  setGoods (state, payload) {
    state.goodsList = payload
  }
}
const actions = {
  async getGoods (context, parmas) {
    const res = await getGoods(parmas)
    let ind = (parmas.pagenum - 1) * parmas.pagesize + 1
    res.data.data.goods.forEach((item, index) => {
      item.add_time = new Date(item.add_time * 1000).toJSON().substring(0, 10)
      item.index = ind++
    })
    context.commit('setGoods', res.data.data)
    // console.log(res)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
