import type { JSX }        from 'react'
import type * as Component from '@/components/tooltip/types'

import { Tooltip as TooltipPrimitive } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function Tooltip(property: Component.Tooltip): JSX.Element {
	return <TooltipPrimitive.Root {...property} />
}

export function TooltipProvider({ delay = 0, ...property }: Component.TooltipProvider): JSX.Element {
	return <TooltipPrimitive.Provider delay={delay} {...property} />
}

export function TooltipTrigger(property: Component.TooltipTrigger): JSX.Element {
	return <TooltipPrimitive.Trigger data-slot={'tooltip-trigger'} {...property} />
}

export function TooltipPopup({ align, alignOffset, children, className, side, sideOffset = 4, ...property }: Component.TooltipPopup): JSX.Element {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Positioner align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} className={'isolate z-50'}>
				<TooltipPrimitive.Popup data-slot={'tooltip-popup'} className={cn('z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1 rounded-full bg-foreground px-2.5 py-1.25 text-xs text-background has-data-[slot=keyboard]:pe-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=keyboard]:relative **:data-[slot=keyboard]:isolate **:data-[slot=keyboard]:z-50 **:data-[slot=keyboard]:rounded-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95', className)} {...property}>
					{children} <TooltipPrimitive.Arrow className={'z-50 size-2.5 translate-y-[calc(-50%-0.125rem)] rotate-45 rounded-[0.125rem] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:right-[-0.145rem] data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:left-[-0.145rem] data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5'} />
				</TooltipPrimitive.Popup>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	)
}
