import { lazy, Suspense } from "react"
import { AppLayout } from "@/shared/layouts/AppLayout"
import { NotFoundPage } from "@/shared/layouts/NotFoundPage"
import { BrowserRouter, Route, Routes } from "react-router"

const HomePage = lazy(() =>
  import("@/features/HomePage").then((m) => ({ default: m.HomePage })),
)
const ComponentsPage = lazy(() =>
  import("@/features/ComponentsPage").then((m) => ({
    default: m.ComponentsPage,
  })),
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
          <Route path="/componentes" element={<ComponentsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
