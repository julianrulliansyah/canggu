'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/badge/types'

import { mergeProps, useRender } from '@base-ui/react'
import { cva }                   from 'class-variance-authority'

import { cn } from '@/utilities/class'

export const BadgeCVA = cva('group/badge inline-flex h-5.75 w-fit shrink-0 items-center justify-center gap-0.75 overflow-hidden rounded-full border border-transparent text-xs font-medium whitespace-nowrap aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3.25', {
	variants : {
		count : {
			false : 'px-1.75',
			true  : 'min-w-5.75 px-1',
		},
		variant : {
			primary     : 'bg-primary text-primary-foreground',
			secondary   : 'bg-secondary text-secondary-foreground',
			outline     : 'border-edge text-foreground dark:border-haze/75',
			ghost       : 'text-foreground',
			destructive : 'bg-destructive/10 text-destructive',
		},
	},
	defaultVariants : {
		count   : false,
		variant : 'primary',
	},
})

export function Badge({ className, count = false, render, variant = 'primary', ...property }: Component.Badge): JSX.Element {
	return useRender({ defaultTagName : 'span', props : mergeProps<'span'>({ className : cn(BadgeCVA({ count, variant }), className) }, property), render : render, state : { slot : 'badge', variant : variant } })
}
