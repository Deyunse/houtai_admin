import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    children: [
      { path: 'welcome', name: 'welcome', component: () => import('@/views/Welcome') },
      { path: 'users', component: () => import('@/views/User') },
      { path: 'roles', component: () => import('@/views/roles') },
      { path: 'rights', component: () => import('@/views/Rights') },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/goods')
      },
      { path: 'add', name: 'add', component: () => import('@/views/goods/components/AddGoods.vue') },
      {
        path: 'params',
        component: () => import('@/views/Params')
      }, {
        path: 'categories',
        component: () => import('@/views/categories')
      }, {
        path: 'orders',
        component: () => import('@/views/orders')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
