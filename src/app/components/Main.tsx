type MainProps = {
  children: React.ReactNode
}

export function Main({ children }: MainProps) {
  return (
    <main className="mx-auto w-full flex-1 px-4 py-6 lg:px-6 xl:px-8 xl:pb-6 xl:pt-8">
      {children}
    </main>
  )
}
