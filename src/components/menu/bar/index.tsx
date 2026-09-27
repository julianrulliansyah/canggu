import type { JSX }        from 'react'
import type * as Component from '@/components/menu/bar/types'

import { Menu as MenuPrimitive, Menubar } from '@base-ui/react'
import { Check }                          from 'lucide-react'

import { MenuGroup, MenuGroupLabel, MenuItem, MenuPopup, MenuPortal, MenuRadioGroup, MenuSeparator, MenuShortcut, MenuSubmenu, MenuSubmenuPopup, MenuSubmenuTrigger, MenuTrigger } from '@/components/menu'
import { cn }                                                                                                                                                                      from '@/utilities/class'

export function MenuBar({ className, ...property }: Component.MenuBar): JSX.Element {
	return <Menubar data-slot={'menu-bar'} className={cn('flex h-8 items-center gap-0.5 rounded-lg border p-0.75', className)} {...property} />
}

export function MenuBarGroup(property: Component.MenuBarGroup): JSX.Element {
	return <MenuGroup data-slot={'menu-bar-group'} {...property} />
}

export function MenuBarPortal(property: Component.MenuBarPortal): JSX.Element {
	return <MenuPortal data-slot={'menu-bar-portal'} {...property} />
}

export function MenuBarTrigger({ className, ...property }: Component.MenuBarTrigger): JSX.Element {
	return <MenuTrigger data-slot={'menu-bar-trigger'} className={cn('flex items-center rounded-sm px-1.5 py-0.5 text-sm font-medium outline-hidden transition-none duration-250 select-none hover:bg-mute hover:transition-colors aria-expanded:bg-mute aria-expanded:transition-colors', className)} {...property} />
}

export function MenuBarPopup({ align = 'start', alignOffset = -4, className, sideOffset = 8, ...property }: Component.MenuBarPopup): JSX.Element {
	return <MenuPopup data-slot={'menu-bar-popup'} align={align} alignOffset={alignOffset} sideOffset={sideOffset} className={cn('min-w-36', className)} {...property} />
}

export function MenuBarGroupLabel({ className, ...property }: Component.MenuBarGroupLabel): JSX.Element {
	return <MenuGroupLabel data-slot={'menu-bar-group-label'} className={cn('text-sm', className)} {...property} />
}

export function MenuBarItem({ className, ...property }: Component.MenuBarItem): JSX.Element {
	return <MenuItem data-slot={'menu-bar-item'} className={cn('group/menu-bar-item data-[variant=destructive]:*:[svg]:text-destructive!', className)} {...property} />
}

export function MenuBarCheckboxItem({ children, className, inset, ...property }: Component.MenuBarCheckboxItem): JSX.Element {
	return (
		<MenuPrimitive.CheckboxItem data-slot={'menu-bar-checkbox-item'} data-inset={inset} className={cn('relative flex cursor-default items-center gap-1.5 rounded-md py-1 ps-7 pe-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:ps-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0', className)} {...property}>
			<MenuPrimitive.CheckboxItemIndicator data-slot={'menu-bar-checkbox-item-indicator'} className={'pointer-events-none absolute inset-s-1.5 flex size-4 items-center justify-center [&_svg:not([class*="size-"])]:size-4'}>
				<Check />
			</MenuPrimitive.CheckboxItemIndicator>
			
			{children}
		</MenuPrimitive.CheckboxItem>
	)
}

export function MenuBarRadioGroup(property: Component.MenuBarRadioGroup): JSX.Element {
	return <MenuRadioGroup data-slot={'menu-bar-radio-group'} {...property} />
}

export function MenuBarRadioItem({ children, className, inset, ...property }: Component.MenuBarRadioItem): JSX.Element {
	return (
		<MenuPrimitive.RadioItem data-slot={'menu-bar-radio-item'} data-inset={inset} className={cn('relative flex cursor-default items-center gap-1.5 rounded-md py-1 ps-7 pe-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:ps-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4', className)} {...property}>
			<MenuPrimitive.RadioItemIndicator data-slot={'menu-bar-radio-item-indicator'} className={'pointer-events-none absolute inset-s-1.5 flex size-4 items-center justify-center [&_svg:not([class*="size-"])]:size-4'}>
				<Check />
			</MenuPrimitive.RadioItemIndicator>
			
			{children}
		</MenuPrimitive.RadioItem>
	)
}

export function MenuBarSeparator(property: Component.MenuBarSeparator): JSX.Element {
	return <MenuSeparator data-slot={'menu-bar-separator'} {...property} />
}

export function MenuBarShortcut({ className, ...property }: Component.MenuBarShortcut): JSX.Element {
	return <MenuShortcut data-slot={'menu-bar-shortcut'} className={cn('group-focus/menu-bar-item:text-accent-foreground', className)} {...property} />
}

export function MenuBarSubmenu(property: Component.MenuBarSubmenu): JSX.Element {
	return <MenuSubmenu {...property} />
}

export function MenuBarSubmenuTrigger(property: Component.MenuBarSubmenuTrigger): JSX.Element {
	return <MenuSubmenuTrigger data-slot={'menu-bar-submenu-trigger'} {...property} />
}

export function MenuBarSubmenuPopup({ className, ...property }: Component.MenuBarSubmenuPopup): JSX.Element {
	return <MenuSubmenuPopup data-slot={'menu-bar-submenu-popup'} className={cn('min-w-32', className)} {...property} />
}
