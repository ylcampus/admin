let axios = require('axios')
// 获取会话信息
module.exports.getSession = () => {
  return axios.post('/api/iam/getSession')
}
// 登出
module.exports.loginOut = () => {
  return axios.post('/api/iam/loginOut')
}
