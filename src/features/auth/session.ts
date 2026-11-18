import Keycloak from "keycloak-js"

import { env } from "@/config/env"

export const redirectUri = env.AUTH_REDIRECT_URI

export const keycloak = new Keycloak({
  url: env.KEYCLOAK_URL,
  realm: env.KEYCLOAK_REALM,
  clientId: env.KEYCLOAK_CLIENT_ID,
})

let initialization: Promise<boolean> | undefined

export function initializeSession() {
  return (initialization ??= keycloak.init({
    onLoad: "check-sso",
    flow: "standard",
    pkceMethod: "S256",
    scope: "openid email profile",
    redirectUri,
  }))
}

export function login() {
  return keycloak.login({ redirectUri })
}

export function resetPassword() {
  return keycloak.login({ redirectUri, action: "reset-credentials" })
}

export function logoutSession() {
  return keycloak.logout({
    redirectUri: env.AUTH_LOGOUT_REDIRECT_URI,
  })
}
