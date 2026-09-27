import type { useRender } from '@base-ui/react'

export type Message        = Readonly<useRender.ComponentProps<'div'>> & { align? : 'start' | 'end' }
export type MessageGroup   = Readonly<useRender.ComponentProps<'div'>>
export type MessageAvatar  = Readonly<useRender.ComponentProps<'div'>>
export type MessageHeader  = Readonly<useRender.ComponentProps<'div'>>
export type MessageContent = Readonly<useRender.ComponentProps<'div'>>
export type MessageFooter  = Readonly<useRender.ComponentProps<'div'>>
