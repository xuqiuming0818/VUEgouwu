<template>
  <div id="app">
    <!-- 头部 -->
    <Header/>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 底部 -->
    <Footer v-show="$route.meta.footershow"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知vuex发请求，获取数据，存储在仓库中
        this.$store.dispatch('categoryList')
        // 登录之后获取信息
        this.$store.dispatch('getUserInfo')
  },
  
  
};
</script>

<style>
</style>
