let axios = require('axios')
// 用户登录
module.exports.loginIn = (data) => {
  return axios.post('/api/iam/userLogin', {...data})
}
// 获取验证码
module.exports.getCaptcha = () => {
  return axios.post('/api/iam/getCaptcha')
}
// 检测用户验证码及账号信息
module.exports.checkAccountMsg = (data) => {
  return axios.post('/api/iam/checkAccountMsg', {...data})
}
// 获取手机验证码
module.exports.getTelephoneCode = (data) => {
  return axios.post('/api/iam/getTelephoneCode', {...data})
}
// 修改用户密码
module.exports.backPwd = (data) => {
  return axios.post('/api/iam/backPwd', {...data})
}
// 绑定手机号并修改密码
module.exports.modifyPwdAndBindTelephone = (data) => {
  return axios.post('/api/iam/modifyPwdAndBindTelephone', {...data})
}
