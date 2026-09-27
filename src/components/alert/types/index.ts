import type { useRender }    from '@base-ui/react'
import type { VariantProps } from 'class-variance-authority'
import type { AlertCVA }     from '@/components/alert'

export type Alert            = Readonly<useRender.ComponentProps<'div'>> & VariantProps<typeof AlertCVA>
export type AlertTitle       = Readonly<useRender.ComponentProps<'div'>>
export type AlertDescription = Readonly<useRender.ComponentProps<'div'>>
export type AlertAction      = Readonly<useRender.ComponentProps<'div'>>
