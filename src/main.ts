import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { domain, clientId } from '../auth_config.json'
import { AuthPlugin } from './auth'

Vue.use(AuthPlugin, {
  domain,
  clientId,
  onRedirectCallback: (appState: any) => {
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
