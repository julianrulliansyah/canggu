'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/pagination/types'

import { mergeProps, useRender }                     from '@base-ui/react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

import { ButtonCVA } from '@/components/button'
import { cn }        from '@/utilities/class'

export function Pagination({ className, render, ...property }: Component.Pagination): JSX.Element {
	return useRender({ defaultTagName : 'nav', props : mergeProps<'nav'>({ 'aria-label' : 'pagination', className : cn('mx-auto flex w-full justify-center', className), role : 'navigation' }, property), render : render, state : { slot : 'pagination' } })
}

export function PaginationContent({ className, render, ...property }: Component.PaginationContent): JSX.Element {
	return useRender({ defaultTagName : 'ul', props : mergeProps<'ul'>({ className : cn('flex items-center gap-0.5', className) }, property), render : render, state : { slot : 'pagination-content' } })
}

export function PaginationItem({ render, ...property }: Component.PaginationItem): JSX.Element {
	return useRender({ defaultTagName : 'li', props : property, render : render, state : { slot : 'pagination-item' } })
}

export function PaginationLink({ active = false, className, icon = true, render, size = 'md', ...property }: Component.PaginationLink): JSX.Element {
	return useRender({ defaultTagName : 'a', props : mergeProps<'a'>({ 'aria-current' : active ? 'page' : undefined, className : cn(ButtonCVA({ className, icon, size, variant : active ? 'outline' : 'ghost' })) }, property), render : render, state : { active : active, slot : 'pagination-link' } })
}

export function PaginationNext({ className, render, text = 'Next', ...property }: Component.PaginationNext): JSX.Element {
	const label = useRender({ defaultTagName : 'span', props : { children : text, className : cn('hidden', 'sm:block') } })

	return useRender({ defaultTagName : 'a', props : mergeProps<'a'>({ 'aria-label' : 'Go to next page', children : <>{label}<ChevronRight data-icon={'inline-end'} className={'rtl:rotate-180'} /></>, className : cn(ButtonCVA({ icon : false, size : 'md', variant : 'ghost' }), 'pe-1.5!', className) }, property), render : render, state : { slot : 'pagination-link' } })
}

export function PaginationPrevious({ className, render, text = 'Previous', ...property }: Component.PaginationPrevious): JSX.Element {
	const label = useRender({ defaultTagName : 'span', props : { children : text, className : cn('hidden', 'sm:block') } })

	return useRender({ defaultTagName : 'a', props : mergeProps<'a'>({ 'aria-label' : 'Go to previous page', children : <><ChevronLeft data-icon={'inline-start'} className={'rtl:rotate-180'} />{label}</>, className : cn(ButtonCVA({ icon : false, size : 'md', variant : 'ghost' }), 'ps-1.5!', className) }, property), render : render, state : { slot : 'pagination-link' } })
}

export function PaginationEllipsis({ className, render, ...property }: Component.PaginationEllipsis): JSX.Element {
	return useRender({ defaultTagName : 'span', props : mergeProps<'span'>({ 'aria-hidden' : true, children : <MoreHorizontal />, className : cn('flex size-control-md items-center justify-center [&_svg:not([class*="size-"])]:size-4', className) }, property), render : render, state : { slot : 'pagination-ellipsis' } })
}
