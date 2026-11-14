import { Navigate, Outlet } from "react-router"
import { useAuthRouting } from "../hooks/useAuthRouting"
import { LoadingPage } from "@/shared/pages/LoadingPage"

export function AuthGate() {
  const { isLoading, redirectTo } = useAuthRouting()

  if (isLoading) return <LoadingPage />
  if (redirectTo) return <Navigate to={redirectTo} replace />

  return <Outlet />
}
