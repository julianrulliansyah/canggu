import type { useRender }             from '@base-ui/react'
import type { VariantProps }          from 'class-variance-authority'
import type { ItemCVA, ItemMediaCVA } from '@/components/item'
import type { Separator }             from '@/components/separator/types'

export type Item            = Readonly<useRender.ComponentProps<'div'>> & VariantProps<typeof ItemCVA>
export type ItemGroup       = Readonly<useRender.ComponentProps<'div'>>
export type ItemHeader      = Readonly<useRender.ComponentProps<'div'>>
export type ItemTitle       = Readonly<useRender.ComponentProps<'div'>>
export type ItemDescription = Readonly<useRender.ComponentProps<'p'>>
export type ItemMedia       = Readonly<useRender.ComponentProps<'div'>> & VariantProps<typeof ItemMediaCVA>
export type ItemActionGroup = Readonly<useRender.ComponentProps<'div'>>
export type ItemContent     = Readonly<useRender.ComponentProps<'div'>>
export type ItemSeparator   = Separator
export type ItemFooter      = Readonly<useRender.ComponentProps<'div'>>
