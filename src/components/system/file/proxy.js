let axios = require('axios')
// 读取目录
module.exports.readDir = (data) => {
  return axios.post('/api/file/readDir', {...data})
}
// 删除文件(目录)
module.exports.rmDir = (data) => {
  return axios.post('/api/file/rmDir', {...data})
}
