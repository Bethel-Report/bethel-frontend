import * as React from "react"

import { cn } from "@/lib/utils"

const ResponsiveRowList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col p-4 gap-4", className)}
    {...props}
  />
))
ResponsiveRowList.displayName = "ResponsiveRowList"

const ResponsiveRowContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-3", className)} {...props} />
))
ResponsiveRowContainer.displayName = "ResponsiveRowContainer"

const ResponsiveRowDataContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col", className)} {...props} />
))
ResponsiveRowDataContainer.displayName = "ResponsiveRowDataContainer"

const ResponsiveRowTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
ResponsiveRowTitle.displayName = "ResponsiveRowTitle"

const ResponsiveRowSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-md", className)} {...props} />
))
ResponsiveRowSubtitle.displayName = "ResponsiveRowSubtitle"

const ResponsiveRowHighlight = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, title, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-2 rounded-md bg-accent-foreground/15 p-3 pt-2",
      className,
    )}
    {...props}
  >
    <p className="text-md">{title}</p>
    <div className="flex gap-2">{children}</div>
  </div>
))
ResponsiveRowHighlight.displayName = "ResponsiveRowHighlight"

const ResponsiveRowHighlightDetail = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex justify-start items-center gap-1.5 rounded-md bg-card py-1.5 px-2",
      className,
    )}
    {...props}
  >
    {children}
  </div>
))
ResponsiveRowHighlightDetail.displayName = "ResponsiveRowHighlightDetail"

export {
  ResponsiveRowList,
  ResponsiveRowContainer,
  ResponsiveRowDataContainer,
  ResponsiveRowTitle,
  ResponsiveRowSubtitle,
  ResponsiveRowHighlight,
  ResponsiveRowHighlightDetail,
}
