import type { JSX }        from 'react'
import type * as Component from '@/components/progress/types'

import { Progress as ProgressPrimitive } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function Progress({ children, className, ...property }: Component.Progress): JSX.Element {
	return (
		<ProgressPrimitive.Root data-slot={'progress'} className={cn('flex flex-wrap gap-2', className)} {...property}>
			{children}

			<ProgressTrack>
				<ProgressIndicator />
			</ProgressTrack>
		</ProgressPrimitive.Root>
	)
}

export function ProgressTrack({ className, ...property }: Component.ProgressTrack): JSX.Element {
	return <ProgressPrimitive.Track data-slot={'progress-track'} className={cn('relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-mute', className)} {...property} />
}

export function ProgressIndicator({ className, ...property }: Component.ProgressIndicator): JSX.Element {
	return <ProgressPrimitive.Indicator data-slot={'progress-indicator'} className={cn('h-full bg-primary transition-all', className)} {...property} />
}

export function ProgressLabel({ className, ...property }: Component.ProgressLabel): JSX.Element {
	return <ProgressPrimitive.Label data-slot={'progress-label'} className={cn('text-sm font-medium', className)} {...property} />
}

export function ProgressValue({ className, ...property }: Component.ProgressValue): JSX.Element {
	return <ProgressPrimitive.Value data-slot={'progress-value'} className={cn('ms-auto text-sm text-mute-foreground tabular-nums', className)} {...property} />
}
