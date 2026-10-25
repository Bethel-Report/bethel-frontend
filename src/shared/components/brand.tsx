import Logo from "/logo.png"

export function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
        <img src={Logo} width={36} height={36} alt="Logo do Bethel Report" />
      </div>
      <span className="font-display text-xg font-extrabold">
        bethel<span className="font-medium text-primary"> report</span>
      </span>
    </div>
  )
}
