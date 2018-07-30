let axios = require('axios')
// 获取用户详情
module.exports.getUserInfo = () => {
  return axios.post('/api/iam/getBasicMsg')
}
// 编辑用户信息
module.exports.editUser = (data) => {
  return axios.put('/api/iam/editBasicMsg', {...data})
}
// 获取手机验证码
module.exports.getTelephoneCode = (data) => {
  return axios.post('/api/iam/getTelephoneCode', {...data})
}
// 修改手机号
module.exports.changeTelephone = (data) => {
  return axios.post('/api/iam/changeTelephone', {...data})
}
// 登出
module.exports.loginOut = () => {
  return axios.post('/api/iam/loginOut')
}
// 修改密码
module.exports.modifyPwd = (data) => {
  return axios.post('/api/iam/modifyPwd', {...data})
}
