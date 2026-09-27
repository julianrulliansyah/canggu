'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/dialog/types'

import { Dialog as DialogPrimitive, mergeProps, useRender } from '@base-ui/react'
import { X }                                                from 'lucide-react'

import { Button } from '@/components/button'
import { cn }     from '@/utilities/class'

export function Dialog(property: Component.Dialog): JSX.Element {
	return <DialogPrimitive.Root {...property} />
}

export function DialogTrigger(property: Component.DialogTrigger): JSX.Element {
	return <DialogPrimitive.Trigger data-slot={'dialog-trigger'} {...property} />
}

export function DialogPortal(property: Component.DialogPortal): JSX.Element {
	return <DialogPrimitive.Portal data-slot={'dialog-portal'} {...property} />
}

export function DialogClose(property: Component.DialogClose): JSX.Element {
	return <DialogPrimitive.Close data-slot={'dialog-close'} {...property} />
}

export function DialogBackdrop({ className, ...property }: Component.DialogBackdrop): JSX.Element {
	return <DialogPrimitive.Backdrop data-slot={'dialog-backdrop'} className={cn('fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0', className)} {...property} />
}

export function DialogHeader({ className, render, ...property }: Component.DialogHeader): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex flex-col gap-0.75 text-sm', className) }, property), render : render, state : { slot : 'dialog-header' } })
}

export function DialogTitle({ className, ...property }: Component.DialogTitle): JSX.Element {
	return <DialogPrimitive.Title data-slot={'dialog-title'} className={cn('font-heading text-base leading-snug font-medium', className)} {...property} />
}

export function DialogDescription({ className, ...property }: Component.DialogDescription): JSX.Element {
	return <DialogPrimitive.Description data-slot={'dialog-description'} className={cn('text-xs text-mute-foreground', className)} {...property} />
}

export function DialogPopup({ children, className, close = true, ...property }: Component.DialogPopup): JSX.Element {
	return (
		<DialogPortal>
			<DialogBackdrop />

			<DialogPrimitive.Popup data-slot={'dialog-popup'} className={cn('fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95', 'sm:max-w-sm', className)} {...property}>
				{children} {close && <DialogClose aria-label={'Close'} render={<Button variant={'ghost'} icon size={'sm'} className={'absolute inset-e-2 top-2'} />}><X /></DialogClose>}
			</DialogPrimitive.Popup>
		</DialogPortal>
	)
}

export function DialogFooter({ children, className, close = false, render, ...property }: Component.DialogFooter): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ children : <>{children}{close && <DialogClose render={<Button variant={'outline'} />}>Close</DialogClose>}</>, className : cn('-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-mute/65 p-4 dark:bg-neutral-950/50', 'sm:flex-row sm:justify-end', className) }, property), render : render, state : { slot : 'dialog-footer' } })
}
