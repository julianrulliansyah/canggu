'use client'

import type { JSX }        from 'react'
import type * as Component from '@/composites/message/scroll/types'

import { createContext, use, useCallback, useLayoutEffect, useRef, useState } from 'react'

import { mergeProps, useRender } from '@base-ui/react'
import { ArrowDownIcon }         from 'lucide-react'

import { Button } from '@/components/button'
import { cn }     from '@/utilities/class'

const MessageScrollContext = createContext<Component.MessageScrollValue | null>(null)

export function useScroll(): Component.MessageScrollValue {
	const context = use(MessageScrollContext)

	if (context === null)
		throw new Error('useScroll must be invoked within <MessageScroll />')

	return context
}

export function MessageScroll({ className, render, ...property }: Component.MessageScroll): JSX.Element {
	const state = { scrollable : useState<Component.MessageScrollEdge>({ end : false, start : false }) }
	const ref   = {
		content  : useRef<HTMLDivElement | null>(null),
		stick    : useRef(true),
		viewport : useRef<HTMLDivElement | null>(null),
	}

	const perform = {
		measure : useCallback((): void => {
			if (ref.viewport.current === null)
				return

			const start = ref.viewport.current.scrollTop > 1
			const end   = ref.viewport.current.scrollHeight - ref.viewport.current.clientHeight - ref.viewport.current.scrollTop > 1

			ref.stick.current = !end

			state.scrollable[1]((edge: Component.MessageScrollEdge): Component.MessageScrollEdge => edge.start === start && edge.end === end ? edge : { end : end, start : start })
		}, []),
		scroll : {
			end : useCallback((behavior: ScrollBehavior = 'smooth'): void => {
				ref.stick.current = true

				ref.viewport.current?.scrollTo({ behavior : behavior, top : ref.viewport.current.scrollHeight })
			}, []),
			start : useCallback((behavior: ScrollBehavior = 'smooth'): void => {
				ref.stick.current = false

				ref.viewport.current?.scrollTo({ behavior : behavior, top : 0 })
			}, []),
		},
	}

	return (
		<MessageScrollContext value={{ measure : perform.measure, ref : ref, scroll : perform.scroll, scrollable : state.scrollable[0] }}>
			{useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('group/message-scroll relative flex size-full min-h-0 flex-col overflow-hidden', className) }, property), render : render, state : { slot : 'message-scroll' } })}
		</MessageScrollContext>
	)
}

export function MessageScrollViewport({ className, render, ...property }: Component.MessageScrollViewport): JSX.Element {
	const { measure, ref } = useScroll()

	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain transition-none duration-250 contain-content outline-none focus-visible:ring-2 focus-visible:ring-halo/50 focus-visible:transition-colors', className), onScroll : measure, ref : ref.viewport, tabIndex : 0 }, property), render : render, state : { slot : 'message-scroll-viewport' } })
}

export function MessageScrollContent({ className, render, ...property }: Component.MessageScrollContent): JSX.Element {
	const { measure, ref } = useScroll()

	useLayoutEffect(() => {
		if (ref.content.current === null)
			return

		const watch = new ResizeObserver((): void => {
			if (ref.stick.current && !(ref.viewport.current === null))
				ref.viewport.current.scrollTop = ref.viewport.current.scrollHeight

			measure()
		})

		watch.observe(ref.content.current)

		return () => {
			watch.disconnect()
		}
	}, [ measure, ref.content, ref.stick, ref.viewport ])

	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ 'aria-live' : 'polite', className : cn('flex h-max min-h-full flex-col gap-6', className), ref : ref.content, role : 'log' }, property), render : render, state : { slot : 'message-scroll-content' } })
}

export function MessageScrollItem({ className, render, ...property }: Component.MessageScrollItem): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]', className) }, property), render : render, state : { slot : 'message-scroll-item' } })
}

export function MessageScrollButton({ children, className, direction = 'end', icon = true, size = 'sm', variant = 'secondary', ...property }: Component.MessageScrollButton): JSX.Element {
	const { scroll, scrollable } = useScroll()

	return (
		<Button data-slot={'message-scroll-button'} data-active={scrollable[direction] ? '' : undefined} data-direction={direction} icon={icon} size={size} variant={variant} aria-hidden={!scrollable[direction]} aria-label={direction === 'end' ? 'Scroll to end' : 'Scroll to start'} tabIndex={scrollable[direction] ? undefined : -1} onClick={() => scroll[direction]()} className={cn('absolute inset-s-1/2 -translate-x-1/2 border-edge bg-background text-foreground transition-[translate,scale,opacity] duration-200 not-data-active:pointer-events-none not-data-active:scale-95 not-data-active:opacity-0 not-data-active:duration-400 not-data-active:ease-[cubic-bezier(0.7,0,0.84,0)] hover:bg-mute hover:text-foreground data-[direction=end]:bottom-4 data-[direction=end]:not-data-active:translate-y-full data-[direction=start]:top-4 data-[direction=start]:not-data-active:-translate-y-full rtl:translate-x-1/2 data-active:translate-y-0 data-active:scale-100 data-active:opacity-100 data-active:ease-[cubic-bezier(0.25,1,0.35,1)] data-[direction=start]:[&_svg]:rotate-180', className)} {...property}>
			{children ?? <ArrowDownIcon />}
		</Button>
	)
}
