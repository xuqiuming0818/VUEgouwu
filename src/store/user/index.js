import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
//准备actions——用于响应组件中的动作
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        //获取验证码的这个接口  把验证码返返回
        let result = await reqGetCode(phone);
        if (result.data.code == 200) {
            console.log(result.data.data);
            commit("GETCODE", result.data.data)
            return "ok"
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    // 注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        console.log(result);
        if (result.data.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("已经被注册"))
        }
    },
    // 登录业务
    async userLongin({ commit }, user) {
        let result = await reqUserLogin(user)
        // 服务器下发token  用户唯一标识（uuid） 将来通过token要信息
        if (result.data.code == 200) {
            commit("USERLONGIN", result.data.data)
            // 持久化存储token
            setToken(result.data.data.token)
            console.log(result.data.data);
            return 'ok'
        } else {
            return Promise.reject(new Error("登录失败"))
        }
    },
    // 获取用户的登录信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        console.log(result, '获取用户信息');
        if (result.data.code == 200) {
            commit("GETUSERINFO", result.data.data)
            return 'ok'
        } else {
            return Promise.reject(new Error("获取用户信息失败"))
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        let result = await reqLogout()
        console.log(result.data);
        if (result.data.code == 200) {
            //action里面不可以操作state
            commit("CLEARLOGIN")
            return 'OK'
        } else {
            return Promise.reject(new Error("token没有被清理"))
        }
    }
}
//准备mutations——用于操作数据（state）
const mutations = {
    GETCODE(state, codes) {
        state.code = codes
    },
    USERLONGIN(state, token) {
        state.token = token.token
    },
    GETUSERINFO(state, Userinfo) {
        state.userinfo = Userinfo
    },
    //情况用户信息等等
    CLEARLOGIN(state) {
        state.token = '';
        state.userinfo = '';
        removeToken()
    }
}
//准备state——用于存储数据
const state = {
    code: '',
    token: getToken(),
    //用户信息
    userinfo: {}


}
//可以把我们数组当中需要的数据简化一下【将来获取就方便了】
const getters = {}


//创建并暴露store
export default {
    actions,
    mutations,
    state,
    getters
}