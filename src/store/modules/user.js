import { login } from '@/api'
export default {
  namespaced: true,
  state: {
    token: null,
    data: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_DATA(state, data) {
      state.data = data
    }
  },
  actions: {
    async loginAction({ commit }, data) {
      // 调用接口,
      const res = await login(data)
      commit('SET_TOKEN', res.data.token)
      commit('SET_DATA', res.data)
    }
  }
}

