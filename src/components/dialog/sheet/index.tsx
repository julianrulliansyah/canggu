'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/dialog/sheet/types'

import { Dialog, mergeProps, useRender } from '@base-ui/react'
import { X }                             from 'lucide-react'

import { Button } from '@/components/button'
import { cn }     from '@/utilities/class'

export function DialogSheet(property: Component.DialogSheet): JSX.Element {
	return <Dialog.Root {...property} />
}

export function DialogSheetTrigger(property: Component.DialogSheetTrigger): JSX.Element {
	return <Dialog.Trigger data-slot={'dialog-sheet-trigger'} {...property} />
}

export function DialogSheetClose(property: Component.DialogSheetClose): JSX.Element {
	return <Dialog.Close data-slot={'dialog-sheet-close'} {...property} />
}

export function DialogSheetPortal(property: Component.DialogSheetPortal): JSX.Element {
	return <Dialog.Portal data-slot={'dialog-sheet-portal'} {...property} />
}

export function DialogSheetBackdrop({ className, ...property }: Component.DialogSheetBackdrop): JSX.Element {
	return <Dialog.Backdrop data-slot={'dialog-sheet-backdrop'} className={cn('fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs', className)} {...property} />
}

export function DialogSheetHeader({ className, render, ...property }: Component.DialogSheetHeader): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex flex-col gap-0.75 p-4 text-sm', className) }, property), render : render, state : { slot : 'dialog-sheet-header' } })
}

export function DialogSheetTitle({ className, ...property }: Component.DialogSheetTitle): JSX.Element {
	return <Dialog.Title data-slot={'dialog-sheet-title'} className={cn('font-heading text-base leading-snug font-medium text-foreground', className)} {...property} />
}

export function DialogSheetDescription({ className, ...property }: Component.DialogSheetDescription): JSX.Element {
	return <Dialog.Description data-slot={'dialog-sheet-description'} className={cn('text-xs text-mute-foreground', className)} {...property} />
}

export function DialogSheetPopup({ children, className, close = true, side = 'right', ...property }: Component.DialogSheetPopup): JSX.Element {
	return (
		<DialogSheetPortal>
			<DialogSheetBackdrop />

			<Dialog.Popup data-slot={'dialog-sheet-popup'} data-side={side} className={cn('fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-10 data-[side=bottom]:data-starting-style:translate-y-10 data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:-translate-x-10 data-[side=left]:data-starting-style:-translate-x-10 data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-10 data-[side=right]:data-starting-style:translate-x-10 data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:-translate-y-10 data-[side=top]:data-starting-style:-translate-y-10', 'sm:data-[side=left]:max-w-sm sm:data-[side=right]:max-w-sm', className)} {...property}>
				{children} {close && <DialogSheetClose aria-label={'Close'} render={<Button variant={'ghost'} icon size={'sm'} className={'absolute inset-e-3 top-3'} />}><X /></DialogSheetClose>}
			</Dialog.Popup>
		</DialogSheetPortal>
	)
}

export function DialogSheetFooter({ className, render, ...property }: Component.DialogSheetFooter): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('mt-auto flex flex-col gap-2 bg-mute/65 p-4 dark:bg-neutral-950/50', className) }, property), render : render, state : { slot : 'dialog-sheet-footer' } })
}
