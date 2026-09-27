import type { Tooltip as TooltipPrimitive } from '@base-ui/react'

export type Tooltip         = Readonly<TooltipPrimitive.Root.Props>
export type TooltipProvider = Readonly<TooltipPrimitive.Provider.Props>
export type TooltipTrigger  = Readonly<TooltipPrimitive.Trigger.Props>
export type TooltipPopup    = Readonly<TooltipPrimitive.Popup.Props> & Readonly<Pick<TooltipPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>>
