let axios = require('axios')

// 添加角色
module.exports.addRole = (data) => {
  return axios.post('/api/role/addRole', {...data})
}
// 删除角色
module.exports.deleteRole = (data) => {
  return axios.post('/api/role/deleteRole', {...data})
}
// 编辑角色
module.exports.editRole = (data) => {
  return axios.put('/api/role/editRole', {...data})
}
// 获取角色详情
module.exports.getRoleDetail = (id) => {
  return axios.get('/api/role/roleDetail/' + id)
}
// 获取角色列表
module.exports.getRoleList = (data) => {
  return axios.get('/api/role/roleList', {data: {...data}})
}
// 获取会话信息
module.exports.getSession = () => {
  return axios.post('/api/iam/getSession')
}
