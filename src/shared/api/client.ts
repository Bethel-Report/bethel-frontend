import { env } from "@/config/env"
import { initializeSession, keycloak } from "@/features/auth/session"

export class ApiError extends Error {
  status: number
  errors?: Record<string, string>

  constructor(
    status: number,
    message: string,
    errors?: Record<string, string>,
  ) {
    super(message)
    this.status = status
    this.errors = errors
  }
}

const base = new URL(env.API_URL, location.origin)

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = new URL(path, base)

  if (url.origin !== base.origin || !url.pathname.startsWith("/api/")) {
    throw new Error("Destino de API inválido.")
  }

  await initializeSession()

  try {
    await keycloak.updateToken(30)
    if (!keycloak.token) throw new Error("Sessão ausente")
  } catch {
    keycloak.clearToken()
    throw new ApiError(401, "Sua sessão terminou. Entre novamente.")
  }

  const headers = new Headers(options.headers)
  headers.set("Authorization", `Bearer ${keycloak.token}`)

  if (options.body) {
    headers.set("Content-Type", "application/json")
  }

  const response = await fetch(url, { ...options, headers, redirect: "error" })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))

    if (response.status === 401) {
      keycloak.clearToken()
    }

    throw new ApiError(
      response.status,
      body.message || "Não foi possível concluir a solicitação.",
      body.errors,
    )
  }
  return response.status === 204 ? (undefined as T) : response.json()
}
