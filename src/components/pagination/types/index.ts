import type { useRender }    from '@base-ui/react'
import type { VariantProps } from 'class-variance-authority'
import type { ButtonCVA }    from '@/components/button'

export type Pagination         = Readonly<useRender.ComponentProps<'nav'>>
export type PaginationContent  = Readonly<useRender.ComponentProps<'ul'>>
export type PaginationItem     = Readonly<useRender.ComponentProps<'li'>>
export type PaginationLink     = Readonly<useRender.ComponentProps<'a'>> & Readonly<{ active ? : boolean }> & Pick<VariantProps<typeof ButtonCVA>, 'icon' | 'size'>
export type PaginationNext     = Readonly<useRender.ComponentProps<'a'>> & Readonly<{ text ? : string }>
export type PaginationPrevious = Readonly<useRender.ComponentProps<'a'>> & Readonly<{ text ? : string }>
export type PaginationEllipsis = Readonly<useRender.ComponentProps<'span'>>
