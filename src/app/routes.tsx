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
const UsersPage = lazy(() =>
  import("@/features/users/pages/UsersPage").then((m) => ({
    default: m.UsersPage,
  })),
)
const NewUserPage = lazy(() =>
  import("@/features/users/pages/NewUserPage").then((m) => ({
    default: m.NewUserPage,
  })),
)
const UserDetailsPage = lazy(() =>
  import("@/features/users/pages/UserDetailsPage").then((m) => ({
    default: m.UserDetailsPage,
  })),
)

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/membros" element={<UsersPage />} />
            <Route path="/membros/novo" element={<NewUserPage />} />
            <Route path="/membros/:id" element={<UserDetailsPage />} />
            <Route path="/login" element={null} />
          </Route>
          <Route path="/componentes" element={<ComponentsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
