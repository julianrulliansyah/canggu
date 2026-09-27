import type { Menu, Menubar }                                                                                                                                                           from '@base-ui/react'
import type { MenuGroup, MenuGroupLabel, MenuItem, MenuPopup, MenuPortal, MenuRadioGroup, MenuSeparator, MenuShortcut, MenuSubmenu, MenuSubmenuPopup, MenuSubmenuTrigger, MenuTrigger } from '@/components/menu/types'

export type MenuBar               = Readonly<Menubar.Props>
export type MenuBarGroup          = MenuGroup
export type MenuBarPortal         = MenuPortal
export type MenuBarTrigger        = MenuTrigger
export type MenuBarPopup          = MenuPopup
export type MenuBarGroupLabel     = MenuGroupLabel
export type MenuBarItem           = MenuItem
export type MenuBarCheckboxItem   = Readonly<Menu.CheckboxItem.Props> & Readonly<{ inset ? : boolean }>
export type MenuBarRadioGroup     = MenuRadioGroup
export type MenuBarRadioItem      = Readonly<Menu.RadioItem.Props> & Readonly<{ inset ? : boolean }>
export type MenuBarSeparator      = MenuSeparator
export type MenuBarShortcut       = MenuShortcut
export type MenuBarSubmenu        = MenuSubmenu
export type MenuBarSubmenuTrigger = MenuSubmenuTrigger
export type MenuBarSubmenuPopup   = MenuSubmenuPopup
