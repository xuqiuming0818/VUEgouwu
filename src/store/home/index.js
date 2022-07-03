import { reqCategoryList, reqGetBanner, reqGetFloors } from '@/api'
//准备actions——用于响应组件中的动作
const actions = {
    // 通过api里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        // console.log(result);
        if (result.data.code === 200) {
            commit('CATEGORYLIST', result.data.data)
        }
    },
    // 轮播图的数据
    async getBannerList({ commit }) {
        // console.log('actions');
        let result = await reqGetBanner()
        let data = result.data
        // console.log(data);
        if (data.code === 200) {
            commit("GETBANNERLIST", data.data)
        }
    },
    // 获取floors数据
    async getFloorsList({ commit }) {
        let result = await reqGetFloors()
        if (result.data.code===200) {
            let getfloorslist = result.data.data
            // console.log(data);
            commit("GETFLOORSLIST",getfloorslist)
        }

    }
}
//准备mutations——用于操作数据（state）
const mutations = {

    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    // 轮播图的数据
    GETBANNERLIST(state, BannerList) {
        // console.log('处理数据');
        state.BannerList = BannerList
    },
    GETFLOORSLIST(state,getfloorslist){
        state.FloorsList=getfloorslist
    }
}
//准备state——用于存储数据
const state = {
    categoryList: [],
    BannerList: [],
    FloorsList:[]
}


//创建并暴露store
export default {
    actions,
    mutations,
    state,
}