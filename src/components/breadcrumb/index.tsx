'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/breadcrumb/types'

import { mergeProps, useRender }                from '@base-ui/react'
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'

import { cn } from '@/utilities/class'

export function Breadcrumb({ render, ...property }: Component.Breadcrumb): JSX.Element {
	return useRender({ defaultTagName : 'nav', props : mergeProps<'nav'>({ 'aria-label' : 'breadcrumb' }, property), render : render, state : { slot : 'breadcrumb' } })
}

export function BreadcrumbList({ className, render, ...property }: Component.BreadcrumbList): JSX.Element {
	return useRender({ defaultTagName : 'ol', props : mergeProps<'ol'>({ className : cn('flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-mute-foreground', className) }, property), render : render, state : { slot : 'breadcrumb-list' } })
}

export function BreadcrumbItem({ className, render, ...property }: Component.BreadcrumbItem): JSX.Element {
	return useRender({ defaultTagName : 'li', props : mergeProps<'li'>({ className : cn('inline-flex items-center gap-1', className) }, property), render : render, state : { slot : 'breadcrumb-item' } })
}

export function BreadcrumbLink({ className, render, ...property }: Component.BreadcrumbLink): JSX.Element {
	return useRender({ defaultTagName : 'a', props : mergeProps<'a'>({ className : cn('transition-none duration-250 hover:text-foreground hover:transition-colors', className) }, property), render : render, state : { slot : 'breadcrumb-link' } })
}

export function BreadcrumbPage({ className, render, ...property }: Component.BreadcrumbPage): JSX.Element {
	return useRender({ defaultTagName : 'span', props : mergeProps<'span'>({ 'aria-current' : 'page', 'aria-disabled' : true, className : cn('font-normal text-foreground', className), role : 'link' }, property), render : render, state : { slot : 'breadcrumb-page' } })
}

export function BreadcrumbSeparator({ children, className, render, ...property }: Component.BreadcrumbSeparator): JSX.Element {
	return useRender({ defaultTagName : 'li', props : mergeProps<'li'>({ 'aria-hidden' : true, children : children ?? <ChevronRightIcon className={'rtl:rotate-180'} />, className : cn('[&>svg]:size-3.5', className), role : 'presentation' }, property), render : render, state : { slot : 'breadcrumb-separator' } })
}

export function BreadcrumbEllipsis({ className, render, ...property }: Component.BreadcrumbEllipsis): JSX.Element {
	return useRender({ defaultTagName : 'span', props : mergeProps<'span'>({ 'aria-hidden' : true, children : <MoreHorizontalIcon />, className : cn('flex size-5 items-center justify-center [&>svg]:size-4', className), role : 'presentation' }, property), render : render, state : { slot : 'breadcrumb-ellipsis' } })
}
