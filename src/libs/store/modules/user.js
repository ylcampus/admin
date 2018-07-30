/*
* 用户 store
*
* */
const state = {
  userId: '', // 用户Id
  tenantId: '', // 租户Id
  account: '', // 账号(用户名)
  telephone: '', // 联系电话
  origin: '', // 是否是初始密码
  tag: '', // 用户标签
  agree: '', // 是否同意优乐用户协议
  auth: [] // 菜单权限列表
}

// getters
const getters = {}

// mutations
const mutations = {
  setData (state, payload) {
    state.userId = payload.userId
    state.tenantId = payload.tenantId
    state.account = payload.account
    state.telephone = payload.telephone
    state.origin = payload.origin
    state.tag = payload.tag
    state.agree = payload.agree
    state.auth = payload.auth
  },
  clearData (state, payload) {
    state.userId = ''
    state.tenantId = ''
    state.account = ''
    state.telephone = ''
    state.origin = ''
    state.tag = ''
    state.agree = ''
    state.auth = []
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
