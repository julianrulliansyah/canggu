'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/accordion/types'

import { Accordion as AccordionPrimitive, useRender } from '@base-ui/react'
import { ChevronDown, ChevronUp }                     from 'lucide-react'

import { cn } from '@/utilities/class'

export function Accordion({ className, ...property }: Component.Accordion): JSX.Element {
	return <AccordionPrimitive.Root data-slot={'accordion'} className={cn('flex w-full flex-col', className)} {...property} />
}

export function AccordionItem({ className, ...property }: Component.AccordionItem): JSX.Element {
	return <AccordionPrimitive.Item data-slot={'accordion-item'} className={cn('not-last:border-b', className)} {...property} />
}

export function AccordionTrigger({ children, className, ...property }: Component.AccordionTrigger): JSX.Element {
	return (
		<AccordionPrimitive.Header className={'flex'}>
			<AccordionPrimitive.Trigger data-slot={'accordion-trigger'} className={cn('group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-start text-sm font-medium transition-none duration-250 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-halo/50 focus-visible:transition-colors aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ms-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-mute-foreground', className)} {...property}>
				{children}

				<ChevronDown data-slot={'accordion-trigger-icon'} className={'pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden'} />
				<ChevronUp data-slot={'accordion-trigger-icon'} className={'pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline'} />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	)
}

export function AccordionPanel({ children, className, ...property }: Component.AccordionPanel): JSX.Element {
	const inner = useRender({ defaultTagName : 'div', props : { children : children, className : cn('h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4', className) } })

	return <AccordionPrimitive.Panel data-slot={'accordion-panel'} className={'overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up'} {...property}>{inner}</AccordionPrimitive.Panel>
}
