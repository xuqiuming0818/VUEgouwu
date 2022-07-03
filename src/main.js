import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router/index'
// 三级联动组件 ---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { reqCategoryList } from '@/api/index.js'
import store from '@/store/index.js'
// import {Pagination} from 'element-ui'
reqCategoryList()
// 引入swiper样式// 引包
import "swiper/css/swiper.css"
//统一引入引入所有接口
import * as API from '@/api'
import {Button,MessageBox} from 'element-ui'
// 懒加载
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/aoteman.gif'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: atm,
  attempt: 1
})
// Element ui 还可以挂载原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.component(Button.name, Button)
// 关闭开发提示
Vue.config.productionTip = false
// 第一个参数，组件名字，第二个哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// Vue.use(Pagination)

// 引入MockServer.js---mock数据
import '@/mock/mockServe'

import "@/piugins/validata.js"
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this,
      Vue.prototype.$API = API
  },
  //注册路由
  router,
  store,
}).$mount('#app')
