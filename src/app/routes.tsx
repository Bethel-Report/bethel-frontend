import { lazy, Suspense } from "react"
import { AppLayout } from "@/shared/layouts/AppLayout"
import { BrowserRouter, Route, Routes } from "react-router"

const HomePage = lazy(() =>
  import("@/features/HomePage").then((m) => ({ default: m.HomePage })),
)

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/login" element={null} />
          </Route>
          <Route path="*" element={null} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
