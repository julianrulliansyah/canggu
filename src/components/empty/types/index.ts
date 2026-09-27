import type { useRender }     from '@base-ui/react'
import type { VariantProps }  from 'class-variance-authority'
import type { EmptyMediaCVA } from '@/components/empty'

export type Empty            = Readonly<useRender.ComponentProps<'div'>>
export type EmptyHeader      = Readonly<useRender.ComponentProps<'div'>>
export type EmptyMedia       = Readonly<useRender.ComponentProps<'div'>> & VariantProps<typeof EmptyMediaCVA>
export type EmptyTitle       = Readonly<useRender.ComponentProps<'div'>>
export type EmptyDescription = Readonly<useRender.ComponentProps<'div'>>
export type EmptyContent     = Readonly<useRender.ComponentProps<'div'>>
