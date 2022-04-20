import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

import naive from 'naive-ui'

const store = createPinia()
store.use(piniaPluginPersist)

createApp(App)
  .use(store)
  .use(router)
  .use(naive)
  .mount('#app')
