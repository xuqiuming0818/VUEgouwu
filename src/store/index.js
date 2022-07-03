//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)
// 引入小仓库
// home模块
import home from './home'
// search模块
import search from './search'
import detail from './detail'
import cart from './cart'
import user from './user'
import trade from './trade'





//创建并暴露store
export default new Vuex.Store({
    // 实现vuex仓库模块式开发 存储数据
    modules:{
        home,search,detail,cart,user,trade
    }
})