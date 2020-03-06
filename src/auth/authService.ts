/* eslint-disable no-debugger */
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client'
import createAuth0Client from '@auth0/auth0-spa-js'

import { Component, Prop, Vue } from 'vue-property-decorator';

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname)

@Component
export default class AuthService extends Vue {

    loading = true
    @Prop() public isAuthenticated = false
    @Prop() public user = {}
    authClient!: Auth0Client
    popupOpen = false
    error = null

    /** Use this lifecycle method to instantiate the SDK client */
    async init({
        onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
        redirectUri = window.location.origin,
        ...options
    }: Auth0ClientOptions) {
        try {
            // Create a new instance of the SDK client using members of the given options object
            this.authClient = await createAuth0Client({
                // eslint-disable-next-line @typescript-eslint/camelcase
                domain: options.domain,
                // eslint-disable-next-line @typescript-eslint/camelcase
                client_id: options.clientId,
                audience: options.audience,
                // eslint-disable-next-line @typescript-eslint/camelcase
                redirect_uri: redirectUri
            })
        } catch (error) {
            console.error(error)
        }

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

    /** Authenticates the user using a popup window */
    async loginWithPopup() {
        this.popupOpen = true

        try {
            await this.authClient.loginWithPopup()
        } catch (error) {
            console.error(error)
        } finally {
            this.popupOpen = false
        }

        this.user = await this.authClient.getUser()
        this.isAuthenticated = true
    }
    /** Handles the callback when logging in using a redirect */
    async handleRedirectCallbackBck() {
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
    }
    /** Authenticates the user using the redirect method */
    loginWithRedirect(options: getIdTokenClaimsOptions) {
        return this.authClient.loginWithRedirect(options)
    }
    /** Returns all the claims present in the ID token */
    getIdTokenClaims(options: getIdTokenClaimsOptions) {
        return this.authClient.getIdTokenClaims(options)
    }
    /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
    getTokenSilently(options: GetTokenSilentlyOptions) {
        return this.authClient.getTokenSilently(options)
    }
    /** Gets the access token using a popup window */
    getTokenWithPopup(options: GetTokenWithPopupOptions) {
        return this.authClient.getTokenWithPopup(options)
    }
    /** Logs the user out and removes their session on the authorization server */
    logout(options: LogoutOptions) {
        return this.authClient.logout(options)
    }
}
