let axios = require('axios')
// 获取定时任务列表
module.exports.getTaskList = (data) => {
  return axios.get('/api/task/taskList', {params: {...data}})
}
// 获取定时任务详情
module.exports.getTaskDetail = (id) => {
  return axios.get('/api/task/taskDetail/' + id)
}
