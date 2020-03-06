declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '@/auth/authConfig.json' {
  export const domain: string
  export const clientId: string
}
