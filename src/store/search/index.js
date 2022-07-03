import { reqGetSearchInfo } from '@/api'

//准备actions——用于响应组件中的动作
const actions = {
    async getSearchList({ commit }, params) {
        let result = await reqGetSearchInfo(params)
        let data = result.data
        if (data.code == 200) {
            commit("GETSEARCGLIST", data.data)
        }
    }
}
//准备mutations——用于操作数据（state）
const mutations = {
    GETSEARCGLIST(state, searchList) {
        state.searchList = searchList
    }
}
//准备state——用于存储数据
const state = {
    searchList: {}
}
//可以把我们数组当中需要的数据简化一下【将来获取就方便了】
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    }

}





//创建并暴露store
export default {
    actions,
    mutations,
    state,
    getters
}