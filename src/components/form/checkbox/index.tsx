import type { JSX }        from 'react'
import type * as Component from '@/components/form/checkbox/types'

import { Checkbox }  from '@base-ui/react'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/utilities/class'

export function FormCheckbox({ className, ...property }: Component.FormCheckbox): JSX.Element {
	return (
		<Checkbox.Root data-slot={'checkbox'} className={cn('relative flex size-check shrink-0 items-center justify-center rounded-lg border border-haze transition-none duration-250 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-haze focus-visible:ring-3 focus-visible:ring-halo/50 focus-visible:transition-colors aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 aria-invalid:transition-colors aria-invalid:aria-checked:border-primary dark:bg-haze/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-checked:transition-colors dark:data-checked:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50', className)} {...property}>
			<Checkbox.Indicator data-slot={'checkbox-indicator'} className={'grid place-content-center text-current transition-none [&>svg]:size-3.5'}>
				<CheckIcon />
			</Checkbox.Indicator>
		</Checkbox.Root>
	)
}
