'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/spinner/types'

import { mergeProps, useRender } from '@base-ui/react'
import { Loader2 }               from 'lucide-react'

import { cn } from '@/utilities/class'

export function Spinner({ className, render = <Loader2 />, ...property }: Component.Spinner): JSX.Element {
	return useRender({ defaultTagName : 'svg', props : mergeProps<'svg'>({ 'aria-label' : 'Loading', className : cn('size-4 animate-spin', className), role : 'status' }, property), render : render, state : { slot : 'spinner' } })
}
