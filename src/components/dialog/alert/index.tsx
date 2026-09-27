'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/dialog/alert/types'

import { AlertDialog, mergeProps, useRender } from '@base-ui/react'

import { Button } from '@/components/button'
import { cn }     from '@/utilities/class'

export function DialogAlert(property: Component.DialogAlert): JSX.Element {
	return <AlertDialog.Root {...property} />
}

export function DialogAlertTrigger(property: Component.DialogAlertTrigger): JSX.Element {
	return <AlertDialog.Trigger data-slot={'dialog-alert-trigger'} {...property} />
}

export function DialogAlertPortal(property: Component.DialogAlertPortal): JSX.Element {
	return <AlertDialog.Portal data-slot={'dialog-alert-portal'} {...property} />
}

export function DialogAlertBackdrop({ className, ...property }: Component.DialogAlertBackdrop): JSX.Element {
	return <AlertDialog.Backdrop data-slot={'dialog-alert-backdrop'} className={cn('fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0', className)} {...property} />
}

export function DialogAlertHeader({ className, render, ...property }: Component.DialogAlertHeader): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('grid grid-rows-[auto_1fr] place-items-center gap-0.75 text-center text-sm has-data-[slot=dialog-alert-media]:grid-rows-[auto_auto_1fr] has-data-[slot=dialog-alert-media]:gap-x-4', 'sm:group-data-[size=md]/dialog-alert-popup:place-items-start sm:group-data-[size=md]/dialog-alert-popup:text-start sm:group-data-[size=md]/dialog-alert-popup:has-data-[slot=dialog-alert-media]:grid-rows-[auto_1fr]', className) }, property), render : render, state : { slot : 'dialog-alert-header' } })
}

export function DialogAlertMedia({ className, render, ...property }: Component.DialogAlertMedia): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('mb-2 inline-flex size-10 items-center justify-center rounded-md bg-mute *:[svg:not([class*="size-"])]:size-5', 'sm:group-data-[size=md]/dialog-alert-popup:row-span-2', className) }, property), render : render, state : { slot : 'dialog-alert-media' } })
}

export function DialogAlertTitle({ className, ...property }: Component.DialogAlertTitle): JSX.Element {
	return <AlertDialog.Title data-slot={'dialog-alert-title'} className={cn('font-heading text-base leading-snug font-medium', 'sm:group-data-[size=md]/dialog-alert-popup:group-has-data-[slot=dialog-alert-media]/dialog-alert-popup:col-start-2', className)} {...property} />
}

export function DialogAlertDescription({ className, ...property }: Component.DialogAlertDescription): JSX.Element {
	return <AlertDialog.Description data-slot={'dialog-alert-description'} className={cn('text-xs text-mute-foreground', className)} {...property} />
}

export function DialogAlertAction(property: Component.DialogAlertAction): JSX.Element {
	return <Button data-slot={'dialog-alert-action'} {...property} />
}

export function DialogAlertClose({ size, variant = 'outline', ...property }: Component.DialogAlertClose): JSX.Element {
	return <AlertDialog.Close data-slot={'dialog-alert-close'} render={<Button variant={variant} size={size} />} {...property} />
}

export function DialogAlertPopup({ className, size = 'md', ...property }: Component.DialogAlertPopup): JSX.Element {
	return (
		<DialogAlertPortal>
			<DialogAlertBackdrop />
			<AlertDialog.Popup data-slot={'dialog-alert-popup'} data-size={size} className={cn('group/dialog-alert-popup fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=md]:max-w-xs data-[size=sm]:max-w-xs data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95', 'sm:data-[size=md]:max-w-sm', className)} {...property} />
		</DialogAlertPortal>
	)
}

export function DialogAlertFooter({ className, render, ...property }: Component.DialogAlertFooter): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-mute/65 p-4 group-data-[size=sm]/dialog-alert-popup:grid group-data-[size=sm]/dialog-alert-popup:grid-cols-2 dark:bg-neutral-950/50', 'sm:flex-row sm:justify-end', className) }, property), render : render, state : { slot : 'dialog-alert-footer' } })
}
