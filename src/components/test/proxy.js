let axios = require('axios')
// 提交订单
module.exports.submitOrder = (data) => {
  return axios.post('/api/order/submitOrder', {...data})
}
// 会员注册
module.exports.register = (data) => {
  return axios.post('/api/iam/register', {...data})
}
// 添加打折券
module.exports.addDiscount = () => {
  return axios.post('/api/discount/addDiscount')
}
// 添加商品
module.exports.addGoods = (data) => {
  return axios.post('/api/goods/addGoods', {...data})
}
