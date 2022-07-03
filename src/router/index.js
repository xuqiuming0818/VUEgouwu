//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
// 引入routers.js
import routers from '@/router/routers.js'
// 引入store
import store from '@/store'



//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
    //第一个形参：路由跳转的配置对象（query|params）
    //第二个参数：undefined|箭头函数（成功的回调）
    //第三个参数:undefined|箭头函数（失败的回调）
    if (resolve && reject) {
        //push方法传递第二个参数|第三个参数（箭头函数）
        //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
        originPush.call(this, location, resolve, reject);
    } else {
        //push方法没有产地第二个参数|第三个参数
        originPush.call(
            this,
            location,
            () => { },
            () => { }
        );
    }
};

//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            () => { },
            () => { }
        );
    }
};
//配置路由
let router = new VueRouter({
    // 配置路由
    routes: routers,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { y: 0 }
    },
})


let loginName = store.state.user.userinfo.loginName
// 全局守卫  前置路由守卫
router.beforeEach(async (to, from, next) => {
    /* must call `next` */
    let token = store.state.user.token//token
    console.log(token);
    // 用户已经登录
    if (token) {
        // 如果用户登录了 还想去login
        if (to.path == '/login'||to.path=="/register") {
            next('/home')
        } else {
            // 登录了  去的不是login  用户信息已经有
            if (loginName) {
                next()
            } else {
                try {
                    // 没有用户信息  获取用户信息
                    await store.dispatch("getUserInfo")
                    //成功  放行
                    next();
                } catch (error) {
                    await store.dispatch("userLogout")
                    next("/login")
                }
            }
            next()
        }
    } else {
        // 未登录   不能去相关交易页面等页面
        let toPath = to.path
        if (toPath.indexOf('/trade')!= -1 || toPath.indexOf('/pay')!= -1 || toPath.indexOf("/center") != -1 ||toPath.indexOf("/shopcart") != -1) {
            next('/login?redirect='+toPath)
        }else{
            // 去的是不需要用户信息的路由
            next()
        }
        next()
    }
});

export default router