import type { Menu as MenuPrimitive, useRender } from '@base-ui/react'

export type Menu               = Readonly<MenuPrimitive.Root.Props>
export type MenuPortal         = Readonly<MenuPrimitive.Portal.Props>
export type MenuTrigger        = Readonly<MenuPrimitive.Trigger.Props>
export type MenuPopup          = Readonly<MenuPrimitive.Popup.Props> & Readonly<Pick<MenuPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>>
export type MenuGroup          = Readonly<MenuPrimitive.Group.Props>
export type MenuGroupLabel     = Readonly<MenuPrimitive.GroupLabel.Props> & Readonly<{ inset ? : boolean }>
export type MenuItem           = Readonly<MenuPrimitive.Item.Props> & Readonly<{ inset ? : boolean }> & Readonly<{ variant ? : 'base' | 'destructive' }>
export type MenuSubmenu        = Readonly<MenuPrimitive.SubmenuRoot.Props>
export type MenuSubmenuTrigger = Readonly<MenuPrimitive.SubmenuTrigger.Props> & Readonly<{ inset ? : boolean }>
export type MenuSubmenuPopup   = Readonly<MenuPrimitive.Popup.Props> & Readonly<Pick<MenuPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>>
export type MenuCheckboxItem   = Readonly<MenuPrimitive.CheckboxItem.Props> & Readonly<{ inset ? : boolean }>
export type MenuRadioGroup     = Readonly<MenuPrimitive.RadioGroup.Props>
export type MenuRadioItem      = Readonly<MenuPrimitive.RadioItem.Props> & Readonly<{ inset ? : boolean }>
export type MenuSeparator      = Readonly<MenuPrimitive.Separator.Props>
export type MenuShortcut       = Readonly<useRender.ComponentProps<'span'>>
