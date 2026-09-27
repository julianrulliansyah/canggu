import type { JSX }        from 'react'
import type * as Component from '@/components/form/input/types'

import { Input } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function FormInput({ className, ...property }: Component.FormInput): JSX.Element {
	return <Input data-slot={'input'} className={cn('h-control-md w-full min-w-0 rounded-lg border border-haze bg-transparent px-2.5 py-1 transition-none duration-250 outline-none file:inline-flex file:h-6.5 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-mute-foreground focus-visible:border-haze focus-visible:ring-2 focus-visible:ring-halo/50 focus-visible:transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-haze/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 aria-invalid:transition-colors dark:bg-haze/30 dark:disabled:bg-haze/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40', 'md:text-sm md:file:h-5.75', className)} {...property} />
}
