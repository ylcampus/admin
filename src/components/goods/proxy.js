let axios = require('axios')

// 更新商品数据
module.exports.updateGoodsData = (goodsId) => {
  return axios.post('/api/goods/updateGoods/' + goodsId)
}
// 获取商品详情
module.exports.getGoodsDetail = (goodsId) => {
  return axios.get('/api/goods/goodsDetail/' + goodsId + '/10000')
}
// 获取商品列表
module.exports.getGoodsList = (data) => {
  return axios.get('/api/goods/goodsList', {data: {...data}})
}
// 获取店铺列表
module.exports.getShopList = (data) => {
  return axios.get('/api/shop/shopList', {data: {...data}})
}
