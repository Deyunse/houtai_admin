import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@//styles/reset.less'
import './permission'
import TableCrumbs from '@/components/TableCrumbs' // 面包屑
import VueQuillEditor from 'vue-quill-editor'
// require styles

Vue.use(VueQuillEditor)
Vue.component('TableCrumbs', TableCrumbs)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
