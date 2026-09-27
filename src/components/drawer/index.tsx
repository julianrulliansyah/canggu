'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/drawer/types'

import { createContext, use, useMemo } from 'react'

import { Drawer as DrawerPrimitive, mergeProps, useRender } from '@base-ui/react'

import { cn } from '@/utilities/class'

const DrawerContext = createContext<Component.DrawerValue>({ direction : 'down', grip : false, modal : true, snap : false })

export function Drawer({ grip = false, modal = true, snapPoints, swipeDirection = 'down', ...property }: Component.Drawer): JSX.Element {
	const snap  = !(snapPoints === undefined) && snapPoints.length > 0
	const value = useMemo((): Component.DrawerValue => ({ direction : swipeDirection, grip : grip, modal : modal, snap : snap }), [ grip, modal, snap, swipeDirection ])

	return (
		<DrawerContext value={value}>
			<DrawerPrimitive.Root modal={modal} snapPoints={snapPoints} swipeDirection={swipeDirection} {...property} />
		</DrawerContext>
	)
}

export function DrawerTrigger(property: Component.DrawerTrigger): JSX.Element {
	return <DrawerPrimitive.Trigger data-slot={'drawer-trigger'} {...property} />
}

export function DrawerPortal(property: Component.DrawerPortal): JSX.Element {
	return <DrawerPrimitive.Portal data-slot={'drawer-portal'} {...property} />
}

export function DrawerClose(property: Component.DrawerClose): JSX.Element {
	return <DrawerPrimitive.Close data-slot={'drawer-close'} {...property} />
}

export function DrawerBackdrop({ className, ...property }: Component.DrawerBackdrop): JSX.Element {
	return <DrawerPrimitive.Backdrop data-slot={'drawer-backdrop'} className={cn('fixed inset-0 z-50 min-h-dvh bg-black/10 opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] select-none data-ending-style:pointer-events-none data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-snap-points:[--drawer-overlay-min-opacity:0.5] data-starting-style:opacity-0 data-swiping:duration-0 supports-backdrop-filter:backdrop-blur-xs supports-[-webkit-touch-callout:none]:absolute', className)} {...property} />
}

export function DrawerGrip({ className, render, ...property }: Component.DrawerGrip): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ 'aria-hidden' : true, className : cn('relative z-10 flex shrink-0 cursor-grab transition-opacity duration-200 group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-[swipe-axis=x]/drawer-popup:h-full group-data-[swipe-axis=x]/drawer-popup:w-3 group-data-[swipe-axis=x]/drawer-popup:items-center group-data-[swipe-axis=y]/drawer-popup:h-3 group-data-[swipe-axis=y]/drawer-popup:w-full group-data-[swipe-axis=y]/drawer-popup:justify-center group-data-[swipe-direction=down]/drawer-popup:items-end group-data-[swipe-direction=left]/drawer-popup:order-last group-data-[swipe-direction=left]/drawer-popup:justify-start group-data-[swipe-direction=right]/drawer-popup:justify-end group-data-[swipe-direction=up]/drawer-popup:order-last group-data-[swipe-direction=up]/drawer-popup:items-start after:block after:shrink-0 after:rounded-full after:bg-mute group-data-[swipe-axis=x]/drawer-popup:after:h-24 group-data-[swipe-axis=x]/drawer-popup:after:w-1 group-data-[swipe-axis=y]/drawer-popup:after:h-1 group-data-[swipe-axis=y]/drawer-popup:after:w-24 active:cursor-grabbing', className) }, property), render : render, state : { slot : 'drawer-grip' } })
}

export function DrawerHeader({ className, render, ...property }: Component.DrawerHeader): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex shrink-0 flex-col gap-0.75 p-4 pb-0 text-sm group-data-[swipe-axis=y]/drawer-popup:text-center', 'md:text-start', className) }, property), render : render, state : { slot : 'drawer-header' } })
}

export function DrawerTitle({ className, ...property }: Component.DrawerTitle): JSX.Element {
	return <DrawerPrimitive.Title data-slot={'drawer-title'} className={cn('font-heading text-base leading-snug font-medium text-foreground', className)} {...property} />
}

export function DrawerDescription({ className, ...property }: Component.DrawerDescription): JSX.Element {
	return <DrawerPrimitive.Description data-slot={'drawer-description'} className={cn('text-xs text-mute-foreground', className)} {...property} />
}

export function DrawerPopup({ children, className, ...property }: Component.DrawerPopup): JSX.Element {
	const { direction, grip, modal, snap } = use(DrawerContext)
	
	return (
		<DrawerPortal>
			{modal === true && <DrawerBackdrop data-snap-points={snap ? '' : undefined} />}
			
			<DrawerPrimitive.Viewport data-slot={'drawer-viewport'} data-modal={modal} className={'pointer-events-none fixed inset-0 z-50 select-none data-[modal=true]:pointer-events-auto'}>
				<DrawerPrimitive.Popup data-slot={'drawer-popup'} data-swipe-axis={direction === 'down' || direction === 'up' ? 'y' : 'x'} data-snap-points={snap ? '' : undefined} className={cn('group/drawer-popup pointer-events-auto fixed z-50 m-(--drawer-inset,0rem) flex h-(--drawer-content-height) max-h-(--drawer-content-max-height,none) min-h-0 w-(--drawer-content-width,auto) transform-[translate3d(var(--translate-x,0rem),var(--translate-y,0rem),0)_scale(var(--stack-scale))] flex-col bg-popover text-sm text-popover-foreground transition-[transform,height,opacity,filter] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform outline-none select-none [--bleed:3rem] [--drawer-content-height:var(--drawer-height,auto)] [--peek:1rem] [--stack-height:var(--drawer-frontmost-height,var(--drawer-height,0rem))] [--stack-peek-offset:max(0rem,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-scale-base:max(0,calc(1-(var(--nested-drawers)*var(--stack-step))))] [--stack-scale:clamp(0,calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--stack-shrink:calc(1-var(--stack-scale))] [--stack-step:0.05] [interpolate-size:allow-keywords] after:pointer-events-none after:absolute after:bg-(--drawer-bleed-background,var(--canggu-color-popover)) data-ending-style:transform-(--closed-transform) data-ending-style:opacity-[0.9999] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-nested-drawer-open:overflow-hidden data-nested-drawer-open:brightness-95 data-nested-drawer-swiping:duration-0 data-ending-style:data-nested-drawer-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:transform-(--closed-transform) data-swiping:duration-0 data-ending-style:data-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[swipe-axis=x]:inset-y-0 data-[swipe-axis=x]:flex-row data-[swipe-axis=x]:[--drawer-content-width:75%] data-[swipe-axis=x]:after:inset-y-0 data-[swipe-axis=x]:after:w-(--bleed) data-[swipe-axis=y]:inset-x-0 data-[swipe-axis=y]:[--drawer-content-max-height:calc(100dvh-6rem)] data-[swipe-axis=y]:after:inset-x-0 data-[swipe-axis=y]:after:h-(--bleed) data-[swipe-axis=y]:data-nested-drawer-open:h-(--stack-height) data-[swipe-axis=y]:data-snap-points:[--drawer-content-height:100dvh] data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:origin-bottom data-[swipe-direction=down]:rounded-t-xl data-[swipe-direction=down]:border-t data-[swipe-direction=down]:[--closed-transform:translate3d(0,calc(100%+var(--drawer-inset,0rem)+0.125rem),0)] data-[swipe-direction=down]:[--translate-y:calc(var(--drawer-snap-point-offset,0rem)+var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height)))] data-[swipe-direction=down]:after:top-full data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:origin-left data-[swipe-direction=left]:rounded-r-xl data-[swipe-direction=left]:border-r data-[swipe-direction=left]:[--closed-transform:translate3d(calc(-100%-var(--drawer-inset,0rem)-0.125rem),0,0)] data-[swipe-direction=left]:[--translate-x:calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)+(var(--stack-shrink)*100%))] data-[swipe-direction=left]:after:right-full data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:origin-right data-[swipe-direction=right]:rounded-l-xl data-[swipe-direction=right]:border-l data-[swipe-direction=right]:[--closed-transform:translate3d(calc(100%+var(--drawer-inset,0rem)+0.125rem),0,0)] data-[swipe-direction=right]:[--translate-x:calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)-(var(--stack-shrink)*100%))] data-[swipe-direction=right]:after:left-full data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:origin-top data-[swipe-direction=up]:rounded-b-xl data-[swipe-direction=up]:border-b data-[swipe-direction=up]:[--closed-transform:translate3d(0,calc(-100%-var(--drawer-inset,0rem)-0.125rem),0)] data-[swipe-direction=up]:[--translate-y:calc(var(--drawer-snap-point-offset,0rem)+var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--stack-shrink)*var(--stack-height)))] data-[swipe-direction=up]:after:bottom-full', 'sm:data-[swipe-axis=x]:[--drawer-content-width:24rem]', className)} {...property}>
					{grip && <DrawerGrip />}

					<DrawerPrimitive.Content data-slot={'drawer-content'} className={'flex min-h-0 flex-1 flex-col overflow-hidden overscroll-contain rounded-[inherit] transition-opacity duration-300 ease-[cubic-bezier(0.45,1.005,0,1.005)] select-text group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-swiping/drawer-popup:select-none'}>
						{children}
					</DrawerPrimitive.Content>
				</DrawerPrimitive.Popup>
			</DrawerPrimitive.Viewport>
		</DrawerPortal>
	)
}

export function DrawerFooter({ className, render, ...property }: Component.DrawerFooter): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('mt-auto flex shrink-0 flex-col gap-2 p-4', className) }, property), render : render, state : { slot : 'drawer-footer' } })
}
