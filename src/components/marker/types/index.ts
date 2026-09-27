import type { useRender }    from '@base-ui/react'
import type { VariantProps } from 'class-variance-authority'
import type { MarkerCVA }    from '@/components/marker'

export type Marker        = Readonly<useRender.ComponentProps<'div'>> & VariantProps<typeof MarkerCVA>
export type MarkerContent = Readonly<useRender.ComponentProps<'span'>>
export type MarkerIcon    = Readonly<useRender.ComponentProps<'span'>>
