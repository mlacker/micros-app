import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

import { AuthPlugin } from '@/auth'
import { domain, clientId } from '@/auth/authConfig.json'

Vue.use(ElementUI)
Vue.use(AuthPlugin, {
  domain,
  clientId,
  onRedirectCallback: (appState?: { targetUrl: string }) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

Vue.config.productionTip = false
axios.interceptors.request.use((config) => {
  console.log(config)
  return config
}, (error) => {
  return error
})
axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
