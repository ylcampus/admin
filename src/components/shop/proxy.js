let axios = require('axios')
// 添加店铺
module.exports.addShop = (data) => {
  return axios.post('/api/shop/addShop', {...data})
}
// 删除店铺
module.exports.deleteShop = (shopId) => {
  return axios.post('/api/shop/deleteShop/' + shopId)
}
// 编辑店铺
module.exports.editShop = (data) => {
  return axios.put('/api/shop/editShop', {...data})
}
// 获取店铺详情
module.exports.getShopDetail = (shopId) => {
  return axios.get('/api/shop/shopDetail/' + shopId)
}
// 获取店铺列表
module.exports.getShopList = (data) => {
  return axios.get('/api/shop/shopList', {data: {...data}})
}
// 爬取商品
module.exports.crawData = (shopId) => {
  return axios.post(`/api/shop/crawData/${shopId}`)
}
// 获取执行日志数据
module.exports.getCrawLogData = (shopId) => {
  return axios.post(`/api/shop/getCrawLogData/${shopId}`)
}
// 获取爬虫验证码
module.exports.getCrawValidCode = () => {
  return axios.post('/api/shop/getCrawValidateCode')
}
// 爬虫权限校验
module.exports.validCrawAuthority = () => {
  return axios.post('/api/shop/validCrawAuthority')
}
