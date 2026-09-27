'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/menu/context/types'

import { ContextMenu, mergeProps, useRender } from '@base-ui/react'
import { Check, ChevronRight }                from 'lucide-react'

import { cn } from '@/utilities/class'

export function MenuContext(property: Component.MenuContext): JSX.Element {
	return <ContextMenu.Root {...property} />
}

export function MenuContextPortal(property: Component.MenuContextPortal): JSX.Element {
	return <ContextMenu.Portal data-slot={'menu-context-portal'} {...property} />
}

export function MenuContextTrigger({ className, ...property }: Component.MenuContextTrigger): JSX.Element {
	return <ContextMenu.Trigger data-slot={'menu-context-trigger'} className={cn('select-none', className)} {...property} />
}

export function MenuContextPopup({ align, alignOffset = 4, className, side = 'right', sideOffset, ...property }: Component.MenuContextPopup): JSX.Element {
	return (
		<ContextMenu.Portal>
			<ContextMenu.Positioner align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} className={'isolate z-50 outline-none'}>
				<ContextMenu.Popup data-slot={'menu-context-popup'} className={cn('relative z-50 max-h-(--available-height) min-w-32 origin-(--transform-origin) animate-none! overflow-x-hidden overflow-y-auto rounded-lg bg-popover/70 p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95', className)} {...property} />
			</ContextMenu.Positioner>
		</ContextMenu.Portal>
	)
}

export function MenuContextGroup(property: Component.MenuContextGroup): JSX.Element {
	return <ContextMenu.Group data-slot={'menu-context-group'} {...property} />
}

export function MenuContextGroupLabel({ className, inset, ...property }: Component.MenuContextGroupLabel): JSX.Element {
	return <ContextMenu.GroupLabel data-slot={'menu-context-group-label'} data-inset={inset} className={cn('px-1.5 py-1 text-xs font-medium text-mute-foreground data-inset:ps-7', className)} {...property} />
}

export function MenuContextItem({ className, inset, variant = 'base', ...property }: Component.MenuContextItem): JSX.Element {
	return <ContextMenu.Item data-slot={'menu-context-item'} data-inset={inset} data-variant={variant} className={cn('group/menu-context-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:ps-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive', className)} {...property} />
}

export function MenuContextSubmenu(property: Component.MenuContextSubmenu): JSX.Element {
	return <ContextMenu.SubmenuRoot {...property} />
}

export function MenuContextSubmenuTrigger({ children, className, inset, ...property }: Component.MenuContextSubmenuTrigger): JSX.Element {
	return (
		<ContextMenu.SubmenuTrigger data-slot={'menu-context-submenu-trigger'} data-inset={inset} className={cn('flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:ps-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4', className)} {...property}>
			{children} <ChevronRight className={'ms-auto rtl:rotate-180'} />
		</ContextMenu.SubmenuTrigger>
	)
}

export function MenuContextSubmenuPopup({ align, alignOffset = 4, className, side = 'right', sideOffset, ...property }: Component.MenuContextSubmenuPopup): JSX.Element {
	return (
		<ContextMenu.Portal>
			<ContextMenu.Positioner align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} className={'isolate z-50 outline-none'}>
				<ContextMenu.Popup data-slot={'menu-context-submenu-popup'} className={cn('relative z-50 max-h-(--available-height) min-w-32 origin-(--transform-origin) animate-none! overflow-x-hidden overflow-y-auto rounded-lg bg-popover/70 p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95', 'w-auto min-w-24 shadow-lg', className)} {...property} />
			</ContextMenu.Positioner>
		</ContextMenu.Portal>
	)
}

export function MenuContextCheckboxItem({ children, className, inset, ...property }: Component.MenuContextCheckboxItem): JSX.Element {
	return (
		<ContextMenu.CheckboxItem data-slot={'menu-context-checkbox-item'} data-inset={inset} className={cn('relative flex cursor-default items-center gap-1.5 rounded-md py-1 ps-1.5 pe-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:ps-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4', className)} {...property}>
			<ContextMenu.CheckboxItemIndicator data-slot={'menu-context-checkbox-item-indicator'} className={'pointer-events-none absolute inset-e-2 flex items-center justify-center'}>
				<Check />
			</ContextMenu.CheckboxItemIndicator>

			{children}
		</ContextMenu.CheckboxItem>
	)
}

export function MenuContextRadioGroup(property: Component.MenuContextRadioGroup): JSX.Element {
	return <ContextMenu.RadioGroup data-slot={'menu-context-radio-group'} {...property} />
}

export function MenuContextRadioItem({ children, className, inset, ...property }: Component.MenuContextRadioItem): JSX.Element {
	return (
		<ContextMenu.RadioItem data-slot={'menu-context-radio-item'} data-inset={inset} className={cn('relative flex cursor-default items-center gap-1.5 rounded-md py-1 ps-1.5 pe-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:ps-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4', className)} {...property}>
			<ContextMenu.RadioItemIndicator data-slot={'menu-context-radio-item-indicator'} className={'pointer-events-none absolute inset-e-2 flex items-center justify-center'}>
				<Check />
			</ContextMenu.RadioItemIndicator>
			
			{children}
		</ContextMenu.RadioItem>
	)
}

export function MenuContextSeparator({ className, ...property }: Component.MenuContextSeparator): JSX.Element {
	return <ContextMenu.Separator data-slot={'menu-context-separator'} className={cn('-mx-1 my-1 h-px bg-edge', className)} {...property} />
}

export function MenuContextShortcut({ className, render, ...property }: Component.MenuContextShortcut): JSX.Element {
	return useRender({ defaultTagName : 'span', props : mergeProps<'span'>({ className : cn('ms-auto text-xs tracking-widest text-mute-foreground group-focus/menu-context-item:text-accent-foreground', className) }, property), render : render, state : { slot : 'menu-context-shortcut' } })
}
