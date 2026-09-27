'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/form/textarea/types'

import { mergeProps, useRender } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function FormTextarea({ className, render, ...property }: Component.FormTextarea): JSX.Element {
	return useRender({ defaultTagName : 'textarea', props : mergeProps<'textarea'>({ className : cn('flex field-sizing-content min-h-textarea w-full rounded-lg border border-haze bg-transparent px-2.5 py-2 text-base transition-none duration-250 outline-none placeholder:text-mute-foreground focus-visible:border-haze focus-visible:ring-2 focus-visible:ring-halo/50 focus-visible:transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-haze/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 aria-invalid:transition-colors dark:bg-haze/30 dark:disabled:bg-haze/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40', 'md:text-sm', className) }, property), render : render, state : { slot : 'textarea' } })
}
