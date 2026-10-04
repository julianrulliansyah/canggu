import type { JSX }        from 'react'
import type * as Component from '@/components/separator/types'

import { Separator as SeparatorPrimitive } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function Separator({ className, ...property }: Component.Separator): JSX.Element {
	return <SeparatorPrimitive data-slot={'separator'} className={cn('shrink-0 border-edge data-horizontal:w-full data-horizontal:border-t data-vertical:self-stretch data-vertical:border-s', className)} {...property} />
}
