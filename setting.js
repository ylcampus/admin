// 系统配置
module.exports = {
  host: '127.0.0.1', // 主机名
  port: 8080, // 端口
  useEslint: false,
  devServer: {
    hot: true, // 热加载
    compress: true, // 开启gzip压缩
    progress: true, //  是否显示打包的进度
    autoOpenBrowser: false, // 是否自动打开浏览器
  },
  proxyTable: { // 代理服务器
    '/api': {
      target: 'http://127.0.0.1:5566',
      changeOrigin: true
    }
  }
}
