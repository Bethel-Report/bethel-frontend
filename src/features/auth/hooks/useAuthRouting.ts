import { useLocation } from "react-router"
import { canAccess } from "../permissions"
import { useAuth } from "./useAuth"
import type { AuthStatus } from "../types"

const DESTINATION_MAPPER: Record<AuthStatus, string | null> = {
  authenticated: null,
  initializing: null,
  loading: null,
  guest: "/login",
  admission: "/admission/complete",
  "no-permission": "/auth/error",
  forbidden: "/auth/error",
  unavailable: "/auth/error",
}

export function useAuthRouting() {
  const { status, profile } = useAuth()
  const { pathname } = useLocation()
  let destination = DESTINATION_MAPPER[status]

  const isLoading = status === "initializing" || status === "loading"

  if (status === "authenticated") {
    if (pathname === "/login" || pathname === "/admission/complete") {
      destination = "/"
    } else if (
      pathname !== "/auth/error" &&
      pathname !== "/componentes" &&
      !canAccess(profile?.permission?.role, pathname)
    ) {
      destination = "/auth/error"
    }
  }

  return {
    isLoading,
    redirectTo: destination !== pathname ? destination : null,
  }
}
