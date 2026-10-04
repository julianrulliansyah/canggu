'use client'

import type { CSSProperties, JSX, MouseEvent } from 'react'
import type * as Component                     from '@/composites/sidebar/types'

import { createContext, use, useState } from 'react'

import { mergeProps, useRender }                         from '@base-ui/react'
import { cva }                                           from 'class-variance-authority'
import { CommandIcon, PanelLeftIcon, PanelLeftOpenIcon } from 'lucide-react'

import { Button }                                                                                     from '@/components/button'
import { DialogSheet, DialogSheetDescription, DialogSheetHeader, DialogSheetPopup, DialogSheetTitle } from '@/components/dialog/sheet'
import { FormInput }                                                                                  from '@/components/form/input'
import { Keyboard, KeyboardGroup }                                                                    from '@/components/keyboard'
import { Separator }                                                                                  from '@/components/separator'
import { Skeleton }                                                                                   from '@/components/skeleton'
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger }                                     from '@/components/tooltip'
import { useKeyboard }                                                                                from '@/hooks/keyboard'
import { useSmall }                                                                                   from '@/hooks/responsive'
import { cn }                                                                                         from '@/utilities/class'

export const cookie    = { age : 60 * 60 * 24 * 7, name : 'sidebar(state)' }
export const provision = { icon : '3rem', large : '16rem', small : '18rem' }

export const SidebarContext = createContext<Component.SidebarValue | null>(null)

export function useSidebar(): Component.SidebarValue {
	const context = use(SidebarContext)

	if (context === null)
		throw new Error('useSidebar must be invoked within <SidebarProvider />')

	return context
}

export const SidebarMenuButtonCVA = cva('peer/menu-button group/menu-button flex w-full items-center gap-sidebar-space overflow-hidden rounded-sidebar-item border-(length:--spacing-sidebar-item-edge) border-transparent p-2 text-start text-sm text-sidebar-item ring-sidebar-halo transition-[width,height,padding] outline-none group-has-data-[sidebar=menu-action]/menu-item:pe-8 group-data-[collapse=icon]:size-8! group-data-[collapse=icon]:p-2! not-data-active:hover:bg-sidebar-hover not-data-active:hover:text-sidebar-hover-foreground focus-visible:ring-2 not-data-active:active:bg-sidebar-hover not-data-active:active:text-sidebar-hover-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-hover data-open:hover:text-sidebar-hover-foreground data-active:bg-sidebar-active data-active:font-medium data-active:text-sidebar-active-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate', {
	variants : {
		variant : {
			base    : 'not-data-active:hover:bg-sidebar-hover not-data-active:hover:text-sidebar-hover-foreground data-active:shadow-sidebar-active',
			outline : 'bg-background shadow-[0_0_0_0.0625rem_var(--canggu-color-sidebar-edge)] hover:shadow-[0_0_0_0.0625rem_var(--canggu-color-sidebar-accent)] not-data-active:hover:bg-sidebar-accent not-data-active:hover:text-sidebar-accent-foreground',
		},
		size : {
			md : 'h-sidebar-item text-sm',
			sm : 'h-7 text-xs',
			lg : 'h-12 text-sm group-data-[collapse=icon]:p-0!',
		},
	},
	defaultVariants : {
		variant : 'base',
		size    : 'md',
	},
})

export function SidebarStatic({ children, className, render, ...property }: Component.Sidebar): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ children : children, className : cn('flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground', className) }, property), render : render, state : { slot : 'sidebar' } })
}

export function SidebarSmall({ children, side = 'left' }: Component.Sidebar): JSX.Element {
	const sidebar = useSidebar()

	return (
		<DialogSheet open={sidebar.mobile.open} onOpenChange={sidebar.mobile.set}>
			<DialogSheetPopup data-sidebar={'sidebar'} data-slot={'sidebar'} data-mobile={'true'} close={false} side={side} className={'w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground'} style={{ '--sidebar-width' : provision.small } as CSSProperties}>
				<DialogSheetHeader className={'sr-only'}>
					<DialogSheetTitle>Sidebar</DialogSheetTitle>
					<DialogSheetDescription>Displays the mobile sidebar.</DialogSheetDescription>
				</DialogSheetHeader>

				{useRender({ defaultTagName : 'div', props : { children : children, className : 'flex h-full w-full flex-col' } })}
			</DialogSheetPopup>
		</DialogSheet>
	)
}

export function SidebarLarge({ children, className, collapse = 'offcanvas', render, side = 'left', variant = 'sidebar', ...property }: Component.Sidebar): JSX.Element {
	const sidebar = useSidebar()

	const part = {
		gap   : useRender({ defaultTagName : 'div', props : { className : cn('relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear', 'group-data-[collapse=offcanvas]:w-0', 'group-data-[side=right]:rotate-180', variant === 'float' || variant === 'inset' ? 'group-data-[collapse=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]' : 'group-data-[collapse=icon]:w-(--sidebar-width-icon)') }, state : { slot : 'sidebar-gap' } }),
		frame : useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ children : useRender({ defaultTagName : 'div', props : { children : children, className : 'flex size-full flex-col bg-sidebar group-data-[variant=float]:rounded-lg group-data-[variant=float]:shadow-sm group-data-[variant=float]:ring-1 group-data-[variant=float]:ring-sidebar-edge' }, state : { sidebar : 'sidebar', slot : 'sidebar-inner' } }), className : cn('fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapse=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapse=offcanvas]:right-[calc(var(--sidebar-width)*-1)]', 'md:flex', variant === 'float' || variant === 'inset' ? 'p-2 group-data-[collapse=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+0.125rem)]' : 'group-data-[collapse=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r-(length:--spacing-sidebar-frame-edge) group-data-[side=right]:border-l-(length:--spacing-sidebar-frame-edge)', className) }, property), render : render, state : { side : side, slot : 'sidebar-frame' } }),
	}

	return useRender({ defaultTagName : 'div', props : { children : <>{part.gap}{part.frame}</>, className : cn('group peer hidden text-sidebar-foreground', 'md:block') }, state : { collapse : sidebar.open ? '' : collapse, open : sidebar.open, side : side, slot : 'sidebar', variant : variant }, stateAttributesMapping : { open : (value: boolean): Record<string, string> => value ? { 'data-open' : '' } : { 'data-closed' : '' } } })
}

export function Sidebar({ collapse = 'offcanvas', side = 'left', ...property }: Component.Sidebar): JSX.Element {
	const sidebar = useSidebar()

	if (collapse === 'none')
		return <SidebarStatic {...property} />

	if (sidebar.touch)
		return <SidebarSmall side={side} {...property} />

	return <SidebarLarge collapse={collapse} side={side} {...property} />
}

export function SidebarProvider({ children, className, defaultOpen = true, onOpenChange, open, render, style, ...property }: Component.SidebarProvider): JSX.Element {
	const touch = useSmall()

	const state = {
		mobile : useState(false),
		open   : useState(defaultOpen),
	}

	const perform = {
		set : (value: boolean): void => {
			if (onOpenChange === undefined)
				state.open[1](value)
			else
				onOpenChange(value)

			document.cookie = cookie.name + '=' + String(value) + ';' + ' ' + 'path=/' + ';' + ' ' + 'max-age' + '=' + String(cookie.age)
		},
		toggle : (): void => {
			if (touch)
				state.mobile[1](!state.mobile[0])
			else
				perform.set(!(open ?? state.open[0]))
		},
	}

	useKeyboard({ key : '/', hold : 'command', onAction : perform.toggle })

	return (
		<SidebarContext value={{ mobile : { open : state.mobile[0], set : state.mobile[1] }, open : open ?? state.open[0], set : perform.set, toggle : perform.toggle, touch : touch }}>
			<TooltipProvider>
				{useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ children : children, className : cn('group/sidebar-shell flex min-h-svh w-full gap-sidebar-seam bg-sidebar-canvas has-data-[variant=inset]:bg-sidebar', className), style : { '--sidebar-width' : provision.large, '--sidebar-width-icon' : provision.icon, ...style } as CSSProperties }, property), render : render, state : { slot : 'sidebar-shell' } })}
			</TooltipProvider>
		</SidebarContext>
	)
}

export function SidebarTrigger({ className, icon = true, onClick, size = 'sm', variant = 'ghost', ...property }: Component.SidebarTrigger): JSX.Element {
	const sidebar = useSidebar()

	const perform = {
		click : (event: MouseEvent<HTMLButtonElement>): void => {
			onClick?.(event as Parameters<NonNullable<Component.SidebarTrigger['onClick']>>[0])

			sidebar.toggle()
		},
	}

	return (
		<Tooltip>
			<TooltipTrigger render={<Button data-sidebar={'trigger'} data-slot={'sidebar-trigger'} icon={icon} size={size} variant={variant} aria-label={'Toggle Sidebar'} onClick={perform.click} className={cn(className)} {...property} />}>
				{sidebar.open ? <PanelLeftIcon /> : <PanelLeftOpenIcon />}
			</TooltipTrigger>
			
			<TooltipPopup side={'right'} align={'center'} className={'flex items-center gap-1.5'}>
				Toggle Sidebar

				<KeyboardGroup>
					<Keyboard>
						<CommandIcon />
					</Keyboard>
					
					<Keyboard>/</Keyboard>
				</KeyboardGroup>
			</TooltipPopup>
		</Tooltip>
	)
}

export function SidebarRail({ className, render, ...property }: Component.SidebarRail): JSX.Element {
	const sidebar = useSidebar()

	return useRender({ defaultTagName : 'button', props : mergeProps<'button'>({ 'aria-label' : 'Toggle Sidebar', className : cn('absolute inset-y-0 z-20 hidden w-4 transition-none duration-250 ease-linear group-data-[side=left]:-right-sidebar-rail group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-sidebar-rail-line after:w-0.5 hover:transition-colors hover:after:bg-linear-to-b hover:after:from-sidebar-rail hover:after:to-sidebar-rail-edge ltr:translate-x-sidebar-rail-shift rtl:-translate-x-1/2', 'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize', '[[data-side=left][data-closed]_&]:cursor-e-resize [[data-side=right][data-closed]_&]:cursor-w-resize', 'group-data-[collapse=offcanvas]:translate-x-0 group-data-[collapse=offcanvas]:after:left-full hover:group-data-[collapse=offcanvas]:bg-sidebar', '[[data-side=left][data-collapse=offcanvas]_&]:-right-2', '[[data-side=right][data-collapse=offcanvas]_&]:-left-2', 'sm:flex', className), onClick : sidebar.toggle, tabIndex : -1, title : 'Toggle Sidebar' }, property), render : render, state : { sidebar : 'rail', slot : 'sidebar-rail' } })
}

export function SidebarInset({ className, render, ...property }: Component.SidebarInset): JSX.Element {
	return useRender({ defaultTagName : 'main', props : mergeProps<'main'>({ className : cn('relative flex w-full flex-1 flex-col border-x-(length:--spacing-sidebar-inset-edge) border-sidebar-inset-edge bg-sidebar-inset shadow-sidebar-inset', 'md:top-sidebar-offset md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ms-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=sidebar]:peer-data-[side=left]:rounded-tl-sidebar-inset md:peer-data-[variant=sidebar]:peer-data-[side=right]:rounded-tr-sidebar-inset md:peer-data-[variant=inset]:peer-data-closed:ms-2', className) }, property), render : render, state : { slot : 'sidebar-inset' } })
}

export function SidebarInput({ className, ...property }: Component.SidebarInput): JSX.Element {
	return <FormInput data-slot={'sidebar-input'} data-sidebar={'input'} className={cn('h-8 w-full bg-background shadow-none', className)} {...property} />
}

export function SidebarHeader({ className, render, ...property }: Component.SidebarHeader): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex flex-col gap-2 p-2', className) }, property), render : render, state : { sidebar : 'header', slot : 'sidebar-header' } })
}

export function SidebarFooter({ className, render, ...property }: Component.SidebarFooter): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex flex-col gap-2 p-2', className) }, property), render : render, state : { sidebar : 'footer', slot : 'sidebar-footer' } })
}

export function SidebarSeparator({ className, ...property }: Component.SidebarSeparator): JSX.Element {
	return <Separator data-slot={'sidebar-separator'} data-sidebar={'separator'} className={cn('mx-2 bg-sidebar-edge data-horizontal:w-auto', className)} {...property} />
}

export function SidebarContent({ className, render, ...property }: Component.SidebarContent): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapse=icon]:overflow-hidden', className) }, property), render : render, state : { sidebar : 'content', slot : 'sidebar-content' } })
}

export function SidebarGroup({ className, render, ...property }: Component.SidebarGroup): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('relative flex w-full min-w-0 flex-col p-2', className) }, property), render : render, state : { sidebar : 'group', slot : 'sidebar-group' } })
}

export function SidebarGroupLabel({ className, render, ...property }: Component.SidebarGroupLabel): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-halo transition-[margin,opacity] duration-200 ease-linear outline-none group-data-[collapse=icon]:-mt-8 group-data-[collapse=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0', className) }, property), render : render, state : { sidebar : 'group-label', slot : 'sidebar-group-label' } })
}

export function SidebarGroupAction({ className, render, ...property }: Component.SidebarGroupAction): JSX.Element {
	return useRender({ defaultTagName : 'button', props : mergeProps<'button'>({ className : cn('absolute inset-e-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-halo transition-transform outline-none group-data-[collapse=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0', 'md:after:hidden', className) }, property), render : render, state : { sidebar : 'group-action', slot : 'sidebar-group-action' } })
}

export function SidebarGroupContent({ className, render, ...property }: Component.SidebarGroupContent): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('w-full text-sm', className) }, property), render : render, state : { sidebar : 'group-content', slot : 'sidebar-group-content' } })
}

export function SidebarMenu({ className, render, ...property }: Component.SidebarMenu): JSX.Element {
	return useRender({ defaultTagName : 'ul', props : mergeProps<'ul'>({ className : cn('flex w-full min-w-0 flex-col gap-0', className) }, property), render : render, state : { sidebar : 'menu', slot : 'sidebar-menu' } })
}

export function SidebarMenuItem({ className, render, ...property }: Component.SidebarMenuItem): JSX.Element {
	return useRender({ defaultTagName : 'li', props : mergeProps<'li'>({ className : cn('group/menu-item relative', className) }, property), render : render, state : { sidebar : 'menu-item', slot : 'sidebar-menu-item' } })
}

export function SidebarMenuButton({ active = false, className, render, size = 'md', tooltip, variant = 'base', ...property }: Component.SidebarMenuButton): JSX.Element {
	const sidebar = useSidebar()
	const button  = useRender({ defaultTagName : 'button', props : mergeProps<'button'>({ className : cn(SidebarMenuButtonCVA({ size, variant }), className) }, property), render : tooltip === undefined ? render : <TooltipTrigger render={render} />, state : { active : active, sidebar : 'menu-button', size : size, slot : 'sidebar-menu-button' } })

	return tooltip === undefined ? button : (
		<Tooltip>
			{button} <TooltipPopup side={'right'} align={'center'} hidden={sidebar.open || sidebar.touch} {...(typeof tooltip === 'string' ? { children : tooltip } : tooltip)} />
		</Tooltip>
	)
}

export function SidebarMenuAction({ className, hover = false, render, ...property }: Component.SidebarMenuAction): JSX.Element {
	return useRender({ defaultTagName : 'button', props : mergeProps<'button'>({ className : cn('absolute inset-e-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-halo transition-transform outline-none group-data-[collapse=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=md]/menu-button:top-1.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0', hover && 'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100', 'md:after:hidden', hover && 'md:opacity-0', className) }, property), render : render, state : { sidebar : 'menu-action', slot : 'sidebar-menu-action' } })
}

export function SidebarMenuBadge({ className, render, ...property }: Component.SidebarMenuBadge): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('pointer-events-none absolute inset-e-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapse=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=md]/menu-button:top-1.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground', className) }, property), render : render, state : { sidebar : 'menu-badge', slot : 'sidebar-menu-badge' } })
}

export function SidebarMenuSkeleton({ className, icon = false, render, ...property }: Component.SidebarMenuSkeleton): JSX.Element {
	const state = { width : useState((): string => String(Math.floor(Math.random() * 40) + 50) + '%') }

	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ children : <>{icon ? <Skeleton data-sidebar={'menu-skeleton-icon'} className={'size-4 rounded-md'} /> : null}<Skeleton data-sidebar={'menu-skeleton-text'} className={'h-4 max-w-(--skeleton-width) flex-1'} style={{ '--skeleton-width' : state.width[0] } as CSSProperties} /></>, className : cn('flex h-8 items-center gap-2 rounded-md px-2', className) }, property), render : render, state : { sidebar : 'menu-skeleton', slot : 'sidebar-menu-skeleton' } })
}

export function SidebarMenuSub({ className, render, ...property }: Component.SidebarMenuSub): JSX.Element {
	return useRender({ defaultTagName : 'ul', props : mergeProps<'ul'>({ className : cn('my-(--spacing-sidebar-branch-margin) ms-3.5 me-0 flex min-w-0 flex-col gap-sidebar-branch-gap border-s border-sidebar-branch py-sidebar-branch-padding ps-2.5 pe-0 group-data-[collapse=icon]:hidden', className) }, property), render : render, state : { sidebar : 'menu-sub', slot : 'sidebar-menu-sub' } })
}

export function SidebarMenuSubItem({ className, render, ...property }: Component.SidebarMenuSubItem): JSX.Element {
	return useRender({ defaultTagName : 'li', props : mergeProps<'li'>({ className : cn('group/menu-sub-item relative before:absolute before:-start-2.5 before:top-1/2 before:h-px before:w-sidebar-branch before:bg-sidebar-branch before:content-[""]', className) }, property), render : render, state : { sidebar : 'menu-sub-item', slot : 'sidebar-menu-sub-item' } })
}

export function SidebarMenuSubButton({ active = false, className, render, size = 'md', ...property }: Component.SidebarMenuSubButton): JSX.Element {
	return useRender({ defaultTagName : 'a', props : mergeProps<'a'>({ className : cn('flex h-sidebar-leaf min-w-0 items-center gap-sidebar-space overflow-hidden rounded-sidebar-item border-(length:--spacing-sidebar-item-edge) border-transparent px-2 text-sidebar-leaf ring-sidebar-halo outline-none group-data-[collapse=icon]:hidden not-data-active:hover:bg-sidebar-hover not-data-active:hover:text-sidebar-hover-foreground focus-visible:ring-2 not-data-active:active:bg-sidebar-hover not-data-active:active:text-sidebar-hover-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-active data-active:font-medium data-active:text-sidebar-active-foreground data-active:shadow-sidebar-active [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-leaf-icon', className) }, property), render : render, state : { active : active, sidebar : 'menu-sub-button', size : size, slot : 'sidebar-menu-sub-button' } })
}
