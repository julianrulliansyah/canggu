import type { JSX }        from 'react'
import type * as Component from '@/components/form/combobox/types'

import { Combobox }              from '@base-ui/react'
import { Check, ChevronDown, X } from 'lucide-react'

import { Button }                                                                           from '@/components/button'
import { FormInputGroup, FormInputGroupAddon, FormInputGroupButton, FormInputGroupControl } from '@/components/form/input/group'
import { cn }                                                                               from '@/utilities/class'

export function FormCombobox(property: Component.FormCombobox): JSX.Element {
	return <Combobox.Root {...property} />
}

export function FormComboboxValue(property: Component.FormComboboxValue): JSX.Element {
	return <Combobox.Value data-slot={'combobox-value'} {...property} />
}

export function FormComboboxTrigger({ children, className, ...property }: Component.FormComboboxTrigger): JSX.Element {
	return (
		<Combobox.Trigger data-slot={'combobox-trigger'} className={cn('[&_svg:not([class*="size-"])]:size-4', className)} {...property}>
			{children} <ChevronDown className={'pointer-events-none size-4 text-mute-foreground'} />
		</Combobox.Trigger>
	)
}

export function FormComboboxClear(property: Component.FormComboboxClear): JSX.Element {
	return <Combobox.Clear data-slot={'combobox-clear'} render={<FormInputGroupButton variant={'ghost'} icon size={'xs'} />} {...property}><X className={'pointer-events-none'} /></Combobox.Clear>
}

export function FormComboboxPopup({ align = 'start', alignOffset, anchor, className, side, sideOffset = 6, ...property }: Component.FormComboboxPopup): JSX.Element {
	return (
		<Combobox.Portal>
			<Combobox.Positioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} anchor={anchor} className={'isolate z-50'}>
				<Combobox.Popup data-slot={'combobox-popup'} data-chips={!(anchor === undefined)} className={cn('group/combobox-popup relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+(--spacing(7)))] origin-(--transform-origin) animate-none! overflow-hidden rounded-lg bg-popover/70 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-haze/30 *:data-[slot=input-group]:bg-haze/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95', className)} {...property} />
			</Combobox.Positioner>
		</Combobox.Portal>
	)
}

export function FormComboboxList({ className, ...property }: Component.FormComboboxList): JSX.Element {
	return <Combobox.List data-slot={'combobox-list'} className={cn('no-scrollbar max-h-[min(calc(--spacing(72)-(--spacing(9))),calc(var(--available-height)-(--spacing(9))))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0', className)} {...property} />
}

export function FormComboboxItem({ children, className, ...property }: Component.FormComboboxItem): JSX.Element {
	return (
		<Combobox.Item data-slot={'combobox-item'} className={cn('relative flex w-full cursor-default items-center gap-2 rounded-md py-1 ps-1.5 pe-8 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4', className)} {...property}>
			{children}
			
			<Combobox.ItemIndicator className={'pointer-events-none absolute inset-e-2 flex size-4 items-center justify-center'}>
				<Check className={'pointer-events-none'} />
			</Combobox.ItemIndicator>
		</Combobox.Item>
	)
}

export function FormComboboxGroup(property: Component.FormComboboxGroup): JSX.Element {
	return <Combobox.Group data-slot={'combobox-group'} {...property} />
}

export function FormComboboxGroupLabel({ className, ...property }: Component.FormComboboxGroupLabel): JSX.Element {
	return <Combobox.GroupLabel data-slot={'combobox-group-label'} className={cn('px-2 py-1.5 text-xs text-mute-foreground', className)} {...property} />
}

export function FormComboboxCollection(property: Component.FormComboboxCollection): JSX.Element {
	return <Combobox.Collection {...property} />
}

export function FormComboboxEmpty({ className, ...property }: Component.FormComboboxEmpty): JSX.Element {
	return <Combobox.Empty data-slot={'combobox-empty'} className={cn('hidden w-full justify-center py-2 text-center text-sm text-mute-foreground group-data-empty/combobox-popup:flex', className)} {...property} />
}

export function FormComboboxSeparator({ className, ...property }: Component.FormComboboxSeparator): JSX.Element {
	return <Combobox.Separator data-slot={'combobox-separator'} className={cn('-mx-1 my-1 h-px bg-edge', className)} {...property} />
}

export function FormComboboxChip({ children, className, remove = true, ...property }: Component.FormComboboxChip): JSX.Element {
	return (
		<Combobox.Chip data-slot={'combobox-chip'} className={cn('flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 rounded-sm bg-mute px-1.5 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pe-0', className)} {...property}>
			{children}
			
			{
				remove && (
					<Combobox.ChipRemove data-slot={'combobox-chip-remove'} className={'-ms-1 opacity-50 hover:opacity-100'} render={<Button variant={'ghost'} icon size={'xs'} />}>
						<X className={'pointer-events-none'} />
					</Combobox.ChipRemove>
				)
			}
		</Combobox.Chip>
	)
}

export function FormComboboxChips({ className, ...property }: Component.FormComboboxChips): JSX.Element {
	return <Combobox.Chips data-slot={'combobox-chips'} className={cn('flex min-h-control-md flex-wrap items-center gap-1 rounded-lg border border-haze bg-transparent bg-clip-padding px-2.5 py-1 text-sm transition-none duration-250 focus-within:border-haze focus-within:ring-2 focus-within:ring-halo/50 focus-within:transition-colors has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/15 has-aria-invalid:transition-colors has-data-[slot=combobox-chip]:px-1 dark:bg-haze/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40', className)} {...property} />
}

export function FormComboboxInput({ className, ...property }: Component.FormComboboxInput): JSX.Element {
	return <Combobox.Input data-slot={'combobox-input'} className={cn('min-w-16 flex-1 outline-none', className)} {...property} />
}

export function FormComboboxInputGroup({ children, className, clear = false, disabled = false, trigger = true, ...property }: Component.FormComboboxInputGroup): JSX.Element {
	return (
		<FormInputGroup className={cn('w-auto', className)}>
			<Combobox.Input render={<FormInputGroupControl disabled={disabled} />} {...property} />
			
			<FormInputGroupAddon side={'end'}>
				{
					trigger && (
						<FormInputGroupButton icon size={'xs'} variant={'ghost'} data-slot={'input-group-button'} disabled={disabled} className={'group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent'} render={<FormComboboxTrigger />} />
					)
				}

				{clear && <FormComboboxClear disabled={disabled} />}
			</FormInputGroupAddon>

			{children}
		</FormInputGroup>
	)
}
