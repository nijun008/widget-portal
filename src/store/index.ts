import { createStore } from 'vuex'
import user from './modules/user'
import config from './modules/config'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: user,
    config: config
  }
})
