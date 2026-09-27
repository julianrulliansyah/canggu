import type { Select }               from '@base-ui/react'
import type { VariantProps }         from 'class-variance-authority'
import type { FormSelectTriggerCVA } from '@/components/form/select'

export type FormSelect           = Readonly<Select.Root.Props<unknown, boolean | undefined>>
export type FormSelectTrigger    = Readonly<Select.Trigger.Props> & VariantProps<typeof FormSelectTriggerCVA>
export type FormSelectValue      = Readonly<Select.Value.Props>
export type FormSelectPopup      = Readonly<Select.Popup.Props> & Readonly<Pick<Select.Positioner.Props, 'align' | 'alignItemWithTrigger' | 'alignOffset' | 'side' | 'sideOffset'>>
export type FormSelectGroup      = Readonly<Select.Group.Props>
export type FormSelectGroupLabel = Readonly<Select.GroupLabel.Props>
export type FormSelectItem       = Readonly<Select.Item.Props>
export type FormSelectSeparator  = Readonly<Select.Separator.Props>
