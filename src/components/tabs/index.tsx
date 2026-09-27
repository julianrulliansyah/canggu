import type { JSX }        from 'react'
import type * as Component from '@/components/tabs/types'

import { Tabs as TabsPrimitive } from '@base-ui/react'
import { cva }                   from 'class-variance-authority'

import { cn } from '@/utilities/class'

export const TabsListCVA = cva('group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[0.185rem] text-mute-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none', {
	variants : {
		variant : {
			base : 'bg-mute',
			line : 'gap-1 bg-transparent',
		},
	},
	defaultVariants : {
		variant : 'base',
	},
})

export function Tabs({ className, ...property }: Component.Tabs): JSX.Element {
	return <TabsPrimitive.Root data-slot={'tabs'} className={cn('group/tabs flex gap-2 data-horizontal:flex-col', className)} {...property} />
}

export function TabsList({ className, variant = 'base', ...property }: Component.TabsList): JSX.Element {
	return <TabsPrimitive.List data-slot={'tabs-list'} data-variant={variant} className={cn(TabsListCVA({ className, variant }))} {...property} />
}

export function TabsTrigger({ className, ...property }: Component.TabsTrigger): JSX.Element {
	return <TabsPrimitive.Tab data-slot={'tabs-trigger'} className={cn('relative inline-flex h-[calc(100%-0.0625rem)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-none duration-250 outline-none group-data-[variant=line]/tabs-list:bg-transparent group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:-bottom-1.25 group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-inset-e-1 group-data-vertical/tabs:after:w-0.5 hover:text-foreground hover:transition-colors focus-visible:ring-3 focus-visible:ring-halo/50 focus-visible:transition-colors disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pe-1 has-data-[icon=inline-start]:ps-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-mute-foreground dark:hover:text-foreground data-active:bg-background data-active:text-foreground data-active:transition-colors group-data-[variant=base]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:data-active:shadow-none group-data-[variant=line]/tabs-list:data-active:after:opacity-100 dark:data-active:border-haze dark:data-active:bg-zinc-950/70 dark:data-active:text-foreground dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4', className)} {...property} />
}

export function TabsPanel({ className, ...property }: Component.TabsPanel): JSX.Element {
	return <TabsPrimitive.Panel data-slot={'tabs-panel'} className={cn('flex-1 text-sm outline-none', className)} {...property} />
}
