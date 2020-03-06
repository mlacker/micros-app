import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { AuthPlugin } from '@/auth'
import { domain, clientId } from '@/auth/authConfig.json'

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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
