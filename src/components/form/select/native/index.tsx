'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/form/select/native/types'

import { mergeProps, useRender } from '@base-ui/react'
import { cva }                   from 'class-variance-authority'
import { ChevronDownIcon }       from 'lucide-react'

import { cn } from '@/utilities/class'

export const FormSelectNativeCVA = cva('w-full min-w-0 appearance-none rounded-lg border border-haze bg-transparent py-1 ps-2.5 pe-8 transition-none duration-250 outline-none select-none selection:bg-primary selection:text-primary-foreground placeholder:text-mute-foreground focus-visible:border-haze focus-visible:ring-2 focus-visible:ring-halo/50 focus-visible:transition-colors disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 aria-invalid:transition-colors dark:bg-haze/30 dark:hover:bg-haze/50 dark:hover:transition-colors dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40', {
	variants : {
		size : {
			md : [ 'h-control-md', 'md:text-sm' ],
			sm : [ 'h-control-sm rounded-[min(var(--radius-md),0.625rem)] py-0.5', 'md:text-sm' ],
		},
	},
	defaultVariants : {
		size : 'md',
	},
})

export function FormSelectNative({ className, render, size = 'md', ...property }: Component.FormSelectNative): JSX.Element {
	const Select = useRender({ defaultTagName : 'select', props : mergeProps<'select'>({ className : FormSelectNativeCVA({ size }) }, property), render : render, state : { size : size, slot : 'select-native' } })

	return useRender({ defaultTagName : 'div', props : { children : <>{Select}<ChevronDownIcon data-slot={'select-native-icon'} aria-hidden={'true'} className={'pointer-events-none absolute inset-e-2.5 top-1/2 size-4 -translate-y-1/2 text-mute-foreground select-none'} /></>, className : cn('group/select-native relative w-fit in-data-[slot=field]:w-full has-[select:disabled]:opacity-50', className) }, state : { size : size, slot : 'select-native-shell' } })
}

export function FormSelectNativeOption({ className, render, ...property }: Component.FormSelectNativeOption): JSX.Element {
	return useRender({ defaultTagName : 'option', props : mergeProps<'option'>({ className : cn('bg-[Canvas]', 'text-[CanvasText]', className) }, property), render : render, state : { slot : 'select-native-option' } })
}

export function FormSelectNativeGroup({ className, render, ...property }: Component.FormSelectNativeGroup): JSX.Element {
	return useRender({ defaultTagName : 'optgroup', props : mergeProps<'optgroup'>({ className : cn('bg-[Canvas]', 'text-[CanvasText]', className) }, property), render : render, state : { slot : 'select-native-group' } })
}
