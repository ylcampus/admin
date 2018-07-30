let axios = require('axios')
// 获取店铺列表
module.exports.getShopList = (data) => {
  return axios.get('/api/shop/shopList', {data: {...data}})
}
// 获取访问数据
module.exports.getLineChartData = (data) => {
  return axios.post('/api/total/getLineChartData', {...data})
}
// 获取订单图表数据
module.exports.getOrderChartData = (data) => {
  return axios.post('/api/total/getOrderChartData', {...data})
}
// 获取商品图表数据
module.exports.getGoodsChartData = (data) => {
  return axios.post('/api/total/getGoodsChartData', {...data})
}
// 获取会员图表数据
module.exports.getMemberChartData = () => {
  return axios.post('/api/total/getMemberChartData')
}
// 获取打折券图表数据
module.exports.getDiscountChartData = (data) => {
  return axios.post('/api/total/getDiscountChartData', {...data})
}
