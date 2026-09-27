'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/popover/types'

import { mergeProps, Popover as PopoverPrimitive, useRender } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function Popover(property: Component.Popover): JSX.Element {
	return <PopoverPrimitive.Root {...property} />
}

export function PopoverTrigger(property: Component.PopoverTrigger): JSX.Element {
	return <PopoverPrimitive.Trigger data-slot={'popover-trigger'} {...property} />
}

export function PopoverHeader({ className, render, ...property }: Component.PopoverHeader): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex flex-col gap-0.75 text-sm', className) }, property), render : render, state : { slot : 'popover-header' } })
}

export function PopoverTitle({ className, ...property }: Component.PopoverTitle): JSX.Element {
	return <PopoverPrimitive.Title data-slot={'popover-title'} className={cn('font-heading text-sm leading-snug font-medium', className)} {...property} />
}

export function PopoverDescription({ className, ...property }: Component.PopoverDescription): JSX.Element {
	return <PopoverPrimitive.Description data-slot={'popover-description'} className={cn('text-xs text-mute-foreground', className)} {...property} />
}

export function PopoverPopup({ align, alignOffset, className, side, sideOffset = 4, ...property }: Component.PopoverPopup): JSX.Element {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Positioner align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} className={'isolate z-50'}>
				<PopoverPrimitive.Popup data-slot={'popover-popup'} className={cn('z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95', className)} {...property} />
			</PopoverPrimitive.Positioner>
		</PopoverPrimitive.Portal>
	)
}
