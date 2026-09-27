'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/item/types'

import { mergeProps, useRender } from '@base-ui/react'
import { cva }                   from 'class-variance-authority'

import { Separator } from '@/components/separator'
import { cn }        from '@/utilities/class'

export const ItemCVA = cva('group/item flex w-full flex-wrap items-center rounded-lg border text-sm transition-none duration-250 outline-none focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-halo/50 focus-visible:transition-colors has-data-[slot=item-description]:items-start [a]:hover:bg-mute [a]:hover:transition-colors', {
	variants : {
		variant : {
			base    : 'border-transparent',
			outline : 'border-edge',
			mute    : 'border-transparent bg-mute/50',
		},
		size : {
			md : 'gap-2.5 px-3 py-2.5',
			sm : 'gap-2.5 px-3 py-2.5',
			xs : 'gap-2 px-2.5 py-2 in-data-[slot=menu-popup]:p-0',
		},
	},
	defaultVariants : {
		variant : 'base',
		size    : 'md',
	},
})

export const ItemMediaCVA = cva('flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none', {
	variants : {
		variant : {
			base  : 'bg-transparent',
			icon  : '[&_svg:not([class*="size-"])]:size-4',
			image : 'size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover',
		},
	},
	defaultVariants : {
		variant : 'base',
	},
})

export function Item({ className, render, size = 'md', variant = 'base', ...property }: Component.Item): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn(ItemCVA({ className, size, variant })) }, property), render : render, state : { slot : 'item', size : size, variant : variant } })
}

export function ItemGroup({ className, render, ...property }: Component.ItemGroup): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2', className), role : 'list' }, property), render : render, state : { slot : 'item-group' } })
}

export function ItemHeader({ className, render, ...property }: Component.ItemHeader): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex basis-full items-center justify-between gap-2', className) }, property), render : render, state : { slot : 'item-header' } })
}

export function ItemTitle({ className, render, ...property }: Component.ItemTitle): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('line-clamp-1 flex w-fit items-center gap-2 font-heading text-sm leading-snug font-medium underline-offset-4', className) }, property), render : render, state : { slot : 'item-title' } })
}

export function ItemDescription({ className, render, ...property }: Component.ItemDescription): JSX.Element {
	return useRender({ defaultTagName : 'p', props : mergeProps<'p'>({ className : cn('line-clamp-2 text-start text-xs leading-normal font-normal text-mute-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary', className) }, property), render : render, state : { slot : 'item-description' } })
}

export function ItemMedia({ className, render, variant = 'base', ...property }: Component.ItemMedia): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn(ItemMediaCVA({ className, variant })) }, property), render : render, state : { slot : 'item-media', variant : variant } })
}

export function ItemContent({ className, render, ...property }: Component.ItemContent): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex flex-1 flex-col gap-0.5 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none', className) }, property), render : render, state : { slot : 'item-content' } })
}

export function ItemActionGroup({ className, render, ...property }: Component.ItemActionGroup): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex items-center gap-2', className) }, property), render : render, state : { slot : 'item-action-group' } })
}

export function ItemSeparator({ className, ...property }: Component.ItemSeparator): JSX.Element {
	return <Separator data-slot={'item-separator'} orientation={'horizontal'} className={cn('my-2', className)} {...property} />
}

export function ItemFooter({ className, render, ...property }: Component.ItemFooter): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex basis-full items-center justify-between gap-2', className) }, property), render : render, state : { slot : 'item-footer' } })
}
