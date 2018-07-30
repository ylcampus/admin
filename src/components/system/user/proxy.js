let axios = require('axios')
// 获取角色列表
module.exports.getRoleList = (data) => {
  return axios.get('/api/role/roleList', {data: {...data}})
}
// 添加用户
module.exports.addUser = (data) => {
  return axios.post('/api/user/addUser', {...data})
}
// 获取用户详情
module.exports.getUserDetail = (userId) => {
  return axios.get('/api/user/userDetail/' + userId)
}
// 编辑用户
module.exports.editUser = (data) => {
  return axios.put('/api/user/editUser', {...data})
}
// 重置用户密码
module.exports.resetUserPassword = (userId) => {
  return axios.post('/api/user/resetUserPassword/' + userId)
}
// 获取用户列表
module.exports.getUserList = (data) => {
  return axios.get('/api/user/userList', {data: {...data}})
}
// 删除用户
module.exports.deleteUser = (data) => {
  return axios.post('/api/user/deleteUser', {...data})
}
