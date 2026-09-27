'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/message/bubble/types'

import { mergeProps, useRender } from '@base-ui/react'
import { cva }                   from 'class-variance-authority'

import { cn } from '@/utilities/class'

export const MessageBubbleCVA = cva('group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full', {
	variants : {
		variant : {
			primary     : '*:data-[slot=message-bubble-content]:bg-primary *:data-[slot=message-bubble-content]:text-primary-foreground [&>[data-slot=message-bubble-content]:is(button,a):hover]:bg-primary/80',
			secondary   : '*:data-[slot=message-bubble-content]:bg-secondary *:data-[slot=message-bubble-content]:text-secondary-foreground [&>[data-slot=message-bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--canggu-color-secondary),var(--canggu-color-foreground)_5%)]',
			mute        : '*:data-[slot=message-bubble-content]:bg-mute [&>[data-slot=message-bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--canggu-color-mute),var(--canggu-color-foreground)_5%)]',
			tint        : '*:data-[slot=message-bubble-content]:bg-[oklch(from_var(--canggu-color-primary)_0.875_calc(c*0.5)_h)] *:data-[slot=message-bubble-content]:text-foreground dark:*:data-[slot=message-bubble-content]:bg-[oklch(from_var(--canggu-color-primary)_0.2_calc(c*0.35)_h)] [&>[data-slot=message-bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--canggu-color-primary)_0.88_calc(c*0.5)_h)] dark:[&>[data-slot=message-bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--canggu-color-primary)_0.35_calc(c*0.5)_h)]',
			outline     : '*:data-[slot=message-bubble-content]:border-edge *:data-[slot=message-bubble-content]:bg-background [&>[data-slot=message-bubble-content]:is(button,a):hover]:bg-mute [&>[data-slot=message-bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=message-bubble-content]:is(button,a):hover]:bg-haze/30',
			destructive : '*:data-[slot=message-bubble-content]:bg-destructive/2.5 *:data-[slot=message-bubble-content]:text-destructive dark:*:data-[slot=message-bubble-content]:bg-destructive/5 [&>[data-slot=message-bubble-content]:is(button,a):hover]:bg-destructive/5 dark:[&>[data-slot=message-bubble-content]:is(button,a):hover]:bg-destructive/10',
			ghost       : 'border-none *:data-[slot=message-bubble-content]:rounded-none *:data-[slot=message-bubble-content]:bg-transparent *:data-[slot=message-bubble-content]:p-0 *:data-[slot=message-bubble-content]:text-xs [&>[data-slot=message-bubble-content]:is(button,a):hover]:bg-mute [&>[data-slot=message-bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=message-bubble-content]:is(button,a):hover]:bg-mute/50',
		},
	},
	defaultVariants : {
		variant : 'primary',
	},
})

export const MessageBubbleReactionCVA = cva('absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-mute px-1.5 py-1 text-xs ring-3 ring-card has-[button]:p-0', {
	variants : {
		side : {
			top    : 'top-0 -translate-y-3/4',
			bottom : 'bottom-0 translate-y-3/4',
		},
		align : {
			start : 'inset-s-3',
			end   : 'inset-e-3',
		},
	},
	defaultVariants : {
		side  : 'bottom',
		align : 'end',
	},
})

export function MessageBubble({ align = 'start', className, render, variant = 'primary', ...property }: Component.MessageBubble): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn(MessageBubbleCVA({ variant }), className) }, property), render : render, state : { align : align, slot : 'message-bubble', variant : variant } })
}

export function MessageBubbleGroup({ className, render, ...property }: Component.MessageBubbleGroup): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex min-w-0 flex-col gap-2', className) }, property), render : render, state : { slot : 'message-bubble-group' } })
}

export function MessageBubbleContent({ className, render, ...property }: Component.MessageBubbleContent): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('w-fit max-w-full min-w-0 overflow-hidden rounded-xl border border-transparent px-3 py-1.5 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-start [button,a]:transition-none [button,a]:duration-250 [button,a]:outline-none [button,a]:hover:transition-colors [button,a]:focus-visible:ring-2 [button,a]:focus-visible:ring-halo/50 [button,a]:focus-visible:transition-colors', className) }, property), render : render, state : { slot : 'message-bubble-content' } })
}

export function MessageBubbleReaction({ align = 'end', className, render, side = 'bottom', ...property }: Component.MessageBubbleReaction): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn(MessageBubbleReactionCVA({ align, side }), className) }, property), render : render, state : { align : align, side : side, slot : 'message-bubble-reaction' } })
}
