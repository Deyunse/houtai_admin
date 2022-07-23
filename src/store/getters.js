export default {
  // user模块
  UsersList: state => state.user.UsersList,
  roleForm: state => state.user.roleForm,
  extentList: state => state.user.extentList,
  extentTeer: state => state.rights.extentTeer,
  // goods模块
  goodsList: state => state.goods.goodsList,
  // orders模块
  orderlist: state => state.orders.orderlist
}
