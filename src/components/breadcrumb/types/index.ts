import type { useRender } from '@base-ui/react'

export type Breadcrumb          = Readonly<useRender.ComponentProps<'nav'>>
export type BreadcrumbList      = Readonly<useRender.ComponentProps<'ol'>>
export type BreadcrumbItem      = Readonly<useRender.ComponentProps<'li'>>
export type BreadcrumbLink      = Readonly<useRender.ComponentProps<'a'>>
export type BreadcrumbPage      = Readonly<useRender.ComponentProps<'span'>>
export type BreadcrumbSeparator = Readonly<useRender.ComponentProps<'li'>>
export type BreadcrumbEllipsis  = Readonly<useRender.ComponentProps<'span'>>
