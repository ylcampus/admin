// router.beforeEach((to, form, next) => {
//   if (to.name === 'DownloadApk') {
//     // 下载页面不拦截
//     next()
//   } else if (to.path === '/') {
//     axios.get(window.baseUrl.system + `/homepage/user`).then((res) => {
//       if (res && res.code * 1 === 0) {
//         next('/home')
//       } else {
//         next()
//       }
//     }).catch((e) => {
//       if (from.path !== '/' && e.response.status * 1 === 401) {
//         // Vue.prototype.$message.error('登录超时或已在其他地方登录')
//       }
//       next()
//     })
//   } else {
//     axios.get(window.baseUrl.system + `/homepage/user`).then((res) => {
//       next()
//     }).catch((e) => {
//       if (to.name === 'home') {
//         next('/')
//       } else {
//         next()
//       }
//     })
//   }
// })

// const PictureCenter = r => require.ensure([], () => r(require('@/view/videoCloud/pictureCenter')), 'pictureCenter')
// const router = new Router({
//   mode: 'history',
//   base: '',
//   exact: true,
//   linkActiveClass: 'linkActive',
//   routes: []
// })

// 上传excel到OSS
// uploadExcelToOSS (ev) {
//   let self = this
//   let fileValue = document.getElementById('importBasicFile').value
//   if (fileValue ==='') {
//     this.$message.warning('未选中任何文件')
//     return
//   }
//   let file = document.getElementById('importBasicFile').files[0]
//   let size = file.size
//   if (size > 1024 * 1024 *2) {
//     this.$message.warning('文件大小不能超过2兆')
//     return
//   }
//   co(function *() {
//     let filename = self.signature.accessFolder + '/' +file.name
//     let result = yield self.client.multipartUpload(filename, file)
//     let excelUrl = result.res.requestUrls[0]
//     if (excelUrl.indexOf('https') === -1) {
//       excelUrl = excelUrl.replace('http', 'https')
//     }
//     let res = yield proxy.importVip({
//       excelUrl: excelUrl
//     })
//     if (res.code * 1 === 0) {
//       self.$message.success('导入成功')
//       document.getElementById('importBasicFile').value = ''
//       self.getVipList()
//       self.importBasicFlag = false
//     }
//   })
// }

// 批量导入照片
// exports.inportFiles = (dir, client, files) => {
//   let objextKeys = []
//   let promiseArr = []
//   let cacheFiles = JSON.parse(JSON.stringify(files))
//   return co(function *() {
//     for (let i = 0; i < cacheFiles.length; i++) {
//       let map = files.find(row => {
//         return row.uid === cacheFiles[i].uid
//       })
//       let file = map.file
//       map['uploadState'] = 'uploading'
//       let objectKey = dir + '/' + file.name
//       let autotime = parseInt((file.size / (1024 * 1024)) * 1000)
//       let delaytime = autotime > 200 ? autotime : 200
//       yield delay(delaytime)
//       // 使用异步方式上传
//       let promise = client.multipartUpload(objectKey, file, {
//         progress: function (p, cpt, res) {
//           return function(done) {
//             map.percent = Math.ceil(p * 100)
//             done()
//           }
//         }
//       }).then(result => {
//         if (result.res.status === 200) {
//           objectKeys.push(result.name)
//           map.uploadState = 'success'
//           let index = files.indexOf(map)
//           files.splice(index, 1)
//         }
//       }).catch(err => {
//         map.uploadState = 'error'
//         map.errorTxt = '失败'
//         return err
//       })
//       promiseArr.push(promise)
//     }
//     return {
//       keys: objextKeys,
//       promiseArr: promiseArr
//     }
//   })
// }

// areaData
// export default [
//   {
//     value: '北京',
//     label: '北京',
//     children: [
//       {
//         value: '北京',
//         label: '北京',
//         children: [
//           {
//             value: '东城区',
//             label: '东城区'
//           }
//         ]
//       }
//     ]
//   }
// ]





























