import Vue from 'vue'
import createAuth0Client from '@auth0/auth0-spa-js'

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () => 
  window.history.replaceState({}, document.title, window.location.pathname)

let instance: Vue

/** Returns the current instance of the SDK */
export const getInstance = () => instance

/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export const useAuth = ({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  redirectUri = window.location.origin,
  ...options
}) => {
  if (instance) return instance

  instance = new Vue({
    data() {
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
        authClient: null,
        popupOpen: false,
        error: null
      }
    },
    methods: {
      /** Authenticates the user using a popup window */
      async loginWithPopup(o: any) {
        this.popupOpen = true

        try {
          await this.authClient.loginWithPopup(o)
        } catch (error) {
          console.error(error)
        } finally {
          this.popupOpen = false
        }

        this.user = await this.authClient.getUser()
        this.isAuthenticated = true
      },
      /** Handles the callback when logging in using a redirect */
      async handleRedirectCallback() {
        this.loading = true
        try {
          await this.authClient.handleRedirectCallback()
          this.user = await this.authClient.getUser()
          this.isAuthenticated = true
        } catch (error) {
          console.error(error)
        } finally {
          this.loading = false
        }
      },
      /** Authenticates the user using the redirect method */
      loginWithRedirect(o: any) {
        return this.authClient.loginWithRedirect(o)
      },
      /** Returns all the claims present in the ID token */
      getIdTokenClaims(o: any) {
        return this.authClient.getIdTokenClaims(o)
      },
      /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
      getTokenSilently(o: any) {
        return this.authClient.getTokenSilently(o)
      },
      /** Gets the access token using a popup window */
      getTokenWithPopup(o: any) {
        return this.authClient.getTokenWithPopup(o)
      },
      /** Logs the user out and removes their session on the authorization server */
      logout(o: any) {
        return this.authClient.logout(o)
      }
    },
    /** Use this lifecycle method to instantiate the SDK client */
    async created() {
      // Create a new instance of the SDK client using members of the given options object
      // this.authClient = await createAuth0Client({
      //   domain: options.domain,
      //   client_id: options.client_id,
      //   audience: options.audience,
      //   redirect_uri: redirectUri
      // })

      try {
        // If the user is returning to the app after authentication..
        if (
          window.location.search.includes("code=") &&
          window.location.search.includes("state=")
        ) {
          // handle the redirect and retrieve tokens
          const { appState } = await this.authClient.handleRedirectCallback()
          
          // Notify subscribers that the redirect callback has happened, passing the appState
          // (useful for retrieving any pre-authentication state)
          onRedirectCallback(appState)
        }
      } catch (error) {
        this.error = error
      } finally {
        // Initialize our internal authentication state
        this.isAuthenticated = await this.authClient.isAuthenticated()
        this.user = await this.authClient.getUser()
        this.loading = false
      }
    }
  })

  return instance
}

export const AuthPlugin = {
  install(Vue, options) {
    Vue.prototype.$auth = useAuth(options)
  }
}