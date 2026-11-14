import { ApiError } from "@/shared/api/client"
import type { AuthStatus, Profile } from "./types"

export function getProfileStatus(profile: Profile): AuthStatus {
  if (!profile.active) return "forbidden"
  if (!profile.permission) return "no-permission"

  return "authenticated"
}

export function getProfileErrorStatus(error: unknown): AuthStatus {
  if (!(error instanceof ApiError)) return "unavailable"

  switch (error.status) {
    case 401:
      return "guest"
    case 403:
      return "forbidden"
    case 404:
      return "admission"
    default:
      return "unavailable"
  }
}
