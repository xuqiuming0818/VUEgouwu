import { reqGetGoodInfo ,reqAddCart} from '@/api'
import {getUUID} from '@/utils/uuid_token'      //封装游客身份的模块，uuid   不可以变
//准备actions——用于响应组件中的动作
const actions = {
    //获取产品信息
    async getDetail({ commit }, skuId) {
        let result = await reqGetGoodInfo(skuId)
        let datas = result.data
        if (datas.code === 200) {
            console.log('详情数据获取成功');
        }
        commit("GETDETAIL", datas.data)
    },
    //将产品添加到购物车
    async addOrUpdateShopCart({ commit },{skuId,skuNum}){
        let result = await reqAddCart(skuId,skuNum) //加入购物车返回的结果
        console.log(skuId,skuNum,'把数据已经带给服务器了');   
        if (result.data.code == 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('添加失败'))
        }
    }

}
//准备mutations——用于操作数据（state）
const mutations = {
    GETDETAIL(state, data) {
        state.DetailList = data
    }
}
//准备state——用于存储数据
const state = {
    DetailList: {},
    uuid_token:getUUID()
}
//可以把我们数组当中需要的数据简化一下【将来获取就方便了】
const getters = {
    categoryView(state) { return state.DetailList.categoryView || {} },
    skuInfo(state) { return state.DetailList.skuInfo || {} },
    spuSaleAttrList(state) { return state.DetailList.spuSaleAttrList || [] },
}


//创建并暴露store
export default {
    actions,
    mutations,
    state,
    getters
}