'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/navigation/types'

import { NavigationMenu as NavigationMenuPrimitive, useRender } from '@base-ui/react'
import { cva }                                                  from 'class-variance-authority'
import { ChevronDown }                                          from 'lucide-react'

import { cn } from '@/utilities/class'

export const NavigationTriggerCVA = cva('group/navigation-trigger inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-none duration-250 outline-none hover:bg-mute hover:transition-colors focus:bg-mute focus:transition-colors focus-visible:ring-2 focus-visible:ring-halo/50 focus-visible:transition-colors disabled:pointer-events-none disabled:opacity-50 data-popup-open:bg-mute/50 data-popup-open:transition-colors data-popup-open:hover:bg-mute data-open:bg-mute/50 data-open:transition-colors data-open:hover:bg-mute data-open:focus:bg-mute')

export function Navigation({ align = 'start', children, className, ...property }: Component.Navigation): JSX.Element {
	return (
		<NavigationMenuPrimitive.Root data-slot={'navigation'} className={cn('group/navigation relative flex max-w-max flex-1 items-center justify-center', className)} {...property}>
			{children} <NavigationPopup align={align} />
		</NavigationMenuPrimitive.Root>
	)
}

export function NavigationList({ className, ...property }: Component.NavigationList): JSX.Element {
	return <NavigationMenuPrimitive.List data-slot={'navigation-list'} className={cn('group flex flex-1 list-none items-center justify-center gap-0', className)} {...property} />
}

export function NavigationItem({ className, ...property }: Component.NavigationItem): JSX.Element {
	return <NavigationMenuPrimitive.Item data-slot={'navigation-item'} className={cn('relative', className)} {...property} />
}

export function NavigationTrigger({ children, className, ...property }: Component.NavigationTrigger): JSX.Element {
	return (
		<NavigationMenuPrimitive.Trigger data-slot={'navigation-trigger'} className={cn(NavigationTriggerCVA(), className)} {...property}>
			{children} <ChevronDown aria-hidden={'true'} className={'relative top-0.25 ms-1 size-3 transition duration-300 group-data-popup-open/navigation-trigger:rotate-180 group-data-open/navigation-trigger:rotate-180'} />
		</NavigationMenuPrimitive.Trigger>
	)
}

export function NavigationContent({ className, ...property }: Component.NavigationContent): JSX.Element {
	return <NavigationMenuPrimitive.Content data-slot={'navigation-content'} className={cn('h-full w-auto p-1 transition-[opacity,transform,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[viewport=false]/navigation:rounded-lg group-data-[viewport=false]/navigation:bg-popover group-data-[viewport=false]/navigation:text-popover-foreground group-data-[viewport=false]/navigation:shadow group-data-[viewport=false]/navigation:ring-1 group-data-[viewport=false]/navigation:ring-foreground/10 group-data-[viewport=false]/navigation:duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:data-[activation-direction=left]:translate-x-[50%] data-starting-style:data-[activation-direction=left]:translate-x-[-50%] data-ending-style:data-[activation-direction=right]:translate-x-[-50%] data-starting-style:data-[activation-direction=right]:translate-x-[50%] data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out **:data-[slot=navigation-link]:focus:ring-0 **:data-[slot=navigation-link]:focus:outline-none group-data-[viewport=false]/navigation:data-open:animate-in group-data-[viewport=false]/navigation:data-open:fade-in-0 group-data-[viewport=false]/navigation:data-open:zoom-in-95 group-data-[viewport=false]/navigation:data-closed:animate-out group-data-[viewport=false]/navigation:data-closed:fade-out-0 group-data-[viewport=false]/navigation:data-closed:zoom-out-95', className)} {...property} />
}

export function NavigationPopup({ align = 'start', alignOffset, className, side, sideOffset = 8, ...property }: Component.NavigationPopup): JSX.Element {
	return (
		<NavigationMenuPrimitive.Portal>
			<NavigationMenuPrimitive.Positioner align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} className={'isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none data-[side=bottom]:before:-top-2.5 data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0'}>
				<NavigationMenuPrimitive.Popup data-slot={'navigation-popup'} className={cn('relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-lg bg-popover text-popover-foreground shadow ring-1 ring-foreground/10 transition-[opacity,transform,width,height,scale,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] outline-none data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-[ease] data-starting-style:scale-90 data-starting-style:opacity-0', className)} {...property}>
					<NavigationMenuPrimitive.Viewport data-slot={'navigation-viewport'} className={'relative size-full overflow-hidden'} />
				</NavigationMenuPrimitive.Popup>
			</NavigationMenuPrimitive.Positioner>
		</NavigationMenuPrimitive.Portal>
	)
}

export function NavigationLink({ className, ...property }: Component.NavigationLink): JSX.Element {
	return <NavigationMenuPrimitive.Link data-slot={'navigation-link'} className={cn('flex items-center gap-2 rounded-lg p-2 text-sm transition-none duration-250 outline-none hover:bg-mute hover:transition-colors focus:bg-mute focus:transition-colors focus-visible:ring-2 focus-visible:ring-halo/50 focus-visible:transition-colors in-data-[slot=navigation-content]:rounded-md data-active:bg-mute/50 data-active:transition-colors data-active:hover:bg-mute data-active:focus:bg-mute [&_svg:not([class*="size-"])]:size-4', className)} {...property} />
}

export function NavigationIcon({ className, ...property }: Component.NavigationIcon): JSX.Element {
	return (
		<NavigationMenuPrimitive.Icon data-slot={'navigation-icon'} className={cn('top-full z-1 flex h-1.5 items-end justify-center overflow-hidden', className)} {...property}>
			{useRender({ defaultTagName : 'div', props : { className : 'relative top-[60%] h-2 w-2 rotate-45 rounded-ss-sm bg-edge shadow-md' } })}
		</NavigationMenuPrimitive.Icon>
	)
}
