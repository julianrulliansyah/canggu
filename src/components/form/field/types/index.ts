import type { FieldDescription, FieldError, FieldItem, FieldRoot, useRender } from '@base-ui/react'
import type { VariantProps }                                                  from 'class-variance-authority'
import type { FormFieldCVA }                                                  from '@/components/form/field'

export type FormField            = Readonly<FieldRoot.Props> & VariantProps<typeof FormFieldCVA>
export type FormFieldItem        = Readonly<FieldItem.Props>
export type FormFieldLabel       = Readonly<useRender.ComponentProps<'label'>>
export type FormFieldDescription = Readonly<FieldDescription.Props>
export type FormFieldError       = Readonly<FieldError.Props>
