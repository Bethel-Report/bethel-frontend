import { lazy, Suspense } from "react"
import { AppLayout } from "@/shared/layouts/AppLayout"
import { NotFoundPage } from "@/shared/layouts/NotFoundPage"
import { BrowserRouter, Route, Routes } from "react-router"

const HomePage = lazy(() =>
  import("@/shared/pages/HomePage").then((m) => ({ default: m.HomePage })),
)
const ComponentsPage = lazy(() =>
  import("@/shared/pages/ComponentsPage").then((m) => ({
    default: m.ComponentsPage,
  })),
)
const LoginPage = lazy(() =>
  import("@/features/auth/pages/LoginPage").then((m) => ({
    default: m.LoginPage,
  })),
)
const SetPasswordPage = lazy(() =>
  import("@/features/auth/pages/SetPasswordPage").then((m) => ({
    default: m.SetPasswordPage,
  })),
)

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/definir-senha" element={<SetPasswordPage />} />
          <Route path="/componentes" element={<ComponentsPage />} />
          <Route element={<AppLayout />}>
            <Route index path="/" element={<HomePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
