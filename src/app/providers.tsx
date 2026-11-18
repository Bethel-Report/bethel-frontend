import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "@/features/auth/contexts/AuthProvider"
import { ApiError } from "@/shared/api/client"
import type { ReactNode } from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: { retry: false },
    queries: {
      staleTime: 1000 * 30, // 30 seconds
      retry: (count, error) =>
        !(error instanceof ApiError && [401, 403].includes(error.status)) &&
        count < 1,
    },
  },
})

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}
