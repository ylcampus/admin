let axios = require('axios')
// 获取区域树
module.exports.getAreaTreeData = () => {
  return axios.post('/api/area/areaTree')
}
// 获取会员列表
module.exports.getMemberList = (data) => {
  return axios.get('/api/member/memberList', {data: {...data}})
}
// 删除会员
module.exports.deleteMember = (memberId) => {
  return axios.post('/api/member/deleteMember/' + memberId)
}
// 冻结、解冻会员账号
module.exports.freeze = (data) => {
  return axios.post('/api/member/freeze', {...data})
}
// 获取会员详情
module.exports.getMemberDetail = (memberId) => {
  return axios.get('/api/member/memberDetail/' + memberId)
}
