import { PluginObject } from 'vue'
import AuthService from './authService'

let instance: AuthService

/** Returns the current instance of the SDK */
export const getInstance = () => instance

/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export const AuthPlugin: PluginObject<Auth0ClientOptions> = {
  async install(Vue, options) {
    if (!instance) {
      instance = new AuthService()
      instance.init(options as Auth0ClientOptions)
    }
    
    Vue.prototype.$auth = instance
  }
}