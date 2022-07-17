
import { getUsers, delUser, getExtent, getRole } from '@/api/user'
const state = {
  user: null,
  UsersList: {},
  extentList: [],
  roleForm: []// 角色列表
}
const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setUserList (state, payload) {
    state.UsersList = payload
  },
  setRoleFom (state, payload) { // 角色列表
    state.roleForm = payload
  },
  setExtentList (state, payload) {
    state.extentList = payload
  }
}
const actions = {
  async getUsers (context, obj) {
    try {
      const res = await getUsers(obj)
      let ind = (obj.pagenum - 1) * obj.pagesize + 1 // 当前页码
      // console.log(ind)
      res.data.data.users.forEach(item => {
        item.index = ind
        ind++
      })
      context.commit('setUserList', res.data.data)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  },
  async delUser (context, id) {
    await delUser(id)
  },
  async getExtent (context, type) {
    const res = await getExtent(type) // 所有权限列表
    // console.log(res)
    context.commit('setExtentList', res.data.data)
  },
  async getRole (context) {
    const res = await getRole()
    console.log('角色', res)
    res.data.data.forEach((item, index) => {
      item.index = index + 1
    })
    context.commit('setRoleFom', res.data.data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions

}
