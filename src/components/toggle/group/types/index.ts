import type { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react'
import type { VariantProps }                        from 'class-variance-authority'
import type { CSSProperties }                       from 'react'
import type { ToggleCVA }                           from '@/components/toggle'
import type { Toggle }                              from '@/components/toggle/types'

export type ToggleGroup      = Readonly<ToggleGroupPrimitive.Props> & Pick<VariantProps<typeof ToggleCVA>, 'size' | 'variant'> & Readonly<{ space ? : number }>
export type ToggleGroupItem  = Toggle
export type ToggleGroupValue = Pick<VariantProps<typeof ToggleCVA>, 'size' | 'variant'> & Readonly<{ space : number }>
export type ToggleGroupStyle = CSSProperties & Readonly<Record<'--space', number>>
