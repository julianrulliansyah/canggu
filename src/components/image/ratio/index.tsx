'use client'

import type { CSSProperties, JSX } from 'react'
import type * as Component         from '@/components/image/ratio/types'

import { mergeProps, useRender } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function ImageRatio({ className, ratio, render, style, ...property }: Component.ImageRatio): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('relative aspect-(--ratio)', className), style : { ...style, '--ratio' : ratio } as CSSProperties }, property), render : render, state : { slot : 'image-ratio' } })
}
