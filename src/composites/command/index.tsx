'use client'

import type { JSX }        from 'react'
import type * as Component from '@/composites/command/types'

import { Combobox, mergeProps, useRender } from '@base-ui/react'
import { Check, Search }                   from 'lucide-react'

import { Dialog, DialogDescription, DialogHeader, DialogPopup, DialogTitle } from '@/components/dialog'
import { FormInputGroup, FormInputGroupAddon, FormInputGroupControl }        from '@/components/form/input/group'
import { cn }                                                                from '@/utilities/class'

export function Command({ children, className, ...property }: Component.Command): JSX.Element {
	return (
		<Combobox.Root autoHighlight inline open {...property}>
			{useRender({ defaultTagName : 'div', props : { children : children, className : cn('flex size-full flex-col overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground', className) }, state : { slot : 'command' } })}
		</Combobox.Root>
	)
}

export function CommandDialog({ children, className, close = false, description = 'Search for a command to run...', title = 'Command Palette', ...property }: Component.CommandDialog): JSX.Element {
	return (
		<Dialog {...property}>
			<DialogHeader className={'sr-only'}>
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>

			<DialogPopup className={cn('top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0', className)} close={close}>
				{children}
			</DialogPopup>
		</Dialog>
	)
}

export function CommandInput({ className, ...property }: Component.CommandInput): JSX.Element {
	return useRender({ 
		defaultTagName : 'div', 
		state          : { slot : 'command-input-shell' },
		props          : { 
			children : (
				<FormInputGroup className={'h-8 rounded-lg border-haze/30 bg-haze/30 shadow-none'}>
					<Combobox.Input data-slot={'command-input'} render={<FormInputGroupControl className={cn('text-sm', className)} />} {...property} />

					<FormInputGroupAddon>
						<Search className={'size-4 shrink-0 opacity-50'} />
					</FormInputGroupAddon>
				</FormInputGroup>
			), 
			className : 'p-1 pb-0',
		}, 
	})
}

export function CommandList({ className, ...property }: Component.CommandList): JSX.Element {
	return <Combobox.List data-slot={'command-list'} className={cn('no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none', className)} {...property} />
}

export function CommandEmpty({ children, className, ...property }: Component.CommandEmpty): JSX.Element {
	return (
		<Combobox.Empty data-slot={'command-empty'} className={className} {...property}>
			{useRender({ defaultTagName : 'div', props : { children : children, className : 'py-6 text-center text-sm' } })}
		</Combobox.Empty>
	)
}

export function CommandGroup({ className, ...property }: Component.CommandGroup): JSX.Element {
	return <Combobox.Group data-slot={'command-group'} className={cn('overflow-hidden p-1 text-foreground', className)} {...property} />
}

export function CommandGroupLabel({ className, ...property }: Component.CommandGroupLabel): JSX.Element {
	return <Combobox.GroupLabel data-slot={'command-group-label'} className={cn('px-2 py-1.5 text-xs font-medium text-mute-foreground', className)} {...property} />
}

export function CommandCollection(property: Component.CommandCollection): JSX.Element {
	return <Combobox.Collection {...property} />
}

export function CommandItem({ children, className, ...property }: Component.CommandItem): JSX.Element {
	return (
		<Combobox.Item data-slot={'command-item'} className={cn('group/command-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-popup]:rounded-lg! data-highlighted:bg-mute data-highlighted:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4 data-highlighted:*:[svg]:text-foreground', className)} {...property}>
			{children} <Check aria-hidden={'true'} className={'ms-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-selected/command-item:opacity-100'} />
		</Combobox.Item>
	)
}

export function CommandSeparator({ className, ...property }: Component.CommandSeparator): JSX.Element {
	return <Combobox.Separator data-slot={'command-separator'} className={cn('-mx-1 h-px bg-edge', className)} {...property} />
}

export function CommandShortcut({ className, render, ...property }: Component.CommandShortcut): JSX.Element {
	return useRender({ defaultTagName : 'span', props : mergeProps<'span'>({ className : cn('ms-auto text-xs tracking-widest text-mute-foreground group-data-highlighted/command-item:text-foreground', className) }, property), render : render, state : { slot : 'command-shortcut' } })
}
