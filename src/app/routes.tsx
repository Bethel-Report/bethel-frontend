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
const UsersPage = lazy(() =>
  import("@/features/users/pages/UsersPage").then((m) => ({
    default: m.UsersPage,
  })),
)
const FinancesPage = lazy(() =>
  import("@/features/finances/pages/FinancesPage").then((m) => ({
    default: m.FinancesPage,
  })),
)
const BethelsPage = lazy(() =>
  import("@/features/bethels/pages/BethelsPage").then((m) => ({
    default: m.BethelsPage,
  })),
)
const NewBethelPage = lazy(() =>
  import("@/features/bethels/pages/NewBethelPage").then((m) => ({
    default: m.NewBethelPage,
  })),
)
const BethelDetailsPage = lazy(() =>
  import("@/features/bethels/pages/BethelDetailsPage").then((m) => ({
    default: m.BethelDetailsPage,
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
            <Route path="/betheis" element={<BethelsPage />} />
            <Route path="/betheis/:id" element={<BethelDetailsPage />} />
            <Route path="/betheis/novo" element={<NewBethelPage />} />
            <Route path="/membros" element={<UsersPage />} />
            <Route path="/financas" element={<FinancesPage />} />
            <Route path="/membros/:id" element={<UserDetailsPage />} />
            <Route path="/membros/novo" element={<NewUserPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
