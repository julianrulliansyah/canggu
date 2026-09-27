'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/image/avatar/types'

import { Avatar as ImageAvatarPrimitive, mergeProps, useRender } from '@base-ui/react'
import { cva }                                                   from 'class-variance-authority'

import { cn } from '@/utilities/class'

export const ImageAvatarCVA = cva('group/image-avatar relative flex shrink-0 rounded-full font-medium select-none after:absolute after:inset-0 after:rounded-full after:border after:border-edge after:mix-blend-darken dark:after:mix-blend-lighten', {
	variants : {
		size : {
			lg : 'size-10',
			md : 'size-8.5',
			sm : 'size-7',
		},
	},
	defaultVariants : {
		size : 'md',
	},
})

export function ImageAvatar({ className, size = 'md', ...property }: Component.ImageAvatar): JSX.Element {
	return <ImageAvatarPrimitive.Root data-slot={'image-avatar'} data-size={size} className={cn(ImageAvatarCVA({ className, size }))} {...property} />
}

export function ImageAvatarImage({ className, ...property }: Component.ImageAvatarImage): JSX.Element {
	return <ImageAvatarPrimitive.Image data-slot={'image-avatar-image'} className={cn('aspect-square size-full rounded-full object-cover', className)} {...property} />
}

export function ImageAvatarFallback({ className, ...property }: Component.ImageAvatarFallback): JSX.Element {
	return <ImageAvatarPrimitive.Fallback data-slot={'image-avatar-fallback'} className={cn('flex size-full items-center justify-center rounded-full bg-mute/60 text-xs text-mute-foreground group-data-[size=sm]/image-avatar:text-xs', className)} {...property} />
}

export function ImageAvatarBadge({ className, render, ...property }: Component.ImageAvatarBadge): JSX.Element {
	return useRender({ defaultTagName : 'span', props : mergeProps<'span'>({ className : cn('absolute inset-e-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none group-data-[size=lg]/image-avatar:size-3 group-data-[size=md]/image-avatar:size-2.5 group-data-[size=sm]/image-avatar:size-2 group-data-[size=lg]/image-avatar:[&>svg]:size-2 group-data-[size=md]/image-avatar:[&>svg]:size-2 group-data-[size=sm]/image-avatar:[&>svg]:hidden', className) }, property), render : render, state : { slot : 'image-avatar-badge' } })
}

export function ImageAvatarGroup({ className, render, ...property }: Component.ImageAvatarGroup): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('group/image-avatar-group flex -space-x-2 *:data-[slot=image-avatar]:ring-2 *:data-[slot=image-avatar]:ring-background', className) }, property), render : render, state : { slot : 'image-avatar-group' } })
}

export function ImageAvatarGroupCount({ className, render, ...property }: Component.ImageAvatarGroupCount): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('relative flex size-8 shrink-0 items-center justify-center rounded-full bg-mute text-xs text-mute-foreground ring-2 ring-background group-has-data-[size=lg]/image-avatar-group:size-10 group-has-data-[size=sm]/image-avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/image-avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/image-avatar-group:[&>svg]:size-3', className) }, property), render : render, state : { slot : 'image-avatar-group-count' } })
}
