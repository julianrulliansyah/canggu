'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/alert/types'

import { mergeProps, useRender } from '@base-ui/react'
import { cva }                   from 'class-variance-authority'

import { cn } from '@/utilities/class'

export const AlertCVA = cva('group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-start text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pe-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*="size-"])]:size-4', {
	variants : {
		variant : {
			base        : 'bg-card text-card-foreground',
			destructive : 'border-destructive/20 bg-destructive/2.5 text-destructive *:data-[slot=alert-description]:text-destructive/90 dark:bg-destructive/5 *:[svg]:text-current',
		},
	},
	defaultVariants : {
		variant : 'base',
	},
})

export function Alert({ className, render, variant = 'base', ...property }: Component.Alert): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn(AlertCVA({ variant }), className), role : 'alert' }, property), render : render, state : { slot : 'alert', variant : variant } })
}

export function AlertTitle({ className, render, ...property }: Component.AlertTitle): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('font-heading text-sm leading-snug font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground', className) }, property), render : render, state : { slot : 'alert-title' } })
}

export function AlertDescription({ className, render, ...property }: Component.AlertDescription): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('text-xs text-mute-foreground', className) }, property), render : render, state : { slot : 'alert-description' } })
}

export function AlertAction({ className, render, ...property }: Component.AlertAction): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('absolute inset-e-2 top-2', className) }, property), render : render, state : { slot : 'alert-action' } })
}
