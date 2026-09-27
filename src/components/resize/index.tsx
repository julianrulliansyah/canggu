'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/resize/types'

import { useRender }               from '@base-ui/react'
import { Group, Panel, Separator } from 'react-resizable-panels'

import { cn } from '@/utilities/class'

export function ResizeGroup({ className, ...property }: Component.ResizeGroup): JSX.Element {
	return <Group data-slot={'resize-group'} className={cn('flex h-full w-full aria-[orientation=vertical]:flex-col', className)} {...property} />
}

export function ResizePanel(property: Component.ResizePanel): JSX.Element {
	return <Panel data-slot={'resize-panel'} {...property} />
}

export function ResizeGrip({ className, grip = false, ...property }: Component.ResizeGrip): JSX.Element {
	return (
		<Separator data-slot={'resize-grip'} className={cn('relative flex w-px items-center justify-center bg-edge outline-none after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-2 focus-visible:ring-halo/50 aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90', className)} {...property}>
			{grip && useRender({ defaultTagName : 'div', props : { className : 'z-10 flex h-6 w-1 shrink-0 rounded-lg bg-edge' } })}
		</Separator>
	)
}
