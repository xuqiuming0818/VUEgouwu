//对于axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css';

// console.log(nprogress);
// start:进度条开始 done：进度条结束



//1.利用aixos对象方法create，创建一个axios实例
// 2.request就是axios,只不过我们可以稍微配置一下
const request = axios.create({
    //配置对象
    //基础路径，发请求的时候 当中会出现api
    baseURL: "/mock",
    timeout: 5000
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 进度条开始
    nprogress.start()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 进度条结束
    nprogress.done()
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


//对外暴露
export default request