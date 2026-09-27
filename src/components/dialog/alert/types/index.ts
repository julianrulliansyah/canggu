import type { AlertDialog, useRender } from '@base-ui/react'
import type { Button }                 from '@/components/button/types'

export type DialogAlert            = Readonly<AlertDialog.Root.Props>
export type DialogAlertTrigger     = Readonly<AlertDialog.Trigger.Props>
export type DialogAlertPortal      = Readonly<AlertDialog.Portal.Props>
export type DialogAlertBackdrop    = Readonly<AlertDialog.Backdrop.Props>
export type DialogAlertHeader      = Readonly<useRender.ComponentProps<'div'>>
export type DialogAlertMedia       = Readonly<useRender.ComponentProps<'div'>>
export type DialogAlertTitle       = Readonly<AlertDialog.Title.Props>
export type DialogAlertDescription = Readonly<AlertDialog.Description.Props>
export type DialogAlertAction      = Button
export type DialogAlertClose       = Readonly<AlertDialog.Close.Props> & Pick<Button, 'size' | 'variant'>
export type DialogAlertPopup       = Readonly<AlertDialog.Popup.Props> & Readonly<{ size ? : 'md' | 'sm' }>
export type DialogAlertFooter      = Readonly<useRender.ComponentProps<'div'>>
