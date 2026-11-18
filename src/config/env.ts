const authRedirectUri =
  import.meta.env.VITE_AUTH_REDIRECT_URI ||
  `${location.origin}/admission/complete`

export const env = {
  API_URL: import.meta.env.VITE_API_URL || "/",
  KEYCLOAK_URL: import.meta.env.VITE_KEYCLOAK_URL || "http://localhost:8081",
  KEYCLOAK_REALM: import.meta.env.VITE_KEYCLOAK_REALM || "bethel-report",
  KEYCLOAK_CLIENT_ID:
    import.meta.env.VITE_KEYCLOAK_CLIENT_ID || "bethel-report-frontend",
  AUTH_REDIRECT_URI: authRedirectUri,
  AUTH_LOGOUT_REDIRECT_URI:
    import.meta.env.VITE_AUTH_LOGOUT_REDIRECT_URI || authRedirectUri,
} as const
