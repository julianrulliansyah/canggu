import type { NavigationMenu } from '@base-ui/react'

export type Navigation        = Readonly<NavigationMenu.Root.Props> & Readonly<Pick<NavigationMenu.Positioner.Props, 'align'>>
export type NavigationList    = Readonly<NavigationMenu.List.Props>
export type NavigationItem    = Readonly<NavigationMenu.Item.Props>
export type NavigationTrigger = Readonly<NavigationMenu.Trigger.Props>
export type NavigationContent = Readonly<NavigationMenu.Content.Props>
export type NavigationPopup   = Readonly<NavigationMenu.Popup.Props> & Readonly<Pick<NavigationMenu.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>>
export type NavigationLink    = Readonly<NavigationMenu.Link.Props>
export type NavigationIcon    = Readonly<NavigationMenu.Icon.Props>
