import type { JSX }        from 'react'
import type * as Component from '@/components/form/select/types'

import { Select }                        from '@base-ui/react'
import { cva }                           from 'class-variance-authority'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from '@/utilities/class'

export const FormSelectTriggerCVA = cva('flex w-fit items-center justify-between gap-1.5 rounded-lg border border-haze bg-transparent py-2 ps-2.5 pe-2 text-sm whitespace-nowrap transition-none duration-250 outline-none select-none focus-visible:border-haze focus-visible:ring-2 focus-visible:ring-halo/50 focus-visible:transition-colors disabled:cursor-not-allowed disabled:opacity-50 in-data-[slot=field]:w-full aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 aria-invalid:transition-colors data-placeholder:text-mute-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-haze/30 dark:hover:bg-haze/50 dark:hover:transition-colors dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4', {
	variants : {
		size : {
			md : 'h-control-md',
			sm : 'h-control-sm rounded-[min(var(--radius-md),0.625rem)]',
		},
	},
	defaultVariants : {
		size : 'md',
	},
})

export function FormSelect<Value, Multiple extends boolean | undefined = false>(property: Component.FormSelect<Value, Multiple>): JSX.Element {
	return <Select.Root<Value, Multiple> {...property} />
}

export function FormSelectTrigger({ children, className, size = 'md', ...property }: Component.FormSelectTrigger): JSX.Element {
	return (
		<Select.Trigger data-slot={'select-trigger'} data-size={size} className={cn(FormSelectTriggerCVA({ className, size }))} {...property}>
			{children} <Select.Icon render={<ChevronDown className={'pointer-events-none size-4 text-mute-foreground'} />} />
		</Select.Trigger>
	)
}

export function FormSelectValue({ className, ...property }: Component.FormSelectValue): JSX.Element {
	return <Select.Value data-slot={'select-value'} className={cn('flex flex-1 text-start', className)} {...property} />
}

export function FormSelectPopup({ align, alignItemWithTrigger = true, alignOffset, children, className, side, sideOffset = 4, ...property }: Component.FormSelectPopup): JSX.Element {
	return (
		<Select.Portal>
			<Select.Positioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} alignItemWithTrigger={alignItemWithTrigger} className={'isolate z-50'}>
				<Select.Popup data-slot={'select-popup'} data-align-trigger={alignItemWithTrigger} className={cn('relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) animate-none! overflow-x-hidden overflow-y-auto rounded-lg bg-popover/70 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95', className)} {...property}>
					<Select.ScrollUpArrow data-slot={'select-scroll-up-button'} className={'top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*="size-"])]:size-4'}>
						<ChevronUp />
					</Select.ScrollUpArrow>

					<Select.List>{children}</Select.List>

					<Select.ScrollDownArrow data-slot={'select-scroll-down-button'} className={'bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*="size-"])]:size-4'}>
						<ChevronDown />
					</Select.ScrollDownArrow>
				</Select.Popup>
			</Select.Positioner>
		</Select.Portal>
	)
}

export function FormSelectGroup({ className, ...property }: Component.FormSelectGroup): JSX.Element {
	return <Select.Group data-slot={'select-group'} className={cn('scroll-my-1 p-1', className)} {...property} />
}

export function FormSelectGroupLabel({ className, ...property }: Component.FormSelectGroupLabel): JSX.Element {
	return <Select.GroupLabel data-slot={'select-group-label'} className={cn('px-1.5 py-1 text-xs text-mute-foreground', className)} {...property} />
}

export function FormSelectItem({ children, className, ...property }: Component.FormSelectItem): JSX.Element {
	return (
		<Select.Item data-slot={'select-item'} className={cn('relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 ps-1.5 pe-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2', className)} {...property}>
			<Select.ItemText className={'flex flex-1 shrink-0 gap-2 whitespace-nowrap'}>{children}</Select.ItemText>

			<Select.ItemIndicator className={'pointer-events-none absolute inset-e-2 flex size-4 items-center justify-center'}>
				<Check className={'pointer-events-none'} />
			</Select.ItemIndicator>
		</Select.Item>
	)
}

export function FormSelectSeparator({ className, ...property }: Component.FormSelectSeparator): JSX.Element {
	return <Select.Separator data-slot={'select-separator'} className={cn('pointer-events-none -mx-1 my-1 h-px bg-edge', className)} {...property} />
}
