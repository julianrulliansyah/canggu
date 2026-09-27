import type { Dialog as DialogPrimitive, useRender } from '@base-ui/react'

export type Dialog            = Readonly<DialogPrimitive.Root.Props>
export type DialogTrigger     = Readonly<DialogPrimitive.Trigger.Props>
export type DialogPortal      = Readonly<DialogPrimitive.Portal.Props>
export type DialogClose       = Readonly<DialogPrimitive.Close.Props>
export type DialogBackdrop    = Readonly<DialogPrimitive.Backdrop.Props>
export type DialogHeader      = Readonly<useRender.ComponentProps<'div'>>
export type DialogTitle       = Readonly<DialogPrimitive.Title.Props>
export type DialogDescription = Readonly<DialogPrimitive.Description.Props>
export type DialogPopup       = Readonly<DialogPrimitive.Popup.Props> & Readonly<{ close ? : boolean }>
export type DialogFooter      = Readonly<useRender.ComponentProps<'div'>> & Readonly<{ close ? : boolean }>
