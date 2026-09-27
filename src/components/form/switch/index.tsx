import type { JSX }        from 'react'
import type * as Component from '@/components/form/switch/types'

import { Switch } from '@base-ui/react'
import { cva }    from 'class-variance-authority'

import { cn } from '@/utilities/class'

export const FormSwitchCVA = cva('group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-none duration-250 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-halo/50 focus-visible:transition-colors aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 aria-invalid:transition-colors dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-checked:transition-colors data-unchecked:bg-haze data-unchecked:transition-colors dark:data-unchecked:bg-haze/80 data-disabled:cursor-not-allowed data-disabled:opacity-50', {
	variants : {
		size : {
			md : 'h-switch-height-md w-switch-width-md',
			sm : 'h-switch-height-sm w-switch-width-sm',
		},
	},
	defaultVariants : {
		size : 'md',
	},
})

export function FormSwitch({ className, size = 'md', ...property }: Component.FormSwitch): JSX.Element {
	return (
		<Switch.Root data-slot={'switch'} data-size={size} className={cn(FormSwitchCVA({ className, size }))} {...property}>
			<Switch.Thumb data-slot={'switch-thumb'} className={cn('pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=md]/switch:size-check group-data-[size=sm]/switch:size-thumb group-data-[size=md]/switch:data-checked:translate-x-[calc(100%-0.125rem)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-0.125rem)] rtl:group-data-[size=md]/switch:data-checked:-translate-x-[calc(100%-0.125rem)] rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-0.125rem)] dark:data-checked:bg-primary-foreground group-data-[size=md]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground', 'md:group-data-[size=sm]/switch:size-3')} />
		</Switch.Root>
	)
}
