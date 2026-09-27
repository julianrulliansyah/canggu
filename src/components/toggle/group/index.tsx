'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/toggle/group/types'

import { createContext, use } from 'react'

import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react'

import { Toggle } from '@/components/toggle'
import { cn }     from '@/utilities/class'

const ToggleGroupContext = createContext<Component.ToggleGroupValue>({ space : 2 })

export function ToggleGroup({ children, className, size, space = 2, variant, ...property }: Component.ToggleGroup): JSX.Element {
	const style: Component.ToggleGroupStyle = { '--space' : space }

	return (
		<ToggleGroupPrimitive data-slot={'toggle-group'} data-variant={variant} data-size={size} data-space={space} style={style} className={cn('group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--space))] rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),0.625rem)] data-vertical:flex-col data-vertical:items-stretch', className)} {...property}>
			<ToggleGroupContext value={{ size, space, variant }}>{children}</ToggleGroupContext>
		</ToggleGroupPrimitive>
	)
}

export function ToggleGroupItem({ className, size, variant, ...property }: Component.ToggleGroupItem): JSX.Element {
	const parent = use(ToggleGroupContext)

	return <Toggle data-slot={'toggle-group-item'} data-variant={parent.variant ?? variant} data-size={parent.size ?? size} data-space={parent.space} size={parent.size ?? size} variant={parent.variant ?? variant} className={cn('shrink-0 group-data-[space=0]/toggle-group:rounded-none group-data-[space=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[space=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 group-data-[space=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 group-data-horizontal/toggle-group:data-[space=0]:first:rounded-s-lg group-data-vertical/toggle-group:data-[space=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[space=0]:last:rounded-e-lg group-data-vertical/toggle-group:data-[space=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[space=0]:data-[variant=outline]:border-s-0 group-data-vertical/toggle-group:data-[space=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[space=0]:data-[variant=outline]:first:border-s group-data-vertical/toggle-group:data-[space=0]:data-[variant=outline]:first:border-t', className)} {...property} />
}
