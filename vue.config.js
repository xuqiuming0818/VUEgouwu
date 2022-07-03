const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  lintOnSave: false, // eslint-loader 是否在保存的时候检查

  
  

  
  
  //开启代理服务器（方法二）
  devServer: {
    proxy: {
    '/api': {
    //服务器地址
    target: 'http://gmall-h5-api.atguigu.cn',
    //重写名
    // pathRewrite:{'^/api':''},
    ws: true,   //用于支持websocket
    changeOrigin: true},
  } }
}



