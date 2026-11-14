import { useCallback, useEffect, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

import { apiRequest } from "@/shared/api/client"
import { initializeSession, keycloak, logoutSession } from "../session"
import type { AuthContextValue, AuthStatus, Profile } from "../types"
import { getProfileErrorStatus, getProfileStatus } from "../utils"

export function useAuthSession(): AuthContextValue {
  const cache = useQueryClient()
  const generation = useRef(0)

  const [status, setStatus] = useState<AuthStatus>("initializing")
  const [profile, setProfile] = useState<Profile | null>(null)

  const clearSession = useCallback(() => {
    generation.current++
    cache.clear()

    setProfile(null)
    setStatus("guest")
  }, [cache])

  const updateProfile = useCallback((user: Profile) => {
    generation.current++

    setProfile(user)
    setStatus(getProfileStatus(user))
  }, [])

  const reload = useCallback(async () => {
    const current = ++generation.current

    setProfile(null)
    setStatus("loading")

    try {
      const user = await apiRequest<Profile>("/api/users/me")

      if (current !== generation.current) return

      updateProfile(user)
    } catch (error) {
      if (current !== generation.current) return

      setStatus(getProfileErrorStatus(error))
    }
  }, [updateProfile])

  const logout = useCallback(async () => {
    clearSession()

    try {
      await logoutSession()
    } catch {
      setStatus("unavailable")
    }
  }, [clearSession])

  useEffect(() => {
    let active = true

    keycloak.onAuthLogout = clearSession
    keycloak.onAuthRefreshError = () => keycloak.clearToken()
    keycloak.onTokenExpired = () => {
      void keycloak.updateToken(30).catch(() => keycloak.clearToken())
    }

    async function startSession() {
      try {
        const authenticated = await initializeSession()

        if (!active) return

        if (authenticated) {
          await reload()
        } else {
          setStatus("guest")
        }
      } catch {
        if (active) setStatus("unavailable")
      }
    }

    void startSession()

    return () => {
      active = false
    }
  }, [clearSession, reload])

  return { status, profile, updateProfile, reload, logout }
}
