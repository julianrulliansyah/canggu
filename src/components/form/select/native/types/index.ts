import type { useRender }           from '@base-ui/react'
import type { VariantProps }        from 'class-variance-authority'
import type { FormSelectNativeCVA } from '@/components/form/select/native'

export type FormSelectNative       = Readonly<Omit<useRender.ComponentProps<'select'>, 'size'>> & VariantProps<typeof FormSelectNativeCVA>
export type FormSelectNativeOption = Readonly<useRender.ComponentProps<'option'>>
export type FormSelectNativeGroup  = Readonly<useRender.ComponentProps<'optgroup'>>
