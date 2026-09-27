'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/menu/types'

import { Menu as MenuPrimitive, mergeProps, useRender } from '@base-ui/react'
import { Check, ChevronRight }                          from 'lucide-react'

import { cn } from '@/utilities/class'

export function Menu(property: Component.Menu): JSX.Element {
	return <MenuPrimitive.Root {...property} />
}

export function MenuPortal(property: Component.MenuPortal): JSX.Element {
	return <MenuPrimitive.Portal data-slot={'menu-portal'} {...property} />
}

export function MenuTrigger(property: Component.MenuTrigger): JSX.Element {
	return <MenuPrimitive.Trigger data-slot={'menu-trigger'} {...property} />
}

export function MenuPopup({ align = 'start', alignOffset, className, side, sideOffset = 4, ...property }: Component.MenuPopup): JSX.Element {
	return (
		<MenuPrimitive.Portal>
			<MenuPrimitive.Positioner align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} className={'isolate z-50 outline-none'}>
				<MenuPrimitive.Popup data-slot={'menu-popup'} className={cn('relative z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) animate-none! overflow-x-hidden overflow-y-auto rounded-lg bg-popover/70 p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95', className)} {...property} />
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	)
}

export function MenuGroup(property: Component.MenuGroup): JSX.Element {
	return <MenuPrimitive.Group data-slot={'menu-group'} {...property} />
}

export function MenuGroupLabel({ className, inset, ...property }: Component.MenuGroupLabel): JSX.Element {
	return <MenuPrimitive.GroupLabel data-slot={'menu-group-label'} data-inset={inset} className={cn('px-1.5 py-1 text-xs font-medium text-mute-foreground data-inset:ps-7', className)} {...property} />
}

export function MenuItem({ className, inset, variant = 'base', ...property }: Component.MenuItem): JSX.Element {
	return <MenuPrimitive.Item data-slot={'menu-item'} data-inset={inset} data-variant={variant} className={cn('group/menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:ps-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive', className)} {...property} />
}

export function MenuSubmenu(property: Component.MenuSubmenu): JSX.Element {
	return <MenuPrimitive.SubmenuRoot {...property} />
}

export function MenuSubmenuTrigger({ children, className, inset, ...property }: Component.MenuSubmenuTrigger): JSX.Element {
	return (
		<MenuPrimitive.SubmenuTrigger data-slot={'menu-submenu-trigger'} data-inset={inset} className={cn('flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:ps-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4', className)} {...property}>
			{children} <ChevronRight className={'ms-auto rtl:rotate-180'} />
		</MenuPrimitive.SubmenuTrigger>
	)
}

export function MenuSubmenuPopup({ align = 'start', alignOffset = -3, className, side = 'right', sideOffset, ...property }: Component.MenuSubmenuPopup): JSX.Element {
	return (
		<MenuPrimitive.Portal>
			<MenuPrimitive.Positioner align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} className={'isolate z-50 outline-none'}>
				<MenuPrimitive.Popup data-slot={'menu-submenu-popup'} className={cn('relative z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) animate-none! overflow-x-hidden overflow-y-auto rounded-lg bg-popover/70 p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95', 'w-auto min-w-24 shadow-lg', className)} {...property} />
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	)
}

export function MenuCheckboxItem({ children, className, inset, ...property }: Component.MenuCheckboxItem): JSX.Element {
	return (
		<MenuPrimitive.CheckboxItem data-slot={'menu-checkbox-item'} data-inset={inset} className={cn('relative flex cursor-default items-center gap-1.5 rounded-md py-1 ps-1.5 pe-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:ps-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4', className)} {...property}>
			<MenuPrimitive.CheckboxItemIndicator data-slot={'menu-checkbox-item-indicator'} className={'pointer-events-none absolute inset-e-2 flex items-center justify-center'}>
				<Check />
			</MenuPrimitive.CheckboxItemIndicator>

			{children}
		</MenuPrimitive.CheckboxItem>
	)
}

export function MenuRadioGroup(property: Component.MenuRadioGroup): JSX.Element {
	return <MenuPrimitive.RadioGroup data-slot={'menu-radio-group'} {...property} />
}

export function MenuRadioItem({ children, className, inset, ...property }: Component.MenuRadioItem): JSX.Element {
	return (
		<MenuPrimitive.RadioItem data-slot={'menu-radio-item'} data-inset={inset} className={cn('relative flex cursor-default items-center gap-1.5 rounded-md py-1 ps-1.5 pe-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:ps-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4', className)} {...property}>
			<MenuPrimitive.RadioItemIndicator data-slot={'menu-radio-item-indicator'} className={'pointer-events-none absolute inset-e-2 flex items-center justify-center'}>
				<Check />
			</MenuPrimitive.RadioItemIndicator>
			
			{children}
		</MenuPrimitive.RadioItem>
	)
}

export function MenuSeparator({ className, ...property }: Component.MenuSeparator): JSX.Element {
	return <MenuPrimitive.Separator data-slot={'menu-separator'} className={cn('-mx-1 my-1 h-px bg-edge', className)} {...property} />
}

export function MenuShortcut({ className, render, ...property }: Component.MenuShortcut): JSX.Element {
	return useRender({ defaultTagName : 'span', props : mergeProps<'span'>({ className : cn('ms-auto text-xs tracking-widest text-mute-foreground group-focus/menu-item:text-accent-foreground', className) }, property), render : render, state : { slot : 'menu-shortcut' } })
}
