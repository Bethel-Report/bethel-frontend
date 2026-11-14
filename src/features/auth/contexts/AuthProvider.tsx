import { useAuthSession } from "../hooks/useAuthSession"
import type { AuthProviderProps } from "../types"
import { AuthContext } from "./AuthContext"

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuthSession()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
