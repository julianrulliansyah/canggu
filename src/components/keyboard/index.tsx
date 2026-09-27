'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/keyboard/types'

import { mergeProps, useRender } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function Keyboard({ className, render, ...property }: Component.Keyboard): JSX.Element {
	return useRender({ defaultTagName : 'kbd', props : mergeProps<'kbd'>({ className : cn('pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-mute px-1 font-sans text-xs font-medium text-mute-foreground select-none in-data-[slot=tooltip-popup]:bg-background/20 in-data-[slot=tooltip-popup]:text-background dark:in-data-[slot=tooltip-popup]:bg-background/10 [&_svg:not([class*="size-"])]:size-3', className) }, property), render : render, state : { slot : 'keyboard' } })
}

export function KeyboardGroup({ className, render, ...property }: Component.Keyboard): JSX.Element {
	return useRender({ defaultTagName : 'kbd', props : mergeProps<'kbd'>({ className : cn('inline-flex items-center gap-1', className) }, property), render : render, state : { slot : 'keyboard-group' } })
}
