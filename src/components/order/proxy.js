let axios = require('axios')
// 获取订单详情
module.exports.getOrderDetail = (orderId) => {
  return axios.get('/api/order/orderDetail/' + orderId)
}
// 获取订单列表
module.exports.getOrderList = (data) => {
  return axios.get('/api/order/orderList', {data: {...data}})
}
// 获取店铺列表
module.exports.getShopList = (data) => {
  return axios.get('/api/shop/shopList', {data: {...data}})
}
