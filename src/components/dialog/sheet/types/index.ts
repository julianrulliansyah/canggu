import type { Dialog, useRender } from '@base-ui/react'

export type DialogSheet            = Readonly<Dialog.Root.Props>
export type DialogSheetTrigger     = Readonly<Dialog.Trigger.Props>
export type DialogSheetClose       = Readonly<Dialog.Close.Props>
export type DialogSheetPortal      = Readonly<Dialog.Portal.Props>
export type DialogSheetBackdrop    = Readonly<Dialog.Backdrop.Props>
export type DialogSheetHeader      = Readonly<useRender.ComponentProps<'div'>>
export type DialogSheetTitle       = Readonly<Dialog.Title.Props>
export type DialogSheetDescription = Readonly<Dialog.Description.Props>
export type DialogSheetPopup       = Readonly<Dialog.Popup.Props> & Readonly<{ close ? : boolean, side ? : 'bottom' | 'left' | 'right' | 'top' }>
export type DialogSheetFooter      = Readonly<useRender.ComponentProps<'div'>>
