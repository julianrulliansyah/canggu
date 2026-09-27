import type { ContextMenu, useRender } from '@base-ui/react'

export type MenuContext               = Readonly<ContextMenu.Root.Props>
export type MenuContextPortal         = Readonly<ContextMenu.Portal.Props>
export type MenuContextTrigger        = Readonly<ContextMenu.Trigger.Props>
export type MenuContextPopup          = Readonly<ContextMenu.Popup.Props> & Readonly<Pick<ContextMenu.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>>
export type MenuContextGroup          = Readonly<ContextMenu.Group.Props>
export type MenuContextGroupLabel     = Readonly<ContextMenu.GroupLabel.Props> & Readonly<{ inset ? : boolean }>
export type MenuContextItem           = Readonly<ContextMenu.Item.Props> & Readonly<{ inset ? : boolean }> & Readonly<{ variant ? : 'base' | 'destructive' }>
export type MenuContextSubmenu        = Readonly<ContextMenu.SubmenuRoot.Props>
export type MenuContextSubmenuTrigger = Readonly<ContextMenu.SubmenuTrigger.Props> & Readonly<{ inset ? : boolean }>
export type MenuContextSubmenuPopup   = Readonly<ContextMenu.Popup.Props> & Readonly<Pick<ContextMenu.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>>
export type MenuContextCheckboxItem   = Readonly<ContextMenu.CheckboxItem.Props> & Readonly<{ inset ? : boolean }>
export type MenuContextRadioGroup     = Readonly<ContextMenu.RadioGroup.Props>
export type MenuContextRadioItem      = Readonly<ContextMenu.RadioItem.Props> & Readonly<{ inset ? : boolean }>
export type MenuContextSeparator      = Readonly<ContextMenu.Separator.Props>
export type MenuContextShortcut       = Readonly<useRender.ComponentProps<'span'>>
