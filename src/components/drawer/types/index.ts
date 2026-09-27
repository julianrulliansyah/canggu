import type { Drawer as DrawerPrimitive, useRender } from '@base-ui/react'

export type Drawer            = Readonly<DrawerPrimitive.Root.Props> & Readonly<{ grip ? : boolean }>
export type DrawerValue       = Readonly<{ direction : NonNullable<DrawerPrimitive.Root.Props['swipeDirection']>, grip : boolean, modal : DrawerPrimitive.Root.Props['modal'], snap : boolean }>
export type DrawerTrigger     = Readonly<DrawerPrimitive.Trigger.Props>
export type DrawerPortal      = Readonly<DrawerPrimitive.Portal.Props>
export type DrawerClose       = Readonly<DrawerPrimitive.Close.Props>
export type DrawerBackdrop    = Readonly<DrawerPrimitive.Backdrop.Props>
export type DrawerGrip        = Readonly<useRender.ComponentProps<'div'>>
export type DrawerHeader      = Readonly<useRender.ComponentProps<'div'>>
export type DrawerTitle       = Readonly<DrawerPrimitive.Title.Props>
export type DrawerDescription = Readonly<DrawerPrimitive.Description.Props>
export type DrawerPopup       = Readonly<DrawerPrimitive.Popup.Props>
export type DrawerFooter      = Readonly<useRender.ComponentProps<'div'>>
