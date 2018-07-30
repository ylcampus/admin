let axios = require('axios')
// 删除打折券
module.exports.deleteDiscount = (discountId) => {
  return axios.post('/api/discount/deleteDiscount/' + discountId)
}
// 打折券详情
module.exports.getDiscountDetail = (discountId) => {
  return axios.get('/api/discount/discountDetail/' + discountId)
}
// 打折券列表
module.exports.getDiscountList = (data) => {
  return axios.get('/api/discount/discountList', {data: {...data}})
}
// 获取店铺列表
module.exports.getShopList = (data) => {
  return axios.get('/api/shop/shopList', {data: {...data}})
}
