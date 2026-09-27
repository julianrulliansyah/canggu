import type { useRender } from '@base-ui/react'
import type { RefObject } from 'react'
import type { Button }    from '@/components/button/types'

export type MessageScroll         = Readonly<useRender.ComponentProps<'div'>>
export type MessageScrollValue    = Readonly<{ measure : () => void, ref : MessageScrollRef, scroll : MessageScrollMotion, scrollable : MessageScrollEdge }>
export type MessageScrollRef      = Readonly<{ content : RefObject<HTMLDivElement | null>, stick : RefObject<boolean>, viewport : RefObject<HTMLDivElement | null> }>
export type MessageScrollMotion   = Readonly<{ end : (behavior? : ScrollBehavior) => void, start : (behavior? : ScrollBehavior) => void }>
export type MessageScrollEdge     = Readonly<{ end : boolean, start : boolean }>
export type MessageScrollViewport = Readonly<useRender.ComponentProps<'div'>>
export type MessageScrollContent  = Readonly<useRender.ComponentProps<'div'>>
export type MessageScrollItem     = Readonly<useRender.ComponentProps<'div'>>
export type MessageScrollButton   = Button & Readonly<{ direction? : 'start' | 'end' }>
