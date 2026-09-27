import type { JSX }        from 'react'
import type * as Component from '@/components/toggle/types'

import { Toggle as TogglePrimitive } from '@base-ui/react'
import { cva }                       from 'class-variance-authority'

import { cn } from '@/utilities/class'

export const ToggleCVA = cva('group/toggle inline-flex shrink-0 items-center justify-center border border-transparent text-sm font-medium whitespace-nowrap transition-none duration-250 outline-none hover:bg-mute hover:text-foreground hover:transition-colors focus-visible:border-haze focus-visible:ring-3 focus-visible:ring-halo/50 focus-visible:transition-colors disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 aria-invalid:transition-colors aria-pressed:bg-mute aria-pressed:transition-colors dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_[data-slot=spinner]]:size-3.25 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-3.25', {
	variants : {
		round : {
			'none' : 'rounded-none',
			'xs'   : 'rounded-xs',
			'sm'   : 'rounded-sm',
			'md'   : 'rounded-md',
			'lg'   : 'rounded-lg',
			'xl'   : 'rounded-xl',
			'2xl'  : 'rounded-2xl',
			'3xl'  : 'rounded-3xl',
			'4xl'  : 'rounded-4xl',
			'full' : 'rounded-full',
		},
		variant : {
			ghost   : 'bg-transparent',
			outline : 'border-haze bg-transparent hover:bg-mute',
		},
		icon : {
			false : '',
			true  : '',
		},
		size : {
			lg : 'h-control-lg',
			md : 'h-control-md',
			sm : 'h-control-sm',
			xs : 'h-control-xs',
		},
	},
	defaultVariants : {
		icon    : false,
		round   : 'lg',
		size    : 'md',
		variant : 'ghost',
	},
	compoundVariants : [
		{
			icon  : false,
			size  : [ 'lg', 'md' ],
			class : 'gap-1.5 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2',
		},
		{
			icon  : false,
			size  : 'lg',
			class : [ 'px-3.25', 'md:px-2.75' ],
		},
		{
			icon  : false,
			size  : 'md',
			class : 'px-2.5',
		},
		{
			icon  : false,
			size  : 'sm',
			class : 'gap-1 px-2.5 text-[calc(var(--canggu-typeface-size)*0.8)] has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*="size-"])]:size-3.25',
		},
		{
			icon  : false,
			size  : 'xs',
			class : 'gap-1 px-2 text-xs has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_[data-slot=spinner]]:size-3 [&_svg:not([class*="size-"])]:size-3',
		},
		{
			icon  : true,
			size  : 'lg',
			class : 'size-control-lg',
		},
		{
			icon  : true,
			size  : 'md',
			class : 'size-control-md',
		},
		{
			icon  : true,
			size  : 'sm',
			class : 'size-control-sm',
		},
		{
			icon  : true,
			size  : 'xs',
			class : 'size-control-xs [&_[data-slot=spinner]]:size-3 [&_svg:not([class*="size-"])]:size-3',
		},
	],
})

export function Toggle({ className, icon = false, round = 'lg', size = 'md', variant = 'ghost', ...property }: Component.Toggle): JSX.Element {
	return <TogglePrimitive data-slot={'toggle'} className={cn(ToggleCVA({ className, icon, round, size, variant }))} {...property} />
}
