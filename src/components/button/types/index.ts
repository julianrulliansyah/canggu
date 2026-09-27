import type { Button as ButtonPrimitive } from '@base-ui/react'
import type { VariantProps }              from 'class-variance-authority'
import type { ButtonCVA }                 from '@/components/button'

export type Button = Readonly<ButtonPrimitive.Props> & VariantProps<typeof ButtonCVA>
