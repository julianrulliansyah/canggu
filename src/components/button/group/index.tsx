'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/button/group/types'

import { mergeProps, useRender } from '@base-ui/react'
import { cva }                   from 'class-variance-authority'

import { Separator } from '@/components/separator'
import { cn }        from '@/utilities/class'

export const ButtonGroupCVA = cva('flex w-fit items-stretch rounded-(--round) *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[>[data-slot=input]:focus-visible]:ring-2 has-[>[data-slot=input]:focus-visible]:ring-halo/50 has-[>[data-slot=input][aria-invalid=true]]:ring-3 has-[>[data-slot=input][aria-invalid=true]]:ring-destructive/15 dark:has-[>[data-slot=input][aria-invalid=true]]:ring-destructive/40 [&>[data-slot=input]]:focus-visible:ring-0 [&>[data-slot=input]]:aria-invalid:ring-0 [&>input]:flex-1', {
	variants : {
		orientation : {
			horizontal : '*:data-slot:rounded-(--round) *:data-slot:rounded-e-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-e-(--round) [&>[data-slot]~[data-slot]]:rounded-s-none [&>[data-slot]~[data-slot]]:border-s-0',
			vertical   : 'flex-col *:data-slot:rounded-(--round) *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-(--round) [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0',
		},
		round : {
			'none' : '[--round:0]',
			'xs'   : '[--round:var(--radius-xs)]',
			'sm'   : '[--round:var(--radius-sm)]',
			'md'   : '[--round:var(--radius-md)]',
			'lg'   : '[--round:var(--radius-lg)]',
			'xl'   : '[--round:var(--radius-xl)]',
			'2xl'  : '[--round:var(--radius-2xl)]',
			'3xl'  : '[--round:var(--radius-3xl)]',
			'4xl'  : '[--round:var(--radius-4xl)]',
			'full' : '[--round:calc(infinity*1rem)]',
		},
	},
	defaultVariants : {
		orientation : 'horizontal',
		round       : 'lg',
	},
})

export function ButtonGroup({ className, orientation = 'horizontal', render, round = 'lg', ...property }: Component.ButtonGroup): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn(ButtonGroupCVA({ orientation, round }), className), role : 'group' }, property), render : render, state : { orientation : orientation, slot : 'button-group' } })
}

export function ButtonGroupText({ className, render, ...property }: Component.ButtonGroupText): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex items-center gap-2 rounded-lg border border-edge bg-mute px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-3.25', className) }, property), render : render, state : { slot : 'button-group-text' } })
}

export function ButtonGroupSeparator({ className, orientation = 'vertical', ...property }: Component.ButtonGroupSeparator): JSX.Element {
	return <Separator data-slot={'button-group-separator'} orientation={orientation} className={cn('relative self-stretch bg-haze data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto', className)} {...property} />
}
