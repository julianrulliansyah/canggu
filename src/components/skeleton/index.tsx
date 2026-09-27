'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/skeleton/types'

import { mergeProps, useRender } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function Skeleton({ className, render, ...property }: Component.Skeleton): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('animate-pulse rounded-md bg-mute', className) }, property), render : render, state : { slot : 'skeleton' } })
}
