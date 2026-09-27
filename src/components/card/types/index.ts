import type { useRender } from '@base-ui/react'

export type Card            = Readonly<useRender.ComponentProps<'div'>> & Readonly<{ size ? : 'md' | 'sm' }>
export type CardHeader      = Readonly<useRender.ComponentProps<'div'>>
export type CardTitle       = Readonly<useRender.ComponentProps<'div'>>
export type CardDescription = Readonly<useRender.ComponentProps<'div'>>
export type CardAction      = Readonly<useRender.ComponentProps<'div'>>
export type CardContent     = Readonly<useRender.ComponentProps<'div'>>
export type CardFooter      = Readonly<useRender.ComponentProps<'div'>>
