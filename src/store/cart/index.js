import { reqShopCartList,reqShopCartDelete,reqUpdateChecked} from '@/api'
//准备actions——用于响应组件中的动作
const actions = {
    //获取购物车列表信息
    async getShopCart({ commit }) {
        let result = await reqShopCartList()
        let results = result.data
        if (results.code == 200) {
            commit("GETSHOPCART", results.data)
        }
    },
    // 删除购物车产品
    async deleteCart({commit},skuId){
        let result =await reqShopCartDelete(skuId)
        let results = result.data
        if (results.code==200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // 修改购物车中的选中状态
    async updateChecked({commit},{skuId,isChecked}){
        let result =await reqUpdateChecked(skuId,isChecked)
        let results = result.data
        if (results.code ==200) {
            console.log('修改成功');
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 点击删除勾选按钮
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll = []
        getters.carList.cartInfoList.forEach(item => {
            let promise = item.isChecked==1?dispatch('deleteCart',item.skuId):'';
            PromiseAll.push(promise);
        });
        // 只要全部p1,p2,p3都成功 返回成功  如果有一个失败  就返回失败
        return promise.all(PromiseAll)
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},ischecked){
        let promiseAll = []
        state.carList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateChecked',{skuId:item.skuId,ischecked});
            promiseAll.push(promise)
        })
        // 最终返回的结果也是promise
        return Promise.all(promiseAll)
    }
}
//准备mutations——用于操作数据（state）
const mutations = {
    GETSHOPCART(state, cartInfoList) {
        state.cartInfoList = cartInfoList
    }
}
//准备state——用于存储数据
const state = {
    // 购物车数据
    cartInfoList: []
}
//可以把我们数组当中需要的数据简化一下【将来获取就方便了】
const getters = {
    // 计算出来的购物车的列表数据
    // carList(state) {
    //     return state.cartInfoList[0].cartInfoList || []
    // }
    carList(state){
        return state.cartInfoList[0] || {};
    }

}


//创建并暴露store
export default {
    actions,
    mutations,
    state,
    getters
}