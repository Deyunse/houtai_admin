import store from '@/store'
import router from '@/router'
router.beforeEach((to, from, next) => {
  const token = store.state.user.user
  if (token) {
    if (to.path === '/login') {
      next('/home/welcome')
      console.log(123)
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
