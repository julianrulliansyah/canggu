import type { Toast as ToastPrimitive, useRender } from '@base-ui/react'

export type Toast            = Readonly<ToastPrimitive.Root.Props>
export type ToastProvider    = Readonly<ToastPrimitive.Provider.Props>
export type ToastPortal      = Readonly<ToastPrimitive.Portal.Props>
export type ToastViewport    = Readonly<ToastPrimitive.Viewport.Props>
export type ToastContent     = Readonly<ToastPrimitive.Content.Props>
export type ToastTitle       = Readonly<ToastPrimitive.Title.Props>
export type ToastDescription = Readonly<ToastPrimitive.Description.Props>
export type ToastAction      = Readonly<ToastPrimitive.Action.Props>
export type ToastClose       = Readonly<ToastPrimitive.Close.Props>
export type ToastStack       = Readonly<ToastPrimitive.Provider.Props>
export type ToastIcon        = Readonly<{ type ? : string }>
export type ToastText        = Readonly<useRender.ComponentProps<'div'>>
export type ToastManager     = ReturnType<typeof ToastPrimitive.createToastManager>
export type ToastState       = ReturnType<typeof ToastPrimitive.useToastManager>
