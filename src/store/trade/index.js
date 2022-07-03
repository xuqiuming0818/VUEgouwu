import { reqAddressInfo, reqOrderInfo } from '@/api'


//准备actions——用于响应组件中的动作
const actions = {
    // 获取地址信息
    async getAddress({ commit }) {
        let result = await reqAddressInfo()
        //13700000000   111111
        console.log(result.data, "获取地址");
        if (result.data.code == 200) {
            commit("GETADDRESS", result.data.data)
        }
    },
    // 获取商品清单信息
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        console.log(result.data,'商品清单获取成功');
        if (result.data.code == 200) {
            commit("GETORDERINFO",result.data.data)
        }
    }

}
//准备mutations——用于操作数据（state）
const mutations = {
    // 获取地址信息
    GETADDRESS(state, address) {
        state.AddressList = address
    },
    // 获取商品清单信息
    GETORDERINFO(state,orderinfo){
        state.orderinfo =orderinfo
    }
}
//准备state——用于存储数据
const state = {
    AddressList: [],
    orderinfo:{}
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