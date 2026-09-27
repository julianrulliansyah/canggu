'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/empty/types'

import { mergeProps, useRender } from '@base-ui/react'
import { cva }                   from 'class-variance-authority'

import { cn } from '@/utilities/class'

export function Empty({ className, render, ...property }: Component.Empty): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl p-6 text-center text-balance', className) }, property), render : render, state : { slot : 'empty' } })
}

export function EmptyHeader({ className, render, ...property }: Component.EmptyHeader): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex max-w-sm flex-col items-center gap-2', className) }, property), render : render, state : { slot : 'empty-header' } })
}

export const EmptyMediaCVA = cva('mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0', {
	variants : {
		variant : {
			base : 'bg-transparent',
			icon : 'flex size-8 shrink-0 items-center justify-center rounded-lg bg-mute text-foreground [&_svg:not([class*="size-"])]:size-4',
		},
	},
	defaultVariants : {
		variant : 'base',
	},
})

export function EmptyMedia({ className, render, variant = 'base', ...property }: Component.EmptyMedia): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn(EmptyMediaCVA({ className, variant })) }, property), render : render, state : { slot : 'empty-media', variant : variant } })
}

export function EmptyTitle({ className, render, ...property }: Component.EmptyTitle): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('font-heading text-sm leading-snug font-medium', className) }, property), render : render, state : { slot : 'empty-title' } })
}

export function EmptyDescription({ className, render, ...property }: Component.EmptyDescription): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('text-sm/relaxed text-mute-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary', className) }, property), render : render, state : { slot : 'empty-description' } })
}

export function EmptyContent({ className, render, ...property }: Component.EmptyContent): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm text-balance', className) }, property), render : render, state : { slot : 'empty-content' } })
}
