'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/card/types'

import { mergeProps, useRender } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function Card({ className, render, size = 'md', ...property }: Component.Card): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl', className) }, property), render : render, state : { size : size, slot : 'card' } })
}

export function CardHeader({ className, render, ...property }: Component.CardHeader): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('group/card-header @container/card-header grid auto-rows-min items-start gap-0.75 rounded-t-xl px-(--card-spacing) text-sm has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)', className) }, property), render : render, state : { slot : 'card-header' } })
}

export function CardTitle({ className, render, ...property }: Component.CardTitle): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm', className) }, property), render : render, state : { slot : 'card-title' } })
}

export function CardDescription({ className, render, ...property }: Component.CardDescription): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('text-xs text-mute-foreground', className) }, property), render : render, state : { slot : 'card-description' } })
}

export function CardAction({ className, render, ...property }: Component.CardAction): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className) }, property), render : render, state : { slot : 'card-action' } })
}

export function CardContent({ className, render, ...property }: Component.CardContent): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('px-(--card-spacing)', className) }, property), render : render, state : { slot : 'card-content' } })
}

export function CardFooter({ className, render, ...property }: Component.CardFooter): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('mt-auto flex items-center rounded-b-xl border-t bg-mute/65 p-(--card-spacing) dark:bg-neutral-950/50', className) }, property), render : render, state : { slot : 'card-footer' } })
}
