// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
export default [
    {
        path: '/center',
        component: Center,       //个人中心路由
        meta: { footershow: false },
        children:[
            {
                path:'myorder',
                component:myOrder
            },
            {
                path:'grouporder',
                component:groupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,       //支付成功路由
        meta: { footershow: false },
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,       //支付页面路由
        meta: { footershow: false },
        beforeEnter: (to, from, next) => {
            if (from.path == "/trade") {
                next()
            }else{
                next(false)
            }
        }
    },
    {
        name: 'trade',
        path: '/trade',
        component: Trade,       //交易页面路由
        meta: { footershow: false },
        //组件独享路由
        beforeEnter: (to, from, next) => {
            //必须从购物车来
            if (from.path == "/shopcart") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,       //购物车路由
        meta: { footershow: false }
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,       //添加购物车成功路由
        meta: { footershow: false }
    },
    {
        path: '/detail/:skuid?',
        component: Detail,              //商品详情路由
        meta: { footershow: false }//路由元信息
    },
    {
        path: '/home',
        component: Home,                //首页路由
        meta: { footershow: true }
    },
    {
        path: '/login',
        component: Login,           //登录页路由
        meta: { footershow: false }
    },
    {
        path: '/register',
        component: Register,        //注册页路由
        meta: { footershow: false }
    },
    {
        path: '/search/:keyword?',
        component: Search,              //搜索页路由
        meta: { footershow: true },
        name: 'search',
        // 布尔值写法：params参数
        // props:true
        // 对象写法，额外给路由组件传递一些props
        // props:{a:1,b:2}
        // 函数写法,可以把params参数和props传递给路由组件
        props: ($route) => ({ keyword: $route.params.keyword, K: $route.query.K })

    },

    //重定向:在项目跑起来的时候,立马让他定向首页
    {
        path: '*',
        redirect: '/home'
    },


]