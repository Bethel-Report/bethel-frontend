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
const BethelsPage = lazy(() =>
  import("@/features/bethels/pages/BethelsPage").then((m) => ({
    default: m.BethelsPage,
  })),
)
const PostsPage = lazy(() =>
  import("@/features/posts/pages/PostsPage").then((m) => ({
    default: m.PostsPage,
  })),
)
const NewPostPage = lazy(() =>
  import("@/features/posts/pages/NewPostPage").then((m) => ({
    default: m.NewPostPage,
  })),
)
const PostDetailsPage = lazy(() =>
  import("@/features/posts/pages/PostDetailsPage").then((m) => ({
    default: m.PostDetailsPage,
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

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/betheis" element={<BethelsPage />} />
            <Route path="/betheis/:id" element={<BethelDetailsPage />} />
            <Route path="/betheis/novo" element={<NewBethelPage />} />
            <Route path="/postagens" element={<PostsPage />} />
            <Route path="/postagens/:id" element={<PostDetailsPage />} />
            <Route path="/postagens/novo" element={<NewPostPage />} />
            <Route path="/membros" element={<UsersPage />} />
            <Route path="/membros/:id" element={<UserDetailsPage />} />
            <Route path="/membros/novo" element={<NewUserPage />} />
            <Route path="/login" element={null} />
          </Route>
          <Route path="/componentes" element={<ComponentsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
