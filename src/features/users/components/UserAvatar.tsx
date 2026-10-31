import { Avatar, AvatarFallback } from "@/shared/components/avatar"
import { cn } from "@/lib/utils"

type UserAvatarProps = {
  name: string
  className?: string
  fallbackClassName?: string
}

export function UserAvatar({
  name,
  className,
  fallbackClassName,
}: UserAvatarProps) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 1)
    .map((part) => part[0])
    .join("")

  return (
    <Avatar className={cn("size-9", className)}>
      <AvatarFallback
        className={cn(
          "bg-secondary text-md font-semibold text-primary",
          fallbackClassName,
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
