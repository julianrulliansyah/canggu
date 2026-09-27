import type { JSX }        from 'react'
import type * as Component from '@/components/scroll/types'

import { ScrollArea } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function Scroll({ children, className, ...property }: Component.Scroll): JSX.Element {
	return (
		<ScrollArea.Root data-slot={'scroll'} className={cn('relative', className)} {...property}>
			<ScrollArea.Viewport data-slot={'scroll-viewport'} className={'size-full rounded-[inherit] transition-none duration-250 outline-none focus-visible:ring-2 focus-visible:ring-halo/50 focus-visible:transition-colors'}>
				{children}
			</ScrollArea.Viewport>

			<ScrollBar />

			<ScrollArea.Corner />
		</ScrollArea.Root>
	)
}

export function ScrollBar({ className, ...property }: Component.ScrollBar): JSX.Element {
	return (
		<ScrollArea.Scrollbar data-slot={'scroll-bar'} className={cn('flex touch-none p-0.25 select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-s data-vertical:border-s-transparent', className)} {...property}>
			<ScrollArea.Thumb data-slot={'scroll-thumb'} className={'relative flex-1 rounded-full bg-edge'} />
		</ScrollArea.Scrollbar>
	)
}
