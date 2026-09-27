import type { Popover as PopoverPrimitive, useRender } from '@base-ui/react'

export type Popover            = Readonly<PopoverPrimitive.Root.Props>
export type PopoverTrigger     = Readonly<PopoverPrimitive.Trigger.Props>
export type PopoverHeader      = Readonly<useRender.ComponentProps<'div'>>
export type PopoverTitle       = Readonly<PopoverPrimitive.Title.Props>
export type PopoverDescription = Readonly<PopoverPrimitive.Description.Props>
export type PopoverPopup       = Readonly<PopoverPrimitive.Popup.Props> & Readonly<Pick<PopoverPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>>
