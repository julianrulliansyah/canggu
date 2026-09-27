import type { JSX }        from 'react'
import type * as Component from '@/components/separator/types'

import { Separator as SeparatorPrimitive } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function Separator({ className, ...property }: Component.Separator): JSX.Element {
	return <SeparatorPrimitive data-slot={'separator'} className={cn('shrink-0 bg-edge data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch', className)} {...property} />
}
