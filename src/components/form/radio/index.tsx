import type { JSX }        from 'react'
import type * as Component from '@/components/form/radio/types'

import { Radio, RadioGroup } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function FormRadio({ className, ...property }: Component.FormRadio): JSX.Element {
	return <RadioGroup data-slot={'radio'} className={cn('grid w-full gap-2', className)} {...property} />
}

export function FormRadioItem({ className, ...property }: Component.FormRadioItem): JSX.Element {
	return (
		<Radio.Root data-slot={'radio-item'} className={cn('relative flex aspect-square size-check shrink-0 rounded-full border border-haze outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-haze focus-visible:ring-3 focus-visible:ring-halo/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 aria-invalid:aria-checked:border-primary dark:bg-haze/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50', className)} {...property}>
			<Radio.Indicator data-slot={'radio-indicator'} className={'absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground'} />
		</Radio.Root>
	)
}
