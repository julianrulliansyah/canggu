import type { useRender }                                  from '@base-ui/react'
import type { VariantProps }                               from 'class-variance-authority'
import type { MessageBubbleCVA, MessageBubbleReactionCVA } from '@/components/message/bubble'

export type MessageBubble         = Readonly<useRender.ComponentProps<'div'>> & VariantProps<typeof MessageBubbleCVA> & { align? : 'start' | 'end' }
export type MessageBubbleGroup    = Readonly<useRender.ComponentProps<'div'>>
export type MessageBubbleContent  = Readonly<useRender.ComponentProps<'div'>>
export type MessageBubbleReaction = Readonly<useRender.ComponentProps<'div'>> & VariantProps<typeof MessageBubbleReactionCVA>
