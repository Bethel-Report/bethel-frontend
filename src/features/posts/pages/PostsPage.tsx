import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Link } from "react-router"
import { normalizeSearchText } from "@/lib/utils"
import { bethelPosts, bethels } from "@/features/bethels/data"
import { Button } from "@/shared/components/button"
import { Input } from "@/shared/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/select"
import { PageIndicator } from "@/shared/components/ui/PageIndicator"
import { Pagination } from "@/shared/components/ui/Pagination"
import { PostCard } from "../components/PostCard"

const pageSize = 6
const categories = [...new Set(bethelPosts.map((post) => post.category))]
const postsWithBethel = bethelPosts
  .flatMap((post) => {
    const bethel = bethels.find((item) => item.id === post.bethelId)
    return bethel ? [{ post, bethel }] : []
  })
  .sort((a, b) => b.post.publishedAt.localeCompare(a.post.publishedAt))

export function PostsPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [page, setPage] = useState(1)
  const search = normalizeSearchText(query.trim())
  const filteredPosts = postsWithBethel.filter(
    ({ post, bethel }) =>
      (category === "all" || post.category === category) &&
      (!search ||
        [post.title, post.summary, bethel.name].some((value) =>
          normalizeSearchText(value).includes(search),
        )),
  )
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const firstItem = (currentPage - 1) * pageSize
  const visiblePosts = filteredPosts.slice(firstItem, firstItem + pageSize)

  return (
    <section aria-labelledby="posts-title" className="w-full max-w-[1280px]">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
        <div>
          <h1
            id="posts-title"
            className="font-display text-[20px] font-bold leading-tight tracking-[-0.02em]"
          >
            Postagens
          </h1>
          <p className="mt-1.5 text-lg text-muted-foreground">
            Acompanhe as publicações e atividades dos bethéis em um só lugar.
          </p>
        </div>
        <div className="flex w-full justify-end md:w-fit">
          <Button asChild className="h-auto px-4 py-3 text-md">
            <Link to="/postagens/novo">
              <Plus aria-hidden="true" />
              Criar postagem
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 md:mt-8">
        <div className="relative w-full md:max-w-96">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            aria-label="Buscar postagens por título, descrição ou Bethel"
            className="h-11 bg-card pl-9 shadow-none"
            placeholder="Buscar postagem"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
          />
        </div>
        <Select
          value={category}
          onValueChange={(value) => {
            setCategory(value)
            setPage(1)
          }}
        >
          <SelectTrigger
            aria-label="Filtrar postagens por categoria"
            className="h-11 w-full bg-card shadow-none md:w-[190px]"
          >
            <SelectValue className="text-md">
              <span className="text-muted-foreground">Categoria:</span>{" "}
              {category === "all" ? "Todas" : category}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="border-0">
            <SelectItem value="all">Todas</SelectItem>
            {categories.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {visiblePosts.length > 0 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visiblePosts.map(({ post, bethel }) => (
            <PostCard key={post.id} post={post} bethel={bethel} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-lg border border-border bg-card px-6 py-12 text-center text-md text-muted-foreground shadow-sm">
          Nenhuma postagem encontrada.
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-md text-muted-foreground">
        <PageIndicator
          firstItem={filteredPosts.length === 0 ? 0 : firstItem + 1}
          lastItem={Math.min(firstItem + pageSize, filteredPosts.length)}
          totalItems={filteredPosts.length}
        />
        <Pagination
          ariaLabel="Paginação de postagens"
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </section>
  )
}
