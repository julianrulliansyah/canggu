import type { JSX }        from 'react'
import type * as Component from '@/components/button/types'

import { Button as ButtonPrimitive } from '@base-ui/react'
import { cva }                       from 'class-variance-authority'

import { cn } from '@/utilities/class'

export const ButtonCVA = cva('group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-none duration-100 outline-none select-none hover:transition-colors focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-halo/50 focus-visible:transition-colors active:transition-colors disabled:pointer-events-none disabled:opacity-50 aria-expanded:transition-colors aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 aria-invalid:transition-colors dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_[data-slot=spinner]]:size-3.25 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-3.25', {
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
			primary     : 'bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary/55',
			secondary   : 'bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--canggu-color-secondary),var(--canggu-color-foreground)_5%)] active:bg-secondary/55 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
			outline     : 'border-edge bg-background hover:bg-mute hover:text-foreground active:bg-mute/10 aria-expanded:bg-mute aria-expanded:text-foreground dark:border-haze dark:bg-haze/30 dark:hover:bg-haze/50 dark:active:bg-haze',
			ghost       : 'hover:bg-mute hover:text-foreground active:bg-mute/10 aria-expanded:bg-mute aria-expanded:text-foreground dark:hover:bg-mute/50 dark:active:bg-mute',
			destructive : 'bg-destructive/10 text-destructive hover:bg-destructive/15 focus-visible:ring-destructive/15 active:bg-destructive/7.5 dark:bg-destructive/10 dark:hover:bg-destructive/15 dark:focus-visible:ring-destructive/40 dark:active:bg-destructive/7.5',
			link        : 'text-primary underline-offset-4 hover:underline',
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
		variant : 'primary',
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

export function Button({ className, icon = false, round = 'lg', size = 'md', variant = 'primary', ...property }: Component.Button): JSX.Element {
	return <ButtonPrimitive data-slot={'button'} data-variant={variant} className={cn(ButtonCVA({ className, icon, round, size, variant }))} {...property} />
}
