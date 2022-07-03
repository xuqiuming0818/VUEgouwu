//当前模块 API进行统一管理
import requests from './request.js'
import mockRequests from './mockAjax.js'

// 三级联动接口  /api/product/getBaseCategoryList get 无参数
export const reqCategoryList = () =>requests({url: '/product/getBaseCategoryList',method: 'get'})
// 获取banner(轮播图)
export const reqGetBanner = () => mockRequests({url: '/banner',method: 'get'})
// 获取floors的数据
export const reqGetFloors = () => mockRequests({ url: '/floors', method: 'get'})
// 获取搜索商品接口/api/list   post
export const reqGetSearchInfo = (params) => requests({ method: 'post', url: '/list', data: params })
//获取产品详情接口  /api/item/{ skuId }  GET skuId	string	Y	商品ID
export const reqGetGoodInfo = (skuId) => requests({ method: 'get', url: `/item/${skuId}` })
// 添加商品到购物车 /api/cart/addToCart/{ skuId }/{ skuNum }    POST    
export const reqAddCart = (skuId, skuNum) => requests({ method: 'post', url: `/cart/addToCart/${skuId}/${skuNum}` })
// 获取购物车列表       /cart/cartList          GET
export const reqShopCartList = () => requests({ method: 'get', url: "/cart/cartList" })
//删除购物车商品 /cart/deleteCart/{skuId}    DELETE
export const reqShopCartDelete = (skuId) => requests({ method: 'delete', url: `/cart/deleteCart/${skuId}` })
//获取商品勾选不勾选    /api/cart/checkCart/{skuId}/{isChecked}     GET
export const reqUpdateChecked = (skuId, isChecked) => requests({ method: 'get', url: `/cart/checkCart/${skuId}/${isChecked}` })
// 获取验证码 /api/user/passport/sendCode/{phone}   get
export const reqGetCode = (phone) => requests({ method: 'get', url: `/user/passport/sendCode/${phone}` })
//注册账号  /api/user/passport/register         post
export const reqUserRegister = (data) => requests({ method: 'post', url: "/user/passport/register", data })
// 登录账号     /api/user/passport/login   post
export const reqUserLogin = (data) => requests({ method: 'post', url: "/user/passport/login ", data })
//获取用户的登录信息{需要带着用户的token向服务器获取信息}    /api/user/passport/auth/getUserInfo  get
export const reqUserInfo = () => requests({ method: 'get', url: "/user/passport/auth/getUserInfo" })
//退出登录  /api/user/passport/logout   get
export const reqLogout = () => requests({ method: 'get', url: "/user/passport/logout" })
// 获取用户地址信息    /api/user/userAddress/auth/findUserAddressList      get
export const reqAddressInfo = () => requests({ method: 'get', url: "/user/userAddress/auth/findUserAddressList" })
// 获取订单交易页信息   /api/order/auth/trade       GET
export const reqOrderInfo = () => requests({ method: 'get', url: "/order/auth/trade " })
// 获取提交订单信息   /api/order/auth/submitOrder?tradeNo={tradeNo}      POST
export const reqSubmitOrder = (tradeNo,data) => requests({ method: 'post', url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,data})
// 获取支付信息  /api/payment/weixin/createNative/{orderId}      get
export const reqPayInfo = (orderId) => requests({ method: 'get', url: `/payment/weixin/createNative/${orderId}`})
// 14.查询支付订单状态   /api/payment/weixin/queryPayStatus/{orderId}   get
export const reqPayStatus = (orderId) => requests({ method: 'get', url: `/payment/weixin/queryPayStatus/${orderId}`})
//获取个人中心  /api/order/auth/{page}/{limit}   get
export const reqMyOrderList = (page,limit) => requests({ method: 'get', url: `/order/auth/${page}/${limit}`})
