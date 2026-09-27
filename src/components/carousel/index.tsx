'use client'

import type { JSX, KeyboardEvent } from 'react'
import type * as Component         from '@/components/carousel/types'

import { createContext, use, useCallback, useEffect, useState } from 'react'

import { mergeProps, useDirection, useRender } from '@base-ui/react'
import useEmbla                                from 'embla-carousel-react'
import { ChevronLeft, ChevronRight }           from 'lucide-react'

import { Button } from '@/components/button'
import { cn }     from '@/utilities/class'

const CarouselContext = createContext<Component.CarouselValue | null>(null)

export function useCarousel(): Component.CarouselValue {
	const context = use(CarouselContext)

	if (context === null)
		throw new Error('useCarousel must be invoked within <Carousel />')

	return context
}

export function Carousel({ className, options, orientation = 'horizontal', plugins, render, onAPI, ...property }: Component.Carousel): JSX.Element {
	const state = {
		next     : useState(false),
		previous : useState(false),
	}
	
	const [ ref, API ] = useEmbla({ ...options, axis : orientation === 'horizontal' ? 'x' : 'y', direction : useDirection() }, plugins)

	const perform = {
		on : {
			select : useCallback((instance: Component.CarouselValue['API']): void => {
				if (instance === undefined)
					return

				state.previous[1](instance.canScrollPrev())
				state.next[1](instance.canScrollNext())
			}, []),
		},
		key : {
			down : (event: KeyboardEvent<HTMLDivElement>): void => {
				if (event.key === 'ArrowLeft') {
					event.preventDefault()

					perform.scroll.previous()
				} else if (event.key === 'ArrowRight') {
					event.preventDefault()

					perform.scroll.next()
				}
			},
		},
		scroll : {
			next : useCallback((): void => {
				API?.scrollNext()
			}, [ API ]),
			previous : useCallback((): void => {
				API?.scrollPrev()
			}, [ API ]), 
		},
	}

	useEffect(() => {
		if (API === undefined || onAPI === undefined)
			return

		onAPI(API)
	}, [ API, onAPI ])

	useEffect(() => {
		if (API === undefined)
			return

		perform.on.select(API)
		
		API.on('reInit', perform.on.select)
		API.on('select', perform.on.select)

		return () => {
			API.off('select', perform.on.select)
		}
	}, [ API, perform.on.select ])

	return (
		<CarouselContext value={{ API : API, next : state.next[0], options : options, orientation : orientation, previous : state.previous[0], ref : ref, scroll : { next : perform.scroll.next, previous : perform.scroll.previous } }}>
			{useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ 'aria-roledescription' : 'carousel', className : cn('relative', className), onKeyDownCapture : perform.key.down, role : 'region' }, property), render : render, state : { slot : 'carousel' } })}
		</CarouselContext>
	)
}

export function CarouselContent({ className, ...property }: Component.CarouselContent): JSX.Element {
	const { orientation, ref } = useCarousel()

	return useRender({ defaultTagName : 'div', props : { children : useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex', orientation === 'horizontal' ? '-ms-4' : '-mt-4 flex-col', className) }, property) }), className : 'overflow-hidden', ref : ref }, state : { slot : 'carousel-content' } })
}

export function CarouselItem({ className, ...property }: Component.CarouselItem): JSX.Element {
	const { orientation } = useCarousel()

	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ 'aria-roledescription' : 'slide', className : cn('min-w-0 shrink-0 grow-0 basis-full', orientation === 'horizontal' ? 'ps-4' : 'pt-4', className), role : 'group' }, property), state : { slot : 'carousel-item' } })
}

export function CarouselNext({ className, icon = true, size = 'sm', variant = 'outline', ...property }: Component.CarouselNext): JSX.Element {
	const { next, orientation, scroll } = useCarousel()

	return (
		<Button data-slot={'carousel-next'} icon={icon} size={size} variant={variant} aria-label={'Next slide'} disabled={!next} onClick={scroll.next} className={cn('absolute touch-manipulation rounded-full', orientation === 'horizontal' ? 'inset-y-0 -inset-e-12 my-auto' : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90', className)} {...property}>
			<ChevronRight className={'rtl:rotate-180'} />
		</Button>
	)
}

export function CarouselPrevious({ className, icon = true, size = 'sm', variant = 'outline', ...property }: Component.CarouselPrevious): JSX.Element {
	const { orientation, previous, scroll } = useCarousel()

	return (
		<Button data-slot={'carousel-previous'} icon={icon} size={size} variant={variant} aria-label={'Previous slide'} disabled={!previous} onClick={scroll.previous} className={cn('absolute touch-manipulation rounded-full', orientation === 'horizontal' ? 'inset-y-0 -inset-s-12 my-auto' : '-top-12 left-1/2 -translate-x-1/2 rotate-90', className)} {...property}>
			<ChevronLeft className={'rtl:rotate-180'} />
		</Button>
	)
}
