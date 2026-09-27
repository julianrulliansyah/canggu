'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/marker/types'

import { mergeProps, useRender } from '@base-ui/react'
import { cva }                   from 'class-variance-authority'

import { cn } from '@/utilities/class'

export const MarkerCVA = cva('group/marker relative flex min-h-4 w-full items-center gap-2 text-start text-sm text-mute-foreground [&_svg:not([class*="size-"])]:size-4 [a]:underline [a]:underline-offset-3 [a]:hover:text-foreground', {
	variants : {
		variant : {
			base      : '',
			separator : 'before:me-1 before:h-px before:min-w-0 before:flex-1 before:bg-edge after:ms-1 after:h-px after:min-w-0 after:flex-1 after:bg-edge',
			border    : 'border-b border-edge pb-2',
		},
	},
	defaultVariants : {
		variant : 'base',
	},
})

export function Marker({ className, render, variant = 'base', ...property }: Component.Marker): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn(MarkerCVA({ className, variant })) }, property), render : render, state : { slot : 'marker', variant : variant } })
}

export function MarkerContent({ className, render, ...property }: Component.MarkerContent): JSX.Element {
	return useRender({ defaultTagName : 'span', props : mergeProps<'span'>({ className : cn('min-w-0 wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground', className) }, property), render : render, state : { slot : 'marker-content' } })
}

export function MarkerIcon({ className, render, ...property }: Component.MarkerIcon): JSX.Element {
	return useRender({ defaultTagName : 'span', props : mergeProps<'span'>({ 'aria-hidden' : true, className : cn('size-4 shrink-0 [&_svg:not([class*="size-"])]:size-4', className) }, property), render : render, state : { slot : 'marker-icon' } })
}
