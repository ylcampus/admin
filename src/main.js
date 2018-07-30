// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/common.scss'
import store from './libs/store'
Vue.use(ElementUI)
Vue.prototype.store = store
Vue.config.productionTip = false

// axios全局配置
axios.defaults.baseURL = '/'
axios.defaults.timeout = 30 * 1000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 添加请求拦截器
const baseurl = ''
axios.interceptors.request.use(async function (config) {
  store.commit('loadNumPlus')
  let url = `${baseurl}${config.url}`
  if (config.method === 'get' && config.data) {
    url += '?'
    let keys = Object.keys(config.data)
    for (let key of keys) {
      url += `${key}=${encodeURIComponent(config.data[key])}&`
    }
    url = url.substring(0, url.length - 1)
  }
  return {...config, url}
}, function (error) {
  return Promise.reject(error)
})

// 添加相应拦截器
axios.interceptors.response.use(function (res) {
  store.commit('loadNumMinus')
  if (store.state.loaddingNum <= 0) {
    store.commit('resetLoadNum')
  }
  if (res.status === 200 && res.data.code !== undefined && res.data.code * 1 !== 0) {
    Vue.prototype.$message.error(res.data.message)
  }
  return res.data
}, function (error) {
  store.commit('loadNumMinus')
  if (store.state.loaddingNum <= 0) {
    store.commit('resetLoadNum')
  }
  if (error.response && (error.response.status * 1 === 401)) {
    router.push({path: '/login'})
    store.commit('user/clearData')
    Vue.prototype.$message.error(error.response.data.message)
    return Promise.reject(error.response.data)
  } else {
    let resData = error.response.data
    Vue.prototype.$message.error(resData.message)
    return Promise.reject(resData)
  }
})
// 调整窗口大小
window.onresize = () => {
  store.commit('resizeWindow')
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
