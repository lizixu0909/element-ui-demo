import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户加载等待
    loading: false
  },
  mutations: {
    enableLoading (state) {
      state.loading = true
    },
    disableLoading (state) {
      state.loading = false
    }
  }
})
