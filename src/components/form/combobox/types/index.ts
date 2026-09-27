import type { Combobox } from '@base-ui/react'

export type FormCombobox           = Readonly<Combobox.Root.Props<unknown, boolean | undefined>>
export type FormComboboxValue      = Readonly<Combobox.Value.Props>
export type FormComboboxTrigger    = Readonly<Combobox.Trigger.Props>
export type FormComboboxClear      = Readonly<Combobox.Clear.Props>
export type FormComboboxPopup      = Readonly<Combobox.Popup.Props> & Readonly<Pick<Combobox.Positioner.Props, 'align' | 'alignOffset' | 'anchor' | 'side' | 'sideOffset'>>
export type FormComboboxList       = Readonly<Combobox.List.Props>
export type FormComboboxItem       = Readonly<Combobox.Item.Props>
export type FormComboboxGroup      = Readonly<Combobox.Group.Props>
export type FormComboboxGroupLabel = Readonly<Combobox.GroupLabel.Props>
export type FormComboboxCollection = Readonly<Combobox.Collection.Props>
export type FormComboboxEmpty      = Readonly<Combobox.Empty.Props>
export type FormComboboxSeparator  = Readonly<Combobox.Separator.Props>
export type FormComboboxChip       = Readonly<Combobox.Chip.Props> & Readonly<{ remove ? : boolean }>
export type FormComboboxChips      = Readonly<Combobox.Chips.Props>
export type FormComboboxInput      = Readonly<Combobox.Input.Props>
export type FormComboboxInputGroup = Readonly<Combobox.Input.Props> & Readonly<{ clear ? : boolean, trigger ? : boolean }>
