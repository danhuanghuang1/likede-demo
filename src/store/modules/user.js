import { login } from '@/api/login'
import { getUserInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    hrasstime: ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    // 处理token过期
    SET_HRASS_TIME(state, hrasstime) {
      state.hrasstime = hrasstime
    },
    // 保存用户信息
    SET_USERIFO(state, userInfo) {
      state.userInfo = userInfo
    },
    // 清除用户信息
    REMOVE_USERIFO(state) {
      state.userInfo = {}
    },
    // 清除用户token
    REMOVE_TOKEN(state) {
      state.token = null
    }
  },
  actions: {
    // 登录
    async loginAction({ commit }, loginData) {
      // 调用接口,
      const data = await login(loginData)
      commit('SET_TOKEN', data)
      commit('SET_HRASS_TIME', +new Date())
    },
    async getUserInfo({ commit }) {
      // 调用接口,
      const data = await getUserInfo()
      const data1 = await getUserDetailById(data.userId)
      const result = { ...data, ...data1 }
      commit('SET_USERIFO', result)
      return JSON.parse(JSON.stringify(data))
      //
    },
    // 点击退出清除用户信息和本地信息
    async layout({ commit }) {
      commit('REMOVE_USERIFO')
      commit('REMOVE_TOKEN')
    }
  }
}

