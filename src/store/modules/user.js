import { login, getuserInfo } from '@/api'
export default {
  namespaced: true,
  state: {
    token: null,
    userId: ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_DATA(state, userId) {
      state.userId = userId
    }
  },
  actions: {
    async loginAction({ commit }, data) {
      // 调用接口,
      const res = await login(data)
      console.log(res.data)
      commit('SET_TOKEN', res.data.token)
      commit('SET_DATA', res.data.userId)
      return res
    },
    async getuserInfo(context) {
      // 调用接口,
      const infores = await getuserInfo(context.state.userId)
      context.commit('SET_USERINFO', infores)
      console.log(infores)
    }
  }
}

