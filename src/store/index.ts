import { createStore } from 'vuex'
import user from './modules/user'
import config from './modules/config'
import screenList from './modules/screenList'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: user,
    config: config,
    screenList: screenList
  }
})
