import type { Toggle as TogglePrimitive } from '@base-ui/react'
import type { VariantProps }              from 'class-variance-authority'
import type { ToggleCVA }                 from '@/components/toggle'

export type Toggle = Readonly<TogglePrimitive.Props> & VariantProps<typeof ToggleCVA>
